'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Pause, Play } from 'lucide-react';

function NeuralSculpture() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const rotation = useRef({ x: -.22, y: .4 });
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const q = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setPaused(q.matches);
    update(); q.addEventListener('change', update);
    return () => q.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    const ctx = el.getContext('2d');
    if (!ctx) return;
    let width = 0, height = 0, frame = 0, previous = 0;
    const points = Array.from({ length: 480 }, (_, i) => {
      const y = 1 - 2 * (i + .5) / 480, a = i * Math.PI * (3 - Math.sqrt(5));
      const radius = Math.sqrt(1 - y * y), ripple = 1 + .11 * Math.sin(a * 3 + y * 9);
      return { x: Math.cos(a) * radius * ripple, y: y * 1.12, z: Math.sin(a) * radius * ripple };
    });
    const edges: [number, number][] = [];
    points.forEach((a, i) => points.forEach((b, j) => {
      if (j > i && Math.hypot(a.x - b.x, a.y - b.y, a.z - b.z) < .225) edges.push([i, j]);
    }));
    function draw(time: number) {
      if (!ctx) return;
      const dt = previous ? Math.min(time - previous, 40) : 0; previous = time;
      if (!paused) rotation.current.y += dt * .00009;
      ctx.clearRect(0, 0, width, height);
      const { x: rx, y: ry } = rotation.current, scale = Math.min(width * .36, height * .37);
      const projected = points.map(p => {
        const x = p.x * Math.cos(ry) + p.z * Math.sin(ry), z1 = -p.x * Math.sin(ry) + p.z * Math.cos(ry);
        const y = p.y * Math.cos(rx) - z1 * Math.sin(rx), z = p.y * Math.sin(rx) + z1 * Math.cos(rx);
        const perspective = 3.8 / (3.8 - z);
        return { x: width / 2 + x * scale * perspective, y: height / 2 + y * scale * perspective, z, perspective };
      });
      edges.forEach(([i, j]) => {
        const a = projected[i], b = projected[j], depth = (a.z + b.z + 2.4) / 4.8;
        ctx.strokeStyle = `rgba(190,211,154,${.035 + depth * .27})`; ctx.lineWidth = .65;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      });
      projected.forEach((p, i) => {
        ctx.fillStyle = i % 17 === 0 ? `rgba(211,250,145,${.45 + (p.z + 1.3) * .2})` : `rgba(216,225,207,${.16 + (p.z + 1.3) * .24})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, (i % 17 === 0 ? 2.3 : 1.1) * p.perspective, 0, Math.PI * 2); ctx.fill();
      });
      if (!paused) frame = requestAnimationFrame(draw);
    }
    const resize = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect(); width = rect.width; height = rect.height;
      const dpr = Math.min(devicePixelRatio, 2); el.width = width * dpr; el.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); cancelAnimationFrame(frame); frame = requestAnimationFrame(draw);
    }); resize.observe(el);
    return () => { resize.disconnect(); cancelAnimationFrame(frame); };
  }, [paused]);
  return <><div className="neural-background" aria-hidden="true"><canvas ref={canvas}/></div><button className="motion-toggle" aria-label={paused ? "Animar fondo" : "Pausar fondo"} onClick={() => setPaused(!paused)}>{paused ? <Play size={16}/> : <Pause size={16}/>}<span>{paused ? "Animar fondo" : "Pausar fondo"}</span></button></>;
}

const links = [
  { title: 'Sígueme en Instagram', description: '@andyontrade', url: 'https://www.instagram.com/andyontrade/', featured: true },
  { title: 'Hablemos', description: 'andyontrade@proton.me', url: 'mailto:andyontrade@proton.me', featured: false },
];
export default function Home() {
  return <main><NeuralSculpture/>
    <header className="masthead"><a className="monogram" href="#inicio" aria-label="Andrés Gómez, inicio">ag</a><a href="https://www.instagram.com/andyontrade/" target="_blank" rel="noopener noreferrer">@andyontrade <ArrowUpRight size={15}/></a></header>
    <section className="bio" id="inicio" aria-labelledby="bio-title">
      <p className="creator">Creador digital</p>
      <h1 id="bio-title">Andrés Gómez</h1>
      <h2>Aprende IA<br/>sin complicarte.</h2>
      <p className="topics">Prompts · Imágenes · Automatización · Agentes</p>
      <p className="description">De cero a crear con inteligencia artificial.</p>
      <nav aria-label="Enlaces de Andrés Gómez" className="links">{links.map(link => <a key={link.title} className={`bio-link ${link.featured ? 'featured' : ''}`} href={link.url} target={link.url.startsWith('https:') ? '_blank' : undefined} rel={link.url.startsWith('https:') ? 'noopener noreferrer' : undefined}><div><span className="link-title">{link.featured ? 'Aprende conmigo en Instagram' : 'Colaboraciones'}</span><span className="link-description">{link.description}</span></div><ArrowUpRight size={22}/></a>)}</nav>
    </section>
    <footer className="footer"><span>Andrés Gómez</span><span>Aprende Inteligencia Artificial</span></footer>
  </main>;
}
