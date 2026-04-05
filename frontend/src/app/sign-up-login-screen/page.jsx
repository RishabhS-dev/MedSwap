'use client';
import { useEffect, useRef } from 'react';
import AuthCard from './components/AuthCard';

export default function SignUpLoginPage() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef?.current;
    if (!canvas) return;
    const ctx = canvas?.getContext('2d');
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 2.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
      particles?.forEach(p => {
        ctx?.beginPath();
        ctx?.arc(p?.x, p?.y, p?.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(11,110,110,${p?.alpha})`;
        ctx?.fill();
        p.x += p?.dx;
        p.y += p?.dy;
        if (p?.x < 0 || p?.x > canvas?.width) p.dx *= -1;
        if (p?.y < 0 || p?.y > canvas?.height) p.dy *= -1;
      });
      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-bg-shift"
        style={{
          background:
            'linear-gradient(135deg, #e8f5f5 0%, #f0fafa 30%, #fef9ec 60%, #e8f5f5 100%)',
          backgroundSize: '400% 400%',
        }}
      />

      {/* Canvas particles */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }} />

      {/* Decorative blobs */}
      <div className="absolute top-[-80px] left-[-80px] w-[420px] h-[420px] bg-primary/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ zIndex: 1 }} />
      <div className="absolute bottom-[-80px] right-[-80px] w-[380px] h-[380px] bg-accent/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" style={{ zIndex: 1, animationDelay: '1.5s' }} />
      <div className="absolute top-1/2 left-1/4 w-[200px] h-[200px] bg-primary/5 rounded-full blur-2xl pointer-events-none" style={{ zIndex: 1 }} />

      {/* Floating medical cross icons */}
      <div className="absolute top-[12%] right-[8%] opacity-10 pointer-events-none animate-float" style={{ zIndex: 1 }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <rect x="18" y="4" width="12" height="40" rx="4" fill="#0B6E6E"/>
          <rect x="4" y="18" width="40" height="12" rx="4" fill="#0B6E6E"/>
        </svg>
      </div>
      <div className="absolute bottom-[18%] left-[6%] opacity-8 pointer-events-none animate-float" style={{ zIndex: 1, animationDelay: '2s' }}>
        <svg width="36" height="36" viewBox="0 0 48 48" fill="none">
          <rect x="18" y="4" width="12" height="40" rx="4" fill="#F0A500"/>
          <rect x="4" y="18" width="40" height="12" rx="4" fill="#F0A500"/>
        </svg>
      </div>
      <div className="absolute top-[55%] right-[4%] opacity-6 pointer-events-none animate-float" style={{ zIndex: 1, animationDelay: '1s' }}>
        <svg width="28" height="28" viewBox="0 0 48 48" fill="none">
          <rect x="18" y="4" width="12" height="40" rx="4" fill="#0B6E6E"/>
          <rect x="4" y="18" width="40" height="12" rx="4" fill="#0B6E6E"/>
        </svg>
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          zIndex: 1,
          backgroundImage: 'linear-gradient(#0B6E6E 1px, transparent 1px), linear-gradient(90deg, #0B6E6E 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Auth card */}
      <div className="relative w-full max-w-md" style={{ zIndex: 10 }}>
        <AuthCard />
      </div>
    </div>
  );
}