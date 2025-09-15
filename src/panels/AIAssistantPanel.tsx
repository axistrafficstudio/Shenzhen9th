import React, { useState } from 'react';
import { useDashboardStore } from '../store';
import { GlassCard } from '../ui/GlassCard';

export const AIAssistantPanel: React.FC = () => {
  const chat = useDashboardStore(state=>state.chat);
  const send = useDashboardStore(state=>state.sendUserMessage);
  const [text, setText] = useState('');
  return (
    <GlassCard title="AI Control Assistant">
      <div className="chat-window">
        {chat.slice(-8).map(m => (
          <div key={m.id} className={`msg ${m.role}`}>{m.content}</div>
        ))}
      </div>
      <form onSubmit={e=>{ e.preventDefault(); if(text.trim()){ send(text.trim()); setText(''); } }} className="chat-form">
        <input value={text} onChange={e=>setText(e.target.value)} placeholder="Escribe..." />
        <button type="submit" className="primary">Enviar</button>
      </form>
    </GlassCard>
  );
};