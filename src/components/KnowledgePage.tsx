import React, { useState } from 'react';
import { ArrowLeft, Upload, FileText, Trash2, Edit3, Plus, Search, Filter, Download, Eye, Calendar, User } from 'lucide-react';

interface KnowledgePageProps {
  onBack: () => void;
}

interface KnowledgeItem {
  id: string;
  title: string;
  type: 'workflow' | 'knowledge' | 'plugin';
  content: string;
  uploadDate: string;
  uploadBy: string;
  size: string;
  status: 'active' | 'draft' | 'archived';
  fileType?: 'company' | 'department' | 'personal';
}

const KnowledgePage: React.FC<KnowledgePageProps> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedFileType, setSelectedFileType] = useState('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newKnowledge, setNewKnowledge] = useState({
    title: '',
    type: 'workflow' as const,
    content: '',
    fileType: 'company' as 'company' | 'department' | 'personal'
  });

  const [knowledgeItems, setKnowledgeItems] = useState<KnowledgeItem[]>([
    {
      id: '1',
      title: '公司产品介绍手册',
      type: 'workflow',
      content: '详细介绍公司所有产品的功能特点、使用方法和技术规格...',
      uploadDate: '2024-01-15',
      uploadBy: '张三',
      size: '2.5MB',
      status: 'active',
      fileType: 'company'
    },
    {
      id: '2',
      title: '客户服务常见问题',
      type: 'knowledge',
      content: 'Q: 如何申请退款？A: 请联系客服提供订单号...',
      uploadDate: '2024-01-10',
      uploadBy: '李四',
      size: '1.2MB',
      status: 'active',
      fileType: 'department'
    },
    {
      id: '3',
      title: '员工操作规范',
      type: 'plugin',
      content: '1. 接待客户时需要微笑服务 2. 处理投诉时要耐心倾听...',
      uploadDate: '2024-01-08',
      uploadBy: '王五',
      size: '800KB',
      status: 'active',
      fileType: 'personal'
    },
    {
      id: '4',
      title: '公司政策制度',
      type: 'workflow',
      content: '公司考勤制度、请假流程、绩效考核标准...',
      uploadDate: '2024-01-05',
      uploadBy: '赵六',
      size: '1.8MB',
      status: 'draft',
      fileType: 'company'
    }
  ]);

  const typeOptions = [
    { id: 'all', name: '全部类型', color: 'gray' },
    { id: 'workflow', name: '工作流', color: 'blue' },
    { id: 'knowledge', name: '知识文档', color: 'green' },
    { id: 'plugin', name: '技能', color: 'purple' }
  ];

  const fileTypeOptions = [
    { id: 'all', name: '全部来源' },
    { id: 'company', name: '公司文件' },
    { id: 'department', name: '部门文件' },
    { id: 'personal', name: '个人文件' }
  ];

  const getTypeColor = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'workflow': 'bg-blue-100 text-blue-800 border-blue-200',
      'knowledge': 'bg-green-100 text-green-800 border-green-200',
      'plugin': 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return typeMap[type] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const filteredItems = knowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesFileType = selectedFileType === 'all' || (item as any).fileType === selectedFileType;
    return matchesSearch && matchesType && matchesFileType;
  });

  const handleAddKnowledge = () => {
    if (newKnowledge.title && newKnowledge.content) {
      const newItem: KnowledgeItem = {
        id: Date.now().toString(),
        title: newKnowledge.title,
        type: newKnowledge.type,
        content: newKnowledge.content,
        uploadDate: new Date().toISOString().split('T')[0],
        uploadBy: '当前用户',
        size: `${Math.round(newKnowledge.content.length / 1024)}KB`,
        status: 'active',
        fileType: newKnowledge.fileType
      };
      setKnowledgeItems([newItem, ...knowledgeItems]);
      setNewKnowledge({ title: '', type: 'workflow', content: '', fileType: 'company' });
      setShowAddModal(false);
    }
  };

  const handleDeleteItem = (id: string) => {
    setKnowledgeItems(knowledgeItems.filter(item => item.id !== id));
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
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">企业知识库</h1>
            <p className="text-gray-600">以下企业知识内容，你的AI员工已掌握</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex items-center space-x-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-lg hover:bg-purple-200 transition-colors duration-200"
            >
              <Upload size={16} />
              <span>上传文件</span>
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200"
            >
              <Plus size={16} />
              <span>新建知识</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="text"
                placeholder="搜索知识内容..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter size={16} className="text-gray-500" />
              <select
                value={selectedFileType}
                onChange={(e) => setSelectedFileType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                {fileTypeOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              >
                {typeOptions.map(option => (
                  <option key={option.id} value={option.id}>{option.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            共 {filteredItems.length} 条知识内容
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">工作流</div>
                  <div className="text-xl font-bold text-gray-900">
                    {knowledgeItems.filter(item => item.type === 'workflow').length}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Eye className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">知识文档</div>
                  <div className="text-xl font-bold text-gray-900">
                    {knowledgeItems.filter(item => item.type === 'knowledge').length}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Edit3 className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">技能</div>
                  <div className="text-xl font-bold text-gray-900">
                    {knowledgeItems.filter(item => item.type === 'plugin').length}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Download className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">本月更新</div>
                  <div className="text-xl font-bold text-gray-900">
                    {knowledgeItems.filter(item => 
                      item.type === 'workflow' || item.type === 'knowledge' || item.type === 'plugin'
                    ).length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Items */}
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">知识内容</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <div key={item.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{item.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          item.fileType === 'company' ? 'bg-blue-100 text-blue-800' :
                          item.fileType === 'department' ? 'bg-green-100 text-green-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {item.fileType === 'company' ? '公司文件' :
                           item.fileType === 'department' ? '部门文件' :
                           '个人文件'}
                        </span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getTypeColor(item.type)}`}>
                          {typeOptions.find(t => t.id === item.type)?.name}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.content}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Calendar size={12} />
                          <span>{item.uploadDate}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User size={12} />
                          <span>{item.uploadBy}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <FileText size={12} />
                          <span>{item.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200">
                        <Eye size={16} />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Edit3 size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteItem(item.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">暂无知识内容</h3>
              <p className="text-gray-500 mb-4">开始创建您的第一个知识条目</p>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200"
              >
                新建知识
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">上传文件</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">拖拽文件到此处或点击上传</p>
              <p className="text-sm text-gray-500">支持 PDF, DOC, TXT 格式，最大 10MB</p>
              <button className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200">
                选择文件
              </button>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                取消
              </button>
              <button className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors duration-200">
                上传
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Knowledge Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">新建知识</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">标题 *</label>
                <input
                  type="text"
                  value={newKnowledge.title}
                  onChange={(e) => setNewKnowledge({...newKnowledge, title: e.target.value})}
                  placeholder="请输入知识标题"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">类型 *</label>
                <select
                  value={newKnowledge.type}
                  onChange={(e) => setNewKnowledge({...newKnowledge, type: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="workflow">工作流</option>
                  <option value="knowledge">知识库</option>
                  <option value="plugin">技能</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">文件类型 *</label>
                <select
                  value={newKnowledge.fileType}
                  onChange={(e) => setNewKnowledge({...newKnowledge, fileType: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="company">公司文件</option>
                  <option value="department">部门文件</option>
                  <option value="personal">个人文件</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">内容 *</label>
                <textarea
                  value={newKnowledge.content}
                  onChange={(e) => setNewKnowledge({...newKnowledge, content: e.target.value})}
                  placeholder="请输入知识内容..."
                  rows={8}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
              >
                取消
              </button>
              <button
                onClick={handleAddKnowledge}
                disabled={!newKnowledge.title || !newKnowledge.content}
                className="flex-1 bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                创建
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KnowledgePage;