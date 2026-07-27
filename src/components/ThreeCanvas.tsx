import React, { useEffect, useRef } from 'react';
import { ThemeMode } from '../types';

interface ThreeCanvasProps {
  theme: ThemeMode;
}

interface Point {
  x: number;
  y: number;
}

interface TracePath {
  points: Point[];
  width: number;
  color: string;
}

interface Pulse {
  pathIndex: number;
  segmentIndex: number;
  progress: number;
  speed: number;
  color: string;
  size: number;
  trail: Point[];
  length: number;
}

interface ChipBlock {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  pins: Point[];
}

interface Via {
  x: number;
  y: number;
  radius: number;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    let mouseX = -1000;
    let mouseY = -1000;

    const isDark = theme === 'dark';

    // Neon-Pink Futuristic Dark Palette
    const palette = isDark
      ? {
          bg: '#0a0212', // Deep cosmic pink-violet black
          gridLine: 'rgba(236, 72, 153, 0.08)',
          traceDefault: 'rgba(255, 42, 133, 0.22)',
          traceActive: 'rgba(244, 63, 94, 0.5)',
          chipBg: 'rgba(24, 9, 38, 0.85)',
          chipBorder: 'rgba(255, 42, 133, 0.5)',
          chipText: '#ff2a85',
          pinColor: '#d946ef',
          viaFill: '#130424',
          viaStroke: '#f43f5e',
          pulses: ['#ff2a85', '#f43f5e', '#ec4899', '#d946ef', '#00f0ff', '#a855f7'],
        }
      : {
          bg: '#faf5ff',
          gridLine: 'rgba(236, 72, 153, 0.12)',
          traceDefault: 'rgba(244, 63, 94, 0.25)',
          traceActive: 'rgba(225, 29, 72, 0.5)',
          chipBg: 'rgba(255, 255, 255, 0.9)',
          chipBorder: 'rgba(236, 72, 153, 0.45)',
          chipText: '#e11d48',
          pinColor: '#9333ea',
          viaFill: '#f3e8ff',
          viaStroke: '#e11d48',
          pulses: ['#e11d48', '#d946ef', '#0284c7', '#7c3aed'],
        };

    let chips: ChipBlock[] = [];
    let traces: TracePath[] = [];
    let vias: Via[] = [];
    let pulses: Pulse[] = [];

    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      initCircuit();
    };

    const initCircuit = () => {
      chips = [];
      traces = [];
      vias = [];
      pulses = [];

      const gridSize = 36;
      const cols = Math.floor(width / gridSize);
      const rows = Math.floor(height / gridSize);

      const chipLabels = [
        'ARTIX-7 FPGA',
        'STM32H7 MCU',
        'GaN HEMT DRIVER',
        'DSP RADIX-4',
        'OPTICAL WDM',
        'RISC-V RV32I',
      ];
      const numChips = Math.min(chipLabels.length, Math.max(3, Math.floor(width / 320)));

      const chipPositions = [
        { cx: Math.floor(cols * 0.2), cy: Math.floor(rows * 0.22), w: 3, h: 3 },
        { cx: Math.floor(cols * 0.78), cy: Math.floor(rows * 0.25), w: 4, h: 3 },
        { cx: Math.floor(cols * 0.25), cy: Math.floor(rows * 0.72), w: 3, h: 4 },
        { cx: Math.floor(cols * 0.75), cy: Math.floor(rows * 0.7), w: 3, h: 3 },
        { cx: Math.floor(cols * 0.5), cy: Math.floor(rows * 0.48), w: 4, h: 4 },
      ];

      chipPositions.slice(0, numChips).forEach((pos, idx) => {
        const x = pos.cx * gridSize;
        const y = pos.cy * gridSize;
        const w = pos.w * gridSize;
        const h = pos.h * gridSize;
        const pins: Point[] = [];

        for (let px = x + 8; px <= x + w - 8; px += 14) {
          pins.push({ x: px, y: y });
          pins.push({ x: px, y: y + h });
        }
        for (let py = y + 8; py <= y + h - 8; py += 14) {
          pins.push({ x: x, y: py });
          pins.push({ x: x + w, y: py });
        }

        chips.push({
          x,
          y,
          width: w,
          height: h,
          label: chipLabels[idx % chipLabels.length],
          pins,
        });
      });

      const startPoints: Point[] = [];
      chips.forEach((c) => startPoints.push(...c.pins));

      for (let i = 0; i < 30; i++) {
        startPoints.push({
          x: Math.floor(Math.random() * (cols - 2) + 1) * gridSize,
          y: Math.floor(Math.random() * (rows - 2) + 1) * gridSize,
        });
      }

      const numTraces = Math.min(75, Math.floor((width * height) / 16000));

      for (let i = 0; i < numTraces; i++) {
        const start = startPoints[Math.floor(Math.random() * startPoints.length)];
        const points: Point[] = [{ x: start.x, y: start.y }];

        let currX = start.x;
        let currY = start.y;
        const segments = Math.floor(Math.random() * 4) + 2;

        for (let s = 0; s < segments; s++) {
          const dir = Math.floor(Math.random() * 4);
          const dist = (Math.floor(Math.random() * 4) + 2) * gridSize;

          if (dir === 0) currX += dist;
          else if (dir === 1) currX -= dist;
          else if (dir === 2) currY += dist;
          else currY -= dist;

          currX = Math.max(15, Math.min(width - 15, currX));
          currY = Math.max(15, Math.min(height - 15, currY));

          if (Math.random() > 0.45) {
            const diagOffset = Math.min(36, dist / 2);
            points.push({ x: currX - diagOffset, y: currY - diagOffset });
          }

          points.push({ x: currX, y: currY });
        }

        if (points.length >= 2) {
          traces.push({
            points,
            width: Math.random() > 0.8 ? 2.5 : 1.5,
            color: palette.traceDefault,
          });

          const lastPt = points[points.length - 1];
          vias.push({ x: lastPt.x, y: lastPt.y, radius: 3 });
        }
      }

      const pulseCount = Math.min(35, traces.length);
      for (let i = 0; i < pulseCount; i++) {
        spawnPulse(Math.floor(Math.random() * traces.length));
      }
    };

    const spawnPulse = (pathIndex: number, startFromSegment = 0) => {
      if (!traces[pathIndex] || traces[pathIndex].points.length < 2) return;
      const color = palette.pulses[Math.floor(Math.random() * palette.pulses.length)];

      pulses.push({
        pathIndex,
        segmentIndex: startFromSegment,
        progress: 0,
        speed: 0.009 + Math.random() * 0.014,
        color,
        size: 2.8 + Math.random() * 1.5,
        trail: [],
        length: 10 + Math.floor(Math.random() * 10),
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (Math.random() > 0.35 && traces.length > 0) {
        for (let i = 0; i < traces.length; i++) {
          const pt = traces[i].points[0];
          const dist = Math.hypot(pt.x - mouseX, pt.y - mouseY);
          if (dist < 160) {
            spawnPulse(i, 0);
            break;
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    handleResize();

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Circuit Background & Grid
      ctx.fillStyle = palette.bg;
      ctx.fillRect(0, 0, width, height);

      ctx.strokeStyle = palette.gridLine;
      ctx.lineWidth = 1;
      const gridSize = 36;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // 2. Motherboard Circuit Copper Traces
      traces.forEach((trace) => {
        ctx.beginPath();
        ctx.moveTo(trace.points[0].x, trace.points[0].y);
        for (let i = 1; i < trace.points.length; i++) {
          ctx.lineTo(trace.points[i].x, trace.points[i].y);
        }
        ctx.strokeStyle = trace.color;
        ctx.lineWidth = trace.width;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
      });

      // 3. Vias (Solder drill points)
      vias.forEach((via) => {
        ctx.beginPath();
        ctx.arc(via.x, via.y, via.radius + 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = palette.viaStroke;
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(via.x, via.y, via.radius - 0.5, 0, Math.PI * 2);
        ctx.fillStyle = palette.viaFill;
        ctx.fill();
      });

      // 4. IC Chips
      chips.forEach((chip) => {
        ctx.shadowColor = palette.chipBorder;
        ctx.shadowBlur = 12;

        ctx.fillStyle = palette.chipBg;
        ctx.strokeStyle = palette.chipBorder;
        ctx.lineWidth = 1.5;

        ctx.fillRect(chip.x, chip.y, chip.width, chip.height);
        ctx.strokeRect(chip.x, chip.y, chip.width, chip.height);

        ctx.shadowBlur = 0;

        ctx.beginPath();
        ctx.arc(chip.x + 8, chip.y + 8, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = palette.chipText;
        ctx.fill();

        ctx.fillStyle = palette.chipText;
        ctx.font = '8px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(chip.label, chip.x + chip.width / 2, chip.y + chip.height / 2);

        chip.pins.forEach((pin) => {
          ctx.fillStyle = palette.pinColor;
          ctx.fillRect(pin.x - 2, pin.y - 2, 4, 4);
        });
      });

      // 5. Electron Current Pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const pulse = pulses[i];
        const trace = traces[pulse.pathIndex];

        if (!trace || trace.points.length < 2) {
          pulses.splice(i, 1);
          continue;
        }

        const p1 = trace.points[pulse.segmentIndex];
        const p2 = trace.points[pulse.segmentIndex + 1];

        if (!p1 || !p2) {
          pulses.splice(i, 1);
          continue;
        }

        const currentX = p1.x + (p2.x - p1.x) * pulse.progress;
        const currentY = p1.y + (p2.y - p1.y) * pulse.progress;

        pulse.trail.unshift({ x: currentX, y: currentY });
        if (pulse.trail.length > pulse.length) {
          pulse.trail.pop();
        }

        ctx.shadowColor = pulse.color;
        ctx.shadowBlur = 14;

        ctx.beginPath();
        ctx.arc(currentX, currentY, pulse.size, 0, Math.PI * 2);
        ctx.fillStyle = pulse.color;
        ctx.fill();

        ctx.beginPath();
        if (pulse.trail.length > 0) {
          ctx.moveTo(pulse.trail[0].x, pulse.trail[0].y);
          for (let t = 1; t < pulse.trail.length; t++) {
            ctx.lineTo(pulse.trail[t].x, pulse.trail[t].y);
          }
        }
        ctx.strokeStyle = pulse.color;
        ctx.lineWidth = pulse.size * 0.85;
        ctx.lineCap = 'round';
        ctx.stroke();

        ctx.shadowBlur = 0;

        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulse.progress = 0;
          pulse.segmentIndex++;

          if (pulse.segmentIndex >= trace.points.length - 1) {
            pulses.splice(i, 1);
            if (pulses.length < 45) {
              spawnPulse(Math.floor(Math.random() * traces.length));
            }
          }
        }
      }

      // 6. Interactive Cursor Pointer Pulse
      if (mouseX > 0 && mouseY > 0) {
        ctx.shadowColor = palette.pulses[0];
        ctx.shadowBlur = 16;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = palette.pulses[0];
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
      {/* Background Backdrop Blur Layer for High Contrast Web Reading */}
      <div className="absolute inset-0 bg-slate-950/40 backdrop-blur-[4px]" />
    </div>
  );
};
