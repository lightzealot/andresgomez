import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  icons: { icon: '/brands/andres-gomez.png' },
  title: 'Andrés Gómez — IA y automatización para empresas',
  description: 'Andrés Gómez: IA aplicada a empresas de servicios. Optimización de procesos para reducir trabajo manual, implementar mejoras y medir resultados.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}

