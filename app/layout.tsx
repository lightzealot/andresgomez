import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Andrés Gómez | Aprende Inteligencia Artificial',
  description: 'Aprende IA sin complicarte con Andrés Gómez. Prompts, imágenes, automatización y agentes. De cero a crear con inteligencia artificial.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}

