import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profileData } from "@/content/profile";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
  fallback: ["Georgia", "Cambria", "Times New Roman", "serif"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
  fallback: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "sans-serif",
  ],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: [
    "ui-monospace",
    "SFMono-Regular",
    "Menlo",
    "Monaco",
    "Consolas",
    "monospace",
  ],
});

export const metadata: Metadata = {
  metadataBase: new URL(`https://${profileData.personal.domain}`),
  title: `${profileData.personal.name} — ${profileData.personal.primaryRole}`,
  description: profileData.personal.statement,
  keywords: [
    profileData.personal.name,
    "Full-Stack Developer",
    "Machine Learning Engineer",
    "Next.js",
    "TypeScript",
    "Python",
    "Portfolio",
  ],
  authors: [{ name: profileData.personal.name, url: `https://${profileData.personal.domain}` }],
  creator: profileData.personal.name,
  openGraph: {
    title: `${profileData.personal.name} — ${profileData.personal.primaryRole}`,
    description: profileData.personal.statement,
    url: `https://${profileData.personal.domain}`,
    siteName: profileData.personal.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profileData.personal.name} — ${profileData.personal.primaryRole}`,
    description: profileData.personal.statement,
    creator: "@somyamoonat",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored ? stored : (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${instrumentSerif.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: themeInitScript,
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-canvas text-text-primary antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
