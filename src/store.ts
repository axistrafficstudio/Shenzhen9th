import create from 'zustand';

export interface DroneStatus { id: string; state: 'active' | 'charging' | 'mission'; battery: number; mission?: string }
export interface RobotArm { id: string; axis: number[]; load: number; temperature: number }
export interface AMR { id: string; task: string; battery: number; position: [number, number]; }
export interface EnvironmentMetrics { temperature: number; humidity: number; pressure: number; smoke: boolean; fire: boolean; airQuality: number; energyKwh: number[] }
export interface ProductionMetrics { count: number; jobProgress: number; material: { filament: number; resin: number; metal: number }; forecastHours: number; maintenanceAlerts: string[] }
export interface SecurityState { intrusion: boolean; doorsLocked: boolean; windowsLocked: boolean; siren: boolean; }
export interface CameraFeed { id: string; anomalies: number; objects: number; }
export interface ChatMessage { id: string; role: 'assistant' | 'user'; content: string; ts: number }

interface DashboardState {
  drones: DroneStatus[];
  arms: RobotArm[];
  amrs: AMR[];
  env: EnvironmentMetrics;
  production: ProductionMetrics;
  security: SecurityState;
  cameras: CameraFeed[];
  chat: ChatMessage[];
  controlMode: 'idle' | 'drone-pilot' | 'robot-arm-6' | 'robot-arm-8' | 'amr-manual';
  controlLog: { id: string; ts: number; mode: string; command: string }[];
  throughputHistory: number[]; // units/hour
  qualityHistory: number[]; // % good
  oeeHistory: number[]; // overall equipment effectiveness %
  scrapHistory: number[]; // scrap pcs/hour
  tick: () => void;
  sendUserMessage: (content: string) => void;
  setControlMode: (mode: DashboardState['controlMode']) => void;
  issueControlCommand: (command: string) => void;
}

function rand(min: number, max: number) { return Math.random() * (max - min) + min; }
function choice<T>(arr: T[]) { return arr[Math.floor(Math.random()*arr.length)]; }

export const useDashboardStore = create<DashboardState>((set, get) => ({
  drones: Array.from({ length: 4 }).map((_, i) => ({ id: `D${i+1}`, state: choice(['active','charging','mission'] as const), battery: Math.round(rand(20,100)), mission: 'Inspect Line A' })),
  arms: Array.from({ length: 3 }).map((_, i) => ({ id: `A${i+1}`, axis: Array.from({ length:6 }).map(()=>rand(-180,180)), load: rand(10,90), temperature: rand(35,70) })),
  amrs: Array.from({ length: 5 }).map((_, i) => ({ id: `R${i+1}`, task: choice(['Collect parts','Deliver spool','Return to dock']), battery: rand(30,100), position: [rand(0,50), rand(0,30)] as [number,number] })),
  env: { temperature: 23.4, humidity: 46, pressure: 101.3, smoke: false, fire: false, airQuality: 12, energyKwh: Array.from({ length: 24 }).map(()=>rand(40,90)) },
  production: { count: 1240, jobProgress: 0.42, material: { filament: 68, resin: 54, metal: 35 }, forecastHours: 12, maintenanceAlerts: ['Arm A2 lubrication due in 4h'] },
  security: { intrusion: false, doorsLocked: true, windowsLocked: true, siren: false },
  cameras: Array.from({ length: 3 }).map((_, i) => ({ id: `C${i+1}`, anomalies: 0, objects: Math.round(rand(1,6)) })),
  chat: [{ id: 'init', role: 'assistant', content: 'Listo para optimizar la producción. Pregunta o escribe "sugerencias".', ts: Date.now() }],
  controlMode: 'idle',
  controlLog: [],
  throughputHistory: Array.from({ length: 40 }).map(()=> rand(180,260)),
  qualityHistory: Array.from({ length: 40 }).map(()=> rand(92,99)),
  oeeHistory: Array.from({ length: 40 }).map(()=> rand(70,85)),
  scrapHistory: Array.from({ length: 40 }).map(()=> rand(2,9)),
  tick: () => {
  const { drones, env, production, cameras, throughputHistory, qualityHistory, oeeHistory, scrapHistory } = get();
    // mutate clones
    const ndrones = drones.map(d => ({ ...d, battery: Math.max(0, Math.min(100, d.battery + rand(-2,1))) }));
  // shift energy every tick (simulate last entry update & append)
  const energyNext = env.energyKwh.slice(-23).concat([Math.max(20, Math.min(120, env.energyKwh[env.energyKwh.length-1] + rand(-5,5)) )]);
  const nenv = { ...env, temperature: env.temperature + rand(-0.05,0.05), humidity: env.humidity + rand(-0.2,0.2), airQuality: Math.max(5, env.airQuality + rand(-0.5,0.5)), energyKwh: energyNext };
    const nprod = { ...production, jobProgress: Math.min(1, production.jobProgress + rand(0.001,0.01)), count: production.count + (Math.random()<0.3?1:0) };
    const ncams = cameras.map(c => ({ ...c, anomalies: Math.random()<0.02?c.anomalies+1:c.anomalies }));
    // analytics rolling updates
    const push = (arr: number[], val: number) => arr.slice(-39).concat([val]);
    const tNext = push(throughputHistory, Math.max(120, Math.min(300, throughputHistory[throughputHistory.length-1] + rand(-12,12))));
    const qNext = push(qualityHistory, Math.max(85, Math.min(100, qualityHistory[qualityHistory.length-1] + rand(-0.6,0.6))));
    const oNext = push(oeeHistory, Math.max(60, Math.min(95, oeeHistory[oeeHistory.length-1] + rand(-1.5,1.5))));
    const sNext = push(scrapHistory, Math.max(0, Math.min(15, scrapHistory[scrapHistory.length-1] + rand(-1.2,1.2))));
    set({ drones: ndrones, env: nenv, production: nprod, cameras: ncams, throughputHistory: tNext, qualityHistory: qNext, oeeHistory: oNext, scrapHistory: sNext });
  },
  sendUserMessage: (content: string) => {
    const id = crypto.randomUUID();
    const userMsg: ChatMessage = { id, role: 'user', content, ts: Date.now() };
    const base = get().chat.concat(userMsg);
    // simple assistant response heuristic
    let reply = 'Procesando...';
    if (/sugerencias|optimi/i.test(content)) reply = 'Recomiendo balancear carga de brazos: redirige 12% a A1 y programa mantenimiento nocturno.';
    else if (/energia|energy/i.test(content)) reply = 'Reducir modo stand-by en impresoras inactivas podría ahorrar ~8% kWh.';
    else reply = 'Entendido. Puedo ofrecer: sugerencias, mantenimiento, energía, stock.';
    const assistant: ChatMessage = { id: crypto.randomUUID(), role: 'assistant', content: reply, ts: Date.now()+400 };
    set({ chat: base.concat(assistant) });
  },
  setControlMode: (mode) => {
    set({ controlMode: mode });
    const entry = { id: crypto.randomUUID(), ts: Date.now(), mode, command: `@mode:${mode}` };
    const { controlLog } = get();
    const next = controlLog.concat(entry).slice(-120);
    set({ controlLog: next });
  },
  issueControlCommand: (command) => {
    const { controlMode, controlLog } = get();
    const entry = { id: crypto.randomUUID(), ts: Date.now(), mode: controlMode, command };
    const next = controlLog.concat(entry).slice(-120);
    set({ controlLog: next });
  }
}));

// periodic tick
setInterval(()=>{ try { useDashboardStore.getState().tick(); } catch(e) {/* ignore */} }, 2000);