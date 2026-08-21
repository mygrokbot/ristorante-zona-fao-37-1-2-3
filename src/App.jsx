import business from './business.json'
import { paletteFor } from './palette.js'
import { buildContent } from './content.js'
import Editorial from './Editorial.jsx'
import Trade from './Trade.jsx'

export default function App() {
  const copy = buildContent(business)
  const palette = paletteFor(business.settore, copy.theme)
  if (copy.theme === 'trade') {
    return <Trade business={business} copy={copy} palette={palette} />
  }
  return <Editorial business={business} copy={copy} palette={palette} />
}
