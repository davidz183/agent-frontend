import React, { useState } from 'react';
import { ArrowLeft, Check, X, Star, Users, Zap, Shield, Crown, Sparkles } from 'lucide-react';

interface PricingPageProps {
  onBack: () => void;
  onNavigateToProfile?: () => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ onBack, onNavigateToProfile }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = [
    {
      id: 'free',
      name: '免费版',
      price: { monthly: 0, yearly: 0 },
      description: '适合个人用户体验',
      icon: <Users className="w-6 h-6" />,
      color: 'gray',
      popular: false,
      features: [
        { name: '每月10次AI员工服务', included: true },
        { name: '基础客服支持', included: true },
        { name: '标准响应速度', included: true },
        { name: '基础数据分析', included: true },
        { name: '高级AI员工', included: false },
        { name: '优先客服支持', included: false },
        { name: '自定义工作流', included: false },
        { name: '团队协作功能', included: false }
      ]
    },
    {
      id: 'pro',
      name: '专业版',
      price: { monthly: 99, yearly: 89 },
      description: '适合中小企业使用',
      icon: <Zap className="w-6 h-6" />,
      color: 'purple',
      popular: true,
      features: [
        { name: '每月500次AI员工服务', included: true },
        { name: '所有AI员工类型', included: true },
        { name: '优先响应速度', included: true },
        { name: '高级数据分析', included: true },
        { name: '自定义工作流', included: true },
        { name: '优先客服支持', included: true },
        { name: 'API接口访问', included: true },
        { name: '团队协作功能', included: false }
      ]
    },
    {
      id: 'team',
      name: '团队版',
      price: { monthly: 299, yearly: 269 },
      description: '适合团队协作使用',
      icon: <Shield className="w-6 h-6" />,
      color: 'blue',
      popular: false,
      features: [
        { name: '每月2000次AI员工服务', included: true },
        { name: '所有AI员工类型', included: true },
        { name: '最快响应速度', included: true },
        { name: '企业级数据分析', included: true },
        { name: '高级自定义工作流', included: true },
        { name: '专属客服支持', included: true },
        { name: 'API接口访问', included: true },
        { name: '团队协作功能', included: true }
      ]
    },
    {
      id: 'enterprise',
      name: '企业版',
      price: { monthly: 'custom', yearly: 'custom' },
      description: '适合大型企业定制',
      icon: <Crown className="w-6 h-6" />,
      color: 'gold',
      popular: false,
      features: [
        { name: '无限次AI员工服务', included: true },
        { name: '专属AI员工定制', included: true },
        { name: '极速响应保障', included: true },
        { name: '企业级安全合规', included: true },
        { name: '完全自定义工作流', included: true },
        { name: '7x24专属客服', included: true },
        { name: '完整API权限', included: true },
        { name: '高级团队管理', included: true }
      ]
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      gray: {
        bg: 'bg-gray-50',
        border: 'border-gray-200',
        text: 'text-gray-600',
        button: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
        icon: 'bg-gray-100 text-gray-600'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-600',
        button: 'bg-purple-500 text-white hover:bg-purple-600',
        icon: 'bg-purple-100 text-purple-600'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-600',
        button: 'bg-blue-500 text-white hover:bg-blue-600',
        icon: 'bg-blue-100 text-blue-600'
      },
      gold: {
        bg: 'bg-yellow-50',
        border: 'border-yellow-200',
        text: 'text-yellow-600',
        button: 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600',
        icon: 'bg-yellow-100 text-yellow-600'
      }
    };

    return colorMap[color as keyof typeof colorMap] || colorMap.gray;
  };

  const formatPrice = (price: number | string) => {
    if (price === 'custom') return '联系销售';
    if (price === 0) return '免费';
    return `¥${price}`;
  };

  return (
    <div className="flex-1 flex flex-col bg-gradient-to-br from-gray-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-8 py-6">
        <button
          onClick={onNavigateToProfile || onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors duration-200 mb-4"
        >
          <ArrowLeft size={20} />
          <span>返回</span>
        </button>
        <div className="text-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            选择适合您的方案
          </h1>
          <p className="text-gray-600">从免费开始，随业务增长升级</p>
        </div>
      </div>

      {/* Billing Toggle */}
      <div className="px-8 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-8">
            <div className="bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                按月付费
              </button>
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 py-2 rounded-md font-medium transition-all duration-200 relative ${
                  billingCycle === 'yearly'
                    ? 'bg-purple-500 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                按年付费
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                  省10%
                </span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {plans.map((plan) => {
              const colors = getColorClasses(plan.color);
              const currentPrice = plan.price[billingCycle];
              
              return (
                <div
                  key={plan.id}
                  className={`relative bg-white rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    plan.popular 
                      ? 'border-purple-300 shadow-lg ring-2 ring-purple-100' 
                      : colors.border
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center space-x-1">
                        <Star size={14} />
                        <span>最受欢迎</span>
                      </div>
                    </div>
                  )}

                  {/* Plan Header */}
                  <div className="text-center mb-6">
                    <div className={`w-12 h-12 rounded-lg ${colors.icon} flex items-center justify-center mx-auto mb-3`}>
                      {plan.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 text-sm">{plan.description}</p>
                  </div>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {formatPrice(currentPrice)}
                      {typeof currentPrice === 'number' && currentPrice > 0 && (
                        <span className="text-lg font-normal text-gray-500">/月</span>
                      )}
                    </div>
                    {billingCycle === 'yearly' && typeof currentPrice === 'number' && currentPrice > 0 && (
                      <div className="text-sm text-green-600">
                        年付节省 ¥{(plan.price.monthly as number - currentPrice) * 12}
                      </div>
                    )}
                  </div>

                  {/* Features */}
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          feature.included 
                            ? 'bg-green-100 text-green-600' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {feature.included ? (
                            <Check size={12} />
                          ) : (
                            <X size={12} />
                          )}
                        </div>
                        <span className={`text-sm ${
                          feature.included ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${colors.button}`}>
                    {plan.id === 'free' ? '立即开始' : 
                     plan.id === 'enterprise' ? '联系销售' : '选择方案'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="mt-16 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">常见问题</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">什么是AI员工服务次数？</h3>
                <p className="text-gray-600 text-sm">
                  每次与AI员工的完整对话或任务处理计为一次服务。包括文档处理、客户咨询、数据分析等。
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">可以随时升级或降级吗？</h3>
                <p className="text-gray-600 text-sm">
                  是的，您可以随时升级方案。降级将在当前计费周期结束后生效，不会影响已付费的服务。
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">企业版包含哪些定制服务？</h3>
                <p className="text-gray-600 text-sm">
                  企业版提供专属AI员工定制、私有化部署、专属客服支持、定制化工作流等服务。
                </p>
              </div>
              <div className="bg-white rounded-lg p-6 border border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-2">支持哪些支付方式？</h3>
                <p className="text-gray-600 text-sm">
                  支持微信支付、支付宝、银行卡支付。企业用户还支持对公转账和发票开具。
                </p>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-16 text-center">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-8 text-white">
              <div className="flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 mr-2" />
                <h2 className="text-2xl font-bold">需要帮助选择方案？</h2>
              </div>
              <p className="text-purple-100 mb-6">
                我们的专业顾问将为您推荐最适合的方案
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-purple-50 transition-colors duration-200">
                  在线咨询
                </button>
                <button className="border border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors duration-200">
                  预约演示
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;