import { useT } from '@/contexts/LanguageContext';
import { Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const t = useT();

  return (
    <footer className="relative py-16 bg-slate-900 text-white border-t border-slate-800">
      <div className="w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/logo.png"
                  alt="ZETA Consulting"
                  className="w-10 h-10 rounded-lg object-cover shadow-sm"
                />
                <div className="flex flex-col">
                  <span className="text-white font-bold text-lg leading-tight tracking-wider">
                    ZETA
                  </span>
                  <span className="text-muted-foreground text-[10px] leading-tight tracking-[0.2em] uppercase">
                    Consulting
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-md mb-6">
                {t('hero.description')}
              </p>
              <p className="text-blue-600 font-medium italic">
                {t('footer.slogan')}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {t('nav.services')}
              </h4>
              <ul className="space-y-3">
                <li>
                  <a href="#services" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {t('services.items.business.title')}
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {t('services.items.hr.title')}
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {t('services.items.strategy.title')}
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                    {t('services.items.talent.title')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4 uppercase tracking-wider">
                {t('nav.contact')}
              </h4>
              <ul className="space-y-3">
                <li className="text-sm text-slate-400">
                  {t('contact.offices.milan.address')}
                </li>
                <li className="text-sm text-slate-400">
                  {t('contact.offices.beijing.address')}
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-400">
                  <Mail className="w-4 h-4 text-blue-600" />
                  {t('contact.email')}
                </li>
              </ul>
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors group"
                >
                  <Linkedin className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-400">
              {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                {t('footer.links.privacy')}
              </a>
              <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                {t('footer.links.terms')}
              </a>
              <a href="#" className="text-sm text-slate-400 hover:text-blue-400 transition-colors">
                {t('footer.links.gdpr')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
