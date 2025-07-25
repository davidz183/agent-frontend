import React from 'react';
import { useState, useMemo } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import CategoryFilter from './components/CategoryFilter';
import AgentGrid from './components/AgentGrid';
import ComingSoonPage from './components/ComingSoonPage';
import MyAgentsPage from './components/MyAgentsPage';
import ProfilePage from './components/ProfilePage';
import ChatPage from './components/ChatPage';
import KnowledgePage from './components/KnowledgePage';
import PricingPage from './components/PricingPage';
import { agents } from './data/agents';

// 根据行业获取角色分类
const getRoleCategories = (industry: string) => {
  // 计算每个角色的AI员工数量
  const getCountForRole = (roleId: string, industryId: string) => {
    let filtered = agents;
    const categoryMap: { [key: string]: string } = {
      'general': '行业通用',
      'beauty': '美业',
      'education': '教育',
      'startup': '初创',
    };
    const categoryName = categoryMap[industryId];
    if (categoryName) {
      filtered = filtered.filter(agent => agent.category === categoryName);
    }
    return filtered.filter(agent => agent.role === roleId).length;
  };

  const roleMap: { [key: string]: Array<{ id: string; name: string; count?: number }> } = {
    'general': [
      { id: 'administrative', name: '行政助理', count: getCountForRole('administrative', 'general') },
      { id: 'content_creation', name: '内容创作', count: getCountForRole('content_creation', 'general') },
      { id: 'analysis_decision', name: '分析决策', count: getCountForRole('analysis_decision', 'general') },
      { id: 'customer_service', name: '客服', count: getCountForRole('customer_service', 'general') }
    ],
    'beauty': [
      { id: 'service', name: '客服', count: getCountForRole('service', 'beauty') },
      { id: 'consultant', name: '顾问', count: getCountForRole('consultant', 'beauty') },
      { id: 'training', name: '培训', count: getCountForRole('training', 'beauty') },
      { id: 'content', name: '内容', count: getCountForRole('content', 'beauty') },
      { id: 'management', name: '管理', count: getCountForRole('management', 'beauty') }
    ],
    'education': [
      { id: 'admissions', name: '招生顾问', count: getCountForRole('admissions', 'education') },
      { id: 'counselor', name: '辅导员', count: getCountForRole('counselor', 'education') }
    ],
    'startup': [
      { id: 'analyst', name: '行业分析员', count: getCountForRole('analyst', 'startup') },
      { id: 'product_manager', name: '产品经理', count: getCountForRole('product_manager', 'startup') },
      { id: 'investment_assistant', name: '投资助理', count: getCountForRole('investment_assistant', 'startup') },
      { id: 'legal_expert', name: '法务专家', count: getCountForRole('legal_expert', 'startup') },
      { id: 'finance_expert', name: '财务专家', count: getCountForRole('finance_expert', 'startup') }
    ]
  };
  
  return roleMap[industry] || roleMap['general'];
};

function App() {
  const [activeCategory, setActiveCategory] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('general');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState<'discover' | 'myagents' | 'plugins' | 'knowledge' | 'profile' | 'pricing'>('discover');
  const [hiredAgents, setHiredAgents] = useState<Set<string>>(new Set());
  const [wantedAgents, setWantedAgents] = useState<Set<string>>(new Set());
  const [agentWantCounts, setAgentWantCounts] = useState<{ [key: string]: number }>({});
  const [agentBossCounts, setAgentBossCounts] = useState<{ [key: string]: number }>({});
  const [chatAgent, setChatAgent] = useState<typeof agents[0] | null>(null);

  // 获取当前行业的第一个角色分类ID
  const getFirstRoleId = (industry: string) => {
    const roles = getRoleCategories(industry);
    return roles.length > 0 ? roles[0].id : '';
  };

  // 初始化时设置为当前行业的第一个角色
  React.useEffect(() => {
    setActiveCategory(getFirstRoleId(selectedIndustry));
  }, [selectedIndustry]);

  // 获取当前行业的角色分类
  const currentRoleCategories = getRoleCategories(selectedIndustry);

  const filteredAgents = useMemo(() => {
    let filtered = agents;

    // Filter by industry (from sidebar)
    const categoryMap: { [key: string]: string } = {
      'general': '行业通用',
      'beauty': '美业',
      'education': '教育',
      'startup': '初创',
    };
    
    const categoryName = categoryMap[selectedIndustry];
    if (categoryName) {
      filtered = filtered.filter(agent => agent.category === categoryName);
    }
    
    // Filter by role category
    if (activeCategory && activeCategory !== '') {
      filtered = filtered.filter(agent => agent.role === activeCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(agent =>
        agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        agent.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [activeCategory, selectedIndustry, searchTerm]);

  // 按可用性排序：正式上架的员工排在前面，预上架的员工排在后面
  const sortedAgents = useMemo(() => {
    return [...filteredAgents].sort((a, b) => {
      // 如果一个是预上架，一个不是，优先显示非预上架的
      if (a.isPrelaunch && !b.isPrelaunch) return 1;
      if (!a.isPrelaunch && b.isPrelaunch) return -1;
      // 如果都是同一类型，保持原有顺序
      return 0;
    });
  }, [filteredAgents]);

  const handleHireAgent = (agentId: string) => {
    const agent = agents.find(a => a.id === agentId);
    if (!agent) return;
    
    if (agent?.isPrelaunch) {
      setWantedAgents(prev => {
        const newSet = new Set(prev);
        if (newSet.has(agentId)) {
          // 取消想要
          newSet.delete(agentId);
          setAgentWantCounts(prevCounts => ({
            ...prevCounts,
            [agentId]: Math.max(agent.bossCount, (prevCounts[agentId] || agent.bossCount) - 1)
          }));
        } else {
          // 添加想要
          newSet.add(agentId);
          setAgentWantCounts(prevCounts => ({
            ...prevCounts,
            [agentId]: (prevCounts[agentId] !== undefined ? prevCounts[agentId] : agent.bossCount) + 1
          }));
        }
        return newSet;
      });
    } else {
      setHiredAgents(prev => new Set([...prev, agentId]));
      // 增加老板使用数量
      setAgentBossCounts(prevCounts => ({
        ...prevCounts,
        [agentId]: (prevCounts[agentId] !== undefined ? prevCounts[agentId] : agent.bossCount) + 1
      }));
    }
  };
  const handlePageChange = (page: 'discover' | 'myagents' | 'plugins' | 'knowledge' | 'profile' | 'pricing') => {
    setCurrentPage(page);
  };

  const handleBackToDiscover = () => {
    setCurrentPage('discover');
    setChatAgent(null);
  };

  const handleIndustryChange = (industry: string) => {
    setSelectedIndustry(industry);
    // 切换行业时设置为该行业的第一个角色
    setActiveCategory(getFirstRoleId(industry));
  };

  const handleStartChat = (agent: typeof agents[0]) => {
    // 预上架员工无法派活
    if (agent.isPrelaunch) {
      return;
    }
    setChatAgent(agent);
  };

  const handleBackFromChat = () => {
    setChatAgent(null);
  };

  // If in chat mode, show chat page
  if (chatAgent) {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          onPageChange={handlePageChange} 
          currentPage={currentPage}
          onIndustryChange={handleIndustryChange}
          selectedIndustry={selectedIndustry}
        />
        <ChatPage agent={chatAgent} onBack={handleBackFromChat} />
      </div>
    );
  }

  if (currentPage === 'myagents') {
  const handleAddNewEmployee = () => {
    setCurrentPage('discover');
  };
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          onPageChange={handlePageChange} 
          currentPage={currentPage}
          onIndustryChange={handleIndustryChange}
          selectedIndustry={selectedIndustry}
        />
        <MyAgentsPage 
          onBack={handleBackToDiscover} 
          selectedIndustry={selectedIndustry}
          hiredAgents={hiredAgents}
          agentBossCounts={agentBossCounts}
          onAddNewEmployee={handleAddNewEmployee}
          onStartChat={handleStartChat}
        />
      </div>
    );
  }

  if (currentPage === 'profile') {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          onPageChange={handlePageChange} 
          currentPage={currentPage}
          onIndustryChange={handleIndustryChange}
          selectedIndustry={selectedIndustry}
        />
        <ProfilePage onBack={handleBackToDiscover} onNavigate={handlePageChange} />
      </div>
    );
  }

  if (currentPage === 'knowledge') {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          onPageChange={handlePageChange} 
          currentPage={currentPage}
          onIndustryChange={handleIndustryChange}
          selectedIndustry={selectedIndustry}
        />
        <KnowledgePage onBack={handleBackToDiscover} />
      </div>
    );
  }

  if (currentPage === 'pricing') {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          onPageChange={handlePageChange} 
          currentPage={currentPage}
          onIndustryChange={handleIndustryChange}
          selectedIndustry={selectedIndustry}
        />
        <PricingPage 
          onBack={handleBackToDiscover} 
          onNavigateToProfile={() => setCurrentPage('profile')}
        />
      </div>
    );
  }

  if (currentPage !== 'discover') {
    return (
      <div className="flex h-screen bg-gray-50">
        <Sidebar 
          onPageChange={handlePageChange} 
          currentPage={currentPage}
          onIndustryChange={handleIndustryChange}
          selectedIndustry={selectedIndustry}
        />
        <ComingSoonPage feature={currentPage} onBack={handleBackToDiscover} />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        onPageChange={handlePageChange} 
        currentPage={currentPage}
        onIndustryChange={handleIndustryChange}
        selectedIndustry={selectedIndustry}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        <CategoryFilter
          categories={currentRoleCategories}
          selectedIndustry={selectedIndustry}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
        
        <div className="flex-1 overflow-y-auto">
          <AgentGrid
            agents={sortedAgents}
            hiredAgents={hiredAgents}
            wantedAgents={wantedAgents}
            agentWantCounts={agentWantCounts}
            agentBossCounts={agentBossCounts}
            onHireAgent={handleHireAgent}
            onStartChat={handleStartChat}
            title={
              selectedIndustry === 'beauty' ? '美业 AI员工' :
              selectedIndustry === 'education' ? '教育 AI员工' :
              selectedIndustry === 'general' ? '行业通用 AI员工' :
              selectedIndustry === 'startup' ? '初创 AI员工' :
              activeCategory === 'all' 
                  ? 'AI员工' 
                  : `${currentRoleCategories.find(c => c.id === activeCategory)?.name || '未知'} AI员工`
            }
          />
        </div>
      </div>
    </div>
  );
}

export default App;