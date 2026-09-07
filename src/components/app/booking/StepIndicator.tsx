export function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className="h-[3px] flex-1 overflow-hidden rounded-full bg-[var(--blyss-border)]">
          <div
            className="h-full rounded-full bg-[var(--color-primary)] transition-[width] duration-300 ease-out"
            style={{ width: i < current ? '100%' : '0%' }}
          />
        </div>
      ))}
    </div>
  );
}
