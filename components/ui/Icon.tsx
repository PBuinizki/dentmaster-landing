import { createElement, type ComponentProps, type SVGProps } from 'react';
import type { IconName } from '@/data/types';
import { cn } from '@/lib/utils';

/**
 * Единая SVG-иконка. Никаких эмодзи и шрифтовых иконок.
 * Все paths — 24×24, currentColor, поэтому иконка наследует цвет и размер
 * через классы (h-5 w-5 text-mint). Декоративные иконки получают aria-hidden,
 * смысловые — вы можете передать role="img" и <title>.
 */
type SvgAttrs = SVGProps<SVGSVGElement>;

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
} as const;

const icons: Record<IconName, (props: SvgAttrs) => JSX.Element> = {
  phone: (p) => (
    <svg {...base} {...p}>
      <path d="M4.2 5.6c0-1 .8-1.8 1.8-1.8h1.7c.8 0 1.5.5 1.7 1.3l.7 2.6a1.8 1.8 0 0 1-.5 1.8l-1 .9a12.6 12.6 0 0 0 5.7 5.7l.9-1a1.8 1.8 0 0 1 1.8-.5l2.6.7c.8.2 1.3.9 1.3 1.7v1.7c0 1-.8 1.8-1.8 1.8h-.6C11.4 20.5 3.5 12.6 3.5 5.6Z" />
    </svg>
  ),
  'map-pin': (p) => (
    <svg {...base} {...p}>
      <path d="M12 21s6.5-5.4 6.5-10.5a6.5 6.5 0 1 0-13 0C5.5 15.6 12 21 12 21Z" />
      <circle cx="12" cy="10.4" r="2.4" />
    </svg>
  ),
  clock: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="12" r="8.4" />
      <path d="M12 7.6V12l3 1.8" />
    </svg>
  ),
  calendar: (p) => (
    <svg {...base} {...p}>
      <rect x="3.6" y="5.4" width="16.8" height="14.4" rx="2.4" />
      <path d="M3.6 9.8h16.8M8.2 3.6v3.2M15.8 3.6v3.2" />
      <path d="M8.4 13.6h2M13.6 13.6h2M8.4 16.6h2" />
    </svg>
  ),
  'arrow-right': (p) => (
    <svg {...base} {...p}>
      <path d="M4.5 12h15M13.5 6l6 6-6 6" />
    </svg>
  ),
  'arrow-left': (p) => (
    <svg {...base} {...p}>
      <path d="M19.5 12h-15M10.5 6l-6 6 6 6" />
    </svg>
  ),
  'arrow-up-right': (p) => (
    <svg {...base} {...p}>
      <path d="M7 17 17 7M8.6 7H17v8.4" />
    </svg>
  ),
  check: (p) => (
    <svg {...base} {...p}>
      <path d="M4.8 12.6 9.4 17 19.2 7.2" />
    </svg>
  ),
  star: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
      <path d="M12 2.6l2.86 5.9 6.47.9-4.7 4.55 1.13 6.45L12 17.3l-5.76 3.1 1.13-6.45-4.7-4.55 6.47-.9L12 2.6Z" />
    </svg>
  ),
  quote: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
      <path d="M9.6 5.4C6.5 6.8 4.6 9.5 4.6 13v5.6h6.2V12H7.5c.1-1.9 1.1-3.3 3-4.2L9.6 5.4Zm9.1 0c-3.1 1.4-5 4.1-5 7.6v5.6h6.2V12h-3.3c.1-1.9 1.1-3.3 3-4.2l-.9-2.4Z" />
    </svg>
  ),
  menu: (p) => (
    <svg {...base} {...p}>
      <path d="M4 7.5h16M4 12h16M4 16.5h10" />
    </svg>
  ),
  close: (p) => (
    <svg {...base} {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  ),
  plus: (p) => (
    <svg {...base} {...p}>
      <path d="M12 5.5v13M5.5 12h13" />
    </svg>
  ),
  'chevron-down': (p) => (
    <svg {...base} {...p}>
      <path d="M6 9.5 12 15.5 18 9.5" />
    </svg>
  ),
  mail: (p) => (
    <svg {...base} {...p}>
      <rect x="3.4" y="5.6" width="17.2" height="12.8" rx="2.6" />
      <path d="M4.4 7.4 12 13l7.6-5.6" />
    </svg>
  ),
  route: (p) => (
    <svg {...base} {...p}>
      <circle cx="6.4" cy="18.4" r="2.4" />
      <circle cx="17.6" cy="5.6" r="2.4" />
      <path d="M6.4 16V11a3.6 3.6 0 0 1 3.6-3.6h2.2A3 3 0 0 0 15.2 4.4" />
      <path d="M17.6 8v5a3.6 3.6 0 0 1-3.6 3.6h-2.2" />
    </svg>
  ),
  sparkles: (p) => (
    <svg {...base} {...p}>
      <path d="M12 3.6l1.7 4.6 4.7 1.8-4.7 1.8L12 16.4l-1.7-4.6L5.6 10l4.7-1.8L12 3.6Z" />
      <path d="M18.4 15.4l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
    </svg>
  ),
  tooth: (p) => (
    <svg {...base} {...p}>
      <path d="M7.6 3.6c1.6 0 2.6.9 4.4.9s2.8-.9 4.4-.9c2 0 3.2 1.5 3.2 3.7 0 1.9-.6 3.1-1.1 4.6-.5 1.5-.7 2.6-.9 4.3-.2 2.2-.6 4.2-2 4.2-1.4 0-1.6-1.9-1.9-3.9-.2-1.6-.5-2.9-1.7-2.9s-1.5 1.3-1.7 2.9c-.3 2-.5 3.9-1.9 3.9-1.4 0-1.8-2-2-4.2-.2-1.7-.4-2.8-.9-4.3-.5-1.5-1.1-2.7-1.1-4.6 0-2.2 1.2-3.7 3.2-3.7Z" />
    </svg>
  ),
  implant: (p) => (
    <svg {...base} {...p}>
      <path d="M8.4 3.6h7.2c1 0 1.7.9 1.5 1.9l-.5 2.4H7.4l-.5-2.4c-.2-1 .5-1.9 1.5-1.9Z" />
      <path d="M9.6 7.9h4.8v2.4H9.6zM10.4 13.1h3.2l-.4 2.4h-2.4zM11.2 18.3h1.6l-.3 2.1h-1z" />
      <path d="M7.9 5.9h8.2" />
    </svg>
  ),
  crown: (p) => (
    <svg {...base} {...p}>
      <path d="M4.6 17.4 3.2 7.6l4.9 3.3L12 5.2l3.9 5.7 4.9-3.3-1.4 9.8Z" />
      <path d="M4.6 20.4h14.8" />
    </svg>
  ),
  surgery: (p) => (
    <svg {...base} {...p}>
      <path d="M14.8 4.6 19.4 9.2M13.4 6l4.6 4.6" />
      <path d="M16.4 11.6 9.6 18.4a2.6 2.6 0 0 1-3.7 0l-1.3-1.3a2.6 2.6 0 0 1 0-3.7l6.8-6.8" />
      <path d="M4.4 4.4l3.2 3.2" />
    </svg>
  ),
  child: (p) => (
    <svg {...base} {...p}>
      <circle cx="12" cy="7.4" r="3.2" />
      <path d="M6.4 20.4c0-3.1 2.5-5.6 5.6-5.6s5.6 2.5 5.6 5.6" />
      <path d="M6.2 12.6c-1.4.6-2.2 1.9-2.2 3.4M17.8 12.6c1.4.6 2.2 1.9 2.2 3.4" />
    </svg>
  ),
  aligner: (p) => (
    <svg {...base} {...p}>
      <path d="M3.2 9.4c2.9-2 5.7-3 8.8-3s5.9 1 8.8 3" />
      <path d="M4.6 9.6c0 5 3.3 9 7.4 9s7.4-4 7.4-9" />
      <path d="M7.6 8.9v5M11 8.2v6.4M14.4 8.2v6.4M17.8 8.9v5" opacity=".75" />
    </svg>
  ),
  aesthetics: (p) => (
    <svg {...base} {...p}>
      <path d="M6 4.4h12M12 4.4v8" />
      <path d="M12 12.4c-2.4 0-4.4 2-4.4 4.4S9.6 21 12 21s4.4-1.8 4.4-4.2-2-4.4-4.4-4.4Z" />
      <path d="M9.4 16.8h5.2" opacity=".7" />
    </svg>
  ),
  shield: (p) => (
    <svg {...base} {...p}>
      <path d="M12 3.2 19 6v5.4c0 4.2-2.9 7.6-7 9.4-4.1-1.8-7-5.2-7-9.4V6l7-2.8Z" />
      <path d="m8.8 11.8 2.2 2.2 4.2-4.4" />
    </svg>
  ),
  scan: (p) => (
    <svg {...base} {...p}>
      <path d="M4 8.4V6.4A2.4 2.4 0 0 1 6.4 4h2M15.6 4h2A2.4 2.4 0 0 1 20 6.4v2M20 15.6v2a2.4 2.4 0 0 1-2.4 2.4h-2M8.4 20h-2A2.4 2.4 0 0 1 4 17.6v-2" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  ),
  feather: (p) => (
    <svg {...base} {...p}>
      <path d="M19.4 4.6a4.6 4.6 0 0 0-6.5 0L4.6 12.9V19.4h6.5l8.3-8.3a4.6 4.6 0 0 0 0-6.5Z" />
      <path d="M4.6 19.4 12 12M13.6 8.2l2.2 2.2" />
    </svg>
  ),
  'badge-check': (p) => (
    <svg {...base} {...p}>
      <path d="M12 3.2l2.2 1.6 2.7-.3 1 2.5 2.3 1.5-.6 2.7.6 2.7-2.3 1.5-1 2.5-2.7-.3L12 20.8l-2.2-1.6-2.7.3-1-2.5-2.3-1.5.6-2.7-.6-2.7L6.1 7l1-2.5 2.7.3L12 3.2Z" />
      <path d="m9.2 12.2 2 2 3.6-3.8" />
    </svg>
  ),
  users: (p) => (
    <svg {...base} {...p}>
      <circle cx="9.4" cy="8.6" r="3.2" />
      <path d="M3.6 19.4c0-3 2.6-5.4 5.8-5.4s5.8 2.4 5.8 5.4" />
      <path d="M16 5.8a3.2 3.2 0 0 1 0 6.2M17.4 14.4c1.8.6 3 2.2 3 4.2" />
    </svg>
  ),
  wallet: (p) => (
    <svg {...base} {...p}>
      <rect x="3.2" y="6.4" width="17.6" height="12.4" rx="2.8" />
      <path d="M3.2 10.4h17.6M16.2 14.8h1.6" />
    </svg>
  ),
  microscope: (p) => (
    <svg {...base} {...p}>
      <path d="M7 20.4h13" />
      <path d="M10.4 20.4a6.2 6.2 0 0 0 5-9.8" />
      <path d="M9.6 4.2 6.4 7.4l3.6 3.6 3.2-3.2-3.6-3.6Z" />
      <path d="m8.2 10.8-2 2 2.4 2.4 2-2" />
    </svg>
  ),
  heart: (p) => (
    <svg {...base} {...p}>
      <path d="M12 20s-7.4-4.6-7.4-9.4A4.2 4.2 0 0 1 12 7.9a4.2 4.2 0 0 1 7.4 2.7C19.4 15.4 12 20 12 20Z" />
    </svg>
  ),
  external: (p) => (
    <svg {...base} {...p}>
      <path d="M13.4 4.6h6v6M19.4 4.6 11 13" />
      <path d="M18 14.4v3.8a2.2 2.2 0 0 1-2.2 2.2H5.8a2.2 2.2 0 0 1-2.2-2.2V8.2A2.2 2.2 0 0 1 5.8 6h3.8" />
    </svg>
  ),
  telegram: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
      <path d="M21.1 4.3 18 19.6c-.2 1-.9 1.3-1.7.8l-4.6-3.4-2.2 2.1c-.3.3-.5.5-1 .5l.4-4.7 8.5-7.7c.4-.3-.1-.5-.6-.2L6.3 12.6 1.9 11.2c-1-.3-1-1 .2-1.4l17.6-6.8c.8-.3 1.5.2 1.4 1.3Z" />
    </svg>
  ),
  whatsapp: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
      <path d="M12 2.4a9.5 9.5 0 0 0-8.1 14.4L2.4 21.6l4.9-1.3A9.5 9.5 0 1 0 12 2.4Zm0 17.1a7.6 7.6 0 0 1-3.9-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A7.6 7.6 0 1 1 12 19.5Zm4.3-5.6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.8.9c-.1.2-.3.2-.5.1a6.2 6.2 0 0 1-1.8-1.1 6.8 6.8 0 0 1-1.2-1.6c-.1-.2 0-.3.1-.4l.5-.6c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.6.6 2.6.7 3.4.6.5-.1 1.4-.6 1.6-1.2.2-.6.2-1.1.1-1.2 0-.1-.2-.2-.5-.4Z" />
    </svg>
  ),
  yandex: (p) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" {...p}>
      <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm12.6-5.6-3.4 4.1 3.8 5.9h-1.9l-2.9-4.7-1.5 1.8v2.9H8.2V6.4h1.5v5.4l4-5.4h1.9Z" />
    </svg>
  ),
};

export interface IconProps extends Omit<ComponentProps<'svg'>, 'children'> {
  name: IconName;
  /** Смысловая иконка: снимает aria-hidden, добавляет role="img". */
  title?: string;
}

export function Icon({ name, title, className, ...props }: IconProps) {
  const render = icons[name];
  const decorative = !title;
  return createElement(render, {
    className: cn('h-5 w-5 shrink-0', className),
    role: decorative ? undefined : 'img',
    'aria-hidden': decorative ? true : undefined,
    'aria-label': title,
    ...props,
  });
}

export const iconNames = Object.keys(icons) as IconName[];
