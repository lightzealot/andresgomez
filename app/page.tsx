'use client';
import { useState } from 'react';
import { Mail, Globe, ArrowUpRight, ArrowRight, Users, BookOpen, ScanLine, ChevronRight, Code2 } from 'lucide-react';
export default function Home() {
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  async function subscribeToNewsletter(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNewsletterStatus('submitting');
    const form = event.currentTarget;
    const body = new URLSearchParams();
    new FormData(form).forEach((value, key) => body.append(key, String(value)));

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!response.ok) throw new Error('Newsletter submission failed');
      form.reset();
      setNewsletterStatus('success');
    } catch {
      setNewsletterStatus('error');
    }
  }

  return <main className="link-page" id="inicio">
    <header className="brand-bar">
      <a className="brand" href="https://andresgomez.store/" aria-label="Web de Andrés Gómez"><img src="/brands/andres-gomez.png" alt="" width="48" height="32"/><span>ANDRÉS GÓMEZ</span></a>
      <span className="brand-note">IA + AUTOMATIZACIÓN</span>
    </header>
    <div className="link-layout">
      <section className="profile" aria-labelledby="profile-title">
        <div className="identity"><p className="eyebrow">IA APLICADA A EMPRESAS</p><h1 id="profile-title">Andrés Gómez<span>.</span></h1><p className="intro">Optimiza primero. Automatiza después.</p></div>
        <nav className="socials" aria-label="Redes y contacto">
          <a href="https://www.instagram.com/andresgomez.ia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" fill="currentColor" stroke="none"/></svg></a>
          <a href="https://andresgomez.store/" aria-label="Sitio web"><Globe size={19}/></a>
          <a href="mailto:hello@andresgomez.store" aria-label="Correo electrónico"><Mail size={19}/></a>
        </nav>
        <figure className="portrait"><img src="/andres-microfono.png" width="1122" height="1402" alt="Andrés Gómez frente al micrófono" fetchPriority="high"/><figcaption>@ANDRESGOMEZ.IA</figcaption></figure>
      </section>
      <div className="content">
        <nav className="link-list" aria-label="Enlaces de Andrés Gómez">
          <a className="link-card primary" href="https://diagnostico.andresgomez.store"><ScanLine size={23} aria-hidden="true"/><span><small>EMPIEZA AQUÍ</small><strong>Evaluar mi empresa</strong><span>Encuentra qué proceso mejorar.</span></span><ArrowUpRight size={22} aria-hidden="true"/></a>
          <a className="link-card community" href="https://comunidad.andresgomez.store/" target="_blank" rel="noopener noreferrer"><Users size={23} aria-hidden="true"/><span><strong>Comunidad</strong><span>Aprende y comparte sobre IA.</span></span><ArrowUpRight size={20} aria-hidden="true"/></a>
          <a className="link-card" href="https://comunidad.andresgomez.store/recursos" target="_blank" rel="noopener noreferrer"><BookOpen size={23} aria-hidden="true"/><span><strong>Recursos gratuitos</strong><span>Guías, plantillas y herramientas.</span></span><ArrowUpRight size={20} aria-hidden="true"/></a>
          <details className="tools"><summary><Code2 size={23} aria-hidden="true"/><span><strong>Mis herramientas de IA</strong></span><ChevronRight size={20} aria-hidden="true"/></summary><div className="tool-grid"><span className="tool-name">Codex</span><span><img src="/brands/deepseek.svg" alt="" width="20" height="20"/>DeepSeek</span><span><img src="/brands/claude.svg" alt="" width="20" height="20"/>Claude</span><span><img src="/brands/higgsfield.ico" alt="" width="20" height="20"/>Higgsfield</span></div></details>
        </nav>
        <section className="newsletter" aria-labelledby="newsletter-title">
          <h2 id="newsletter-title">IA aplicada, en tu correo.</h2><p>Ideas y recursos. Sin ruido.</p>
          <form name="newsletter" method="POST" data-netlify="true" data-netlify-honeypot="bot-field" onSubmit={subscribeToNewsletter}>
            <input type="hidden" name="form-name" value="newsletter"/>
            <p className="sr-only"><label>No llenes este campo: <input name="bot-field" tabIndex={-1} autoComplete="off"/></label></p>
            <label className="sr-only" htmlFor="newsletter-email">Tu correo electrónico</label>
            <input id="newsletter-email" name="email" type="email" placeholder="tu@email.com" autoComplete="email" required disabled={newsletterStatus === 'submitting'}/>
            <button type="submit" disabled={newsletterStatus === 'submitting'}>{newsletterStatus === 'submitting' ? 'Enviando…' : 'Suscribirme'}<ArrowRight size={17} aria-hidden="true"/></button>
          </form>
          <output className={'newsletter-message ' + newsletterStatus} aria-live="polite">{newsletterStatus === 'success' && 'Listo. Recibimos tu correo.'}{newsletterStatus === 'error' && 'No se pudo enviar. Intenta de nuevo.'}</output>
        </section>
      </div>
    </div>
    <footer className="footer"><span>© {new Date().getFullYear()} ANDRÉS GÓMEZ</span><a href="https://andresgomez.store/">Mi sitio web <ArrowUpRight size={13} aria-hidden="true"/></a></footer>
  </main>;
}