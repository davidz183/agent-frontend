import React from 'react';
import { Compass, Bot, Plug, Database, User, ChevronDown } from 'lucide-react';

interface SidebarProps {
  onPageChange?: (page: 'discover' | 'myagents' | 'plugins' | 'knowledge' | 'profile') => void;
  currentPage?: string;
  onIndustryChange?: (industry: string) => void;
  selectedIndustry?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  onPageChange, 
  currentPage = 'discover', 
  onIndustryChange, 
  selectedIndustry = 'all' 
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleMenuClick = (page: 'discover' | 'myagents' | 'plugins' | 'knowledge' | 'profile') => {
    if (onPageChange) {
      onPageChange(page);
    }
  };

  const industries = [
    { id: 'general', name: '行业通用' },
    { id: 'beauty', name: '美业' },
    { id: 'education', name: '教育' },
    { id: 'startup', name: '初创' },
  ];

  const handleIndustrySelect = (industryId: string) => {
    if (onIndustryChange) {
      onIndustryChange(industryId);
    }
    setIsDropdownOpen(false);
  };

  const selectedIndustryName = industries.find(ind => ind.id === selectedIndustry)?.name || '行业通用';

  const menuItems = [
    { icon: Compass, label: '发现人才', page: 'discover' as const },
    { icon: Bot, label: '我的AI员工', page: 'myagents' as const },
    { icon: Database, label: '企业知识', page: 'knowledge' as const },
    { icon: Plug, label: '更多技能', page: 'plugins' as const },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        {/* Brand Header */}
        <div className="flex items-center space-x-3 mb-4 pb-4 border-b border-gray-100">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <span className="text-xl font-bold text-gray-900">Pintu</span>
        </div>
        
        <div className="relative mb-4">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">行</span>
            </div>
            <span className="font-semibold text-gray-900 flex-1 text-left">{selectedIndustryName}</span>
            <ChevronDown 
              size={16} 
              className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
            />
          </button>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              {industries.map((industry) => (
                <button
                  key={industry.id}
                  onClick={() => handleIndustrySelect(industry.id)}
                  className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg ${
                    selectedIndustry === industry.id ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                  }`}
                >
                  {industry.name}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Discover Talent Button */}
        <button
          onClick={() => handleMenuClick('discover')}
          className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full text-left mb-4 ${
            currentPage === 'discover'
              ? 'bg-purple-500 text-white shadow-lg'
              : 'bg-purple-50 text-purple-700 hover:bg-purple-100 border border-purple-200'
          }`}
        >
          <Compass size={18} />
          <span className="font-semibold">发现人才</span>
        </button>
        
        {/* Close dropdown when clicking outside */}
        {isDropdownOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsDropdownOpen(false)}
          />
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {menuItems.filter(item => item.page !== 'discover').map((item, index) => (
            <li key={index}>
              <button
                onClick={() => item.page ? handleMenuClick(item.page) : undefined}
                className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 ${
                  currentPage === item.page
                    ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-500'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                } w-full text-left`}
              >
                <item.icon size={18} />
                <span className="font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={() => handleMenuClick('profile')}
          className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors duration-200 w-full text-left ${
            currentPage === 'profile'
              ? 'bg-purple-50 text-purple-700 border-r-2 border-purple-500'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <img
            src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop"
            alt="用户头像"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex items-center space-x-2">
            <User size={16} />
            <span className="font-medium">企业中心</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;