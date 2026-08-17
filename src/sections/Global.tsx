import { useEffect, useRef, useState } from 'react';
import { useT } from '@/contexts/LanguageContext';

export function Global() {
  const t = useT();
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  const offices = [
    { key: 'milan', country: 'Italy', city: 'Milan', flag: '🇮🇹', top: '31%', left: '51.5%' },
    { key: 'beijing', country: 'China', city: 'Beijing', flag: '🇨🇳', top: '33%', left: '78%' },
    { key: 'manchester', country: 'UK', city: 'Manchester', flag: '🇬🇧', top: '24%', left: '46%' },
    { key: 'hainan', country: 'China', city: 'Hainan', flag: '🇨🇳', top: '41%', left: '77%' },
  ];

  const regions = [
    { key: 'europe', color: 'from-blue-600/20 to-blue-700/5' },
    { key: 'asia', color: 'from-blue-600/15 to-blue-700/5' },
    { key: 'americas', color: 'from-blue-600/10 to-blue-700/5' },
  ];

  return (
    <section
      id="global"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden bg-slate-50/80"
    >
      {/* Subtle decorative elements */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-[120px] pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-200/30 blur-[100px] pointer-events-none animate-pulse-glow animation-delay-2000" />

      <div className="relative w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="inline-block text-sm font-medium text-blue-600 tracking-widest uppercase mb-4">
              {t('global.label')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">{t('global.title')}</span>
              <br />
              <span className="text-gradient">{t('global.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t('global.description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Map Visualization */}
            <div className={`lg:col-span-3 relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
              <div className="relative aspect-[950/620] rounded-2xl bg-white border border-border/30 overflow-hidden shadow-lg shadow-slate-200/50">
                {/* World Map SVG */}
                <img
                  src="/world-map-blue.svg"
                  alt="World Map"
                  className="w-full h-full object-cover"
                />

                {/* Connection lines overlay */}
                <svg viewBox="0 0 1000 520" className="absolute inset-0 w-full h-full pointer-events-none">
                  <g stroke="#3b82f6" strokeWidth="1" strokeDasharray="4 4" opacity="0.4">
                    <line x1="515" y1="161" x2="780" y2="172" />
                    <line x1="515" y1="161" x2="460" y2="125" />
                    <line x1="460" y1="125" x2="780" y2="172" />
                    <line x1="770" y1="213" x2="780" y2="172" />
                  </g>
                </svg>

                {/* Office Markers with flag and label */}
                {offices.map((office) => (
                  <div
                    key={office.key}
                    className="absolute group"
                    style={{ top: office.top, left: office.left }}
                  >
                    <div className="relative flex flex-col items-center">
                      {/* Pulse animation */}
                      <div className="w-4 h-4 rounded-full bg-blue-600 animate-ping absolute opacity-40" />
                      {/* Marker dot */}
                      <div className="w-4 h-4 rounded-full bg-blue-600 relative shadow-lg shadow-blue-600/30 z-10" />

                      {/* Label - always visible */}
                      <div className="mt-2 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm border border-blue-100 shadow-lg whitespace-nowrap z-20">
                        <div className="flex items-center gap-1.5">
                          <span className="text-base leading-none">{office.flag}</span>
                          <span className="text-xs font-semibold text-slate-700">{office.city}</span>
                        </div>
                        <div className="text-[10px] text-slate-400 text-center mt-0.5">{office.country}</div>
                      </div>

                      {/* Hover tooltip with full name */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-4 py-2 rounded-lg bg-blue-700 text-white shadow-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-30">
                        <div className="flex items-center gap-2">
                          <span className="text-lg">{office.flag}</span>
                          <div>
                            <div className="text-sm font-bold">{office.city}</div>
                            <div className="text-xs text-blue-200">{office.country}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-radial pointer-events-none" />
              </div>
            </div>

            {/* Region Cards */}
            <div className={`lg:col-span-2 space-y-4 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              {regions.map((region, index) => (
                <div
                  key={region.key}
                  className="p-6 rounded-xl bg-gradient-to-r border border-border/30 hover:border-blue-500/30 transition-all duration-300 group"
                  style={{ background: `linear-gradient(to right, hsl(210 55% 28% / ${0.04 + index * 0.02}), transparent)` }}
                >
                  <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-blue-600 transition-colors">
                    {t(`global.regions.${region.key}`)}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {t(`global.regions.${region.key}Desc`)}
                  </p>
                </div>
              ))}

              {/* Office List */}
              <div className="pt-4 border-t border-border/30">
                <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                  {t('global.label')}
                </h4>
                <div className="space-y-3">
                  {offices.map((office) => (
                    <div key={office.key} className="flex items-center gap-3 text-sm text-foreground">
                      <span className="text-lg">{office.flag}</span>
                      <div>
                        <div className="font-medium">{office.city}</div>
                        <div className="text-xs text-muted-foreground">{office.country}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
