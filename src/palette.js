/** Settore palette. Trade theme forces navy + orange. */
export const PALETTES = {
  Veterinaria: {
    accent: '#f27427',
    accentHover: '#d65f16',
    accentSoft: '#ffe8d6',
    ink: '#0b192e',
  },
  Gelateria: {
    accent: '#0f766e',
    accentHover: '#0b5c56',
    accentSoft: '#d7f3ee',
    ink: '#111111',
  },
  Ristorazione: {
    accent: '#0f766e',
    accentHover: '#0b5c56',
    accentSoft: '#d7f3ee',
    ink: '#111111',
  },
  Pasticceria: {
    accent: '#0f766e',
    accentHover: '#0b5c56',
    accentSoft: '#d7f3ee',
    ink: '#111111',
  },
  'Pub e birreria': {
    accent: '#f27427',
    accentHover: '#d65f16',
    accentSoft: '#ffe8d6',
    ink: '#0b192e',
  },
  'Bar e caffetteria': {
    accent: '#f27427',
    accentHover: '#d65f16',
    accentSoft: '#ffe8d6',
    ink: '#0b192e',
  },
  Servizi: {
    accent: '#0f766e',
    accentHover: '#0b5c56',
    accentSoft: '#d7f3ee',
    ink: '#111111',
  },
}

const FALLBACK = {
  accent: '#0f766e',
  accentHover: '#0b5c56',
  accentSoft: '#d7f3ee',
  ink: '#111111',
}

export const TRADE = {
  accent: '#f27427',
  accentHover: '#d65f16',
  accentSoft: '#ffe8d6',
  ink: '#0b192e',
}

export function paletteFor(settore, theme) {
  if (theme === 'trade') return TRADE
  return PALETTES[settore] || FALLBACK
}
