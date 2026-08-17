import { LanguageProvider } from '@/contexts/LanguageContext';
import { Navigation } from '@/sections/Navigation';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Services } from '@/sections/Services';
import { Global } from '@/sections/Global';
import { Cases } from '@/sections/Cases';
import { Stats } from '@/sections/Stats';
import { Contact } from '@/sections/Contact';
import { Footer } from '@/sections/Footer';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-background text-foreground antialiased selection:bg-amber-500/30">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Services />
          <Global />
          <Cases />
          <Stats />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;
