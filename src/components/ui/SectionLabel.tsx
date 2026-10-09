interface SectionLabelProps {
  number: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionLabel({
  number,
  label,
  title,
  description,
  className = "",
}: SectionLabelProps) {
  return (
    <div className={`mb-10 md:mb-14 ${className}`}>
      <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-accent mb-3">
        <span>[{number}]</span>
        <span className="text-text-muted">/</span>
        <span className="text-text-secondary">{label}</span>
      </div>
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-text-primary tracking-tight font-normal">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-sm md:text-base text-text-secondary max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
