import React, { useEffect, useState } from 'react';
import { GlassGrid } from '../ui/GlassGrid';
import { FactoryOverview3D } from '../panels/FactoryOverview3D';
import { DroneRobotPanel } from '../panels/DroneRobotPanel';
import { EnvironmentMetrics } from '../panels/EnvironmentMetrics';
import { ProductionMetrics } from '../panels/ProductionMetrics';
import { CameraFeeds } from '../panels/CameraFeeds';
import { AIAssistantPanel } from '../panels/AIAssistantPanel';
import { SecurityPanel } from '../panels/SecurityPanel';
import { EnergyConsumptionPanel } from '../panels/EnergyConsumptionPanel';
import { RemoteControlPanel } from '../panels/RemoteControlPanel';
import { KPIBand } from '../panels/KPIBand';
import { AdvancedAnalyticsPanel } from '../panels/AdvancedAnalyticsPanel';

export const DashboardLayout: React.FC = () => {
  const [theme, setTheme] = useState<'light'|'dark'>(()=> (localStorage.getItem('dash-theme') as 'light'|'dark') || 'light');
  const sections: { key:string; label:string }[] = [
    { key:'overview', label:'Overview' },
    { key:'robots', label:'Robots' },
    { key:'production', label:'Production' },
    { key:'environment', label:'Environment' },
    { key:'security', label:'Security' },
    { key:'ai', label:'AI Assistant' },
    { key:'cameras', label:'Cameras' }
  ];
  const [active, setActive] = useState<string>('overview');

  const renderPanels = () => {
    switch(active){
      case 'overview':
        return <><KPIBand /><AdvancedAnalyticsPanel /><FactoryOverview3D /><ProductionMetrics /><EnergyConsumptionPanel /><EnvironmentMetrics /><DroneRobotPanel /><CameraFeeds /><AIAssistantPanel /><SecurityPanel /></>;
      case 'robots':
        return <><DroneRobotPanel /><FactoryOverview3D /><ProductionMetrics /><SecurityPanel /></>;
      case 'production':
        return <><ProductionMetrics /><EnergyConsumptionPanel /><FactoryOverview3D /><EnvironmentMetrics /><DroneRobotPanel /></>;
      case 'environment':
        return <><EnvironmentMetrics /><EnergyConsumptionPanel /><FactoryOverview3D /><ProductionMetrics /></>;
      case 'security':
        return <><SecurityPanel /><FactoryOverview3D /><CameraFeeds /></>;
      case 'ai':
        return <><AIAssistantPanel /><ProductionMetrics /><EnergyConsumptionPanel /></>;
      case 'cameras':
        return <><CameraFeeds /><SecurityPanel /><DroneRobotPanel /></>;
      default:
        return null;
    }
  };

  useEffect(()=>{
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dash-theme', theme);
  }, [theme]);

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="logo-area">
          <img src="/logotipo%20principal.png" alt="Logo" className="logo" />
        </div>
        <div className="title-center"><h1>Industrial Control</h1></div>
        <div className="top-actions">
          <button className="ghost" onClick={()=> setTheme(t=> t==='light' ? 'dark':'light')}>{theme==='light'?'Dark':'Light'} Mode</button>
          <button className="ghost">Modo AR</button>
          <button className="primary">Emergency Stop</button>
        </div>
      </header>
      <div className="content">
        <nav className="side-nav glass" role="navigation" aria-label="Main">
          <ul>
            {sections.map(s => (
              <li key={s.key} className={s.key===active? 'active': ''} aria-current={s.key===active? 'page': undefined}>
                <button className="nav-btn" onClick={()=> setActive(s.key)}>{s.label}</button>
              </li>
            ))}
          </ul>
        </nav>
        <main className="main-grid">
          <GlassGrid />
          {renderPanels()}
        </main>
      </div>
      <RemoteControlPanel />
    </div>
  );
};
