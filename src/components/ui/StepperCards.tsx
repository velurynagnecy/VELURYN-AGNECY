import React from 'react';
import './StepperCards.css';

interface StepperCardProps {
  num: string;
  title: string;
  description: string;
}

export const StepperCard: React.FC<StepperCardProps> = ({ num, title, description }) => {
  return (
    <div className="stepper-card">
      <div className="stepper-card-num">{num}</div>
      <div className="stepper-card-content">
        <h3 className="stepper-card-title">{title}</h3>
        <p className="stepper-card-description">{description}</p>
      </div>
    </div>
  );
};
