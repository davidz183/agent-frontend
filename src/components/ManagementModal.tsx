import React from 'react';
import { X, Heart, Coins, Users, Star, Calendar, TrendingUp, AlertTriangle } from 'lucide-react';
import { Agent } from '../types';

interface ManagementModalProps {
  agent: Agent;
  onClose: () => void;
  onFire: (agentId: string) => void;
}

const ManagementModal: React.FC<ManagementModalProps> = ({ agent, onClose, onFire }) => {
  const [showFireConfirm, setShowFireConfirm] = React.useState(false);

  const handleFireClick = () => {
    setShowFireConfirm(true);
  };

  const handleConfirmFire = () => {
    onFire(agent.id);
    onClose();
  };

  const getCategoryColor = (category: string) => {
    if (category.includes('美业')) {
      return 'bg-pink-100 text-pink-800 border-pink-200';
    } else if (category.includes('教育')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    } else {
      return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryIcon = (category: string) => {
    if (category.includes('美业') || category.includes('护理') || category.includes('管理') || category.includes('塑形')) {
      return <Star className="w-4 h-4" />;
    } else if (category.includes('教育') || category.includes('辅导') || category.includes('咨询')) {
      return <Star className="w-4 h-4" />;
    } else {
      return <Star className="w-4 h-4" />;
    }
  };

  if (showFireConfirm) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">确认解聘</h3>
            <p className="text-gray-600">
              您确定要解聘 <span className="font-semibold text-gray-900">{agent.name}</span> 吗？
            </p>
            <p className="text-sm text-red-600 mt-2">
              解聘后将无法继续使用该AI员工的服务
            </p>
          </div>
          
          <div className="flex space-x-3">
            <button
              onClick={() => setShowFireConfirm(false)}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              取消
            </button>
            <button
              onClick={handleConfirmFire}
              className="flex-1 bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors duration-200 font-medium"
            >
              确认解聘
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">员工管理</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X size={20} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Agent Info */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={agent.avatar}
                alt={agent.name}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-3 border-4 border-purple-100"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
            <h4 className="text-xl font-bold text-gray-900 mb-2">{agent.name}</h4>
            <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(agent.category)}`}>
              {getCategoryIcon(agent.category)}
              <span>{agent.category}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h5 className="font-semibold text-gray-900 mb-2">员工介绍</h5>
            <p className="text-gray-600 text-sm leading-relaxed">{agent.description}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Coins className="w-5 h-5 text-purple-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-purple-600">¥{agent.price}</div>
              <div className="text-xs text-gray-600">每次服务</div>
            </div>
            <div className="bg-pink-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Heart className="w-5 h-5 text-pink-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-pink-600">{agent.likes}</div>
              <div className="text-xs text-gray-600">用户喜欢</div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="w-5 h-5 text-blue-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-blue-600">{agent.bossCount}+</div>
              <div className="text-xs text-gray-600">老板在用</div>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="w-5 h-5 text-green-600 mr-1" />
              </div>
              <div className="text-lg font-bold text-green-600">98%</div>
              <div className="text-xs text-gray-600">满意度</div>
            </div>
          </div>

          {/* Work Stats */}
          <div className="mb-6">
            <h5 className="font-semibold text-gray-900 mb-3">工作统计</h5>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">聘用时间</span>
                </div>
                <span className="text-sm font-medium text-gray-900">7天前</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">服务次数</span>
                </div>
                <span className="text-sm font-medium text-gray-900">23次</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Coins className="w-5 h-5 text-gray-600" />
                  <span className="text-sm text-gray-700">累计费用</span>
                </div>
                <span className="text-sm font-medium text-gray-900">¥{(agent.price * 23).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-200">
              立即派活
            </button>
            <div className="grid grid-cols-2 gap-3">
              <button className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                查看对话记录
              </button>
              <button className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium">
                工作设置
              </button>
            </div>
            <button
              onClick={handleFireClick}
              className="w-full border border-red-300 text-red-600 py-2.5 px-4 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
            >
              解聘员工
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagementModal;