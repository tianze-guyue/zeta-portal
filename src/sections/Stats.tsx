import { useEffect, useRef, useState } from 'react';
import { useT } from '@/contexts/LanguageContext';
import { Users, Clock, Network, MessageSquare, BookOpen, UserCheck } from 'lucide-react';

function AnimatedNumber({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const duration = 2000;
    const increment = value / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export function Stats() {
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

  const stats = [
    { icon: Users, value: 3000, suffix: '+', label: t('stats.talentPool') },
    { icon: Clock, value: 7, suffix: '+', label: t('stats.experience') },
    { icon: Network, value: 100, suffix: '+', label: t('stats.channels') },
    { icon: MessageSquare, value: 1000, suffix: '+', label: t('stats.consulting') },
    { icon: BookOpen, value: 50, suffix: '+', label: t('stats.training') },
    { icon: UserCheck, value: 300, suffix: '+', label: t('stats.coaching') },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-blue-700"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-800/50 via-transparent to-blue-800/50" />

      <div className="relative w-full px-6 lg:px-12 xl:px-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`text-center group transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-white/10 mb-4 group-hover:bg-white/20 transition-colors">
                  <stat.icon className="w-7 h-7 text-blue-300" />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2">
                  <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-blue-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
