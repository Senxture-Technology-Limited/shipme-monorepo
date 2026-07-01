import { Users, Award, TrendingUp, Truck, ClipboardPen, DraftingCompass, Warehouse, Earth, MessagesSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WhatsappUrl } from '../config/const';

export default function About() {
  const { t } = useTranslation();

  return (
    <div>
      <section className="relative pt-32 pb-16 text-white overflow-hidden" style={{ backgroundColor: '#002D5F' }}>
        <div className="absolute inset-0 opacity-20">
          <img src="/slider/about-slider-1.png" alt="Background" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('about.hero.title')}</h1>
            <p className="text-xl text-blue-100">
              {t('about.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 text-2xl">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-16 shadow-lg text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <p className="text-primary-blue text-justify leading-relaxed">
                {t('about.values.customerFirst.desc')}
              </p>
            </div>
            <div className="bg-white rounded-xl p-16 shadow-lg text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-500" />
              </div>
              <p className="text-primary-blue text-justify leading-relaxed">
                {t('about.values.excellence.desc')}
              </p>
            </div>
            <div className="bg-white rounded-xl p-16 shadow-lg text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-orange-500" />
              </div>
              <p className="text-primary-blue text-justify leading-relaxed">
                {t('about.values.innovation.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-primary-blue mb-6">{t('about.story.title')}</h2>
              <p className="text-lg text-primary-blue mb-4 leading-relaxed">
                {t('about.story.para1')}
              </p>
              <p className="text-lg text-primary-blue mb-4 leading-relaxed">
                {t('about.story.para2')}
              </p>
              <p className="text-lg text-primary-blue mb-4 leading-relaxed">
                {t('about.story.para3')}
              </p>
              <p className="text-lg text-primary-blue mb-4 leading-relaxed">
                {t('about.story.para4')}
              </p>
              <p className="text-lg text-primary-blue mb-4 leading-relaxed">
                {t('about.story.para5')}
              </p>
              <img src="/img/about-story-2.webp" alt="Shipme's Signature" />
            </div>
            <div>
              <img src="/img/about-story-1.png" alt="Shipme Story" />
            </div>
          </div>

          {/* <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">15+</div>
              <p className="text-gray-600">{t('about.stats.years')}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">200+</div>
              <p className="text-gray-600">{t('about.stats.countries')}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">1M+</div>
              <p className="text-gray-600">{t('about.stats.packages')}</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-orange-500 mb-2">98%</div>
              <p className="text-gray-600">{t('about.stats.satisfaction')}</p>
            </div>
          </div> */}
        </div>
      </section>

      <section className="py-12 bg-primary-blue opacity-90">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 py-4">
            <div className="text-center gap-4">
              <DraftingCompass className="w-10 h-10 text-white mx-auto mb-4" />
              <h3 className="text-white text-2xl font-semibold mb-4">{t('about.features.1.title')}</h3>
              <p className="text-white font-light">{t('about.features.1.desc')}</p>
            </div>
            <div className="text-center gap-4">
              <ClipboardPen className="w-10 h-10 text-white mx-auto mb-4" />
              <h3 className="text-white text-2xl font-semibold mb-4">{t('about.features.2.title')}</h3>
              <p className="text-white font-light">{t('about.features.1.desc')}</p>
            </div>
            <div className="text-center gap-4">
              <Warehouse className="w-10 h-10 text-white mx-auto mb-4" />
              <h3 className="text-white text-2xl font-semibold mb-4">{t('about.features.3.title')}</h3>
              <p className="text-white font-light">{t('about.features.1.desc')}</p>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 py-4">
            <div className="text-center gap-4">
              <Truck className="w-10 h-10 text-white mx-auto mb-4" />
              <h3 className="text-white text-2xl font-semibold mb-4">{t('about.features.4.title')}</h3>
              <p className="text-white font-light">{t('about.features.1.desc')}</p>
            </div>
            <div className="text-center gap-4">
              <MessagesSquare className="w-10 h-10 text-white mx-auto mb-4" />
              <h3 className="text-white text-2xl font-semibold mb-4">{t('about.features.5.title')}</h3>
              <p className="text-white font-light">{t('about.features.1.desc')}</p>
            </div>
            <div className="text-center gap-4">
              <Earth className="w-10 h-10 text-white mx-auto mb-4" />
              <h3 className="text-white text-2xl font-semibold mb-4">{t('about.features.6.title')}</h3>
              <p className="text-white font-light">{t('about.features.1.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pt-16 pb-16 text-white overflow-hidden" style={{ backgroundColor: '#002D5F' }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none h-full">
          <img src="/img/about-footer-1.png" alt="Footer" className="w-full h-full object-cover" />
        </div> 
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <img src="/logo/logo-full-1.png" alt="Footer Logo" className="h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">{t('about.footer.title')}</h2>
            <button className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition" onClick={() => window.open(WhatsappUrl, '_blank')}>
              {t('about.footer.button')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
