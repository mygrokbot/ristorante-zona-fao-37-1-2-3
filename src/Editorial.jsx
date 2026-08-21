import { useEffect, useState } from 'react'
import { phoneHref, whatsappHref, formatPhone } from './phone.js'

function IconStar({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3.2 14.6 9l6.4.6-4.8 4.2 1.5 6.2L12 16.9 6.3 20l1.5-6.2L3 9.6 9.4 9 12 3.2z"
      />
    </svg>
  )
}

function IconPhone({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.7 3 3.1 3.4 2.7 4 2.7h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
      />
    </svg>
  )
}

function IconChat({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3C6.5 3 2 7.1 2 12.1c0 1.8.5 3.5 1.5 5L2 21l4.1-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.1 10-9.1S17.5 3 12 3zm5.2 11.6c-.2.6-1.1 1.1-1.8 1.2-.5.1-1.1.1-1.8 0-1-.2-2.2-.7-3.6-1.6-2.5-1.6-4.1-3.8-4.2-4-.2-.2-1.3-1.7-1.3-3.2 0-1.5.8-2.2 1.1-2.5.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .7.6.3.7.9 2.3 1 2.4.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.4.4c-.1.1-.3.3-.1.6.2.4.9 1.5 2 2.4 1.3 1.1 2.4 1.5 2.8 1.6.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.7-.1.3.1 2 .9 2.3 1.1.3.2.5.3.6.4.1.3 0 .8-.2 1.4z"
      />
    </svg>
  )
}

function IconPin({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  )
}

function IconClock({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 7.5v5l3 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

function Stars() {
  return (
    <span className="inline-flex gap-0.5 text-[#0f766e]" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar key={i} className="h-3.5 w-3.5" />
      ))}
    </span>
  )
}

function SectionHead({ num, label, title, kicker }) {
  return (
    <div>
      <p className="eyebrow">
        {num} —— {String(label).toUpperCase()}
      </p>
      <h2 className="mt-6 max-w-2xl text-3xl leading-tight text-ink sm:text-5xl">{title}</h2>
      {kicker ? <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{kicker}</p> : null}
    </div>
  )
}

function BookingForm({ copy }) {
  const [sent, setSent] = useState(false)

  function onSubmit(event) {
    event.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="border border-line bg-card p-6 sm:p-10" role="status">
        <p className="font-display text-2xl text-ink">Richiesta registrata in anteprima.</p>
        <p className="mt-4 text-sm leading-relaxed text-muted">
          Il modulo è dimostrativo e non ha inviato dati a un server. Per confermare, chiama o scrivi su
          WhatsApp: ti rispondiamo noi.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} className="border border-line bg-white p-6 sm:p-10" noValidate>
      <div className="grid gap-8 sm:grid-cols-2">
        {copy.formFields.map((field) => (
          <label
            key={field.name}
            className={field.span === 2 ? 'sm:col-span-2' : undefined}
          >
            <span className="eyebrow block">
              {field.label}
              {field.required ? ' *' : ''}
            </span>
            {field.type === 'select' ? (
              <select
                name={field.name}
                required={Boolean(field.required)}
                className="mt-1 w-full border-b border-line bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors focus:border-accent"
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
                className="mt-1 w-full border-b border-line bg-transparent px-0 py-3 text-base text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-accent"
              />
            )}
          </label>
        ))}
      </div>
      <button
        type="submit"
        className="mt-10 min-h-11 w-full bg-[#111] px-8 py-4 text-sm tracking-wide text-white transition-colors hover:bg-neutral-800 sm:w-auto"
      >
        {copy.formSubmit}
      </button>
      <p className="mt-4 text-xs leading-relaxed text-muted">{copy.formDemoNote}</p>
    </form>
  )
}

export default function Editorial({ business, copy, palette }) {
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
  }, [palette, copy, hasRating])

  return (
    <div className="theme-editorial min-h-svh bg-bg text-[17px] text-ink">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2"
      >
        Vai al contenuto
      </a>

      <header className="sticky top-0 z-40 border-b border-line bg-bg/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <a href="#top" className="font-display text-lg leading-tight tracking-tight text-ink no-underline">
            {copy.displayName}
          </a>
          <nav className="hidden items-center gap-8 text-sm md:flex" aria-label="Sezioni">
            {copy.nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} className="text-ink no-underline hover:text-accent">
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#prenota"
            className="hidden min-h-11 items-center bg-[#111] px-5 py-2.5 text-sm text-white no-underline transition-colors hover:bg-neutral-800 md:inline-flex"
          >
            {copy.ctaPrimary}
          </a>
        </div>
      </header>

      <main id="contenuto">
        <section id="top" className="mx-auto max-w-6xl px-5 pt-14 pb-16 sm:px-8 sm:pt-24 sm:pb-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
            <div className="rise">
              <p className="eyebrow">{copy.eyebrow}</p>
              <h1 className="mt-6 text-[2.6rem] leading-[1.03] text-ink sm:text-6xl lg:text-7xl">{copy.h1}</h1>
              <p className="mt-7 max-w-lg text-lg leading-relaxed text-muted">{copy.lead}</p>
              {hasRating ? (
                <p className="mt-8 inline-flex items-center gap-3 border border-line bg-paper px-4 py-3">
                  <Stars />
                  <span className="text-sm">
                    <strong className="font-semibold">{business.rating}</strong> su Google
                    {copy.reviewsCount ? ` · ${copy.reviewsCount} recensioni` : ''}
                  </span>
                </p>
              ) : null}
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#prenota"
                  className="inline-flex min-h-11 items-center justify-center bg-[#111] px-8 py-4 text-center text-sm tracking-wide text-white no-underline transition-colors hover:bg-neutral-800"
                >
                  {copy.ctaPrimary}
                </a>
                {tel ? (
                  <a
                    href={tel}
                    className="inline-flex min-h-11 items-center justify-center border border-line px-8 py-4 text-center text-sm tracking-wide text-ink no-underline transition-colors hover:border-accent hover:text-accent"
                  >
                    {phoneLabel}
                  </a>
                ) : null}
              </div>
            </div>
            <figure className="relative">
              <img
                src={copy.images.hero}
                alt={copy.heroAlt}
                className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]"
                width={1200}
                height={1500}
              />
              <figcaption className="mt-3 text-xs text-muted">{copy.heroCaption}</figcaption>
            </figure>
          </div>
        </section>

        <section id="servizi" className="rule-top bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <SectionHead num="01" label="Servizi" title={copy.servicesTitle} />
            <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {copy.services.map((item) => (
                <li key={item.title} className="group bg-bg p-7 transition-colors hover:bg-white">
                  <h3 className="text-xl leading-snug text-ink">{item.title}</h3>
                  <span className="mt-4 block h-px w-8 bg-line transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
                  <p className="mt-4 text-sm leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="processo" className="rule-top">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
              <div>
                <SectionHead num="02" label="Processo" title={copy.processTitle} kicker={copy.processLead} />
                <img
                  src={copy.images.process}
                  alt=""
                  className="mt-8 aspect-[4/3] w-full object-cover"
                  loading="lazy"
                />
                <dl className="mt-8 grid grid-cols-1 gap-6 text-sm sm:grid-cols-2">
                  {copy.processMeta.map((item) => (
                    <div key={item.label}>
                      <dt className="eyebrow">{item.label}</dt>
                      <dd className="mt-2 text-muted">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <ol className="divide-y divide-line border-y border-line">
                {copy.process.map((step, index) => (
                  <li key={step.title} className="flex gap-6 py-8">
                    <span className="font-display text-2xl text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-xl text-ink">{step.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
                    </div>
                  </li>
                ))}
                <li className="py-8 text-sm leading-relaxed text-muted">{copy.processNote}</li>
              </ol>
            </div>
          </div>
        </section>

        <section id="consigli" className="rule-top bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-end">
              <SectionHead num="03" label="In pratica" title={copy.eduTitle} kicker={copy.eduLead} />
              <img
                src={copy.images.edu}
                alt=""
                className="aspect-[16/10] w-full object-cover"
                loading="lazy"
              />
            </div>
            <ul className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {copy.eduItems.map((item) => (
                <li key={item.title} className="border-t border-line pt-5">
                  <h3 className="text-xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="spazio" className="rule-top">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <SectionHead num="04" label="Spazio" title={copy.galleryTitle} />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {copy.images.gallery.map((photo, index) => (
                <img
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className={
                    index === 0
                      ? 'aspect-[4/3] w-full object-cover lg:col-span-2 lg:row-span-2 lg:aspect-auto lg:h-full'
                      : index === copy.images.gallery.length - 1
                        ? 'aspect-[16/9] w-full object-cover sm:col-span-2 lg:col-span-3'
                        : 'aspect-[4/3] w-full object-cover'
                  }
                />
              ))}
            </div>
          </div>
        </section>

        <section className="rule-top bg-paper">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-2 lg:items-center lg:gap-20">
            <img
              src={copy.images.process}
              alt=""
              className="aspect-[4/5] w-full object-cover"
              loading="lazy"
            />
            <div>
              <p className="eyebrow flex items-center gap-3">
                <span className="h-px w-8 bg-line" />
                {copy.situationalEyebrow}
              </p>
              <h2 className="mt-6 text-3xl leading-tight text-ink sm:text-5xl">{copy.situationalTitle}</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted">{copy.situationalLead}</p>
              <ol className="mt-8 space-y-4 border-t border-line pt-6">
                {copy.situationalSteps.map((step, index) => (
                  <li key={step.title} className="text-sm text-muted">
                    <span className="font-medium text-ink">
                      {index + 1}. {step.title}
                    </span>{' '}
                    {step.text}
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm leading-relaxed text-muted">{copy.situationalNote}</p>
              {wa ? (
                <a
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex min-h-11 items-center justify-center bg-[#111] px-7 py-3.5 text-sm text-white no-underline transition-colors hover:bg-neutral-800"
                >
                  Scrivi ora su WhatsApp
                </a>
              ) : null}
            </div>
          </div>
        </section>

        <section className="rule-top">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <SectionHead num="05" label="Perché noi" title={copy.whyTitle} />
            <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
              {copy.why.map((item) => (
                <li key={item.title} className="bg-bg p-8">
                  <h3 className="text-xl text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="prenota" className="rule-top bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              <div>
                <SectionHead num="06" label="Prenotazione" title={copy.formTitle} kicker={copy.formLead} />
                <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:flex-col">
                  {tel ? (
                    <a
                      href={tel}
                      className="inline-flex min-h-11 items-center justify-center gap-2 border border-line px-6 py-3.5 text-sm text-ink no-underline transition-colors hover:border-accent hover:text-accent"
                    >
                      <IconPhone className="h-4 w-4" />
                      {phoneLabel}
                    </a>
                  ) : null}
                  {wa ? (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 border border-line px-6 py-3.5 text-sm text-ink no-underline transition-colors hover:border-accent hover:text-accent"
                    >
                      <IconChat className="h-4 w-4" />
                      Scrivi su WhatsApp
                    </a>
                  ) : null}
                </div>
              </div>
              <BookingForm copy={copy} />
            </div>
          </div>
        </section>

        <section className="rule-top">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <SectionHead num="07" label="Recensioni" title={copy.reviewsTitle} />
            <ul className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
              {copy.reviews.map((review) => (
                <li key={review.name} className="bg-bg p-8">
                  <Stars />
                  <blockquote className="mt-5 font-display text-xl leading-snug text-ink">
                    “{review.quote}”
                  </blockquote>
                  <p className="mt-6 text-sm text-muted">
                    {review.name}
                    {review.context ? <span className="block">{review.context}</span> : null}
                  </p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-muted">{copy.reviewsNote}</p>
          </div>
        </section>

        <section id="contatti" className="rule-top bg-paper">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
            <p className="eyebrow flex items-center gap-3">
              <span className="h-px w-8 bg-line" />
              08 —— ORARI E CONTATTI
            </p>
            <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:gap-20">
              <div>
                <h2 className="text-3xl leading-tight text-ink sm:text-4xl">{copy.hoursTitle}</h2>
                <div className="mt-8 space-y-1 border-t border-line pt-6">
                  <p className="eyebrow flex items-center gap-2">
                    <IconClock className="h-3.5 w-3.5" />
                    Orari
                  </p>
                  <dl className="mt-4 divide-y divide-line text-sm">
                    {copy.hours.map((row) => (
                      <div key={row.day} className="flex justify-between gap-6 py-3">
                        <dt>{row.day}</dt>
                        <dd className="text-right text-muted">{row.time}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="pt-3 text-xs text-muted">{copy.hoursNote}</p>
                </div>
                <address className="mt-8 not-italic">
                  <p className="eyebrow flex items-center gap-2">
                    <IconPin className="h-3.5 w-3.5" />
                    Indirizzo
                  </p>
                  <p className="mt-3 text-lg text-ink">{copy.address}</p>
                  {business.maps ? (
                    <a
                      href={business.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-accent no-underline hover:underline"
                    >
                      Apri in Google Maps
                    </a>
                  ) : null}
                </address>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  {tel ? (
                    <a
                      href={tel}
                      className="inline-flex min-h-11 items-center justify-center gap-2 bg-[#111] px-7 py-3.5 text-sm text-white no-underline transition-colors hover:bg-neutral-800"
                    >
                      <IconPhone className="h-4 w-4" />
                      Chiama
                    </a>
                  ) : null}
                  {wa ? (
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 border border-line px-7 py-3.5 text-sm text-ink no-underline transition-colors hover:border-accent hover:text-accent"
                    >
                      <IconChat className="h-4 w-4" />
                      WhatsApp
                    </a>
                  ) : null}
                </div>
              </div>
              {mapsSrc ? (
                <div className="min-h-[320px] border border-line bg-white">
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

      <footer className="rule-top bg-ink text-white">
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <p className="font-display text-2xl">{business.nome}</p>
          <p className="mt-3 max-w-md text-sm opacity-70">{copy.legalLine}</p>
          <p className="mt-10 border-t border-white/15 pt-6 text-xs opacity-60">
            {copy.footerCredit}{' '}
            <a href="https://divalore.studio" className="text-white underline-offset-2 hover:underline">
              divalore.studio
            </a>
          </p>
        </div>
      </footer>

      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-px border-t border-line bg-line md:hidden">
        <a
          href="#prenota"
          className="inline-flex min-h-11 items-center justify-center bg-[#111] py-4 text-center text-sm text-white no-underline"
        >
          {copy.ctaPrimary.split(' ')[0] === 'Prenota' ? 'Prenota' : copy.ctaPrimary}
        </a>
        {wa ? (
          <a
            href={wa}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center bg-bg py-4 text-center text-sm text-ink no-underline"
          >
            WhatsApp
          </a>
        ) : tel ? (
          <a
            href={tel}
            className="inline-flex min-h-11 items-center justify-center bg-bg py-4 text-center text-sm text-ink no-underline"
          >
            Chiama
          </a>
        ) : null}
      </div>
      <div className="h-14 md:hidden" />
    </div>
  )
}
