import { useEffect } from 'react'
import business from './business.json'
import { paletteFor } from './palette.js'
import { phoneHref, whatsappHref, formatPhone } from './phone.js'

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

function IconMap({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M20.5 3.1 14 5.5 8 3 3.5 4.6c-.3.1-.5.4-.5.7v14.2c0 .6.6 1 1.1.8L9 18.5l6 2.5 4.6-1.6c.3-.1.4-.4.4-.7V3.9c0-.6-.6-1-1.5-.8zM9 16.7l-4 1.3V6.2L9 4.8v11.9zm6 2.5-4-1.6V5.6l4 1.7v11.9z"
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

function formatReviews(n) {
  const raw = String(n || '').trim()
  if (!raw) return ''
  const num = Number(raw.replace(/\./g, '').replace(',', '.'))
  if (Number.isFinite(num)) {
    return num.toLocaleString('it-IT')
  }
  return raw
}

export default function App() {
  const palette = paletteFor(business.settore)
  const tel = phoneHref(business.telefono)
  const wa = whatsappHref(business.telefono)
  const phoneLabel = formatPhone(business.telefono)
  const addressLine = [business.indirizzo, [business.cap, business.citta].filter(Boolean).join(' '), business.provincia ? `(${business.provincia})` : '']
    .filter(Boolean)
    .join(', ')
    .replace(' ,', ',')
  const hasRating = Boolean(business.rating && String(business.rating).trim())
  const reviews = formatReviews(business.recensioni)

  useEffect(() => {
    const root = document.documentElement
    root.lang = 'it'
    root.style.setProperty('--accent', palette.accent)
    root.style.setProperty('--accent-hover', palette.accentHover)
    root.style.setProperty('--accent-soft', palette.accentSoft)
    root.style.setProperty('--ink', palette.ink)
    document.title = `${business.nome} · ${business.citta}`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) {
      meta.setAttribute(
        'content',
        `${business.nome} — ${business.settore} a ${business.citta}. ${addressLine}`,
      )
    }
  }, [palette, addressLine])

  return (
    <div className="flex min-h-svh flex-col bg-[#fafafa] text-[17px] text-gray-800">
      <a
        href="#contenuto"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2"
      >
        Vai al contenuto
      </a>

      <header className="border-b border-line bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-4 px-5 py-4">
          <p className="font-display text-lg font-semibold tracking-tight text-ink">
            {business.nome}
          </p>
          {tel ? (
            <a
              href={tel}
              className="shrink-0 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white no-underline hover:bg-accent-hover"
            >
              Chiama
            </a>
          ) : null}
        </div>
      </header>

      <main id="contenuto" className="mx-auto w-full max-w-2xl flex-1 px-5 py-10 sm:py-14">
        <section aria-labelledby="titolo-attivita" className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.14em] text-accent">
            {business.settore}
            {business.citta ? ` · ${business.citta}` : ''}
          </p>
          <h1
            id="titolo-attivita"
            className="font-display text-[2.15rem] leading-tight font-semibold text-ink sm:text-5xl"
          >
            {business.nome}
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            {business.settore} a {business.citta}
            {business.provincia ? ` (${business.provincia})` : ''}.
          </p>

          {hasRating ? (
            <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-sm font-medium text-ink">
              <IconStar className="h-4 w-4 text-accent" />
              <span>
                {business.rating} su 5
                {reviews ? ` · ${reviews} recensioni` : ''}
              </span>
            </p>
          ) : null}
        </section>

        <section aria-labelledby="dove-siamo" className="mb-10">
          <h2 id="dove-siamo" className="mb-4 font-display text-2xl text-ink">
            Dove siamo
          </h2>
          <ul className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-white">
            {addressLine ? (
              <li className="flex gap-3 px-4 py-4">
                <IconPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium text-muted">Indirizzo</p>
                  <p className="text-ink">{addressLine}</p>
                </div>
              </li>
            ) : null}
            {phoneLabel ? (
              <li className="flex gap-3 px-4 py-4">
                <IconPhone className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium text-muted">Telefono</p>
                  {tel ? (
                    <a href={tel} className="font-medium text-accent no-underline hover:underline">
                      {phoneLabel}
                    </a>
                  ) : (
                    <p className="text-ink">{phoneLabel}</p>
                  )}
                </div>
              </li>
            ) : null}
            {business.maps ? (
              <li className="flex gap-3 px-4 py-4">
                <IconMap className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium text-muted">Mappe</p>
                  <a
                    href={business.maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-accent no-underline hover:underline"
                  >
                    Apri in Google Maps
                  </a>
                </div>
              </li>
            ) : null}
          </ul>
        </section>

        <section
          aria-labelledby="contattaci"
          className="rounded-2xl bg-accent px-5 py-8 text-white sm:px-8"
        >
          <h2 id="contattaci" className="font-display text-2xl">
            Contattaci
          </h2>
          <p className="mt-2 max-w-md text-white/90">
            Per informazioni, chiamaci
            {wa ? ' o scrivici su WhatsApp' : ''}.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            {tel ? (
              <a
                href={tel}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 font-medium text-ink no-underline hover:bg-accent-soft"
              >
                <IconPhone className="h-5 w-5" />
                Chiama {phoneLabel}
              </a>
            ) : null}
            {wa ? (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-transparent px-5 py-3 font-medium text-white no-underline hover:bg-white/10"
              >
                <IconChat className="h-5 w-5" />
                WhatsApp
              </a>
            ) : null}
          </div>
        </section>
      </main>

      <footer className="mt-auto border-t border-line bg-white">
        <div className="mx-auto max-w-2xl px-5 py-6 text-sm text-muted">
          <p className="text-ink">
            {business.nome}
            {business.citta ? ` · ${business.citta}` : ''}
          </p>
          <p className="mt-1">Sito a cura di divalore.studio</p>
        </div>
      </footer>
    </div>
  )
}
