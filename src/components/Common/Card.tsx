import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export default function Card({ children, className = '', title }: CardProps) {
  return (
    <div className={`card-mindful ${className}`}>
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </div>
  );
}
