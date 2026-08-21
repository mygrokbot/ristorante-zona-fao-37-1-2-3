export function IconStar({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3.2 14.6 9l6.4.6-4.8 4.2 1.5 6.2L12 16.9 6.3 20l1.5-6.2L3 9.6 9.4 9 12 3.2z"
      />
    </svg>
  )
}

export function IconPhone({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.2 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.7 21 3 13.3 3 3.7 3 3.1 3.4 2.7 4 2.7h3.5c.6 0 1 .4 1 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1L6.6 10.8z"
      />
    </svg>
  )
}

export function IconChat({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 3C6.5 3 2 7.1 2 12.1c0 1.8.5 3.5 1.5 5L2 21l4.1-1.3c1.4.8 3.1 1.2 4.9 1.2 5.5 0 10-4.1 10-9.1S17.5 3 12 3zm5.2 11.6c-.2.6-1.1 1.1-1.8 1.2-.5.1-1.1.1-1.8 0-1-.2-2.2-.7-3.6-1.6-2.5-1.6-4.1-3.8-4.2-4-.2-.2-1.3-1.7-1.3-3.2 0-1.5.8-2.2 1.1-2.5.3-.3.7-.4 1-.4h.7c.2 0 .5 0 .7.6.3.7.9 2.3 1 2.4.1.2.1.4 0 .6-.1.2-.2.4-.4.6l-.4.4c-.1.1-.3.3-.1.6.2.4.9 1.5 2 2.4 1.3 1.1 2.4 1.5 2.8 1.6.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.7-.1.3.1 2 .9 2.3 1.1.3.2.5.3.6.4.1.3 0 .8-.2 1.4z"
      />
    </svg>
  )
}

export function IconPin({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  )
}

export function IconClock({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path d="M12 7.5v5l3 2" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

export function IconCamera({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="6.5" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.75" />
      <circle cx="12" cy="13" r="3.25" stroke="currentColor" strokeWidth="1.75" />
      <path d="M8 6.5 9.2 4.5h5.6L16 6.5" stroke="currentColor" strokeWidth="1.75" />
    </svg>
  )
}

export function IconCheck({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.75" />
      <path d="m8 12.2 2.6 2.6 5.4-5.5" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

export function IconArrow({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  )
}

const SERVICE_PATHS = [
  'M4 12h16M7 8v8M17 8v8M12 5v14',
  'M7 8h10v10H7zM9 8V6h6v2',
  'M12 4.5 4 8v8l8 3.5 8-3.5V8L12 4.5z',
  'M6 12h12M8 16h8M9 8h6',
  'M5 7h14v10H5zM8 7V5h8v2',
  'M7 17V7l5-2 5 2v10',
  'M6 18V8h12v10M9 8V6h6v2',
  'M12 5v14M7 9h10M7 15h10',
]

export function ServiceIcon({ index, className }) {
  const d = SERVICE_PATHS[index % SERVICE_PATHS.length]
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d={d} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function Stars({ className = 'text-accent' }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar key={i} className="h-3.5 w-3.5" />
      ))}
    </span>
  )
}
