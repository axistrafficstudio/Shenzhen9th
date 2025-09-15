# Futuristic Industrial Control Dashboard

Futuristic glassmorphic industrial control dashboard (React + Vite + TypeScript + Three.js + Zustand) featuring:

- 3D factory isometric overview
- Drones & mobile / articulated robots panel
- Environment metrics (temp, humidity, pressure, AQI, fire/smoke)
- Production metrics (throughput, progress, materials, maintenance alerts)
- Camera feeds with mock AI overlay (objects/anomalies)
- AI control assistant (chat with optimization & predictive insights)
- Security & alarm status

## Run
```bash
npm install
npm run dev
```
Then open: http://localhost:5173

### Tests

```bash
npm run test
```

Store logic tests validate production progress tick and AI assistant auto-replies.

## Tech Stack

- React 18 + TypeScript
- Three.js (isometric scene placeholder)
- Zustand for reactive store & mock data tick
- Framer Motion (reserved for future micro-interactions)
- Recharts (energy/time-series graphs)

## Design Principles

- Glassmorphism + soft pastel gradients
- Neumorphic depth with layered translucent panels
- Large touch-friendly spacing for control room / AR surface
- Compact semantic key-value micro-grids
- Ambient lighting and isometric 3D anchor for spatial awareness

## Next Enhancements

1. Replace placeholder 3D meshes with GLTF assets & animated conveyor belts.
2. Historical energy analytics & KPI deltas.
3. Integrate WebSocket/ MQTT for live telemetry.
4. AI assistant integration with real LLM endpoint & function calling.
5. Security map with geofencing & intrusion heatmap.
6. AR overlay mode refinement.
7. Accessibility pass (focus rings, prefers-reduced-motion support).

## Prompt (English & Spanish) for 3D Cinematic Render

```text
Ultra-detailed futuristic industrial control dashboard UI, isometric minimal layout, inspired by Apple HomeKit + Tesla interface, soft glassmorphism, translucent floating cards, pastel technological palette (ice blue, soft lavender, mint, blush), cinematic volumetric lighting, ambient reflections.
Central wide isometric 3D factory map: 3D printers clusters, robotic arms, conveyor belts with moving crates, recycling unit, modular container micro-factories.
Panels floating: Drones & AMR robots (status: active / charging / mission), 6-axis robotic arm joint indicators, environment metrics (temperature, humidity, pressure, fire & smoke, air quality, door/window locks, energy consumption kWh sparkline), production metrics (live units, progress bars, material stock: filament, resin, metal powder, forecast time, maintenance alerts), camera feeds with AI object detection bounding boxes + anomaly badges, AI control assistant chat suggesting optimization and predictive maintenance, security & alarm module (emergency stop, siren toggle, intrusion map).
Clean geometric typography, neumorphism soft shadows, minimal futuristic icons, subtle HUD halos, micro glow edges, depth layering, AR control room ready.
Rendered as ultra-realistic 3D web dashboard mockup, cinematic high contrast lighting, 8K, octane style, physically based rendering, crisp UI glass panels, reflective floor bloom.
```

```text
Panel de control industrial futurista ultra detallado, interfaz isométrica minimalista inspirada en Apple HomeKit y Tesla, glassmorphism suave, tarjetas flotantes translúcidas, paleta pastel tecnológica (azul hielo, lavanda suave, menta, rosa tenue), iluminación volumétrica cinematográfica, reflejos ambientales.
Mapa isométrico central 3D de la fábrica: clústeres de impresoras 3D, brazos robóticos, cintas transportadoras con cajas en movimiento, unidad de reciclaje, micro-fábricas modulares en contenedores.
Tarjetas flotantes: drones y robots móviles (estado: activo / cargando / misión), indicadores de articulación de brazo robótico 6 ejes, métricas ambientales (temperatura, humedad, presión, fuego y humo, calidad del aire, puertas/ventanas, consumo energético kWh), métricas de producción (unidades en vivo, barras de progreso, stock materiales: filamento, resina, polvo metálico, tiempo estimado, alertas de mantenimiento), panel de cámaras con detección de objetos IA + anomalías, asistente IA de control con optimización predictiva, módulo de seguridad y alarmas (parada de emergencia, sirena, intrusión geolocalizada).
Tipografía limpia geométrica, sombras neumórficas, iconos futuristas mínimos, halos HUD sutiles, capas de profundidad, listo para sala de control AR.
Render hiperrealista como mockup 3D web, iluminación cinematográfica de alto contraste, 8K, estilo octane, PBR, paneles de vidrio nítidos, reflejos y bloom.
```

---
MIT License (Template)
