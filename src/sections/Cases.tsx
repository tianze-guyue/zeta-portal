import { useEffect, useRef, useState } from 'react';
import { useT } from '@/contexts/LanguageContext';
import { Briefcase, Users, TrendingUp, Award, ArrowUpRight } from 'lucide-react';

const caseIcons = [Briefcase, Users, TrendingUp, Award];

export function Cases() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'business' | 'hr'>('business');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const caseKeys = ['case1', 'case2', 'case3', 'case4'];

  return (
    <section
      id="cases"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-slate-100/60"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/[0.02] to-transparent" />

      <div className="relative w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block text-sm font-medium text-blue-600 tracking-widest uppercase mb-4">
              {t('cases.label')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">{t('cases.title')}</span>
              <br />
              <span className="text-gradient">{t('cases.titleHighlight')}</span>
            </h2>
          </div>

          {/* Category Tabs */}
          <div className={`flex justify-center gap-4 mb-12 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {(['business', 'hr'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-50 text-muted-foreground hover:text-foreground border border-border/30'
                }`}
              >
                {t(`cases.categories.${cat}`)}
              </button>
            ))}
          </div>

          {/* Case Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {caseKeys.map((key, index) => {
              const Icon = caseIcons[index];
              const title = t(`cases.items.${key}.title`);
              const desc = t(`cases.items.${key}.desc`);
              const result = t(`cases.items.${key}.result`);

              return (
                <div
                  key={key}
                  className={`group relative p-8 rounded-2xl bg-slate-50 border border-border/30 hover:border-blue-500/30 transition-all duration-500 cursor-pointer overflow-hidden ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  {/* Background Gradient on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    {/* Top Row */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ArrowUpRight className="w-5 h-5 text-blue-600" />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-blue-600 transition-colors">
                      {title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {desc}
                    </p>

                    {/* Result Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-500/20">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-600">
                        {result}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
