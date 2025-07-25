export interface Agent {
  id: string;
  name: string;
  description: string;
  avatar: string;
  category: string;
  role: string; // 添加角色字段
  likes: number;
  featured?: boolean;
  price: number; // 每次工作的价格（元）
  bossCount: number; // 已使用该员工的老板数量
  isPrelaunch?: boolean; // 是否为预上架状态
}

export interface Category {
  id: string;
  name: string;
  count?: number;
}

export const agents: Agent[] = [
  // 行业通用 - 行政助理
  {
    id: '1',
    name: '文档翻译助手',
    description: '多语言文档翻译，一键完成各类语言文档翻译',
    avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '行业通用',
    role: 'administrative',
    likes: 166,
    price: 0.08,
    bossCount: 890
  },
  {
    id: '2',
    name: '音频转录助手',
    description: '智能语音识别，快速将音频转换为文字',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '行业通用',
    role: 'administrative',
    likes: 0,
    price: 0,
    bossCount: 567,
    isPrelaunch: true
  },
  {
    id: '3',
    name: '会议纪要助手',
    description: '自动生成会议纪要，整理会议要点和行动项',
    avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '行业通用',
    role: 'administrative',
    likes: 189,
    price: 0.07,
    bossCount: 423
  },

  // 行业通用 - 内容创作
  {
    id: '4',
    name: '文案写作助手',
    description: '专业文案创作，多平台适配，提升内容吸引力',
    avatar: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '行业通用',
    role: 'content_creation',
    likes: 234,
    price: 0.06,
    bossCount: 789
  },
  {
    id: '5',
    name: 'PPT生成助手',
    description: '智能PPT制作，快速生成专业演示文稿',
    avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '行业通用',
    role: 'content_creation',
    likes: 234,
    price: 0.12,
    bossCount: 456
  },
  {
    id: '6',
    name: '平面设计师',
    description: '专业平面设计，提供现代化设计方案',
    avatar: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '行业通用',
    role: 'content_creation',
    likes: 189,
    price: 0.15,
    bossCount: 234
  },
  {
    id: '7',
    name: '视频剪辑助手',
    description: '智能视频剪辑，快速制作精美视频内容',
    avatar: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '行业通用',
    role: 'content_creation',
    likes: 198,
    price: 0.18,
    bossCount: 345
  },

  // 行业通用 - 分析决策
  {
    id: '8',
    name: '数据分析助手',
    description: '专业数据分析，洞察业务趋势，辅助决策制定',
    avatar: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '行业通用',
    role: 'analysis_decision',
    likes: 0,
    price: 0,
    bossCount: 567,
    isPrelaunch: true
  },

  // 行业通用 - 客服
  {
    id: '9',
    name: '客户服务专家',
    description: '随时随地响应，解答各类问题，提供专业客户服务',
    avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '行业通用',
    role: 'customer_service',
    likes: 267,
    price: 0.05,
    bossCount: 1250
  },

  // 美业 - 客服
  {
    id: '10',
    name: '客户服务专家',
    description: '专业美业客户服务，预约管理，售后跟进',
    avatar: 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '美业',
    role: 'service',
    likes: 156,
    price: 0.06,
    bossCount: 567
  },

  // 美业 - 顾问
  {
    id: '11',
    name: '美容护肤顾问',
    description: '专业美容护肤建议，个性化美容方案制定',
    avatar: 'https://images.pexels.com/photos/3762800/pexels-photo-3762800.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '美业',
    role: 'consultant',
    likes: 198,
    price: 0.08,
    bossCount: 412
  },
  {
    id: '12',
    name: '健康管理顾问',
    description: '专业健康管理咨询，制定个性化健康方案',
    avatar: 'https://images.pexels.com/photos/3065209/pexels-photo-3065209.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '美业',
    role: 'consultant',
    likes: 176,
    price: 0.09,
    bossCount: 334
  },

  // 美业 - 培训
  {
    id: '13',
    name: '产品培训专家',
    description: '专业产品培训指导，提升团队专业技能',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '美业',
    role: 'training',
    likes: 145,
    price: 0.12,
    bossCount: 278
  },
  {
    id: '14',
    name: '邀约助手',
    description: '智能客户邀约，提升到店率和转化效果',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '美业',
    role: 'service',
    likes: 167,
    price: 0.07,
    bossCount: 445
  },

  // 美业 - 内容
  {
    id: '15',
    name: '美业朋友圈文案专家',
    description: '专业美业朋友圈文案创作，提升品牌影响力',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '美业',
    role: 'content',
    likes: 189,
    price: 0.05,
    bossCount: 623
  },
  {
    id: '16',
    name: '视频剪辑助手',
    description: '专业美业视频制作，展示服务效果和店铺形象',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '美业',
    role: 'content',
    likes: 0,
    price: 0,
    bossCount: 356,
    isPrelaunch: true
  },
  {
    id: '17',
    name: '活动策划专家',
    description: '美业活动策划执行，提升客户参与度和营收',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '美业',
    role: 'content',
    likes: 0,
    price: 0,
    bossCount: 289,
    isPrelaunch: true
  },

  // 美业 - 管理
  {
    id: '18',
    name: '店长助理',
    description: '协助店铺日常管理，员工调度，业绩分析',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '美业',
    role: 'management',
    likes: 0,
    price: 0,
    bossCount: 234,
    isPrelaunch: true
  },

  // 教育 - 招生顾问
  {
    id: '19',
    name: '剑桥官方招生官',
    description: '解答中国学生关于剑桥招生的一切疑惑，入学申请辅导，为学生提供入读剑桥教育方案建议',
    avatar: 'https://images.pexels.com/photos/1181345/pexels-photo-1181345.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '教育',
    role: 'admissions',
    likes: 145,
    price: 0.10,
    bossCount: 234
  },

  // 教育 - 辅导员
  {
    id: '20',
    name: '剑桥学生代表',
    description: '为中国剑桥学生提供海外生活帮助、学业辅导等，让学生更好融入剑桥校园生活',
    avatar: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '教育',
    role: 'counselor',
    likes: 167,
    price: 0.08,
    bossCount: 189
  },
  {
    id: '21',
    name: '剑桥心理咨询师',
    description: '为剑桥学生提供心理辅导与帮助，陪伴你度过剑桥学习生涯',
    avatar: 'https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '教育',
    role: 'counselor',
    likes: 198,
    price: 0.12,
    bossCount: 156
  },

  // 初创 - 行业分析员
  {
    id: '22',
    name: '行业分析员',
    description: '深度行业研究分析，市场趋势洞察，竞争对手分析',
    avatar: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '初创',
    role: 'analyst',
    likes: 156,
    price: 0.15,
    bossCount: 234
  },
  {
    id: '23',
    name: '市场研究专家',
    description: '市场调研分析，用户画像构建，商业模式验证',
    avatar: 'https://images.pexels.com/photos/1181605/pexels-photo-1181605.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '初创',
    role: 'analyst',
    likes: 0,
    price: 0,
    bossCount: 189,
    isPrelaunch: true
  },

  // 初创 - 产品经理
  {
    id: '24',
    name: '产品经理',
    description: '产品规划设计，需求分析管理，产品迭代优化',
    avatar: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '初创',
    role: 'product_manager',
    likes: 198,
    price: 0.18,
    bossCount: 345
  },
  {
    id: '25',
    name: 'MVP设计师',
    description: '最小可行产品设计，快速原型验证，用户体验优化',
    avatar: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '初创',
    role: 'product_manager',
    likes: 167,
    price: 0.16,
    bossCount: 278
  },

  // 初创 - 投资助理
  {
    id: '26',
    name: '投资助理',
    description: '融资方案制定，投资人对接，商业计划书撰写',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '初创',
    role: 'investment_assistant',
    likes: 145,
    price: 0.20,
    bossCount: 156
  },
  {
    id: '27',
    name: '财务专家',
    description: '财务模型构建，投资回报分析，估值计算',
    avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '初创',
    role: 'investment_assistant',
    likes: 0,
    price: 0,
    bossCount: 123,
    isPrelaunch: true
  },

  // 初创 - 法务专家
  {
    id: '28',
    name: '法务专家',
    description: '公司注册指导，合同审核起草，知识产权保护',
    avatar: 'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '初创',
    role: 'legal_expert',
    likes: 134,
    price: 0.25,
    bossCount: 198
  },
  {
    id: '29',
    name: '合规顾问',
    description: '行业合规咨询，政策解读分析，风险评估管理',
    avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '初创',
    role: 'legal_expert',
    likes: 0,
    price: 0,
    bossCount: 167,
    isPrelaunch: true
  },

  // 初创 - 财务专家
  {
    id: '30',
    name: '财务专家',
    description: '财务规划管理，成本控制优化，税务筹划建议',
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '初创',
    role: 'finance_expert',
    likes: 176,
    price: 0.22,
    bossCount: 234
  },
  {
    id: '31',
    name: '会计助理',
    description: '日常记账管理，财务报表制作，税务申报协助',
    avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    category: '初创',
    role: 'finance_expert',
    likes: 0,
    price: 0,
    bossCount: 145,
    isPrelaunch: true
  }
];

export const categories: Category[] = [
  { id: 'general', name: '行业通用', count: agents.filter(a => a.category === '行业通用').length },
  { id: 'beauty', name: '美业', count: agents.filter(a => a.category === '美业').length },
  { id: 'education', name: '教育', count: agents.filter(a => a.category === '教育').length },
  { id: 'startup', name: '初创', count: agents.filter(a => a.category === '初创').length }
];