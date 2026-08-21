/** Normalize a phone string to digits only. */
export function digitsOnly(phone) {
  return String(phone || '').replace(/\D/g, '')
}

export function phoneHref(phone) {
  const d = digitsOnly(phone)
  if (!d) return null
  return `tel:+${d}`
}

function waNumber(phone) {
  let d = digitsOnly(phone)
  if (!d) return null
  if (d.startsWith('0039')) d = d.slice(2)
  if (d.startsWith('39') && d.length >= 11) return d
  if (d.startsWith('3') && d.length >= 9 && d.length <= 11) return `39${d}`
  return null
}

/**
 * WhatsApp link only when the number looks Italian (+39 / 39 / mobile 3xx).
 */
export function whatsappHref(phone, text) {
  const n = waNumber(phone)
  if (!n) return null
  const base = `https://wa.me/${n}`
  if (text) return `${base}?text=${encodeURIComponent(text)}`
  return base
}

export function formatPhone(phone) {
  return String(phone || '').trim()
}
