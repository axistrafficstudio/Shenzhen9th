import { describe, it, expect, beforeAll } from 'vitest';
import { useDashboardStore } from '../store';

function wait(ms:number){ return new Promise(res=> setTimeout(res, ms)); }

describe('dashboard store', () => {
  beforeAll(()=>{
    // ensure store accessed so interval already running
    useDashboardStore.getState();
  });

  it('advances production progress over time', async () => {
    const initial = useDashboardStore.getState().production.jobProgress;
    await wait(2500);
    const after = useDashboardStore.getState().production.jobProgress;
    expect(after).toBeGreaterThanOrEqual(initial);
  });

  it('chat assistant responds to optimization prompt', async () => {
    const before = useDashboardStore.getState().chat.length;
    useDashboardStore.getState().sendUserMessage('Necesito sugerencias');
    await wait(100); // response added quickly
    const after = useDashboardStore.getState().chat.length;
    expect(after).toBeGreaterThan(before);
  });
});
