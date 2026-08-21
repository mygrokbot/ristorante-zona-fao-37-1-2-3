/** Small settore → palette map. Unknown settori fall back to navy. */
export const PALETTES = {
  Veterinaria: {
    accent: '#0f766e',
    accentHover: '#115e59',
    accentSoft: '#ccfbf1',
    ink: '#134e4a',
  },
  Gelateria: {
    accent: '#c2410c',
    accentHover: '#9a3412',
    accentSoft: '#ffedd5',
    ink: '#7c2d12',
  },
  Ristorazione: {
    accent: '#9f1239',
    accentHover: '#881337',
    accentSoft: '#ffe4e6',
    ink: '#4c0519',
  },
  Pasticceria: {
    accent: '#b45309',
    accentHover: '#92400e',
    accentSoft: '#fef3c7',
    ink: '#78350f',
  },
  'Pub e birreria': {
    accent: '#92400e',
    accentHover: '#78350f',
    accentSoft: '#fde68a',
    ink: '#451a03',
  },
  Servizi: {
    accent: '#1e3a5f',
    accentHover: '#152a45',
    accentSoft: '#e8eef5',
    ink: '#0f172a',
  },
}

const FALLBACK = {
  accent: '#1e3a5f',
  accentHover: '#152a45',
  accentSoft: '#e8eef5',
  ink: '#0f172a',
}

export function paletteFor(settore) {
  return PALETTES[settore] || FALLBACK
}
