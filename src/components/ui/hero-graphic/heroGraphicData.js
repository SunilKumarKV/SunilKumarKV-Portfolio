/**
 * System Architecture Node Definitions & Channels for HeroGraphic
 */
export const NODES = [
  {
    id: 'core',
    name: 'Full-Stack Core',
    badge: 'Central Engine',
    coords: { x: 270, y: 210 },
    color: '#6366F1', // Indigo
    role: 'Systems & Architecture Hub',
    protocol: 'Event-Driven Reactive Mesh',
    throughput: 'Sub-millisecond State Dispatch',
    desc: 'Unifying client rendering, backend APIs, automated workflows, and enterprise inventory pipelines.'
  },
  {
    id: 'react-ui',
    name: 'React UI',
    badge: 'Frontend Architecture',
    coords: { x: 105, y: 95 },
    color: '#61DAFB', // React Cyan
    role: 'Modern Glass Interface',
    protocol: 'Virtual DOM & Tailwind CSS',
    throughput: '60+ FPS Micro-Interactions',
    desc: 'Component-based responsive interfaces with state management, custom hooks, and zero layout shift.'
  },
  {
    id: 'node-api',
    name: 'Node API',
    badge: 'Backend & Services',
    coords: { x: 435, y: 95 },
    color: '#22C55E', // Node Green
    role: 'RESTful API & Middleware',
    protocol: 'Node.js / Express / Async I/O',
    throughput: '99.9% Uptime Services',
    desc: 'High-throughput backend services handling payload validation, authentication, and secure endpoints.'
  },
  {
    id: 'n8n-webhooks',
    name: 'n8n / Webhooks',
    badge: 'Workflow & Automation',
    coords: { x: 435, y: 325 },
    color: '#F97316', // Orange
    role: 'Autonomous Event Pipeline',
    protocol: 'Webhooks & n8n Workflows',
    throughput: 'Real-Time Event Triggers',
    desc: 'Automated event orchestration dispatching leads, webhook payloads, and cross-platform integrations.'
  },
  {
    id: 'enterprise-ops',
    name: 'Enterprise Ops',
    badge: 'SAP MM / ERP',
    coords: { x: 105, y: 325 },
    color: '#0284C7', // SAP Blue
    role: 'Material & Inventory Ledger',
    protocol: 'SAP MM / SKU Automation',
    throughput: '-15% Discrepancies / +12% Clearance',
    desc: '3+ years enterprise logistics, inventory reconciliation, and mission-critical commercial workflows.'
  }
];

export const CHANNELS = [
  // Radial Channels (Core <-> Orbiting Nodes)
  {
    id: 'chan-core-react',
    from: 'core',
    to: 'react-ui',
    path: 'M 270 210 C 200 170, 160 135, 105 95',
    color: '#61DAFB',
    speed: '2.4s',
    delay: '0s',
    reverseSpeed: '2.8s',
    reverseDelay: '0.7s'
  },
  {
    id: 'chan-core-node',
    from: 'core',
    to: 'node-api',
    path: 'M 270 210 C 340 170, 380 135, 435 95',
    color: '#22C55E',
    speed: '2.2s',
    delay: '0.4s',
    reverseSpeed: '2.6s',
    reverseDelay: '1.1s'
  },
  {
    id: 'chan-core-n8n',
    from: 'core',
    to: 'n8n-webhooks',
    path: 'M 270 210 C 340 250, 380 285, 435 325',
    color: '#F97316',
    speed: '2.5s',
    delay: '0.8s',
    reverseSpeed: '2.9s',
    reverseDelay: '0.3s'
  },
  {
    id: 'chan-core-sap',
    from: 'core',
    to: 'enterprise-ops',
    path: 'M 270 210 C 200 250, 160 285, 105 325',
    color: '#0284C7',
    speed: '2.7s',
    delay: '1.2s',
    reverseSpeed: '3.1s',
    reverseDelay: '0.5s'
  },
  // Perimeter Mesh Channels
  {
    id: 'chan-react-node',
    from: 'react-ui',
    to: 'node-api',
    path: 'M 105 95 C 270 50, 270 50, 435 95',
    color: '#818CF8',
    speed: '3.4s',
    delay: '0.2s'
  },
  {
    id: 'chan-node-n8n',
    from: 'node-api',
    to: 'n8n-webhooks',
    path: 'M 435 95 C 475 210, 475 210, 435 325',
    color: '#FB923C',
    speed: '3.2s',
    delay: '1.0s'
  },
  {
    id: 'chan-n8n-sap',
    from: 'n8n-webhooks',
    to: 'enterprise-ops',
    path: 'M 435 325 C 270 370, 270 370, 105 325',
    color: '#38BDF8',
    speed: '3.6s',
    delay: '0.6s'
  },
  {
    id: 'chan-sap-react',
    from: 'enterprise-ops',
    to: 'react-ui',
    path: 'M 105 325 C 65 210, 65 210, 105 95',
    color: '#34D399',
    speed: '3.3s',
    delay: '1.4s'
  }
];
