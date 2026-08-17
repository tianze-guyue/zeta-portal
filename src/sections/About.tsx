import { useEffect, useRef, useState } from 'react';
import { useT } from '@/contexts/LanguageContext';
import { Target, Lightbulb, Heart } from 'lucide-react';

function AnimatedCounter({ end, suffix = '', duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, end, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function About() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const stats = [
    { value: 7, suffix: '+', label: t('about.stats.years') },
    { value: 3000, suffix: '+', label: t('about.stats.talent') },
    { value: 20, suffix: '+', label: t('about.stats.countries') },
    { value: 100, suffix: '+', label: t('about.stats.clients') },
  ];

  const values = [
    { icon: Heart, title: t('about.values.responsible') },
    { icon: Target, title: t('about.values.excellence') },
    { icon: Lightbulb, title: t('about.values.innovation') },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-slate-50/50"
    >
      {/* Top fade-in border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200/50 to-transparent" />

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-radial opacity-50" />

      <div className="relative w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block text-sm font-medium text-blue-600 tracking-widest uppercase mb-4">
              {t('about.label')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">{t('about.title')}</span>
              <br />
              <span className="text-gradient">{t('about.titleHighlight')}</span>
            </h2>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            {/* Left - Story */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="relative">
                {/* Timeline */}
                <div className="space-y-8">
                  {[
                    { year: '2019', desc: 'ZETA CONSULTING STUDIO 诞生于意大利米兰' },
                    { year: '2021', desc: '北京致达咨询有限公司在CBD落地' },
                    { year: '2023', desc: 'ZETA CONSULTING SRL 成功升级' },
                    { year: '2024', desc: '东方致达国际投资公司成立' },
                    { year: '2025', desc: '芙清品牌出海，渠道发展业务团队建立' },
                  ].map((item, index) => (
                    <div key={item.year} className="flex gap-6 group">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 rounded-full bg-blue-600 group-hover:scale-150 transition-transform duration-300" />
                        {index < 4 && (
                          <div className="w-px h-full bg-gradient-to-b from-blue-600/50 to-transparent mt-2" />
                        )}
                      </div>
                      <div className="pb-8">
                        <span className="text-blue-600 font-bold text-lg">{item.year}</span>
                        <p className="text-muted-foreground mt-1">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Description + Values */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                {t('about.description')}
              </p>

              {/* Values */}
              <div className="space-y-4">
                {values.map((value, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-border/30 hover:border-blue-500/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                      <value.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-foreground font-medium">{value.title}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative p-6 lg:p-8 rounded-2xl bg-slate-50 border border-border/30 text-center group hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative">
                  <div className="text-3xl lg:text-4xl font-bold text-gradient mb-2">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
