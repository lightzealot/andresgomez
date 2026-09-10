import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = {
  title: 'Andrés Gómez | Aprende Inteligencia Artificial',
  description: 'Un espacio para entender la inteligencia artificial y convertir lo que aprendes en proyectos. Los enlaces de Andrés Gómez.',
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
