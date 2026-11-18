'use client';

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { cn } from '@/lib/utils';

interface FormState {
  name: string;
  phone: string;
  comment: string;
  consent: boolean;
}

type Errors = Partial<Record<keyof FormState, string>>;

const INITIAL: FormState = { name: '', phone: '', comment: '', consent: false };

function validate(values: FormState): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = 'Укажите имя (минимум 2 символа)';
  const digits = values.phone.replace(/\D/g, '');
  if (digits.length < 10) errors.phone = 'Телефон в формате +7 (XXX) XXX-XX-XX';
  if (values.comment.length > 500) errors.comment = 'Не больше 500 символов';
  if (!values.consent) errors.consent = 'Нужно согласие на обработку данных';
  return errors;
}

/** Простая маска для российского номера. */
function formatPhone(raw: string): string {
  let digits = raw.replace(/\D/g, '');
  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`;
  if (!digits.startsWith('7')) digits = `7${digits}`;
  digits = digits.slice(0, 11);
  const [, a = '', b = '', c = '', d = ''] = digits.match(/^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/) ?? [];
  let out = '+7';
  if (a) out += ` (${a}`;
  if (a.length === 3) out += ')';
  if (b) out += ` ${b}`;
  if (c) out += `-${c}`;
  if (d) out += `-${d}`;
  return out;
}

interface AppointmentFormProps {
  className?: string;
  /** Компактный вариант для сайдбара (тёмная секция). */
  tone?: 'light' | 'dark';
}

/**
 * Форма записи: client-side валидация, без бэкенда.
 * TODO: подключить API (Route Handler / CMS-вебхук) и анти-спам.
 */
export default function AppointmentForm({ className, tone = 'light' }: AppointmentFormProps) {
  const [values, setValues] = useState<FormState>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      if (touched[key]) setErrors(validate(next));
      return next;
    });
  };

  const blur = (key: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [key]: true }));
    setErrors(validate(values));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    setTouched({ name: true, phone: true, comment: true, consent: true });
    if (Object.keys(nextErrors).length > 0) return;

    setStatus('sending');
    // TODO: подключить реальный API приёма заявок.
    // await fetch('/api/appointment', { method: 'POST', body: JSON.stringify(values) });
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus('sent');
    setValues(INITIAL);
    setTouched({});
  };

  const dark = tone === 'dark';
  const labelClass = cn('text-[0.75rem] font-medium', dark ? 'text-canvas/70' : 'text-muted');
  const fieldClass = dark
    ? 'w-full rounded-2xl border border-canvas/15 bg-canvas/[0.06] px-4 py-3.5 text-[0.9375rem] text-canvas outline-none transition duration-200 placeholder:text-canvas/35 hover:border-canvas/30 focus:border-mint/60 focus:bg-canvas/10 focus:ring-4 focus:ring-mint/20'
    : 'field';

  if (status === 'sent') {
    return (
      <div
        className={cn(
          'flex flex-col items-start gap-4 rounded-[1.5rem] border p-7',
          dark ? 'border-mint/30 bg-mint/10 text-canvas' : 'border-forest/15 bg-mint-soft/60 text-ink',
          className,
        )}
        role="status"
        aria-live="polite"
      >
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-forest text-canvas">
          <Icon name="check" className="h-6 w-6" />
        </span>
        <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">Заявка отправлена</h3>
        <p className={cn('text-sm', dark ? 'text-canvas/70' : 'text-ink-soft/80')}>
          Это демонстрационная форма. В рабочей версии заявка уйдёт в клинику, и администратор
          перезвонит, чтобы подтвердить время приёма.
        </p>
        <Button variant={dark ? 'light' : 'secondary'} onClick={() => setStatus('idle')}>
          Отправить ещё одну
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className={cn('flex flex-col gap-5', className)}
      aria-label="Форма записи на приём"
    >
      <div className="flex flex-col gap-2">
        <label htmlFor="appointment-name" className={labelClass}>
          Имя <span className="text-amber">*</span>
        </label>
        <input
          id="appointment-name"
          name="name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={(event) => update('name', event.target.value)}
          onBlur={() => blur('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'appointment-name-error' : undefined}
          placeholder="Как к вам обращаться"
          className={fieldClass}
        />
        {errors.name ? (
          <p id="appointment-name-error" className="text-xs text-[rgb(var(--danger))]">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="appointment-phone" className={labelClass}>
          Телефон <span className="text-amber">*</span>
        </label>
        <input
          id="appointment-phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          value={values.phone}
          onChange={(event) => update('phone', formatPhone(event.target.value))}
          onBlur={() => blur('phone')}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? 'appointment-phone-error' : undefined}
          placeholder="+7 (___) ___-__-__"
          className={fieldClass}
        />
        {errors.phone ? (
          <p id="appointment-phone-error" className="text-xs text-[rgb(var(--danger))]">
            {errors.phone}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="appointment-comment" className={labelClass}>
          Комментарий
        </label>
        <textarea
          id="appointment-comment"
          name="comment"
          rows={3}
          value={values.comment}
          onChange={(event) => update('comment', event.target.value)}
          onBlur={() => blur('comment')}
          aria-invalid={Boolean(errors.comment)}
          aria-describedby={errors.comment ? 'appointment-comment-error' : undefined}
          placeholder="Что беспокоит, удобное время"
          className={cn(fieldClass, 'resize-none')}
        />
        {errors.comment ? (
          <p id="appointment-comment-error" className="text-xs text-[rgb(var(--danger))]">
            {errors.comment}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label className={cn('flex cursor-pointer items-start gap-3', labelClass)}>
          <input
            type="checkbox"
            name="consent"
            checked={values.consent}
            onChange={(event) => update('consent', event.target.checked)}
            onBlur={() => blur('consent')}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'appointment-consent-error' : undefined}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-ink/25 text-forest accent-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
          />
          <span>
            Согласен на обработку персональных данных в соответствии с{' '}
            <a href="/privacy" className={cn('underline decoration-dotted', dark ? 'text-mint' : 'text-forest')}>
              политикой конфиденциальности
            </a>
            .
          </span>
        </label>
        {errors.consent ? (
          <p id="appointment-consent-error" className="text-xs text-[rgb(var(--danger))]">
            {errors.consent}
          </p>
        ) : null}
      </div>

      <Button
        type="submit"
        size="lg"
        fullWidth
        variant={dark ? 'light' : 'primary'}
        loading={status === 'sending'}
        trailing={status === 'sending' ? undefined : <Icon name="arrow-right" className="h-4 w-4" />}
      >
        {status === 'sending' ? 'Отправляем…' : 'Отправить заявку'}
      </Button>

      <p className={cn('text-[0.6875rem] leading-relaxed', dark ? 'text-canvas/45' : 'text-muted')}>
        {/* TODO: подключить API приёма заявок и защиту от спама */}
        Демонстрационная форма: данные не отправляются. Нажимая кнопку, вы подтверждаете, что
        ознакомились с политикой конфиденциальности.
      </p>
    </form>
  );
}
