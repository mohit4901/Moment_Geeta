import React, { useEffect, useRef } from 'react';

const SPRITE_COLS = 4;
const SPRITE_ROWS = 2;
const SPRITE_CELL = 256;
const TOTAL_SPRITES = SPRITE_COLS * SPRITE_ROWS;

function createParticle(staggered = false) {
  // Depth z in [0.16, 1.48]; staggered spreads initial cells evenly across all depths
  const z = staggered ? 0.16 + Math.random() * 1.30 : 1.24 + Math.random() * 0.28;

  // Project frustum-aware radial coordinates so cells fill the viewport naturally
  // without spawning already off-screen on initial frame
  const maxSpread = staggered ? Math.min(0.88, z * 0.92) : 0.78;
  const minSpread = staggered ? 0.05 : 0.06;
  const radius = minSpread + Math.random() * Math.max(0.08, maxSpread - minSpread);
  const theta = Math.random() * Math.PI * 2;

  return {
    x: Math.cos(theta) * radius,
    y: Math.sin(theta) * radius * 0.68,
    z,
    speed: 0.068 + Math.random() * 0.066,
    driftX: (Math.random() - 0.5) * 0.02,
    driftY: (Math.random() - 0.5) * 0.016,
    angle: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.3,
    baseScale: 0.84 + Math.random() * 0.46,
    spriteIdx: Math.floor(Math.random() * TOTAL_SPRITES),
    flipX: Math.random() < 0.5 ? 1 : -1,
  };
}

export default function RbcStreamCanvas({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || typeof window === 'undefined') return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let isDisposed = false;
    let rafId = null;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let lastTime = 0;

    // Preload extracted authentic video assets (plasma backdrop + sharp & bokeh RBC sprite sheets)
    const bgImg = new Image();
    const sharpSheet = new Image();
    const bokehSheet = new Image();
    let loadedCount = 0;
    let assetsReady = false;

    const particleCount = window.innerWidth < 768 ? 34 : 54;
    const particles = Array.from({ length: particleCount }, () => createParticle(true));
    // Pre-allocate sort buffer to avoid per-frame allocations
    const renderOrder = particles.slice();

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawBackground = () => {
      if (bgImg.complete && bgImg.naturalWidth > 0) {
        const scale = Math.max(width / bgImg.naturalWidth, height / bgImg.naturalHeight);
        const dw = bgImg.naturalWidth * scale;
        const dh = bgImg.naturalHeight * scale;
        const dx = (width - dw) * 0.5;
        const dy = (height - dh) * 0.5;
        ctx.drawImage(bgImg, dx, dy, dw, dh);
      } else {
        ctx.fillStyle = '#f6e7e5';
        ctx.fillRect(0, 0, width, height);
      }
    };

    const drawSprite = (sheet, spriteIdx, cx, cy, size, angle, flipX, alpha) => {
      if (alpha <= 0.01) return;
      const col = spriteIdx % SPRITE_COLS;
      const row = Math.floor(spriteIdx / SPRITE_COLS);
      const sx = col * SPRITE_CELL;
      const sy = row * SPRITE_CELL;

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      if (flipX < 0) ctx.scale(-1, 1);
      ctx.drawImage(
        sheet,
        sx,
        sy,
        SPRITE_CELL,
        SPRITE_CELL,
        -size * 0.5,
        -size * 0.5,
        size,
        size
      );
      ctx.restore();
    };

    const stepAndRender = (now) => {
      if (isDisposed) return;

      if (!lastTime) lastTime = now;
      const dt = Math.min((now - lastTime) * 0.001, 0.05);
      lastTime = now;

      if (width <= 0 || height <= 0) {
        resizeCanvas();
      }

      drawBackground();

      if (assetsReady) {
        const minDim = Math.min(width, height);
        const focal = Math.max(width, height) * 0.56;
        // Slightly bias vanishing center right on desktop so flow is prominent beside hero copy
        const originX = width >= 1024 ? width * 0.58 : width * 0.5;
        const originY = height * 0.46;
        const baseCellPx = Math.max(54, minDim * 0.155);

        // Update each RBC independently
        for (let i = 0; i < particles.length; i += 1) {
          const p = particles[i];
          p.z -= p.speed * dt;
          p.x += p.driftX * dt;
          p.y += p.driftY * dt;
          p.angle += p.rotSpeed * dt;

          const invZ = 1 / Math.max(p.z, 0.04);
          const screenX = originX + p.x * focal * invZ;
          const screenY = originY + p.y * focal * invZ;
          const drawSize = baseCellPx * p.baseScale * invZ * 0.72;
          const halfMargin = drawSize * 0.65;

          const exitedBounds =
            p.z < 0.92 &&
            (screenX < -halfMargin ||
              screenX > width + halfMargin ||
              screenY < -halfMargin ||
              screenY > height + halfMargin);

          if (p.z <= 0.065 || exitedBounds) {
            const recycled = createParticle(false);
            p.x = recycled.x;
            p.y = recycled.y;
            p.z = recycled.z;
            p.speed = recycled.speed;
            p.driftX = recycled.driftX;
            p.driftY = recycled.driftY;
            p.angle = recycled.angle;
            p.rotSpeed = recycled.rotSpeed;
            p.baseScale = recycled.baseScale;
            p.spriteIdx = recycled.spriteIdx;
            p.flipX = recycled.flipX;
          }
        }

        // Far-to-near depth sorting
        renderOrder.sort((a, b) => b.z - a.z);

        for (let i = 0; i < renderOrder.length; i += 1) {
          const p = renderOrder[i];
          const invZ = 1 / Math.max(p.z, 0.04);
          const screenX = originX + p.x * focal * invZ;
          const screenY = originY + p.y * focal * invZ;
          const drawSize = baseCellPx * p.baseScale * invZ * 0.72;
          const halfMargin = drawSize * 0.65;

          if (
            screenX < -halfMargin ||
            screenX > width + halfMargin ||
            screenY < -halfMargin ||
            screenY > height + halfMargin
          ) {
            continue;
          }

          // Smooth fade-in from distant plasma background (z > 0.95) and gentle fade near lens (z < 0.12)
          let alpha = 1;
          if (p.z > 0.95) {
            alpha = Math.max(0, Math.min(1, (1.45 - p.z) / 0.5));
          } else if (p.z < 0.12) {
            alpha = Math.max(0, (p.z - 0.065) / 0.055);
          }

          // Depth-of-field: far (z > 0.85) softly blurred, midground crisp, near (z < 0.28) foreground bokeh
          if (p.z < 0.24) {
            drawSprite(bokehSheet, p.spriteIdx, screenX, screenY, drawSize, p.angle, p.flipX, alpha * 0.94);
          } else if (p.z < 0.34) {
            const bokehMix = (0.34 - p.z) / 0.1;
            drawSprite(sharpSheet, p.spriteIdx, screenX, screenY, drawSize, p.angle, p.flipX, alpha * (1 - bokehMix));
            drawSprite(bokehSheet, p.spriteIdx, screenX, screenY, drawSize, p.angle, p.flipX, alpha * bokehMix);
          } else if (p.z > 0.88) {
            const farMix = Math.min(1, (p.z - 0.88) / 0.35);
            drawSprite(sharpSheet, p.spriteIdx, screenX, screenY, drawSize, p.angle, p.flipX, alpha * (1 - farMix * 0.75));
            drawSprite(bokehSheet, p.spriteIdx, screenX, screenY, drawSize, p.angle, p.flipX, alpha * farMix * 0.75);
          } else {
            drawSprite(sharpSheet, p.spriteIdx, screenX, screenY, drawSize, p.angle, p.flipX, alpha);
          }
        }
      }

      if (!motionQuery.matches && !document.hidden) {
        rafId = window.requestAnimationFrame(stepAndRender);
      } else {
        rafId = null;
      }
    };

    const startLoop = () => {
      if (isDisposed || motionQuery.matches || document.hidden) return;
      if (!rafId) {
        lastTime = 0;
        rafId = window.requestAnimationFrame(stepAndRender);
      }
    };

    const stopLoop = () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const handleAssetLoad = () => {
      loadedCount += 1;
      if (loadedCount >= 3) {
        assetsReady = true;
        if (motionQuery.matches) {
          stepAndRender(performance.now());
        } else {
          startLoop();
        }
      }
    };

    bgImg.onload = handleAssetLoad;
    sharpSheet.onload = handleAssetLoad;
    bokehSheet.onload = handleAssetLoad;
    bgImg.src = '/videos/rbc-plasma-bg.jpg';
    sharpSheet.src = '/videos/rbc-sprites.png';
    bokehSheet.src = '/videos/rbc-sprites-bokeh.png';

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => resizeCanvas())
        : null;
    if (resizeObserver && canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    } else {
      window.addEventListener('resize', resizeCanvas);
    }

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        stopLoop();
      } else {
        startLoop();
      }
    };

    resizeCanvas();
    motionQuery.addEventListener('change', handleMotionChange);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      isDisposed = true;
      stopLoop();
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', resizeCanvas);
      }
      motionQuery.removeEventListener('change', handleMotionChange);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      className={className}
    />
  );
}
