import React from 'react';
import { Agent } from '../types';
import AgentCard from './AgentCard';

interface FeaturedSectionProps {
  agents: Agent[];
  hiredAgents: Set<string>;
  onHireAgent: (agentId: string) => void;
  onStartChat?: (agent: Agent) => void;
}

const FeaturedSection: React.FC<FeaturedSectionProps> = ({ agents, hiredAgents, onHireAgent, onStartChat }) => {
  const featuredAgents = agents.filter(agent => agent.featured);

  if (featuredAgents.length === 0) return null;

  return (
    <div className="px-8 py-6 bg-gradient-to-r from-blue-50 to-purple-50">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 mb-2">精选推荐</h2>
        <p className="text-gray-600">用过的老板都说好</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featuredAgents.map((agent) => (
          <AgentCard 
            key={agent.id} 
            agent={agent} 
            featured 
            isHired={hiredAgents.has(agent.id)}
            onHire={onHireAgent}
            onStartChat={onStartChat}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;