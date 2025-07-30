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
    icon: <Brain size={20} />,
    position: { x: 20, y: 30 },
    size: 'lg'
  },
  {
    id: 'chatbots',
    title: 'Chatbots',
    description: 'Intelligent conversations',
    icon: <MessageSquare size={16} />,
    position: { x: 50, y: 15 },
    size: 'md'
  },
  {
    id: 'voice-agents',
    title: 'Voice Agents',
    description: 'AI-powered voice',
    icon: <Mic size={16} />,
    position: { x: 75, y: 35 },
    size: 'md'
  },
  {
    id: 'automation',
    title: 'Automation',
    description: 'Workflow optimization',
    icon: <Zap size={16} />,
    position: { x: 45, y: 60 },
    size: 'md'
  },
  {
    id: 'saas-dev',
    title: 'SaaS Development',
    description: 'Full-stack solutions',
    icon: <Code size={16} />,
    position: { x: 25, y: 75 },
    size: 'md'
  },
  {
    id: 'integration',
    title: 'Integration',
    description: 'Seamless connections',
    icon: <Target size={14} />,
    position: { x: 70, y: 70 },
    size: 'sm'
  },
  {
    id: 'consulting',
    title: 'Consulting',
    description: 'Expert guidance',
    icon: <Users size={14} />,
    position: { x: 15, y: 50 },
    size: 'sm'
  },
  {
    id: 'ai-bots',
    title: 'AI Bots',
    description: 'Smart assistants',
    icon: <Bot size={14} />,
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

  const renderConnection = (connection: Connection) => {
    const fromNode = getNodeById(connection.from);
    const toNode = getNodeById(connection.to);
    
    if (!fromNode || !toNode) return null;

    const isActive = activeConnections.includes(`${connection.from}-${connection.to}`);
    
    // Calculate connection path
    const x1 = fromNode.position.x + 6; // Approximate center offset
    const y1 = fromNode.position.y + 6;
    const x2 = toNode.position.x + 6;
    const y2 = toNode.position.y + 6;

    // Create a curved path
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const controlX = midX + (Math.random() - 0.5) * 10;
    const controlY = midY + (Math.random() - 0.5) * 10;

    return (
      <g key={`${connection.from}-${connection.to}`}>
        <path
          d={`M ${x1},${y1} Q ${controlX},${controlY} ${x2},${y2}`}
          className={`workflow-connection ${isActive ? 'active' : ''}`}
          strokeDasharray={connection.animated ? "5,5" : undefined}
        >
          {connection.animated && (
            <animate
              attributeName="stroke-dashoffset"
              values="0;10"
              dur="1s"
              repeatCount="indefinite"
            />
          )}
        </path>
        <circle
          cx={x2}
          cy={y2}
          className={`workflow-connection-dot ${isActive ? 'active' : ''}`}
        />
      </g>
    );
  };

  return (
    <div className="relative w-full h-96 mx-auto max-w-4xl">
      {/* Background SVG for connections */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
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