import * as THREE from "three"

/**
 * Diagonal criss-cross weave, drawn as black strokes on a transparent
 * canvas. Used as an alphaMap over a warm glowing shell so the shell reads
 * as a woven wire lattice with light bleeding through the gaps.
 */
export function createLatticeTexture(cellPx = 64, strokePx = 5) {
  const size = cellPx * 2
  const canvas = document.createElement("canvas")
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext("2d")!

  // alphaMap only reads the texture's green channel (ignores canvas alpha),
  // so opacity has to be encoded as black (hidden) vs. white (visible).
  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, size, size)
  ctx.strokeStyle = "#ffffff"
  ctx.lineWidth = strokePx
  ctx.lineCap = "round"

  const step = cellPx
  for (let offset = -size; offset < size * 2; offset += step) {
    ctx.beginPath()
    ctx.moveTo(offset, 0)
    ctx.lineTo(offset + size, size)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(offset + size, 0)
    ctx.lineTo(offset, size)
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}
