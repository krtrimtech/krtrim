import React, { useState, useEffect } from 'react';
import { WorkflowNode } from './WorkflowNode';
import { Brain, MessageSquare, Bot, Mic, Code, Zap, Target, Users } from 'lucide-react';

interface Connection {
  from: string;
  to: string;
  animated?: boolean;
}

interface WorkflowData {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  size: 'sm' | 'md' | 'lg';
}

const workflowNodes: WorkflowData[] = [
  {
    id: 'ai-strategy',
    title: 'AI Strategy',
    description: 'Custom AI solutions',
    icon: <Brain className="w-4 h-4 md:w-5 md:h-5" />,
    position: { x: 20, y: 30 },
    size: 'lg'
  },
  {
    id: 'chatbots',
    title: 'Chatbots',
    description: 'Intelligent conversations',
    icon: <MessageSquare className="w-3 h-3 md:w-4 md:h-4" />,
    position: { x: 50, y: 15 },
    size: 'md'
  },
  {
    id: 'voice-agents',
    title: 'Voice Agents',
    description: 'AI-powered voice',
    icon: <Mic className="w-3 h-3 md:w-4 md:h-4" />,
    position: { x: 75, y: 35 },
    size: 'md'
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Workflow optimization',
    icon: <Zap className="w-3 h-3 md:w-4 md:h-4" />,
    position: { x: 45, y: 60 },
    size: 'md'
  },
  {
    id: 'saas-dev',
    title: 'SaaS Development',
    description: 'Full-stack solutions',
    icon: <Code className="w-3 h-3 md:w-4 md:h-4" />,
    position: { x: 25, y: 75 },
    size: 'md'
  },
  {
    id: 'integration',
    title: 'Integration',
    description: 'Seamless connections',
    icon: <Target className="w-2 h-2 md:w-3 md:h-3" />,
    position: { x: 70, y: 70 },
    size: 'sm'
  },
  {
    id: 'consulting',
    title: 'Consulting',
    description: 'Expert guidance',
    icon: <Users className="w-2 h-2 md:w-3 md:h-3" />,
    position: { x: 15, y: 50 },
    size: 'sm'
  },
  {
    id: 'ai-bots',
    title: 'AI Bots',
    description: 'Smart assistants',
    icon: <Bot className="w-2 h-2 md:w-3 md:h-3" />,
    position: { x: 80, y: 15 },
    size: 'sm'
  }
];

const connections: Connection[] = [
  { from: 'ai-strategy', to: 'chatbots', animated: true },
  { from: 'ai-strategy', to: 'voice-agents', animated: true },
  { from: 'ai-strategy', to: 'automation' },
  { from: 'ai-strategy', to: 'consulting' },
  { from: 'chatbots', to: 'ai-bots', animated: true },
  { from: 'voice-agents', to: 'integration' },
  { from: 'automation', to: 'saas-dev', animated: true },
  { from: 'saas-dev', to: 'integration' }
];

export const WorkflowDiagram: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('ai-strategy');
  const [activeConnections, setActiveConnections] = useState<string[]>([]);

  useEffect(() => {
    // Update active connections based on active node
    const relatedConnections = connections
      .filter(conn => conn.from === activeNode || conn.to === activeNode)
      .map(conn => `${conn.from}-${conn.to}`);
    
    setActiveConnections(relatedConnections);
  }, [activeNode]);

  const getNodeById = (id: string) => workflowNodes.find(node => node.id === id);

  const getNodeSizeOffset = (size: 'sm' | 'md' | 'lg') => {
    switch (size) {
      case 'sm': return { width: 12, height: 12 }; // w-12 h-12 on mobile, w-16 h-16 on desktop
      case 'md': return { width: 16, height: 16 }; // w-16 h-16 on mobile, w-24 h-24 on desktop  
      case 'lg': return { width: 20, height: 20 }; // w-20 h-20 on mobile, w-32 h-32 on desktop
      default: return { width: 16, height: 16 };
    }
  };

  const renderConnection = (connection: Connection) => {
    const fromNode = getNodeById(connection.from);
    const toNode = getNodeById(connection.to);
    
    if (!fromNode || !toNode) return null;

    const isActive = activeConnections.includes(`${connection.from}-${connection.to}`);
    
    // Get proper node center coordinates accounting for node size
    const fromSize = getNodeSizeOffset(fromNode.size);
    const toSize = getNodeSizeOffset(toNode.size);
    
    // Calculate actual center positions (position is top-left, we need center)
    const x1 = fromNode.position.x + (fromSize.width / 2);
    const y1 = fromNode.position.y + (fromSize.height / 2);
    const x2 = toNode.position.x + (toSize.width / 2);
    const y2 = toNode.position.y + (toSize.height / 2);

    // Create a smooth curved path
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    // Control point for smooth curve
    const controlX = x1 + dx * 0.5 + (dy * 0.3);
    const controlY = y1 + dy * 0.5 - (dx * 0.3);

    return (
      <g key={`${connection.from}-${connection.to}`}>
        <path
          d={`M ${x1},${y1} Q ${controlX},${controlY} ${x2},${y2}`}
          className={`workflow-connection ${isActive ? 'active' : ''}`}
          strokeDasharray={connection.animated ? "3,3" : undefined}
        >
          {connection.animated && isActive && (
            <animate
              attributeName="stroke-dashoffset"
              values="0;6"
              dur="1s"
              repeatCount="indefinite"
            />
          )}
        </path>
        <circle
          cx={x2}
          cy={y2}
          r="1.5"
          className={`workflow-connection-dot ${isActive ? 'active' : ''}`}
        />
      </g>
    );
  };

  return (
    <div className="relative w-full h-64 md:h-96 mx-auto max-w-4xl">
      {/* Background SVG for connections */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        {connections.map(renderConnection)}
      </svg>
      
      {/* Workflow Nodes */}
      {workflowNodes.map((node) => (
        <WorkflowNode
          key={node.id}
          id={node.id}
          title={node.title}
          description={node.description}
          icon={node.icon}
          position={node.position}
          size={node.size}
          isActive={activeNode === node.id}
          onClick={setActiveNode}
        />
      ))}
      
      {/* Active Node Info Panel */}
      {activeNode && (
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-md border border-border rounded-lg p-4 min-w-64 text-center">
          <h3 className="font-bold text-primary mb-2">
            {getNodeById(activeNode)?.title}
          </h3>
          <p className="text-sm text-muted-foreground">
            {getNodeById(activeNode)?.description}
          </p>
        </div>
      )}
    </div>
  );
};