import { useState } from 'react';
import { useT } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Mail, Globe, Send, CheckCircle } from 'lucide-react';

export function Contact() {
  const t = useT();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden bg-blue-100/40">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/[0.02] to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-50 blur-[120px]" />

      <div className="relative w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-medium text-blue-600 tracking-widest uppercase mb-4">
              {t('contact.label')}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              <span className="text-foreground">{t('contact.title')}</span>
              <br />
              <span className="text-gradient">{t('contact.titleHighlight')}</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('contact.description')}
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Offices */}
              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-slate-50 border border-border/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-foreground">{t('contact.offices.milan.name')}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-13">{t('contact.offices.milan.address')}</p>
                </div>

                <div className="p-6 rounded-xl bg-slate-50 border border-border/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="font-bold text-foreground">{t('contact.offices.beijing.name')}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground pl-13">{t('contact.offices.beijing.address')}</p>
                </div>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span>{t('contact.email')}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Globe className="w-5 h-5 text-blue-600" />
                  <span>{t('contact.website')}</span>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-slate-50 border border-border/30">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                    <h3 className="text-xl font-bold text-foreground mb-2">
                      {t('contact.form.submit')}
                    </h3>
                    <p className="text-muted-foreground">
                      {t('contact.description')}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          {t('contact.form.name')}
                        </label>
                        <Input
                          placeholder={t('contact.form.name')}
                          className="bg-background/50 border-border/30 focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          {t('contact.form.company')}
                        </label>
                        <Input
                          placeholder={t('contact.form.company')}
                          className="bg-background/50 border-border/30 focus:border-blue-500/50"
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          {t('contact.form.email')}
                        </label>
                        <Input
                          type="email"
                          placeholder={t('contact.form.email')}
                          className="bg-background/50 border-border/30 focus:border-blue-500/50"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-muted-foreground mb-2">
                          {t('contact.form.phone')}
                        </label>
                        <Input
                          placeholder={t('contact.form.phone')}
                          className="bg-background/50 border-border/30 focus:border-blue-500/50"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        {t('contact.form.service')}
                      </label>
                      <select className="w-full h-10 px-3 rounded-md bg-background/50 border border-border/30 text-foreground focus:border-blue-500/50 focus:outline-none focus:ring-1 focus:ring-blue-500/50">
                        <option value="">{t('contact.form.service')}</option>
                        <option value="business">{t('contact.form.services.business')}</option>
                        <option value="hr">{t('contact.form.services.hr')}</option>
                        <option value="strategy">{t('contact.form.services.strategy')}</option>
                        <option value="talent">{t('contact.form.services.talent')}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        {t('contact.form.message')}
                      </label>
                      <Textarea
                        placeholder={t('contact.form.message')}
                        rows={4}
                        className="bg-background/50 border-border/30 focus:border-blue-500/50 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all duration-300"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {t('contact.form.submit')}
                    </Button>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
