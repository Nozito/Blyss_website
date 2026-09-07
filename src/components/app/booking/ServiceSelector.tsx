import { Check, X, Clock, Sparkles, ShieldCheck } from 'lucide-react';
import type { ConditionItem, Prestation } from '@/lib/blyss/api';
import { formatDuration, formatPrice } from '@/lib/blyss/format';

interface Props {
  prestations: Prestation[];
  selectedId: number | null;
  onSelect: (id: number) => void;
  proName: string;
  proCity: string | null;
  conditions: ConditionItem[] | null;
}

export function ServiceSelector({
  prestations,
  selectedId,
  onSelect,
  proName,
  proCity,
  conditions,
}: Props) {
  const activeConditions = (conditions ?? []).filter((c) => c.text.trim());

  return (
    <div className="flex flex-col gap-5 pb-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-[26px] font-extrabold tracking-tight text-[var(--blyss-text)]">
          Choisis ta prestation
        </h1>
        <p className="text-sm text-[var(--blyss-muted)]">
          Avec {proName}
          {proCity ? ` à ${proCity}` : ''}
        </p>
      </header>

      {activeConditions.length > 0 && (
        <div className="flex flex-col gap-3 rounded-[20px] bg-white p-4 shadow-[var(--shadow-card)]">
          <div className="flex items-center gap-2">
            <ShieldCheck size={15} className="text-[var(--blyss-muted)]" />
            <span className="text-[13px] font-bold text-[var(--blyss-text)]">
              Conditions de réservation
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {activeConditions.map((c, i) => (
              <div
                key={i}
                className="flex items-center gap-3 rounded-xl border px-3 py-2.5"
                style={{
                  backgroundColor: c.accepted ? '#f0fdf4' : '#fef2f2',
                  borderColor: c.accepted ? '#bbf7d0' : 'rgba(239,68,68,0.3)',
                }}
              >
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                  style={{ backgroundColor: c.accepted ? '#22c55e' : '#ef4444' }}
                >
                  {c.accepted ? <Check size={11} /> : <X size={11} />}
                </span>
                <span
                  className="flex-1 text-xs font-medium leading-[18px]"
                  style={{ color: c.accepted ? '#15803d' : '#dc2626' }}
                >
                  {c.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {prestations.map((p) => {
          const isSelected = selectedId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p.id)}
              className="flex items-center gap-4 rounded-[20px] border-2 bg-white p-5 text-left shadow-[var(--shadow-card)] transition-colors"
              style={{ borderColor: isSelected ? 'var(--color-primary)' : 'var(--blyss-border)' }}
            >
              <div className="flex-1">
                <p className="mb-1 text-[15px] font-semibold text-[var(--blyss-text)]">{p.name}</p>
                {p.description && (
                  <p className="mb-2 line-clamp-2 text-xs leading-[18px] text-[var(--blyss-muted)]">
                    {p.description}
                  </p>
                )}
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 text-xs text-[var(--blyss-muted)]">
                    <Clock size={14} className="text-[var(--color-primary)]" />
                    {formatDuration(p.duration_minutes)}
                  </span>
                  <span className="flex items-center gap-1.5 text-[13px] font-bold text-[var(--blyss-text)]">
                    <Sparkles size={14} className="text-[var(--color-primary)]" />
                    {formatPrice(p.price)}
                  </span>
                </div>
              </div>
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full"
                style={{ backgroundColor: isSelected ? 'var(--color-primary)' : 'var(--color-cream)' }}
              >
                {isSelected && <Check size={14} className="text-white" />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
