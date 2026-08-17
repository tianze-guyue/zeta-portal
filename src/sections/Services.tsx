import { useEffect, useRef, useState } from 'react';
import { useT } from '@/contexts/LanguageContext';
import { Globe, Users, Compass, GraduationCap, ArrowRight } from 'lucide-react';

const serviceKeys = ['business', 'hr', 'strategy', 'talent'] as const;

const serviceIcons = {
  business: Globe,
  hr: Users,
  strategy: Compass,
  talent: GraduationCap,
};

export function Services() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeService, setActiveService] = useState(0);

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

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-blue-100/40"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-50 blur-[100px]" />

      <div className="relative w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block text-sm font-medium text-blue-600 tracking-widest uppercase mb-4">
              {t('services.label')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">{t('services.title')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {serviceKeys.map((key, index) => {
              const Icon = serviceIcons[key];
              const title = t(`services.items.${key}.title`);
              const desc = t(`services.items.${key}.desc`);
              const features = [
                t(`services.items.${key}.features.0`),
                t(`services.items.${key}.features.1`),
                t(`services.items.${key}.features.2`),
                t(`services.items.${key}.features.3`),
              ];

              return (
                <div
                  key={key}
                  className={`group relative p-8 rounded-2xl bg-slate-50 border border-border/30 hover:border-blue-500/30 transition-all duration-500 cursor-pointer ${
                    activeService === index ? 'border-blue-500/30 bg-slate-50' : ''
                  } ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setActiveService(index)}
                >
                  {/* Hover Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:bg-blue-50 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-7 h-7 text-blue-600" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-blue-600 transition-colors">
                      {title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {desc}
                    </p>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {features.map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-xs bg-background/50 border border-border/30 text-muted-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* Arrow */}
                    <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                      <ArrowRight className="w-5 h-5 text-blue-600" />
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
