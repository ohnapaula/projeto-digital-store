import React from 'react';
import { Link } from 'react-router-dom';

interface DemoPageProps {
  title: string;
  description?: string;
}

export const DemoPage: React.FC<DemoPageProps> = ({
  title,
  description = 'Esta página é um estado demonstrativo da plataforma Drip Store.',
}) => {
  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '60px auto',
        padding: '32px 24px',
        background: '#ffffff',
        borderRadius: '8px',
        textAlign: 'center',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
      }}
    >
      <h2 style={{ fontSize: '28px', color: 'var(--color-dark-gray)', marginBottom: '16px' }}>
        {title}
      </h2>
      <p style={{ fontSize: '16px', color: 'var(--color-dark-gray-3)', marginBottom: '24px' }}>
        {description}
      </p>
      <Link
        to="/"
        style={{
          display: 'inline-block',
          padding: '12px 24px',
          background: 'var(--color-primary)',
          color: 'var(--color-white)',
          borderRadius: '4px',
          fontWeight: 600,
        }}
      >
        Voltar para a Home
      </Link>
    </div>
  );
};

export default DemoPage;
