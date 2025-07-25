import React from 'react';
import { Agent } from '../types';
import AgentCard from './AgentCard';

interface AgentGridProps {
  agents: Agent[];
  title: string;
  hiredAgents: Set<string>;
  wantedAgents: Set<string>;
  agentWantCounts: { [key: string]: number };
  agentBossCounts: { [key: string]: number };
  onHireAgent: (agentId: string) => void;
  onStartChat?: (agent: Agent) => void;
}

const AgentGrid: React.FC<AgentGridProps> = ({ agents, title, hiredAgents, wantedAgents, agentWantCounts, agentBossCounts, onHireAgent, onStartChat }) => {
  if (agents.length === 0) {
    return (
      <div className="px-8 py-12 text-center">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.5a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">暂无相关AI员工</h3>
        <p className="text-gray-500">请尝试调整搜索条件或浏览其他分类</p>
      </div>
    );
  }

  return (
    <div className="px-8 py-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {agents.map((agent) => (
          <AgentCard 
            key={agent.id} 
            agent={agent} 
            isHired={hiredAgents.has(agent.id)}
            isWanted={wantedAgents.has(agent.id)}
            wantCount={agentWantCounts[agent.id]}
            bossCount={agentBossCounts[agent.id]}
            onHire={onHireAgent}
            onStartChat={onStartChat}
          />
        ))}
      </div>
    </div>
  );
};

export default AgentGrid;