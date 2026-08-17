import { useT } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function Hero() {
  const t = useT();

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-100/80 via-blue-50/70 to-white">
      {/* Animated background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-blue-200/30 blur-[100px] animate-blob" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-blue-300/20 blur-[90px] animate-blob animation-delay-2000" />
        <div className="absolute -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full bg-slate-200/40 blur-[100px] animate-blob animation-delay-4000" />
      </div>

      {/* Animated grid pattern - deeper */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />

      {/* Floating dots */}
      <div className="absolute top-1/4 left-1/5 w-2 h-2 rounded-full bg-blue-400/60 animate-float" />
      <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-blue-500/50 animate-float animation-delay-1000" />
      <div className="absolute bottom-1/3 left-1/3 w-2 h-2 rounded-full bg-blue-400/40 animate-float animation-delay-2000" />
      <div className="absolute top-2/3 right-1/3 w-1 h-1 rounded-full bg-blue-600/40 animate-float animation-delay-3000" />

      {/* Content */}
      <div className="relative z-10 w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Subtitle */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-200 bg-blue-50/80 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span className="text-sm text-blue-700 font-medium tracking-widest uppercase">
              {t('hero.subtitle')}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <span className="text-slate-800">{t('hero.title')}</span>
            <br />
            <span className="text-gradient">{t('hero.titleHighlight')}</span>
          </h1>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-500 max-w-3xl mx-auto mb-10 leading-relaxed animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {t('hero.description')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <Button
              size="lg"
              onClick={scrollToServices}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-8 py-6 text-lg shadow-lg shadow-blue-700/20 hover:shadow-blue-700/30 transition-all duration-300 group"
            >
              {t('hero.ctaPrimary')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="border-slate-200 hover:border-blue-300 hover:bg-blue-50 px-8 py-6 text-lg text-slate-700 transition-all duration-300"
            >
              {t('hero.ctaSecondary')}
            </Button>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
            {[
              { num: '7+', label: '年跨境经验' },
              { num: '3000+', label: '海外人才库' },
              { num: '20+', label: '覆盖国家' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-blue-700">{stat.num}</div>
                <div className="text-sm text-slate-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <button
          onClick={() => document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' })}
          className="p-2 rounded-full border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300"
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </button>
      </div>
    </section>
  );
}
