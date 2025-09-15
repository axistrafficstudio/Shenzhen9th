import React from 'react';
import classNames from 'classnames';

interface GlassCardProps { title?: string; children?: React.ReactNode; className?: string; dense?: boolean; }
export const GlassCard: React.FC<GlassCardProps> = ({ title, children, className, dense }) => {
  return (
    <section className={classNames('glass card', className, dense && 'dense')}> 
      {title && <header className="card-header"><h3>{title}</h3></header>}
      <div className="card-body">{children}</div>
    </section>
  );
};