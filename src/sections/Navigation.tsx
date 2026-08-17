import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navigation() {
  const { language, setLanguage, t } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '#about', label: t('nav.about') as string },
    { href: '#services', label: t('nav.services') as string },
    { href: '#global', label: t('nav.global') as string },
    { href: '#cases', label: t('nav.cases') as string },
    { href: '#contact', label: t('nav.contact') as string },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="relative z-50 bg-white border-b border-slate-100">
        <div className="w-full px-6 lg:px-12 xl:px-20">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-3 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src="/logo.png"
                alt="ZETA Consulting"
                className="w-10 h-10 rounded-lg object-cover transform group-hover:scale-110 transition-transform duration-300 shadow-sm"
              />
              <div className="flex flex-col">
                <span className="text-foreground font-bold text-lg leading-tight tracking-wider">
                  ZETA
                </span>
                <span className="text-muted-foreground text-[10px] leading-tight tracking-[0.2em] uppercase">
                  Consulting
                </span>
              </div>
            </a>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollToSection(item.href)}
                  className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-lg hover:bg-slate-50"
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'zh' ? 'en' : 'zh')}
                className="hidden sm:flex items-center gap-2 text-muted-foreground hover:text-foreground"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {language === 'zh' ? 'EN' : '中文'}
                </span>
              </Button>

              <Button
                size="sm"
                onClick={() => scrollToSection('#contact')}
                className="hidden sm:inline-flex bg-blue-700 hover:bg-blue-800 text-white font-semibold shadow-lg shadow-blue-700/20 hover:shadow-blue-700/30 transition-all duration-300"
              >
                {t('hero.ctaSecondary') as string}
              </Button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
        <div className="relative h-full flex flex-col items-center justify-center gap-6">
          {navItems.map((item, index) => (
            <button
              key={item.href}
              onClick={() => scrollToSection(item.href)}
              className="text-2xl font-light text-foreground hover:text-primary transition-colors duration-300"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {item.label}
            </button>
          ))}
          <Button
            onClick={() => {
              setLanguage(language === 'zh' ? 'en' : 'zh');
              setIsMobileMenuOpen(false);
            }}
            variant="ghost"
            className="mt-4 flex items-center gap-2 text-muted-foreground"
          >
            <Globe className="w-5 h-5" />
            <span>{language === 'zh' ? 'Switch to English' : '切换到中文'}</span>
          </Button>
        </div>
      </div>
    </>
  );
}
