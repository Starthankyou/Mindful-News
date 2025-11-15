import { ReactNode } from 'react';
import Navigation from './Navigation';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="container-mindful">
        {children}
      </main>
      <footer className="text-center py-8 text-gray-500 text-sm">
        <p>Mindful News - 真實資訊 × 靜心閱讀 × 心靈修煉 × 英文學習</p>
      </footer>
    </div>
  );
}
