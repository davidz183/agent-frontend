import React, { useState } from 'react';
import { ArrowLeft, Send } from 'lucide-react';

interface ComingSoonPageProps {
  feature: string;
  onBack: () => void;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ feature, onBack }) => {
  const [feedback, setFeedback] = useState('');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the feedback to your backend
    console.log('Feedback submitted:', { feature, feedback, email });
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFeedback('');
      setEmail('');
    }, 3000);
  };

  const getFeatureName = () => {
    const featureMap: { [key: string]: string } = {
      'plugins': '更多技能',
      'knowledge': '企业知识'
    };
    return featureMap[feature] || feature;
  };

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
        <h1 className="text-2xl font-bold text-gray-900">{getFeatureName()}</h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 bg-purple-500 rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">敬请期待</h2>
            <p className="text-gray-600">
              可告诉我们你想要的{getFeatureName()}
            </p>
          </div>

          {submitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="text-green-600 mb-2">
                <svg className="w-8 h-8 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-green-800 font-medium">感谢您的反馈！</p>
              <p className="text-green-600 text-sm mt-1">我们会认真考虑您的建议</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="mb-4">
                <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-2">
                  您希望员工能有的{getFeatureName()} *
                </label>
                <textarea
                  id="feedback"
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder={`请描述您希望的${getFeatureName()}...`}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                  rows={4}
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  联系方式（可选）
                </label>
                <input
                  type="text"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="微信号/手机号/邮箱"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-200"
                />
                <p className="text-xs text-gray-500 mt-1">
                  留下微信、手机号或邮箱，我们会在功能上线时通知您
                </p>
              </div>

              <button
                type="submit"
                disabled={!feedback.trim()}
                className="w-full bg-purple-500 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Send size={16} />
                <span>提交反馈</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComingSoonPage;