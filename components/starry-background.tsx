'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  hue: number;
  twinkleSpeed: number;
}

interface Cloud {
  x: number;
  y: number;
  width: number;
  height: number;
  speedX: number;
  opacity: number;
  puffs: { offsetX: number; offsetY: number; rx: number; ry: number }[];
}

const DualSkyBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    // Detect theme
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let stars: Star[] = [];
    let clouds: Cloud[] = [];
    let animationFrameId: number;
    let scrollY = 0;
    
    // Transition factors (0 to 1)
    let nightFactor = isDark ? 1 : 0;
    let dayFactor = isDark ? 0 : 1;

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initElements();
    };

    const initElements = () => {
      // Init Stars
      stars = [];
      const starCount = Math.floor((canvas.width * canvas.height) / 2000);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2 + 0.5,
          speedX: (Math.random() - 0.5) * 0.1,
          speedY: (Math.random() - 0.5) * 0.1,
          opacity: Math.random(),
          hue: Math.random() * 360,
          twinkleSpeed: Math.random() * 0.02 + 0.01,
        });
      }

      // Init Clouds
      clouds = [];
      const cloudCount = 8;
      for (let i = 0; i < cloudCount; i++) {
        const w = Math.random() * 200 + 150;
        const h = Math.random() * 100 + 50;
        
        // Pre-generate puffs for this cloud to ensure stable shape
        const puffs = [];
        const puffCount = 12;
        for (let j = 0; j < puffCount; j++) {
          puffs.push({
            offsetX: (j * (w / puffCount)) + (Math.random() * 20 - 10),
            offsetY: (Math.random() * (h * 0.4) - (h * 0.2)),
            rx: (Math.random() * 0.3 + 0.5) * (w / 3),
            ry: (Math.random() * 0.2 + 0.3) * h
          });
        }

        clouds.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          width: w,
          height: h,
          speedX: Math.random() * 0.15 + 0.05,
          opacity: Math.random() * 0.4 + 0.2,
          puffs: puffs
        });
      }
    };

    const drawCloud = (cloud: Cloud, scrollOffset: number) => {
      const cloudOpacity = cloud.opacity * dayFactor;
      if (cloudOpacity < 0.01) return;

      ctx.save();
      
      // Use shadow blur for a "glowy" fluffy effect
      ctx.shadowColor = `rgba(255, 255, 255, ${cloudOpacity * 0.3})`;
      ctx.shadowBlur = 40;

      // Pre-parallax calculation
      const parallaxOffset = scrollOffset * (cloud.width * 0.001);
      let drawY = (cloud.y - parallaxOffset) % canvas.height;
      if (drawY < 0) drawY += canvas.height;

      // Draw all puffs as ONE single path
      ctx.beginPath();
      ctx.fillStyle = `rgba(255, 255, 255, ${cloudOpacity})`;
      
      cloud.puffs.forEach(puff => {
        // Move to the start of the ellipse to avoid connecting lines
        ctx.moveTo(cloud.x + puff.offsetX + puff.rx, drawY + puff.offsetY);
        ctx.ellipse(cloud.x + puff.offsetX, drawY + puff.offsetY, puff.rx, puff.ry, 0, 0, Math.PI * 2);
      });

      ctx.fill();

      ctx.restore();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Smooth transition for factors
      const targetNight = isDark ? 1 : 0;
      const targetDay = isDark ? 0 : 1;
      nightFactor += (targetNight - nightFactor) * 0.05;
      dayFactor += (targetDay - dayFactor) * 0.05;

      // Background Gradients
      const nightGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      nightGradient.addColorStop(0, '#0a0a1a');
      nightGradient.addColorStop(1, '#020205');

      const dayGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      dayGradient.addColorStop(0, '#87CEEB');
      dayGradient.addColorStop(1, '#E0F7FA');

      // Draw blended background
      ctx.globalAlpha = nightFactor;
      ctx.fillStyle = nightGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = dayFactor;
      ctx.fillStyle = dayGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.globalAlpha = 1;

      // Draw Stars (Night)
      if (nightFactor > 0.01) {
        stars.forEach((star) => {
          const parallaxOffset = scrollY * (star.size * 0.15);
          let drawY = (star.y - parallaxOffset) % canvas.height;
          if (drawY < 0) drawY += canvas.height;

          // Twinkle effect (shifting size and hue)
          const currentOpacity = star.opacity * nightFactor * (0.6 + Math.sin(Date.now() * star.twinkleSpeed) * 0.4);
          const currentHue = (star.hue + Date.now() * 0.05) % 360;

          ctx.beginPath();
          ctx.arc(star.x, drawY, star.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${currentHue}, 80%, 90%, ${currentOpacity})`;
          ctx.fill();

          // Diffraction Spikes for larger stars
          if (star.size > 1.5) {
            ctx.save();
            ctx.translate(star.x, drawY);
            ctx.rotate(Math.PI / 4); // 45 degree tilt for a nice "X" or cross
            
            const spikeLength = star.size * 6;
            const spikeWidth = star.size * 0.2;
            
            ctx.fillStyle = `hsla(${currentHue}, 80%, 90%, ${currentOpacity * 0.5})`;
            
            // Horizontal spike
            ctx.fillRect(-spikeLength / 2, -spikeWidth / 2, spikeLength, spikeWidth);
            // Vertical spike
            ctx.fillRect(-spikeWidth / 2, -spikeLength / 2, spikeWidth, spikeLength);
            
            ctx.restore();
          }

          star.x += star.speedX;
          star.y += star.speedY;

          if (star.x < 0) star.x = canvas.width;
          if (star.x > canvas.width) star.x = 0;
          if (star.y < 0) star.y = canvas.height;
          if (star.y > canvas.height) star.y = 0;
        });
      }

      // Draw Clouds (Day)
      if (dayFactor > 0.01) {
        clouds.forEach((cloud) => {
          drawCloud(cloud, scrollY);
          cloud.x += cloud.speedX;
          if (cloud.x > canvas.width + cloud.width) cloud.x = -cloud.width;
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('scroll', handleScroll, { passive: true });
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-20 w-full h-full pointer-events-none transition-opacity duration-1000"
      style={{ backgroundColor: isDark ? '#020205' : '#E0F7FA' }}
    />
  );
};

export default DualSkyBackground;
