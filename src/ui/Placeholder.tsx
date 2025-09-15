import React from 'react';

export const Placeholder: React.FC<{ label: string; large?: boolean }> = ({ label, large }) => {
  return (
    <div className={`glass placeholder ${large ? 'large' : ''}`}> 
      <span>{label}</span>
    </div>
  );
};
