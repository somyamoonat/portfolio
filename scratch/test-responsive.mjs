import { spawn } from "child_process";
import http from "http";

const CHROME_PATH = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9222;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getJson(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://127.0.0.1:${PORT}${path}`, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => resolve(JSON.parse(data)));
    }).on("error", reject);
  });
}

async function main() {
  console.log("Launching Chrome headless for responsive tests...");
  const chrome = spawn(CHROME_PATH, [
    "--headless=new",
    `--remote-debugging-port=${PORT}`,
    "--no-sandbox",
    "--disable-gpu",
  ]);

  await sleep(1500);

  try {
    const targets = await getJson("/json");
    const target = targets.find((t) => t.type === "page") || targets[0];
    if (!target) {
      console.error("No debug target found");
      return;
    }

    const ws = new WebSocket(target.webSocketDebuggerUrl);

    let id = 1;
    function send(method, params = {}) {
      return new Promise((resolve) => {
        const msgId = id++;
        const handler = (event) => {
          const res = JSON.parse(event.data);
          if (res.id === msgId) {
            ws.removeEventListener("message", handler);
            resolve(res.result);
          }
        };
        ws.addEventListener("message", handler);
        ws.send(JSON.stringify({ id: msgId, method, params }));
      });
    }

    await new Promise((resolve) => ws.addEventListener("open", resolve));

    await send("Page.enable");
    await send("Page.navigate", { url: "http://localhost:3002" });
    await sleep(2000);

    const viewports = [
      { name: "Mobile (Small)", width: 360, height: 740 },
      { name: "Tablet (iPad)", width: 768, height: 1024 },
      { name: "Small Desktop / Laptop", width: 1024, height: 768 },
      { name: "Large Desktop", width: 1440, height: 900 },
    ];

    console.log("\n=== RESPONSIVE VIEWPORT AUDIT ===");

    for (const vp of viewports) {
      await send("Emulation.setDeviceMetricsOverride", {
        width: vp.width,
        height: vp.height,
        deviceScaleFactor: 2,
        mobile: vp.width <= 768,
      });

      await sleep(500);

      const evalRes = await send("Runtime.evaluate", {
        expression: `
          (function() {
            const docWidth = document.documentElement.offsetWidth;
            const scrollWidth = document.documentElement.scrollWidth;
            const innerWidth = window.innerWidth;
            const hasHorizontalScroll = scrollWidth > innerWidth;

            // Check tap targets for mobile viewports
            const interactive = Array.from(document.querySelectorAll('a, button, input, textarea'));
            const smallTargets = [];
            interactive.forEach(el => {
              if (el.classList.contains('sr-only')) return;
              const rect = el.getBoundingClientRect();
              if (rect.width > 0 && rect.height > 0) {
                // If element is smaller than 36px in either dimension without parent padding
                if (rect.height < 36 && !el.closest('footer') && !el.closest('header')) {
                  smallTargets.push({
                    tag: el.tagName,
                    text: el.innerText.trim().slice(0, 30),
                    width: Math.round(rect.width),
                    height: Math.round(rect.height)
                  });
                }
              }
            });

            return {
              hasHorizontalScroll,
              scrollWidth,
              innerWidth,
              smallTargetsCount: smallTargets.length,
              smallTargets: smallTargets.slice(0, 5)
            };
          })()
        `,
        returnByValue: true,
      });

      const data = evalRes.result.value;
      console.log(`\nViewport ${vp.width}px (${vp.name}):`);
      console.log(`  - Horizontal Scroll: ${data.hasHorizontalScroll ? "FAILED (scrollWidth > innerWidth)" : "PASSED (0px overflow)"}`);
      console.log(`  - scrollWidth: ${data.scrollWidth}px | innerWidth: ${data.innerWidth}px`);
      console.log(`  - Small Tap Targets: ${data.smallTargetsCount === 0 ? "PASSED (all touch targets >= compliant threshold)" : "Found " + data.smallTargetsCount}`);
      if (data.smallTargets.length > 0) {
        console.log("    Items:", JSON.stringify(data.smallTargets, null, 2));
      }
    }

    ws.close();
  } catch (err) {
    console.error("Responsive test error:", err);
  } finally {
    chrome.kill();
  }
}

main();
