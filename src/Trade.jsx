import { useEffect, useState } from 'react'
import { phoneHref, whatsappHref, formatPhone } from './phone.js'
import {
  IconPhone,
  IconChat,
  IconPin,
  IconClock,
  IconCamera,
  IconCheck,
  IconArrow,
  ServiceIcon,
  Stars,
} from './icons.jsx'

const STEP_ICONS = [IconPhone, IconCamera, IconCheck, IconPin]

function TradeForm({ copy }) {
  const [sent, setSent] = useState(false)
  const [urgent, setUrgent] = useState('no')

  function onSubmit(event) {
    event.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="rounded-lg bg-white p-6 shadow-sm sm:p-10" role="status">
        <p className="font-display text-3xl text-navy">Richiesta registrata in anteprima.</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Il modulo è dimostrativo e non ha inviato dati a un server. Per confermare, chiama o scrivi su
          WhatsApp.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg bg-white p-6 shadow-sm sm:p-10" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        {copy.formFields.map((field) => (
          <label key={field.name} className={field.span === 2 ? 'sm:col-span-2' : undefined}>
            <span className="block text-sm font-semibold text-navy">
              {field.label}
              {field.required ? ' *' : ''}
            </span>
            {field.type === 'select' ? (
              <select
                name={field.name}
                required={Boolean(field.required)}
                className="mt-2 min-h-11 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base text-navy"
                defaultValue=""
              >
                <option value="" disabled>
                  Seleziona
                </option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                name={field.name}
                type={field.type || 'text'}
                required={Boolean(field.required)}
                placeholder={field.placeholder || ''}
                className="mt-2 min-h-11 w-full rounded-lg border border-line bg-white px-3 py-2.5 text-base text-navy placeholder:text-muted"
              />
            )}
          </label>
        ))}
      </div>
      {copy.formUrgency ? (
        <fieldset className="mt-6">
          <legend className="text-sm font-semibold text-navy">{copy.formUrgency.label}</legend>
          <div className="mt-3 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setUrgent('yes')}
              className={`min-h-11 rounded-lg border px-4 py-3 text-sm font-semibold ${
                urgent === 'yes'
                  ? 'border-orange bg-orange text-white'
                  : 'border-orange/40 bg-white text-navy'
              }`}
            >
              {copy.formUrgency.yes}
            </button>
            <button
              type="button"
              onClick={() => setUrgent('no')}
              className={`min-h-11 rounded-lg border px-4 py-3 text-sm font-semibold ${
                urgent === 'no'
                  ? 'border-orange bg-orange/15 text-navy'
                  : 'border-line bg-white text-navy'
              }`}
            >
              {copy.formUrgency.no}
            </button>
          </div>
        </fieldset>
      ) : null}
      <button
        type="submit"
        className="mt-8 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-orange px-8 py-4 text-base font-semibold text-white hover:bg-accent-hover"
      >
        {copy.formSubmit}
        <IconArrow className="h-5 w-5" />
      </button>
      <p className="mt-4 text-xs italic leading-relaxed text-muted">{copy.formDemoNote}</p>
    </form>
  )
}

export default function Trade({ business, copy, palette }) {
  const tel = phoneHref(business.telefono)
  const wa = whatsappHref(business.telefono, copy.whatsappText)
  const phoneLabel = formatPhone(business.telefono)
  const hasRating = Boolean(business.rating && String(business.rating).trim())
  const mapsSrc = copy.address
    ? `https://maps.google.com/maps?q=${encodeURIComponent(copy.address)}&z=16&output=embed`
    : null

  useEffect(() => {
    const root = document.documentElement
    root.lang = 'it'
    root.style.setProperty('--accent', palette.accent)
    root.style.setProperty('--accent-hover', palette.accentHover)
    root.style.setProperty('--accent-soft', palette.accentSoft)
    root.style.setProperty('--ink', palette.ink)
    document.title = copy.seoTitle
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', copy.metaDescription)
    let jsonLd = document.getElementById('local-business-jsonld')
    if (!jsonLd) {
      jsonLd = document.createElement('script')
      jsonLd.id = 'local-business-jsonld'
      jsonLd.type = 'application/ld+json'
      document.head.appendChild(jsonLd)
    }
    const schema = {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: business.nome,
      description: copy.metaDescription,
      telephone: business.telefono || undefined,
      address: {
        '@type': 'PostalAddress',
        streetAddress: business.indirizzo || undefined,
        addressLocality: business.citta || undefined,
        postalCode: business.cap || undefined,
        addressRegion: business.provincia || undefined,
        addressCountry: 'IT',
      },
      url: business.subdomain ? `https://${business.subdomain}/` : undefined,
    }
    if (hasRating && business.recensioni) {
      schema.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: String(business.rating).replace(',', '.'),
        reviewCount: String(business.recensioni).replace(/\./g, ''),
        bestRating: '5',
      }
    }
    jsonLd.textContent = JSON.stringify(schema)
  }, [palette, copy, hasRating, business])

  return (
    <div className="theme-trade min-h-svh bg-white text-[17px] text-navy">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2"
      >
        Vai al contenuto
      </a>

      <header className="sticky top-0 z-40 bg-navy text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
          <a href="#top" className="font-display text-xl tracking-tight text-white no-underline sm:text-2xl">
            {copy.displayName}
          </a>
          {tel ? (
            <a
              href={tel}
              className="inline-flex min-h-11 items-center rounded-lg bg-orange px-5 py-2.5 text-sm font-semibold text-white no-underline hover:bg-accent-hover"
            >
              Chiama
            </a>
          ) : (
            <a
              href="#prenota"
              className="inline-flex min-h-11 items-center rounded-lg bg-orange px-5 py-2.5 text-sm font-semibold text-white no-underline"
            >
              {copy.ctaPrimary}
            </a>
          )}
        </div>
      </header>

      <main id="contenuto">
        <section id="top" className="relative min-h-[85svh] overflow-hidden">
          <img
            src={copy.images.hero}
            alt={copy.heroAlt}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/80" />
          <div className="relative mx-auto flex min-h-[85svh] max-w-6xl flex-col justify-center px-5 py-16 sm:px-8 sm:py-24">
            <p className="eyebrow text-orange">{copy.eyebrow}</p>
            <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] font-extrabold text-white sm:text-6xl lg:text-7xl">
              {copy.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85">{copy.lead}</p>
            {hasRating ? (
              <p className="mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-navy/70 px-4 py-2.5 text-sm text-white">
                <Stars className="text-orange" />
                <span>
                  {business.rating} su Google
                  {copy.reviewsCount ? ` · ${copy.reviewsCount} recensioni` : ''}
                </span>
              </p>
            ) : null}
            {tel ? (
              <div className="mt-10">
                <a href={tel} className="font-display text-4xl font-extrabold text-orange no-underline sm:text-6xl">
                  {phoneLabel.replace('+39 ', '')}
                </a>
                <p className="mt-2 text-sm text-white/70">Tocca il numero per chiamare</p>
              </div>
            ) : null}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              {tel ? (
                <a
                  href={tel}
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-orange px-8 py-4 font-semibold text-white no-underline hover:bg-accent-hover"
                >
                  <IconPhone className="h-5 w-5" />
                  Chiama ora
                </a>
              ) : null}
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white px-8 py-4 font-semibold text-white no-underline hover:bg-white/10"
                >
                  <IconChat className="h-5 w-5" />
                  Scrivi su WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section id="servizi" className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <h2 className="font-display text-4xl text-navy sm:text-5xl">{copy.servicesTitle}</h2>
            <p className="mt-4 max-w-2xl text-muted">{copy.processLead}</p>
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {copy.services.map((item, index) => (
                <li key={item.title} className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-line">
                  <ServiceIcon index={index} className="h-8 w-8 text-orange" />
                  <h3 className="mt-4 text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-grey">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-10 rounded-lg bg-white p-6 shadow-sm sm:p-10 lg:grid-cols-2 lg:items-center">
              <div>
                <p className="eyebrow">{copy.situationalEyebrow}</p>
                <h2 className="mt-4 font-display text-4xl text-navy sm:text-5xl">{copy.situationalTitle}</h2>
                <p className="mt-4 text-muted">{copy.situationalLead}</p>
                <ol className="mt-8 space-y-5">
                  {copy.situationalSteps.map((step, index) => {
                    const Glyph = STEP_ICONS[index % STEP_ICONS.length]
                    return (
                      <li key={step.title} className="flex gap-4">
                        <Glyph className="mt-0.5 h-6 w-6 shrink-0 text-orange" />
                        <div>
                          <p className="font-semibold text-navy">{step.title}</p>
                          <p className="text-sm text-muted">{step.text}</p>
                        </div>
                      </li>
                    )
                  })}
                </ol>
                <p className="mt-6 rounded-lg bg-grey px-4 py-3 text-sm text-muted">{copy.situationalNote}</p>
                {wa ? (
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg bg-orange px-7 py-3.5 font-semibold text-white no-underline hover:bg-accent-hover"
                  >
                    <IconChat className="h-5 w-5" />
                    Scrivi ora su WhatsApp
                  </a>
                ) : null}
              </div>
              <img
                src={copy.images.process}
                alt=""
                className="aspect-[4/5] w-full rounded-lg object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        <section id="consigli" className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center">
            <img
              src={copy.images.edu}
              alt=""
              className="aspect-[4/3] w-full rounded-lg object-cover"
              loading="lazy"
            />
            <div>
              <h2 className="font-display text-4xl text-navy sm:text-5xl">{copy.eduTitle}</h2>
              <p className="mt-4 text-muted">{copy.eduLead}</p>
              <ul className="mt-8 space-y-4">
                {copy.eduItems.slice(0, 4).map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <IconCheck className="mt-0.5 h-6 w-6 shrink-0 text-orange" />
                    <div>
                      <p className="font-semibold text-navy">{item.title}</p>
                      <p className="text-sm text-muted">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-6 rounded-lg bg-grey px-4 py-3 text-sm text-muted">{copy.processNote}</p>
            </div>
          </div>
        </section>

        <section className="bg-navy text-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <h2 className="font-display text-4xl sm:text-5xl">{copy.whyTitle}</h2>
            <ul className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {copy.why.map((item, index) => (
                <li key={item.title}>
                  <ServiceIcon index={index} className="h-8 w-8 text-orange" />
                  <h3 className="mt-4 text-xl font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="prenota" className="bg-grey">
          <div className="mx-auto max-w-3xl px-5 py-16 sm:px-8 sm:py-24">
            <h2 className="text-center font-display text-4xl text-navy sm:text-5xl">{copy.formTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-center text-muted">{copy.formLead}</p>
            <div className="mt-10">
              <TradeForm copy={copy} />
            </div>
          </div>
        </section>

        <section className="bg-grey pb-8">
          <div className="mx-auto max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="font-display text-4xl text-navy sm:text-5xl">Cosa dicono i clienti</h2>
              {hasRating ? (
                <p className="inline-flex items-center gap-2 text-sm text-navy">
                  <Stars className="text-orange" />
                  {business.rating} su Google
                  {copy.reviewsCount ? ` · ${copy.reviewsCount} recensioni` : ''}
                </p>
              ) : null}
            </div>
            <ul className="mt-10 grid gap-4 md:grid-cols-3">
              {copy.reviews.map((review) => (
                <li key={review.name} className="rounded-lg bg-white p-6 shadow-sm">
                  <Stars className="text-orange" />
                  <blockquote className="mt-4 text-sm leading-relaxed text-navy">“{review.quote}”</blockquote>
                  <p className="mt-5 text-sm font-semibold text-navy">{review.name}</p>
                  {review.context ? <p className="text-sm text-muted">{review.context}</p> : null}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-center text-xs text-muted">{copy.reviewsNote}</p>
          </div>
        </section>

        <section id="contatti" className="bg-white">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <h2 className="font-display text-4xl text-navy sm:text-5xl">Orari e contatti</h2>
            <div className="mt-10 grid gap-12 lg:grid-cols-2">
              <div>
                <p className="font-display text-3xl text-navy">{business.nome}</p>
                <p className="mt-3 flex items-start gap-2 text-muted">
                  <IconPin className="mt-1 h-5 w-5 text-orange" />
                  {copy.address}
                </p>
                {tel ? (
                  <a
                    href={tel}
                    className="mt-5 inline-block font-display text-4xl font-extrabold text-navy no-underline"
                  >
                    {phoneLabel.replace('+39 ', '')}
                  </a>
                ) : null}
                <dl className="mt-8 divide-y divide-line text-sm">
                  {copy.hours.map((row) => (
                    <div key={row.day} className="flex justify-between gap-6 py-3">
                      <dt className="font-semibold">{row.day}</dt>
                      <dd className="text-right text-muted">{row.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 flex items-start gap-2 rounded-lg bg-grey px-4 py-3 text-sm text-muted">
                  <IconClock className="mt-0.5 h-4 w-4 text-orange" />
                  {copy.hoursNote}
                </p>
                {business.maps ? (
                  <a
                    href={business.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-block text-sm font-semibold text-orange no-underline hover:underline"
                  >
                    Apri in Google Maps
                  </a>
                ) : null}
              </div>
              {mapsSrc ? (
                <div className="min-h-[320px] overflow-hidden rounded-lg border border-line">
                  <iframe
                    title={`Mappa: ${copy.address}`}
                    src={mapsSrc}
                    className="h-full min-h-[320px] w-full border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-navy text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="font-display text-3xl">{business.nome}</p>
          <p className="mt-3 max-w-xl text-sm text-white/70">{copy.legalLine}</p>
          <p className="mt-10 border-t border-white/15 pt-6 text-xs text-white/50">
            Anteprima realizzata da diValore Studio —{' '}
            <a href="https://divalore.studio" className="text-white/70 underline-offset-2 hover:underline">
              divalore.studio
            </a>
          </p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-px bg-navy md:hidden">
        {tel ? (
          <a
            href={tel}
            className="inline-flex min-h-11 items-center justify-center bg-orange py-4 text-sm font-semibold text-white no-underline"
          >
            Chiama
          </a>
        ) : (
          <a
            href="#prenota"
            className="inline-flex min-h-11 items-center justify-center bg-orange py-4 text-sm font-semibold text-white no-underline"
          >
            Prenota
          </a>
        )}
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center bg-navy py-4 text-sm font-semibold text-white no-underline"
          >
            WhatsApp
          </a>
        ) : null}
      </div>
      <div className="h-14 md:hidden" />
    </div>
  )
}
