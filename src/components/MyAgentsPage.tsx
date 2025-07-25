import React, { useState } from 'react';
import { ArrowLeft, Heart, Coins, Users, Star, Clock, TrendingUp, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { Agent } from '../types';
import { agents } from '../data/agents';
import ManagementModal from './ManagementModal';


interface MyAgentsPageProps {
  onBack: () => void;
  selectedIndustry: string;
  hiredAgents: Set<string>;
  agentBossCounts: { [key: string]: number };
  onAddNewEmployee: () => void;
  onStartChat: (agent: Agent) => void;
}

const MyAgentsPage: React.FC<MyAgentsPageProps> = ({ onBack, selectedIndustry, hiredAgents, agentBossCounts, onAddNewEmployee, onStartChat }) => {
  const [managementAgent, setManagementAgent] = useState<Agent | null>(null);
  const [localHiredAgents, setLocalHiredAgents] = useState<Set<string>>(hiredAgents);

  const handleFireAgent = (agentId: string) => {
    setLocalHiredAgents(prev => {
      const newSet = new Set(prev);
      newSet.delete(agentId);
      return newSet;
    });
  };

  // 根据行业获取对应的AI员工数据
  const getIndustryAgents = () => {
    // 从所有agents中筛选出已聘用的员工（排除预上架员工）
    const hiredAgentsList = agents.filter(agent => 
      localHiredAgents.has(agent.id) && !agent.isPrelaunch
    );
    
    // 根据选择的行业筛选
    const categoryMap: { [key: string]: string } = {
      'general': '行业通用',
      'beauty': '美业',
      'education': '教育',
      'startup': '初创',
    };
    const categoryName = categoryMap[selectedIndustry];
    if (categoryName) {
      return hiredAgentsList.filter(agent => agent.category === categoryName);
    }
    
    return [];
  };

  // 根据行业获取页面标题和描述
  const getIndustryInfo = () => {
    switch (selectedIndustry) {
      case 'general':
        return {
          title: '我的通用团队',
          description: '专业通用AI员工，助力各行业发展',
          gradient: 'from-gray-50 to-slate-50',
          headerBg: 'bg-white/80 backdrop-blur-sm border-b border-gray-200',
          titleGradient: 'from-gray-600 to-slate-600'
        };
      case 'beauty':
        return {
          title: '我的美业团队',
          description: '专业美业AI员工，助力店铺运营',
          gradient: 'from-pink-50 to-purple-50',
          headerBg: 'bg-white/80 backdrop-blur-sm border-b border-pink-200',
          titleGradient: 'from-pink-600 to-purple-600'
        };
      case 'education':
        return {
          title: '我的教育团队',
          description: '专业教育AI员工，助力教学管理',
          gradient: 'from-blue-50 to-indigo-50',
          headerBg: 'bg-white/80 backdrop-blur-sm border-b border-blue-200',
          titleGradient: 'from-blue-600 to-indigo-600'
        };
      case 'startup':
        return {
          title: '我的初创团队',
          description: '专业初创AI员工，助力创业发展',
          gradient: 'from-green-50 to-emerald-50',
          headerBg: 'bg-white/80 backdrop-blur-sm border-b border-green-200',
          titleGradient: 'from-green-600 to-emerald-600'
        };
      default:
        return {
          title: '我的AI员工团队',
          description: '专业AI员工，助力业务发展',
          gradient: 'from-gray-50 to-slate-50',
          headerBg: 'bg-white/80 backdrop-blur-sm border-b border-gray-200',
          titleGradient: 'from-gray-600 to-slate-600'
        };
    }
  };

  const currentAgents = getIndustryAgents();
  const industryInfo = getIndustryInfo();

  const getCategoryIcon = (category: string) => {
    // 根据不同类别返回对应图标
    if (category.includes('美业') || category.includes('护理') || category.includes('管理') || category.includes('塑形')) {
      return <Sparkles className="w-4 h-4" />;
    } else if (category.includes('教育') || category.includes('招生') || category.includes('辅导')) {
      return <Star className="w-4 h-4" />;
    } else {
      return <Star className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    // 根据不同类别返回对应颜色
    if (category.includes('美业')) {
      return 'bg-pink-100 text-pink-800';
    } else if (category.includes('教育')) {
      return 'bg-blue-100 text-blue-800';
    } else {
      return 'bg-gray-100 text-gray-800';
    }
  };

  // 如果没有聘用任何员工，显示空状态
  if (currentAgents.length === 0) {
    return (
      <div className={`flex-1 flex flex-col bg-gradient-to-br ${industryInfo.gradient}`}>
        {/* Header */}
        <div className={`${industryInfo.headerBg} px-8 py-6`}>
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 mb-4"
          >
            <ArrowLeft size={20} />
            <span>返回</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold bg-gradient-to-r ${industryInfo.titleGradient} bg-clip-text text-transparent`}>
                {industryInfo.title}
              </h1>
              <p className="text-gray-600 mt-2">{industryInfo.description}</p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center px-8">
          <div className="text-center max-w-md">
            <div className="w-20 h-20 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">还没有AI员工</h3>
            <p className="text-gray-600 mb-6">
              您还没有聘用任何{selectedIndustry === 'beauty' ? '美业' : selectedIndustry === 'general' ? '通用' : selectedIndustry === 'education' ? '教育' : ''}AI员工
            </p>
            <button
              onClick={onAddNewEmployee}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-200"
            >
              去发现人才
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={`flex-1 flex flex-col bg-gradient-to-br ${industryInfo.gradient}`}>
      {/* Header */}
      <div className={`${industryInfo.headerBg} px-8 py-6`}>
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 mb-4"
        >
          <ArrowLeft size={20} />
          <span>返回</span>
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl font-bold bg-gradient-to-r ${industryInfo.titleGradient} bg-clip-text text-transparent`}>
              {industryInfo.title}
            </h1>
            <p className="text-gray-600 mt-2">{industryInfo.description}</p>
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-600">{currentAgents.length}</div>
              <div className="text-gray-500">团队成员</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-gray-500">在线服务</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-rose-600">98%</div>
              <div className="text-gray-500">客户满意度</div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-7xl mx-auto">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-pink-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-pink-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-pink-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">今日工作</div>
                  <div className="text-xl font-bold text-gray-900">23次</div>
                </div>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-purple-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MessageCircle className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">用户咨询</div>
                  <div className="text-xl font-bold text-gray-900">156轮</div>
                </div>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-rose-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-rose-100 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">本月费用</div>
                  <div className="text-xl font-bold text-gray-900">¥28.5</div>
                </div>
              </div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 border border-orange-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">工作时长</div>
                  <div className="text-xl font-bold text-gray-900">47h</div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Employees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentAgents.map((agent) => (
              <div 
                key={agent.id} 
                className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-6 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="relative">
                    <img
                      src={agent.avatar}
                      alt={agent.name}
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-md"
                    />
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="font-bold text-lg text-gray-900">{agent.name}</h3>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(agent.category)}`}>
                      {getCategoryIcon(agent.category)}
                      <span>{agent.category}</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {agent.description}
                </p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center text-gray-500 text-sm">
                      <Heart className="w-4 h-4 mr-1 text-red-400" />
                      <span>{agent.likes}</span>
                    </div>
                    <div className="flex items-center text-gray-500 text-sm">
                      <Coins className="w-4 h-4 mr-1 text-yellow-500" />
                      <span>¥{agent.price}/次</span>
                    </div>
                  </div>
                  <div className="flex items-center text-gray-500 text-xs">
                    <Users className="w-3 h-3 mr-1" />
                    <span>{agentBossCounts[agent.id] !== undefined ? agentBossCounts[agent.id] : agent.bossCount}+老板在用</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartChat(agent);
                    }}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 px-4 rounded-lg font-medium hover:from-pink-600 hover:to-rose-600 transition-all duration-200 text-sm"
                  >
                    立即派活
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setManagementAgent(agent);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-sm"
                  >
                    管理
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Employee Card */}
          <div className="mt-6">
            <div 
              className="bg-white/60 backdrop-blur-sm rounded-2xl border-2 border-dashed border-pink-300 p-8 text-center hover:border-pink-400 hover:bg-white/80 transition-all duration-300 cursor-pointer"
              onClick={onAddNewEmployee}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">添加新员工</h3>
              <p className="text-gray-600 text-sm">从AI员工市场选择更多专业人才</p>
            </div>
          </div>
        </div>
      </div>


      {/* Management Modal */}
      {managementAgent && (
        <ManagementModal
          agent={managementAgent}
          onClose={() => setManagementAgent(null)}
          onFire={handleFireAgent}
        />
      )}
    </div>
  );
};

export default MyAgentsPage;