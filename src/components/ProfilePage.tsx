import React, { useState } from 'react';
import { ArrowLeft, Settings, CreditCard, Shield, Bell, HelpCircle, LogOut, Edit3, Save, X, DollarSign } from 'lucide-react';

interface ProfilePageProps {
  onBack: () => void;
  onNavigate?: (page: 'discover' | 'myagents' | 'plugins' | 'knowledge' | 'profile' | 'pricing') => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ onBack, onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: '张三',
    email: 'zhangsan@example.com',
    phone: '138****8888',
    company: 'ABC科技有限公司',
    position: '产品经理',
    joinDate: '2024-01-15'
  });
  const [editInfo, setEditInfo] = useState(userInfo);

  const handleSave = () => {
    setUserInfo(editInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditInfo(userInfo);
    setIsEditing(false);
  };

  const handleMenuClick = (page: 'discover' | 'myagents' | 'plugins' | 'knowledge' | 'profile' | 'pricing') => {
    if (onNavigate) {
      onNavigate(page);
    }
  };
  
  const menuItems: Array<{
    icon: React.ElementType;
    label: string;
    description: string;
    action?: 'discover' | 'myagents' | 'plugins' | 'knowledge' | 'profile' | 'pricing';
  }> = [
    { icon: DollarSign, label: '套餐与定价', description: '查看和升级您的服务套餐', action: 'pricing' },
    { icon: CreditCard, label: '账单与付费', description: '查看消费记录和管理付费方式' },
    { icon: Shield, label: '账号安全', description: '密码修改、两步验证等安全设置' },
    { icon: Bell, label: '通知设置', description: '管理消息通知和提醒偏好' },
    { icon: Settings, label: '系统设置', description: '个性化设置和偏好配置' },
    { icon: HelpCircle, label: '帮助中心', description: '常见问题和使用指南' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 mb-4"
        >
          <ArrowLeft size={20} />
          <span>返回</span>
        </button>
        <h1 className="text-2xl font-bold text-gray-900">企业中心</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-gray-900">个人信息</h2>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors duration-200"
                >
                  <Edit3 size={16} />
                  <span>编辑</span>
                </button>
              ) : (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center space-x-2 bg-purple-500 text-white px-3 py-1.5 rounded-lg hover:bg-purple-600 transition-colors duration-200"
                  >
                    <Save size={16} />
                    <span>保存</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-700 transition-colors duration-200"
                  >
                    <X size={16} />
                    <span>取消</span>
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-start space-x-6">
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
                  alt="用户头像"
                  className="w-20 h-20 rounded-full object-cover"
                />
                {isEditing && (
                  <button className="absolute -bottom-1 -right-1 bg-purple-500 text-white p-1.5 rounded-full hover:bg-purple-600 transition-colors duration-200">
                    <Edit3 size={12} />
                  </button>
                )}
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editInfo.name}
                      onChange={(e) => setEditInfo({...editInfo, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-900">{userInfo.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editInfo.email}
                      onChange={(e) => setEditInfo({...editInfo, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-900">{userInfo.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">手机号</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editInfo.phone}
                      onChange={(e) => setEditInfo({...editInfo, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-900">{userInfo.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">公司</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editInfo.company}
                      onChange={(e) => setEditInfo({...editInfo, company: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-900">{userInfo.company}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">职位</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editInfo.position}
                      onChange={(e) => setEditInfo({...editInfo, position: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-900">{userInfo.position}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">加入时间</label>
                  <p className="text-gray-900">{userInfo.joinDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">使用统计</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">3</div>
                <div className="text-sm text-gray-600">已聘用AI员工</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">127</div>
                <div className="text-sm text-gray-600">累计使用天数</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">¥299</div>
                <div className="text-sm text-gray-600">本月消费</div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">账户管理</h2>
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => item.action && handleMenuClick(item.action)}
                  className="w-full flex items-center space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
                >
                  <div className="flex-shrink-0">
                    <item.icon size={20} className="text-gray-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">{item.label}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                  <div className="text-gray-400">
                    <ArrowLeft size={16} className="rotate-180" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Logout */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <button className="w-full flex items-center justify-center space-x-2 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200">
              <LogOut size={20} />
              <span className="font-medium">退出登录</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;