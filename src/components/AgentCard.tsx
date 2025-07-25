import React from 'react';
import { Heart, Coins, Users } from 'lucide-react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  featured?: boolean;
  isHired?: boolean;
  isWanted?: boolean;
  wantCount?: number;
  bossCount?: number;
  onHire?: (agentId: string) => void;
  onStartChat?: (agent: Agent) => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, featured = false, isHired = false, isWanted = false, wantCount, bossCount, onHire, onStartChat }) => {
  const getCategoryColor = (category: string) => {
    if (category.includes('美业')) {
      return 'bg-pink-100 text-pink-800 border-pink-200';
    } else if (category.includes('教育')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    } else if (category.includes('初创')) {
      return 'bg-green-100 text-green-800 border-green-200';
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleHireClick = () => {
    if (onHire && (!isHired || agent.isPrelaunch)) {
      onHire(agent.id);
    }
  };

  const handleChatClick = () => {
    // 预上架员工无法派活
    if (onStartChat && !agent.isPrelaunch) {
      onStartChat(agent);
    }
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow ${featured ? 'border-2 border-blue-500' : ''}`}>
      <div className="flex items-center mb-4">
        <img
          src={agent.avatar}
          alt={agent.name}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="font-semibold text-lg">{agent.name}</h3>
          <span className={`text-sm px-2 py-1 rounded ${getCategoryColor(agent.category)}`}>
            {agent.category}
          </span>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">{agent.description}</p>
      
      {!agent.isPrelaunch && (
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center text-gray-500">
              <Heart className="w-4 h-4 mr-1" />
              <span className="text-sm">{agent.likes}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Coins className="w-4 h-4 mr-1" />
              <span className="text-sm">¥{agent.price}/次</span>
            </div>
          </div>
          <div>
            <button 
              onClick={isHired ? handleChatClick : handleHireClick}
              className={`px-4 py-2 rounded transition-colors ${
                isHired
                  ? 'bg-purple-500 text-white hover:bg-purple-600'
                  : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            >
              {isHired ? '派活' : '聘用'}
            </button>
          </div>
        </div>
      )}
      
      {agent.isPrelaunch && (
        <div className="flex space-x-2">
          <button 
            onClick={handleHireClick}
            className={`px-4 py-2 rounded transition-colors ${
              isWanted
                ? 'bg-orange-100 text-orange-700 border border-orange-200 hover:bg-orange-50'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
          >
            {isWanted ? '取消想要' : '想要'}
          </button>
        </div>
      )}
      
      <div className="mt-2 flex items-center text-gray-500">
        <Users className="w-4 h-4 mr-1" />
        <span className="text-sm">
          {agent.isPrelaunch 
            ? `${wantCount !== undefined ? wantCount : agent.bossCount}位老板想要`
            : `${bossCount !== undefined ? bossCount : agent.bossCount}位老板已用`
          }
        </span>
      </div>
    </div>
  );
};

export default AgentCard;