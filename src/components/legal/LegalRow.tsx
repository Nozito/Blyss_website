type LegalRowProps = {
  label: string;
  value: string;
};

export default function LegalRow({ label, value }: LegalRowProps) {
  return (
    <p className="flex items-center justify-between gap-4 border-b border-[var(--border)] pb-2">
      <strong className="font-bold text-[var(--text-muted)]">{label}</strong>
      <span className="text-right font-medium text-[var(--text)]">{value}</span>
    </p>
  );
}
