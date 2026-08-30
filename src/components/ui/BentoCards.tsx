import React from 'react';
import './BentoCards.css';

interface BentoFeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  delay?: number;
}

export const BentoFeatureCard: React.FC<BentoFeatureCardProps> = ({ title, description, icon, delay = 0 }) => {
  return (
    <div className="bento-feature-card" style={{ animationDelay: `${delay}s` }}>
      <div className="bento-feature-icon">{icon}</div>
      <h3 className="bento-feature-title">{title}</h3>
      <p className="bento-feature-description">{description}</p>
    </div>
  );
};
