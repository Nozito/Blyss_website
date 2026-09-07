'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, CalendarX, Clock } from 'lucide-react';
import { toLocalDateStr, formatDuration } from '@/lib/blyss/format';

export interface Slot {
  id: number;
  time: string;
  duration: number;
  startISO?: string;
}

const MONTH_NAMES = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];
const DAY_NAMES = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];

interface Props {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  availableDates: Set<string>;
  isLoadingDates: boolean;
  availableSlots: Slot[];
  isLoadingSlots: boolean;
  onMonthChange: (date: Date) => void;
}

function CalendarGrid({
  selectedDate,
  onSelectDate,
  availableDates,
  onMonthChange,
}: Pick<Props, 'selectedDate' | 'onSelectDate' | 'availableDates' | 'onMonthChange'>) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isFirstMonth = () => {
    const firstOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstOfCurrent = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
    return firstOfCurrent <= firstOfMonth;
  };

  const shift = (delta: number) => {
    const next = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + delta);
    setCurrentMonth(next);
    onMonthChange(next);
  };

  const getDays = (): (Date | null)[] => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDayJS = new Date(year, month, 1).getDay();
    const startOffset = firstDayJS === 0 ? 0 : firstDayJS - 1;
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days: (Date | null)[] = Array(startOffset).fill(null);
    for (let d = 1; d <= lastDate; d++) {
      const date = new Date(year, month, d);
      if (date.getDay() !== 0) days.push(date);
    }
    return days;
  };

  const sameDay = (a: Date, b: Date) =>
    a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();

  return (
    <div className="rounded-[20px] bg-white p-5 shadow-[var(--shadow-card)]">
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          onClick={() => shift(-1)}
          disabled={isFirstMonth()}
          aria-label="Mois précédent"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-cream)] disabled:opacity-30"
        >
          <ChevronLeft size={18} className="text-[var(--blyss-text)]" />
        </button>
        <span className="text-[15px] font-bold text-[var(--blyss-text)]">
          {MONTH_NAMES[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </span>
        <button
          type="button"
          onClick={() => shift(1)}
          aria-label="Mois suivant"
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-cream)]"
        >
          <ChevronRight size={18} className="text-[var(--blyss-text)]" />
        </button>
      </div>

      <div className="mb-2 grid grid-cols-6">
        {DAY_NAMES.map((d) => (
          <span key={d} className="text-center text-[11px] font-semibold text-[var(--blyss-muted)]">
            {d}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-6 gap-y-1">
        {getDays().map((date, i) => {
          if (!date) return <div key={`e-${i}`} />;
          const past = date < today;
          const available = availableDates.has(toLocalDateStr(date));
          const selected = selectedDate != null && sameDay(date, selectedDate);
          const isToday = sameDay(date, today);
          const selectable = !past && available;

          return (
            <div key={date.toISOString()} className="flex flex-col items-center">
              <button
                type="button"
                disabled={!selectable}
                onClick={() => selectable && onSelectDate(new Date(date))}
                className="flex h-9 w-9 items-center justify-center rounded-full text-[13px] font-semibold"
                style={{
                  backgroundColor: selected ? 'var(--color-primary)' : 'transparent',
                  border: isToday && !selected ? '2px solid var(--color-primary)' : 'none',
                  color: selected ? '#fff' : past ? 'var(--blyss-muted)' : 'var(--blyss-text)',
                  opacity: past || !available ? 0.3 : 1,
                  cursor: selectable ? 'pointer' : 'default',
                }}
              >
                {date.getDate()}
              </button>
              <span
                className="mt-0.5 h-1 w-1 rounded-full"
                style={{ backgroundColor: available && !selected ? 'var(--color-primary)' : 'transparent' }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DateTimeSelector({
  selectedDate,
  onSelectDate,
  selectedTime,
  onSelectTime,
  availableDates,
  isLoadingDates,
  availableSlots,
  isLoadingSlots,
  onMonthChange,
}: Props) {
  return (
    <div className="flex flex-col gap-5 pb-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-[26px] font-extrabold tracking-tight text-[var(--blyss-text)]">Quand ?</h1>
        <p className="text-sm text-[var(--blyss-muted)]">
          Choisis la date et l&apos;horaire qui t&apos;arrangent
        </p>
      </header>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-[var(--color-primary)]" />
          <span className="text-[15px] font-semibold text-[var(--blyss-text)]">Date</span>
        </div>
        <CalendarGrid
          selectedDate={selectedDate}
          onSelectDate={onSelectDate}
          availableDates={availableDates}
          onMonthChange={onMonthChange}
        />
        {!isLoadingDates && availableDates.size === 0 && (
          <div className="flex items-center gap-2.5 rounded-2xl bg-[var(--color-cream)] p-3.5">
            <CalendarX size={18} className="text-[var(--blyss-muted)]" />
            <p className="flex-1 text-xs leading-[17px] text-[var(--blyss-muted)]">
              Aucune disponibilité ce mois-ci pour cette pro. Essaie un autre mois ou reviens un peu
              plus tard.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Clock size={18} className="text-[var(--color-primary)]" />
          <span className="text-[15px] font-semibold text-[var(--blyss-text)]">Horaire</span>
        </div>

        {isLoadingSlots ? (
          <div className="flex justify-center py-8">
            <span className="h-6 w-6 animate-spin rounded-full border-2 border-[var(--color-primary)] border-t-transparent" />
          </div>
        ) : availableSlots.length === 0 ? (
          <div className="rounded-2xl border border-[var(--blyss-border)] bg-white py-8 text-center text-[13px] text-[var(--blyss-muted)]">
            {selectedDate ? 'Aucun créneau disponible pour cette date' : "Sélectionne d'abord une date"}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2.5">
            {availableSlots.map((slot) => {
              const active = selectedTime === slot.time;
              return (
                <button
                  key={slot.id}
                  type="button"
                  onClick={() => onSelectTime(slot.time)}
                  className="flex flex-col items-center gap-0.5 rounded-2xl px-4 py-3.5 shadow-[var(--shadow-card)]"
                  style={{
                    backgroundColor: active ? 'var(--color-primary)' : '#fff',
                    border: active ? 'none' : '1px solid var(--blyss-border)',
                  }}
                >
                  <span
                    className="text-[17px] font-extrabold leading-5"
                    style={{ color: active ? '#fff' : 'var(--blyss-text)' }}
                  >
                    {slot.time}
                  </span>
                  <span
                    className="text-[11px] font-medium"
                    style={{ color: active ? 'rgba(255,255,255,0.75)' : 'var(--blyss-muted)' }}
                  >
                    {formatDuration(slot.duration)}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
