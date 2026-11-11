/**
 * Lightweight pure-canvas confetti fireworks effect without external dependencies
 */
export function triggerConfetti() {
  const canvas = document.createElement('canvas')
  canvas.style.position = 'fixed'
  canvas.style.top = '0'
  canvas.style.left = '0'
  canvas.style.width = '100vw'
  canvas.style.height = '100vh'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '999999'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    document.body.removeChild(canvas)
    return
  }

  const dpr = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  ctx.scale(dpr, dpr)

  const colors = ['#f59e0b', '#fef08a', '#38bdf8', '#818cf8', '#ec4899', '#10b981', '#ffffff']
  const particleCount = 80
  const particles: Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
    color: string
    alpha: number
    rotation: number
    vRot: number
    shape: 'circle' | 'rect'
  }> = []

  const originX = window.innerWidth / 2
  const originY = window.innerHeight * 0.45

  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2
    const speed = 4 + Math.random() * 9
    particles.push({
      x: originX,
      y: originY,
      vx: Math.cos(angle) * speed * (0.8 + Math.random() * 0.4),
      vy: Math.sin(angle) * speed - 2.5,
      size: 6 + Math.random() * 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 12,
      shape: Math.random() > 0.4 ? 'rect' : 'circle'
    })
  }

  let animationFrameId: number

  function animate() {
    ctx?.clearRect(0, 0, window.innerWidth, window.innerHeight)

    let aliveCount = 0

    for (const p of particles) {
      p.x += p.vx
      p.y += p.vy
      p.vy += 0.22 // gravity
      p.vx *= 0.98 // air resistance
      p.rotation += p.vRot
      p.alpha -= 0.012

      if (p.alpha > 0) {
        aliveCount++
        if (ctx) {
          ctx.save()
          ctx.globalAlpha = Math.max(0, p.alpha)
          ctx.translate(p.x, p.y)
          ctx.rotate((p.rotation * Math.PI) / 180)
          ctx.fillStyle = p.color

          if (p.shape === 'circle') {
            ctx.beginPath()
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
            ctx.fill()
          } else {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2)
          }
          ctx.restore()
        }
      }
    }

    if (aliveCount > 0) {
      animationFrameId = requestAnimationFrame(animate)
    } else {
      cancelAnimationFrame(animationFrameId)
      if (canvas.parentNode) {
        canvas.parentNode.removeChild(canvas)
      }
    }
  }

  animate()
}
