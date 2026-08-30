import React from 'react';
import './BentoCards.css';

interface BentoInfoCardProps {
  title: string;
  children: React.ReactNode;
  dark?: boolean;
}

export const BentoInfoCard: React.FC<BentoInfoCardProps> = ({ title, children, dark = false }) => {
  return (
    <div className={`bento-info-card ${dark ? 'bento-info-card-dark' : ''}`}>
      <h3 className="bento-info-title">{title}</h3>
      <div className="bento-info-content">
        {children}
      </div>
    </div>
  );
};
