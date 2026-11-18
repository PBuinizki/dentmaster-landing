import type { Metadata } from 'next';
import { clinic } from '@/data/clinic';

export const metadata: Metadata = {
  title: 'Политика конфиденциальности',
  description: 'Как клиника «ДентМастер» обрабатывает персональные данные посетителей сайта.',
  robots: { index: false, follow: true },
};

/** Страница политики конфиденциальности (статическая, обязательна для формы). */
export default function PrivacyPage() {
  return (
    <section className="container-page pb-20 pt-[calc(var(--header-height)+2.5rem)] sm:pb-24 sm:pt-[calc(var(--header-height)+4rem)]">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow">Документы</p>
        <h1 className="h2 mt-4 sm:mt-5">Политика конфиденциальности</h1>
        <p className="mt-4 text-sm text-muted sm:mt-5">
          {/* TODO: заменить на юридически выверенный текст перед публикацией */}
          Черновик документа. Перед запуском сайта текст согласуется с юристом клиники.
        </p>

        <div className="mt-8 space-y-6 text-[1rem] leading-[1.75] text-ink-soft/85 sm:mt-10 sm:text-[1.0625rem]">
          <div>
            <h2 className="h3">1. Общие положения</h2>
            <p className="mt-3">
              Настоящая политика описывает, как {clinic.legalName} обрабатывает персональные данные,
              которые посетитель передаёт через форму записи на приём на этом сайте.
            </p>
          </div>
          <div>
            <h2 className="h3">2. Какие данные мы собираем</h2>
            <p className="mt-3">
              Имя, номер телефона и комментарий к заявке. Иных данных автоматически мы не собираем;
              аналитика подключается только после согласования.
            </p>
          </div>
          <div>
            <h2 className="h3">3. Контакты</h2>
            <p className="mt-3">
              Вопросы по обработке данных: {clinic.contacts.phone}, {clinic.address.full}.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
