# ДентМастер — сайт-визитка стоматологии (Next.js, SSG)

Премиальный лендинг для стоматологической клиники «ДентМастер» (Орёл, ул. Пушкина, 24).
Данные взяты из публичной карточки на Яндекс.Картах, всё неподтверждённое помечено `// TODO`.

**Стек:** Next.js 14.2 (App Router) · TypeScript strict · Tailwind CSS 3.4 · Framer Motion · next/font (Manrope + Golos Text) · sharp (генерация WebP-графики).

---

## Быстрый старт

```bash
npm install
npm run dev        # http://localhost:3000
```

```bash
npm run build      # SSG-сборка
npm run start      # прод-сервер на готовом HTML
npm run lint
npm run typecheck
npm run prepare:images   # перегенерирует /public/images/*.webp
```

Node.js ≥ 18.17.

---

## SSG: как это работает

- `app/page.tsx` — `export const dynamic = 'force-static'` + `revalidate`. Страница рендерится на билде и отдаётся готовым HTML.
- `lib/content.ts` — единственная точка доступа к данным (`getClinic()`). Сейчас отдаёт статический объект, но интерфейс `Promise<Clinic>` уже асинхронный.
- Вывод `next build` подтверждает режим:

```
┌ ○ /            20.9 kB   153 kB
├ ○ /privacy
├ ○ /icon.svg
├ ○ /robots.txt
└ ○ /sitemap.xml
○  (Static)  prerendered as static content
```

### Переезд на Headless CMS

1. В `lib/content.ts` раскомментируйте `fetch` к Strapi/Sanity/Contentful и добавьте маппер `CmsResponse → Clinic`.
2. `generateStaticParams` для мультиклинических сборок: `getClinicSlugs()` уже есть.
3. Компоненты работают с типами из `data/types.ts` — переписывать вёрстку не нужно.

---

## Структура

```
app/
  layout.tsx        шрифты, metadata, JSON-LD, Header/Footer
  page.tsx          сборка секций, force-static
  privacy/page.tsx  политика конфиденциальности (заглушка-черновик)
  globals.css       токены палитры/типографики, утилиты
  sitemap.ts, robots.ts, icon.svg
components/
  layout/   Header, MobileMenu, Footer
  sections/ Hero, About, Services, Doctors, Advantages, Reviews, Contacts
  forms/    AppointmentForm (client-валидация)
  ui/       Button, Card, Section, Icon, RevealOnScroll, AnimatedCounter,
            Logo (+StarRating, OpenStatus), OpenStatusBadge, MotionExtras
data/
  types.ts    контракт Clinic, Service, Doctor, Review, Advantage…
  clinic.ts   единый источник контента
lib/
  content.ts  слой данных (CMS-ready)
  seo.ts      metadata + JSON-LD Dentist
  schedule.ts расчёт «открыто/закрыто» по расписанию
  utils.ts    cn, tel:, цены, SITE_URL
scripts/
  prepare-images.mjs  генерация абстрактных WebP-плейсхолдеров
public/images/        hero-art, about-art, clinic-art, doctor-1..3
```

---

## Дизайн-система

| Токен        | Значение            | Роль                       |
| ------------ | ------------------- | -------------------------- |
| `--canvas`   | `#FAF9F7`           | тёплый off-white фон       |
| `--ink`      | `#0F172A`           | заголовки, текст           |
| `--forest`   | `#1A3D36`           | основной акцент (CTA)      |
| `--mint`     | `#A8D5BA`           | второй акцент              |
| `--sand`     | `#E7E1D8`           | подложки секций            |
| `--amber`    | `#BE9461`           | рейтинг / предупреждения   |

Палитра из шести связанных оттенков (тёплый белый → графит → лесной зелёный → мята → песок → янтарь)
даёт «медицинскую» чистоту и при этом дорогое, не корпоративное звучание. Зелёный + мята выглядят
дороже стандартной медицинской «голубизны» и хорошо контрастируют с тёплым фоном.

- Типографика: Manrope (display) + Golos Text (body), `clamp()`-заголовки, body 16–17px, line-height 1.65–1.75.
- Радиусы 1.5–2.75rem, hairline-бордеры `ink/8%`, многослойные тени `shadow-soft/lift/float`.
- Арка как повторяющийся визуальный код (изображения, карточки врачей).
- Анимации: `RevealOnScroll` (fade + up, stagger 60–80 ms), hover-подъём карточек, `TiltCard`, `AnimatedCounter`, статус-точка. Все уважают `prefers-reduced-motion`.

---

## Доступность

- Семантические `section` + `aria-labelledby`, один `h1`, без пропусков уровней.
- `alt` у всех изображений, `aria-label` у иконочных кнопок, `aria-expanded/controls` у burger.
- Skip-link, `:focus-visible` везде, ошибки формы связаны через `aria-describedby` + `aria-invalid`.
- Контраст текста ≥ 4.5:1.

---

## SEO

- `generateMetadata` + `defaultMetadata` (canonical, OG, Twitter, robots).
- JSON-LD `Dentist`: адрес, телефон, `geo`, `openingHoursSpecification`, `aggregateRating`, врачи, услуги.
- `app/sitemap.ts`, `app/robots.ts` — статические файлы на билде.
- Задайте домен: `NEXT_PUBLIC_SITE_URL` (по умолчанию `https://dentmaster-orel.ru`).

---

## TODO перед публикацией

- [ ] Подтвердить график работы (сейчас Пн–Пт 09:00–14:00 из открытых источников).
- [ ] Заменить e-mail, Telegram, добавить ОГРН и номер лицензии.
- [ ] Уточнить команду врачей и подставить реальные фото (сейчас графические плейсхолдеры).
- [ ] Сверить цифры в блоке «О клинике» (пациенты, оборудование).
- [ ] Подключить API формы и анти-спам; юридический текст политики.
- [ ] Заменить `og-cover.webp` на финальный кроп 1200×630.
