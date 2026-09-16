'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail, Terminal, Code2, Users, ChevronRight, BookOpen } from 'lucide-react';

function InstagramIcon({ size = 19 }: { size?: number }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>;
}
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
  return <div className="neural-background" aria-hidden="true"><canvas ref={canvas}/></div>;
}

const menuItems = [
  { title: 'Mis herramientas de IA', description: 'Las que uso y para qué me sirven', detail: 'Próximamente: mi selección de herramientas para crear, aprender y automatizar.' },
  { title: 'Comunidad', description: 'Aprende y comparte con otras personas', detail: 'El enlace a la comunidad estará disponible pronto.' },
];
export default function Home() {
  return <main><NeuralSculpture/>
    <section className="bio" id="inicio" aria-labelledby="bio-title">
      <header className="profile-header">
        <div className="profile-visual">
          <img className="profile-photo" src="/andy%20foto.jpeg" width="560" height="500" alt="Andrés Gómez" fetchPriority="high"/>
          <div className="profile-gradient" aria-hidden="true"/>
        </div>
        <div className="profile-identity">
          <h1 id="bio-title">Andrés Gómez</h1>
          <nav className="social-links" aria-label="Redes y contacto">
            <a className="social-link instagram-link" href="https://www.instagram.com/andyontrade/" target="_blank" rel="noopener noreferrer" aria-label="Instagram de Andrés Gómez" title="Instagram"><InstagramIcon size={28}/></a>
            <a className="social-link mail-link" href="mailto:hello@andresgomez.store" aria-label="Enviar correo a Andrés Gómez" title="Correo"><Mail size={27}/></a>
          </nav>
        </div>
        <h2 className="profile-promise"><span>Aprende IA conmigo.</span> Y si tienes una empresa, te ayudo a implementarla.</h2>
      </header>
      <nav aria-label="Menú de Andrés Gómez" className="selected-menu">
        <div className="call-link unavailable" aria-disabled="true"><Terminal className="menu-symbol" size={18} aria-hidden="true"/><span><span className="link-title">Agenda una llamada conmigo</span><span className="link-description">Sin cupos por el momento</span></span><span className="status-label">Cerrado</span></div>
        {menuItems.map(item => <details className="menu-option" key={item.title}><summary>{item.title === 'Comunidad' ? <Users className="menu-symbol" size={18} aria-hidden="true"/> : <Code2 className="menu-symbol" size={18} aria-hidden="true"/>}<span><span className="link-title">{item.title}</span><span className="link-description">{item.description}</span></span><ChevronRight size={16} aria-hidden="true"/></summary>{item.title === 'Mis herramientas de IA' ? <div className="tool-grid"><span><span className="brand-fallback codex-mark">&gt;_</span>Codex</span><span><img src="/brands/deepseek.svg" alt=""/>DeepSeek</span><span><img src="/brands/claude.svg" alt=""/>Claude</span><span><img src="/brands/higgsfield.ico" alt=""/>Higgsfield</span></div> : <p>{item.detail}</p>}</details>)}
      </nav>
      <a className="free-resources" href="https://andresgomez.store/recursos" target="_blank" rel="noopener noreferrer" aria-labelledby="resources-title">
        <BookOpen size={22} aria-hidden="true"/>
        <div>
          <h3 id="resources-title">Recursos gratuitos</h3>
          <p>Guías, plantillas y herramientas prácticas para aprender IA paso a paso y aplicarla desde el primer día.</p>
        </div>
        <ChevronRight className="resources-arrow" size={19} aria-hidden="true"/>
      </a>
      <section className="newsletter-card" aria-labelledby="newsletter-title">
        <h3 id="newsletter-title">Newsletter</h3>
        <p>Tutoriales de automatización · IA · agentes de IA. Sin spam.</p>
        <form aria-label="Newsletter próximamente">
          <label className="sr-only" htmlFor="newsletter-email">Tu correo electrónico</label>
          <input id="newsletter-email" name="email" type="email" placeholder="tu@email.com" disabled/>
          <button type="button" disabled>Próximamente</button>
        </form>
      </section>
    </section>
    <footer className="footer developer-footer">&lt;Andrés Gómez /&gt;</footer>
  </main>;
}















