import { useEffect, useRef } from 'react';

const PIGEON_SIZE = 64;
const SPEED = 3;

// 여성 비둘기 (긴 머리)
function drawFemalePigeon(ctx, x, y, dir, legPhase) {
  ctx.save();
  ctx.translate(x, y);
  if (dir < 0) ctx.scale(-1, 1);

  // 긴 머리카락 (뒤로 흘러내림)
  ctx.fillStyle = '#3a1a0a';
  ctx.beginPath();
  ctx.ellipse(-2, -8, 16, 22, 0.2, 0, Math.PI * 2);
  ctx.fill();
  // 앞머리
  ctx.beginPath();
  ctx.ellipse(4, -20, 10, 8, -0.3, 0, Math.PI * 2);
  ctx.fill();

  // 다리
  ctx.strokeStyle = '#B0A0FF';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  const legSwing = Math.sin(legPhase) * 8;
  ctx.beginPath(); ctx.moveTo(-8, 22); ctx.lineTo(-12 + legSwing, 38); ctx.lineTo(-8 + legSwing, 42); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(8, 22); ctx.lineTo(12 - legSwing, 38); ctx.lineTo(8 - legSwing, 42); ctx.stroke();

  // 팔
  const armSwing = Math.sin(legPhase * 1.5) * 10;
  ctx.strokeStyle = '#FF9BB0';
  ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(-12, 2); ctx.lineTo(-28, -4 + armSwing); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(12, 2); ctx.lineTo(28, -4 - armSwing); ctx.stroke();

  // 몸통 (핑크 계열)
  ctx.fillStyle = '#CC6F9B';
  ctx.beginPath();
  ctx.ellipse(0, 8, 18, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // 머리
  ctx.fillStyle = '#E896C0';
  ctx.beginPath();
  ctx.arc(0, -10, 14, 0, Math.PI * 2);
  ctx.fill();

  // 눈 (속눈썹)
  ctx.fillStyle = 'white';
  ctx.beginPath(); ctx.arc(6, -12, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1a1a2e';
  ctx.beginPath(); ctx.arc(7, -12, 2, 0, Math.PI * 2); ctx.fill();
  // 속눈썹
  ctx.strokeStyle = '#1a1a2e';
  ctx.lineWidth = 1.5;
  for (let i = 0; i < 3; i++) {
    ctx.beginPath();
    ctx.moveTo(4 + i * 2, -16);
    ctx.lineTo(3 + i * 2, -19);
    ctx.stroke();
  }

  // 볼터치
  ctx.fillStyle = 'rgba(255,150,150,0.4)';
  ctx.beginPath(); ctx.ellipse(2, -8, 5, 3, 0, 0, Math.PI * 2); ctx.fill();

  // 부리
  ctx.fillStyle = '#FFD93D';
  ctx.beginPath(); ctx.moveTo(13, -10); ctx.lineTo(20, -8); ctx.lineTo(13, -6); ctx.closePath(); ctx.fill();

  ctx.restore();
}

// 남성 비둘기 (스포츠머리)
function drawMalePigeon(ctx, x, y, dir, legPhase) {
  ctx.save();
  ctx.translate(x, y);
  if (dir < 0) ctx.scale(-1, 1);

  // 스포츠 머리 (짧고 각진)
  ctx.fillStyle = '#2a1a0a';
  ctx.beginPath();
  ctx.roundRect(-12, -26, 24, 14, [6, 6, 2, 2]);
  ctx.fill();
  // 옆머리 라인
  ctx.strokeStyle = '#1a0a00';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-12, -18); ctx.lineTo(-14, -14); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(12, -18); ctx.lineTo(14, -14); ctx.stroke();

  // 다리
  ctx.strokeStyle = '#A0C0FF';
  ctx.lineWidth = 3;
  ctx.lineCap = 'round';
  const legSwing = Math.sin(legPhase) * 8;
  ctx.beginPath(); ctx.moveTo(-8, 22); ctx.lineTo(-12 + legSwing, 38); ctx.lineTo(-8 + legSwing, 42); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(8, 22); ctx.lineTo(12 - legSwing, 38); ctx.lineTo(8 - legSwing, 42); ctx.stroke();

  // 팔 (더 굵게)
  const armSwing = Math.sin(legPhase * 1.5) * 10;
  ctx.strokeStyle = '#6B9BFF';
  ctx.lineWidth = 5;
  ctx.beginPath(); ctx.moveTo(-12, 2); ctx.lineTo(-28, -4 + armSwing); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(12, 2); ctx.lineTo(28, -4 - armSwing); ctx.stroke();

  // 몸통 (파란 계열, 더 넓음)
  ctx.fillStyle = '#4A6FCC';
  ctx.beginPath();
  ctx.ellipse(0, 8, 20, 16, 0, 0, Math.PI * 2);
  ctx.fill();

  // 머리
  ctx.fillStyle = '#6B8FFF';
  ctx.beginPath();
  ctx.arc(0, -10, 14, 0, Math.PI * 2);
  ctx.fill();

  // 눈 (눈썹 있음)
  ctx.fillStyle = 'white';
  ctx.beginPath(); ctx.arc(6, -12, 4, 0, Math.PI * 2); ctx.fill();
  ctx.fillStyle = '#1a1a2e';
  ctx.beginPath(); ctx.arc(7, -12, 2.5, 0, Math.PI * 2); ctx.fill();
  // 눈썹
  ctx.strokeStyle = '#2a1a0a';
  ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(3, -17); ctx.lineTo(10, -16); ctx.stroke();

  // 부리
  ctx.fillStyle = '#FFD93D';
  ctx.beginPath(); ctx.moveTo(13, -10); ctx.lineTo(21, -8); ctx.lineTo(13, -6); ctx.closePath(); ctx.fill();

  ctx.restore();
}

function initPigeons(w, h) {
  return [
    { x: 100, y: 100, vx: SPEED, vy: SPEED * 0.7, legPhase: 0, gender: 'female' },
    { x: w - 100, y: 200, vx: -SPEED * 0.8, vy: SPEED, legPhase: 1, gender: 'female' },
    { x: 200, y: h - 100, vx: SPEED * 0.9, vy: -SPEED, legPhase: 2, gender: 'male' },
    { x: w - 150, y: h - 150, vx: -SPEED, vy: -SPEED * 0.8, legPhase: 3, gender: 'male' },
  ];
}

function BouncingPigeons() {
  const canvasRef = useRef(null);
  const pigeonsRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      if (!pigeonsRef.current) {
        pigeonsRef.current = initPigeons(canvas.width, canvas.height);
      }
    };
    resize();
    window.addEventListener('resize', resize);

    const loop = () => {
      const { width: W, height: H } = canvas;
      ctx.clearRect(0, 0, W, H);

      const pigeons = pigeonsRef.current;

      for (const p of pigeons) {
        p.x += p.vx;
        p.y += p.vy;
        p.legPhase += 0.15;

        if (p.x - PIGEON_SIZE / 2 < 0) { p.x = PIGEON_SIZE / 2; p.vx = Math.abs(p.vx); }
        if (p.x + PIGEON_SIZE / 2 > W) { p.x = W - PIGEON_SIZE / 2; p.vx = -Math.abs(p.vx); }
        if (p.y - PIGEON_SIZE / 2 < 0) { p.y = PIGEON_SIZE / 2; p.vy = Math.abs(p.vy); }
        if (p.y + PIGEON_SIZE / 2 > H) { p.y = H - PIGEON_SIZE / 2; p.vy = -Math.abs(p.vy); }
      }

      // 충돌 감지
      for (let i = 0; i < pigeons.length; i++) {
        for (let j = i + 1; j < pigeons.length; j++) {
          const a = pigeons[i], b = pigeons[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < PIGEON_SIZE && dist > 0) {
            const nx = dx / dist, ny = dy / dist;
            const dvx = a.vx - b.vx, dvy = a.vy - b.vy;
            const dot = dvx * nx + dvy * ny;
            a.vx -= dot * nx; a.vy -= dot * ny;
            b.vx += dot * nx; b.vy += dot * ny;
            const overlap = PIGEON_SIZE - dist;
            a.x -= nx * overlap / 2; a.y -= ny * overlap / 2;
            b.x += nx * overlap / 2; b.y += ny * overlap / 2;
          }
        }
      }

      for (const p of pigeons) {
        if (p.gender === 'female') {
          drawFemalePigeon(ctx, p.x, p.y, p.vx, p.legPhase);
        } else {
          drawMalePigeon(ctx, p.x, p.y, p.vx, p.legPhase);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    loop();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}
    />
  );
}

export default BouncingPigeons;
