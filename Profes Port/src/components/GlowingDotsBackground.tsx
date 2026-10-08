import React, { useEffect, useRef } from 'react';

interface ColorSpec {
  r: number;
  g: number;
  b: number;
  hex: string;
}

interface Dot {
  x: number;
  y: number;
  baseRadius: number;
  color: ColorSpec;
  alpha: number;
  alphaSpeed: number;
  vx: number;
  vy: number;
  pulsePhase: number;
}

interface GlowingDotsBackgroundProps {
  className?: string;
  variant?: 'contained' | 'fixed';
  interactive?: boolean;
  density?: number;
  showConstellations?: boolean;
  maxLinkDistance?: number;
  cursorReachDistance?: number;
}

const colorPalettes: ColorSpec[] = [
  { r: 255, g: 255, b: 255, hex: '#ffffff' },
  { r: 0,   g: 223, b: 216, hex: '#00dfd8' },
  { r: 168, g: 85,  b: 247, hex: '#a855f7' },
  { r: 56,  g: 189, b: 248, hex: '#38bdf8' },
  { r: 52,  g: 211, b: 153, hex: '#34d399' },
  { r: 129, g: 140, b: 248, hex: '#818cf8' },
];

export default function GlowingDotsBackground({
  className = 'fixed inset-0 pointer-events-none z-0',
  variant = 'fixed',
  interactive = true,
  density = 16000,
  showConstellations = true,
  maxLinkDistance = 120,
  cursorReachDistance = 180,
}: GlowingDotsBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    let mouseX = -9999;
    let mouseY = -9999;
    let cursorPulse = 0;
    let isScrolling = false;
    let scrollTimeout: number | undefined;

    const parent = canvas.parentElement;

    const updateSize = () => {
      if (variant === 'contained' && parent) {
        width = canvas.width = parent.clientWidth || window.innerWidth;
        height = canvas.height = parent.clientHeight || window.innerHeight;
      } else {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      }
    };

    updateSize();

    let dots: Dot[] = [];

    const initDots = () => {
      // Balanced density for high performance & stunning visual aesthetic (avoid CPU/GPU freeze)
      const count = Math.min(70, Math.max(28, Math.floor((width * height) / density)));
      dots = [];
      for (let i = 0; i < count; i++) {
        const c = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
        const isProminent = Math.random() < 0.25;
        const r = isProminent ? Math.random() * 1.4 + 2.2 : Math.random() * 1.0 + 1.2;
        dots.push({
          x: Math.random() * width,
          y: Math.random() * height,
          baseRadius: r,
          color: c,
          alpha: Math.random() * 0.45 + 0.4,
          alphaSpeed: (Math.random() * 0.012 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }
    };

    initDots();

    // Resize handling with debouncing
    let resizeTimer: number;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        updateSize();
        initDots();
      }, 150);
    };

    let resizeObserver: ResizeObserver | null = null;
    if (variant === 'contained' && parent && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(parent);
    } else {
      window.addEventListener('resize', handleResize, { passive: true });
    }

    // Precise mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      if (variant === 'contained') {
        const rect = canvas.getBoundingClientRect();
        if (
          e.clientX >= rect.left &&
          e.clientX <= rect.right &&
          e.clientY >= rect.top &&
          e.clientY <= rect.bottom
        ) {
          mouseX = e.clientX - rect.left;
          mouseY = e.clientY - rect.top;
        } else {
          mouseX = -9999;
          mouseY = -9999;
        }
      } else {
        mouseX = e.clientX;
        mouseY = e.clientY;
      }
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    // Scroll listener: optimize while scrolling to prevent hanging
    const handleScroll = () => {
      isScrolling = true;
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      scrollTimeout = window.setTimeout(() => {
        isScrolling = false;
      }, 100);
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
      document.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('scroll', handleScroll, { passive: true });
    }

    const maxLinkDistSq = maxLinkDistance * maxLinkDistance;
    const cursorReachSq = cursorReachDistance * cursorReachDistance;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const dotCount = dots.length;
      cursorPulse += 0.04;

      const isCursorActive =
        interactive && !isScrolling && mouseX > -500 && mouseY > -500 && mouseX <= width + 500;

      // 1. CONSTELLATION LINK LINES (Optimized: distance-squared check, no costly shadowBlur)
      if (showConstellations) {
        for (let i = 0; i < dotCount; i++) {
          const d1 = dots[i];
          for (let j = i + 1; j < dotCount; j++) {
            const d2 = dots[j];
            const dx = d1.x - d2.x;
            const dy = d1.y - d2.y;
            const distSq = dx * dx + dy * dy;

            if (distSq < maxLinkDistSq) {
              const dist = Math.sqrt(distSq);
              const linkRatio = 1 - dist / maxLinkDistance;
              const linkAlpha = linkRatio * 0.35 * Math.min(d1.alpha, d2.alpha);

              ctx.beginPath();
              ctx.moveTo(d1.x, d1.y);
              ctx.lineTo(d2.x, d2.y);
              ctx.strokeStyle = `rgba(${d1.color.r}, ${d1.color.g}, ${d1.color.b}, ${linkAlpha})`;
              ctx.lineWidth = 1 + linkRatio * 0.8;
              ctx.stroke();
            }
          }
        }
      }

      // 2. CURSOR LASER BEAMS & RETICLE (Hardware accelerated, zero blur bottlenecks)
      if (isCursorActive) {
        for (let i = 0; i < dotCount; i++) {
          const d = dots[i];
          const mdx = d.x - mouseX;
          const mdy = d.y - mouseY;
          const mDistSq = mdx * mdx + mdy * mdy;

          if (mDistSq < cursorReachSq) {
            const mDist = Math.sqrt(mDistSq);
            const proximity = 1 - mDist / cursorReachDistance;
            const lineAlpha = proximity * 0.75;
            const lineWidth = 1.2 + proximity * 1.5;

            ctx.beginPath();
            ctx.moveTo(mouseX, mouseY);
            ctx.lineTo(d.x, d.y);
            ctx.strokeStyle = `rgba(0, 223, 216, ${lineAlpha})`;
            ctx.lineWidth = lineWidth;
            ctx.stroke();

            // Magnetic attraction
            d.x -= (mdx / mDist) * proximity * 0.5;
            d.y -= (mdy / mDist) * proximity * 0.5;
          }
        }

        // Reticle
        const haloRadius = 10 + Math.sin(cursorPulse) * 2.5;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, haloRadius, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(0, 223, 216, 0.7)';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      // 3. GLOWING DOTS (Concentric circle glow: 100x faster than canvas shadowBlur!)
      for (let i = 0; i < dotCount; i++) {
        const d = dots[i];

        // Motion drift
        d.x += d.vx;
        d.y += d.vy;

        // Screen boundary wrapping
        if (d.x < -15) d.x = width + 15;
        if (d.x > width + 15) d.x = -15;
        if (d.y < -15) d.y = height + 15;
        if (d.y > height + 15) d.y = -15;

        // Pulsing alpha
        d.pulsePhase += 0.02;
        d.alpha += d.alphaSpeed;
        if (d.alpha > 0.95) {
          d.alpha = 0.95;
          d.alphaSpeed = -Math.abs(d.alphaSpeed);
        } else if (d.alpha < 0.25) {
          d.alpha = 0.25;
          d.alphaSpeed = Math.abs(d.alphaSpeed);
        }

        let proximityBoost = 0;
        if (isCursorActive) {
          const mdx = d.x - mouseX;
          const mdy = d.y - mouseY;
          const mDistSq = mdx * mdx + mdy * mdy;
          if (mDistSq < cursorReachSq) {
            proximityBoost = 1 - Math.sqrt(mDistSq) / cursorReachDistance;
          }
        }

        const dynamicRadius =
          d.baseRadius * (1 + 0.2 * Math.sin(d.pulsePhase) + proximityBoost * 0.5);
        const finalAlpha = Math.min(1, d.alpha + proximityBoost * 0.4);

        const { r, g, b } = d.color;

        // Outer soft glow halo
        ctx.beginPath();
        ctx.arc(d.x, d.y, dynamicRadius * 2.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha * 0.22})`;
        ctx.fill();

        // Mid glow ring
        ctx.beginPath();
        ctx.arc(d.x, d.y, dynamicRadius * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalAlpha * 0.55})`;
        ctx.fill();

        // Radiant white core
        ctx.beginPath();
        ctx.arc(d.x, d.y, dynamicRadius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else {
        window.removeEventListener('resize', handleResize);
      }
      if (interactive) {
        window.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseleave', handleMouseLeave);
        window.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeout) window.clearTimeout(scrollTimeout);
      cancelAnimationFrame(animationFrameId);
    };
  }, [variant, interactive, density, showConstellations, maxLinkDistance, cursorReachDistance]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      aria-hidden="true"
    />
  );
}
