import type { CSSProperties } from 'react'

const GRAIN_SVG = `<svg xmlns='http://www.w3.org/2000/svg' width='256' height='256'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>`

const style: CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 9999,
  pointerEvents: 'none',
  mixBlendMode: 'overlay',
  opacity: 0.04,
  backgroundImage: `url("data:image/svg+xml,${GRAIN_SVG}")`,
  backgroundRepeat: 'repeat',
  backgroundSize: '200px 200px',
}

export default function GrainOverlay() {
  return <div aria-hidden="true" style={style} />
}
