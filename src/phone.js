/** Normalize a phone string to digits only. */
export function digitsOnly(phone) {
  return String(phone || '').replace(/\D/g, '')
}

export function phoneHref(phone) {
  const d = digitsOnly(phone)
  if (!d) return null
  return `tel:+${d}`
}

/**
 * WhatsApp link only when the number looks Italian (+39 / 39 / mobile 3xx).
 */
export function whatsappHref(phone) {
  let d = digitsOnly(phone)
  if (!d) return null

  if (d.startsWith('0039')) d = d.slice(2)
  if (d.startsWith('39') && d.length >= 11) {
    return `https://wa.me/${d}`
  }
  // Local Italian mobile (9–10 digits starting with 3)
  if (d.startsWith('3') && d.length >= 9 && d.length <= 11) {
    return `https://wa.me/39${d}`
  }
  return null
}

export function formatPhone(phone) {
  return String(phone || '').trim()
}
