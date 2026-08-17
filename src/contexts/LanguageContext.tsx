import React, { createContext, useContext, useState, useCallback } from 'react';

type Language = 'zh' | 'en';

interface Translations {
  [key: string]: string | string[] | Translations;
}

const translations: Record<Language, Translations> = {
  zh: {
    nav: {
      about: '关于我们',
      services: '业务服务',
      global: '全球布局',
      cases: '成功案例',
      contact: '联系我们',
    },
    hero: {
      subtitle: 'ZETA CONSULTING',
      title: '赋能企业全球化',
      titleHighlight: '铸就跨文化成功',
      description: '致达咨询专注于企业组织与业务国际化解决方案，为出海中资企业与入华外资企业提供定制化、可落地的执行方案。',
      ctaPrimary: '了解我们的服务',
      ctaSecondary: '预约咨询',
    },
    about: {
      label: '关于致达',
      title: '从米兰到全球',
      titleHighlight: '每一步都稳健扎实',
      description: '2019年，ZETA CONSULTING STUDIO诞生于意大利米兰。秉持创新与专业精神，我们在2021年于北京CBD设立办公室，形成米兰-北京双总部战略布局。2024年，紧跟海南自贸港政策，成立东方致达国际投资，进一步助力中资企业"走出去"，协助外资企业"走进来"。',
      stats: {
        years: '年跨境经验',
        talent: '海外人才库',
        countries: '覆盖国家/地区',
        clients: '服务客户',
      },
      values: {
        title: '我们的价值观',
        responsible: '对社会负责 · 对行业负责 · 对客户负责',
        excellence: '专业 · 专注 · 专精',
        innovation: '拥抱AI与数字化管理',
      },
    },
    services: {
      label: '业务服务',
      title: '全方位国际化解决方案',
      subtitle: '从战略咨询到落地执行，我们陪伴企业完成全球化每一步',
      items: {
        business: {
          title: '业务拓展服务',
          desc: '从0到1的欧洲市场业务搭建：市场调研、竞争分析、风险评估、品牌定位、市场准入与合规支持、渠道发展与销售网络建设、电商运营。',
          features: ['市场准入策略', '渠道网络搭建', '电商运营管理', '公司设立支持'],
        },
        hr: {
          title: '人力资源咨询',
          desc: '中高端人才招聘与安置、组织架构设计、标准化制度开发、薪酬福利设计、劳动关系管理、跨文化管理培训。',
          features: ['中高端猎聘', '组织架构搭建', '薪酬绩效体系', '跨文化培训'],
        },
        strategy: {
          title: '战略与商业规划',
          desc: '结合企业中长期发展目标与客观商业环境，提供市场准入实施、商业模式创新、竞争环境研究、跨国资源整合、风险管理等咨询服务。',
          features: ['战略咨询', '商业模式创新', '竞争分析', '风险管理'],
        },
        talent: {
          title: 'ZetaIMPRO · 国际职场人',
          desc: '为国际职场人提供职业规划与发展定制化咨询、国际职场能力重塑、招聘官工作坊等服务，打造全球化职业发展平台。',
          features: ['职业规划咨询', '能力重塑培训', '招聘官工作坊', '人才库对接'],
        },
      },
    },
    global: {
      label: '全球布局',
      title: '欧洲为根',
      titleHighlight: '辐射全球',
      description: '业务拓展服务覆盖欧洲全境，人力资源咨询立足欧洲的同时覆盖亚洲、美洲、拉丁美洲。米兰-北京双总部，团队成员境内外合作实现无国界互融。',
      offices: {
        milan: '意大利 · 米兰（总部）',
        beijing: '中国 · 北京（总部）',
        manchester: '英国 · 曼彻斯特',
        hainan: '中国 · 海南东方',
      },
      regions: {
        europe: '欧洲全境',
        europeDesc: '意大利、英国、法国、德国、西班牙、波兰、希腊、俄罗斯等',
        asia: '亚洲',
        asiaDesc: '中国、日本、韩国、印尼、印度等',
        americas: '美洲',
        americasDesc: '加拿大、巴西等',
      },
    },
    cases: {
      label: '成功案例',
      title: '与客户共同铸就',
      titleHighlight: '全球化成功故事',
      categories: {
        business: '商业与渠道发展',
        hr: '人力资源咨询',
      },
      items: {
        case1: {
          title: '中国护肤品品牌欧洲全域市场拓展',
          desc: '市场调查 · 产品设计 · 渠道网络构建',
          result: '成功进入欧洲多国市场',
        },
        case2: {
          title: '世界五百强家电企业意大利团队重建',
          desc: '招聘体系搭建 · 全部部门负责人安置',
          result: '15-30天/岗位高效完成',
        },
        case3: {
          title: '中国飞机制造企业并购后团队重建',
          desc: '收并购后岗位负责人薪资体系建立 · 关键岗位招聘',
          result: '入职率100% · 转正率100%',
        },
        case4: {
          title: '农机集团欧洲研发中心组建',
          desc: '海外研发中心组建 · 营销公司团队创建',
          result: '德国、法国、波兰多地成功落地',
        },
      },
    },
    stats: {
      talentPool: '海外人才库',
      experience: '跨境跨文化经验',
      channels: '海外优质渠道资源',
      consulting: '咨询项目',
      training: '培训项目',
      coaching: '教练辅导',
    },
    contact: {
      label: '联系我们',
      title: '开启您的',
      titleHighlight: '全球化之旅',
      description: '无论您是计划出海的中资企业，还是希望进入中国市场的外资企业，ZETA都将为您提供专业、可落地的解决方案。',
      offices: {
        milan: {
          name: 'Zeta Consulting S.R.L.',
          address: 'Rosolino Pilo 19A, 20126 Milan (MI), Italy',
        },
        beijing: {
          name: '北京致达咨询有限公司',
          address: '北京市东三环中路 北京财富中心A座 717室',
        },
      },
      email: 'info@zetaconsulting.com',
      website: 'zetaconsulting.com',
      form: {
        name: '姓名',
        company: '公司名称',
        email: '邮箱',
        phone: '电话',
        service: '感兴趣的服务',
        message: '留言',
        submit: '提交咨询',
        services: {
          business: '业务拓展服务',
          hr: '人力资源咨询',
          strategy: '战略与商业规划',
          talent: 'ZetaIMPRO · 国际职场人',
        },
      },
    },
    footer: {
      slogan: '我们是未来的助力者',
      copyright: '© 2026 ZETA CONSULTING. All rights reserved.',
      links: {
        privacy: '隐私政策',
        terms: '服务条款',
        gdpr: 'GDPR合规',
      },
    },
  },
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      global: 'Global',
      cases: 'Cases',
      contact: 'Contact',
    },
    hero: {
      subtitle: 'ZETA CONSULTING',
      title: 'Empowering Globalization',
      titleHighlight: 'Building Cross-Cultural Success',
      description: 'ZETA Consulting specializes in organizational and business internationalization solutions, providing customized and actionable strategies for Chinese enterprises expanding overseas and foreign enterprises entering China.',
      ctaPrimary: 'Explore Our Services',
      ctaSecondary: 'Book a Consultation',
    },
    about: {
      label: 'About ZETA',
      title: 'From Milan to the World',
      titleHighlight: 'Every Step is Solid',
      description: 'Founded in 2019 in Milan, Italy, ZETA CONSULTING STUDIO was born with innovation and professionalism. In 2021, we established our Beijing office in the CBD, creating a dual-headquarters strategy. In 2024, following the Hainan Free Trade Port policy, Dongfang Zeta International Investment was established to further assist Chinese enterprises in going global and foreign enterprises in entering China.',
      stats: {
        years: 'Years Cross-Border Experience',
        talent: 'Global Talent Pool',
        countries: 'Countries & Regions',
        clients: 'Clients Served',
      },
      values: {
        title: 'Our Values',
        responsible: 'Responsible to Society · Industry · Clients',
        excellence: 'Professional · Focused · Specialized',
        innovation: 'Embracing AI & Digital Management',
      },
    },
    services: {
      label: 'Our Services',
      title: 'Comprehensive International Solutions',
      subtitle: 'From strategy to execution, we accompany enterprises through every step of globalization',
      items: {
        business: {
          title: 'Business Development',
          desc: 'From 0 to 1 European market setup: market research, competitive analysis, risk assessment, brand positioning, market access & compliance support, channel development & sales network building, e-commerce operations.',
          features: ['Market Entry Strategy', 'Channel Network Building', 'E-commerce Operations', 'Company Establishment'],
        },
        hr: {
          title: 'HR Consulting',
          desc: 'Mid-to-high-end talent recruitment & placement, organizational structure design, standardized system development, compensation & benefits design, labor relations management, cross-cultural management training.',
          features: ['Executive Search', 'Org Structure Design', 'Compensation & Performance', 'Cross-Cultural Training'],
        },
        strategy: {
          title: 'Strategy & Business Planning',
          desc: 'Aligning with long-term development goals and market realities, providing market access implementation, business model innovation, competitive research, cross-border resource integration, and risk management consulting.',
          features: ['Strategic Consulting', 'Business Model Innovation', 'Competitive Analysis', 'Risk Management'],
        },
        talent: {
          title: 'ZetaIMPRO · Global Talent',
          desc: 'Providing career planning & development consulting, international workplace capability reshaping, and recruiter workshops for global professionals, building a worldwide career development platform.',
          features: ['Career Planning', 'Capability Training', 'Recruiter Workshops', 'Talent Pool Access'],
        },
      },
    },
    global: {
      label: 'Global Presence',
      title: 'Rooted in Europe',
      titleHighlight: 'Radiating Globally',
      description: 'Business development services cover all of Europe; HR consulting is based in Europe while extending to Asia, the Americas, and Latin America. Milan-Beijing dual headquarters enable seamless cross-border collaboration.',
      offices: {
        milan: 'Milan, Italy (HQ)',
        beijing: 'Beijing, China (HQ)',
        manchester: 'Manchester, UK',
        hainan: 'Hainan, China',
      },
      regions: {
        europe: 'Europe',
        europeDesc: 'Italy, UK, France, Germany, Spain, Poland, Greece, Russia, etc.',
        asia: 'Asia',
        asiaDesc: 'China, Japan, Korea, Indonesia, India, etc.',
        americas: 'Americas',
        americasDesc: 'Canada, Brazil, etc.',
      },
    },
    cases: {
      label: 'Success Stories',
      title: 'Building Global Success',
      titleHighlight: 'Together with Our Clients',
      categories: {
        business: 'Business & Channel Development',
        hr: 'HR Consulting',
      },
      items: {
        case1: {
          title: 'Chinese Skincare Brand European Market Entry',
          desc: 'Market Research · Product Design · Channel Network Building',
          result: 'Successfully entered multiple European markets',
        },
        case2: {
          title: 'Fortune 500 Home Appliance Company Italy Team Rebuild',
          desc: 'Recruitment System Setup · Full Department Head Placement',
          result: 'Completed efficiently within 15-30 days per role',
        },
        case3: {
          title: 'Chinese Aircraft Manufacturer Post-M&A Team Rebuild',
          desc: 'Post-acquisition compensation system · Key position recruitment',
          result: '100% Onboarding Rate · 100% Conversion Rate',
        },
        case4: {
          title: 'Agricultural Machinery Group European R&D Center',
          desc: 'Overseas R&D center setup · Marketing team creation',
          result: 'Successfully launched in Germany, France, and Poland',
        },
      },
    },
    stats: {
      talentPool: 'Global Talent Pool',
      experience: 'Years Cross-Cultural Experience',
      channels: 'Premium Channel Resources',
      consulting: 'Consulting Projects',
      training: 'Training Programs',
      coaching: 'Coaching Sessions',
    },
    contact: {
      label: 'Contact Us',
      title: 'Start Your',
      titleHighlight: 'Global Journey',
      description: 'Whether you are a Chinese enterprise planning to expand overseas or a foreign enterprise seeking to enter the Chinese market, ZETA provides professional and actionable solutions.',
      offices: {
        milan: {
          name: 'Zeta Consulting S.R.L.',
          address: 'Rosolino Pilo 19A, 20126 Milan (MI), Italy',
        },
        beijing: {
          name: 'Beijing Zeta Consulting Co., Ltd.',
          address: 'Suite 717, Tower A, Beijing Fortune Center, East Third Ring Road, Beijing',
        },
      },
      email: 'info@zetaconsulting.com',
      website: 'zetaconsulting.com',
      form: {
        name: 'Name',
        company: 'Company',
        email: 'Email',
        phone: 'Phone',
        service: 'Service of Interest',
        message: 'Message',
        submit: 'Submit Inquiry',
        services: {
          business: 'Business Development',
          hr: 'HR Consulting',
          strategy: 'Strategy & Planning',
          talent: 'ZetaIMPRO · Global Talent',
        },
      },
    },
    footer: {
      slogan: 'We Are Enablers of the Future',
      copyright: '© 2026 ZETA CONSULTING. All rights reserved.',
      links: {
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        gdpr: 'GDPR Compliance',
      },
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string | string[] | Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('zh');

  const t = useCallback(
    (path: string): string | string[] | Translations => {
      const keys = path.split('.');
      let current: any = translations[language];
      for (const key of keys) {
        if (typeof current === 'object' && current !== null && key in current) {
          current = current[key];
        } else {
          return path;
        }
      }
      return current;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export function useT(): (path: string) => string {
  const { t } = useLanguage();
  return (path: string) => {
    const result = t(path);
    return typeof result === 'string' ? result : path;
  };
}
