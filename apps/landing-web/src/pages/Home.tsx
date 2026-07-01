import { Truck, Clock, Shield, Package } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import QuoteSection from '../components/QuoteSection';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <section className="relative min-h-[900px] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <img
            src="/slider/home-slider-1.png"
            alt="Hero Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="pt-32 pb-16">
            <div className="max-w-3xl mx-auto text-center mb-24 mt-24">
              <h1 className="text-7xl font-semibold text-white mb-6 leading-tight">
                {t('home.hero.title.1')}<br />
                {t('home.hero.title.2')}
                <span className="text-orange-500">{t('home.hero.title.3')}</span>
              </h1>
            </div>
            <QuoteSection />
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 py-4">
            <div className="flex flex-row items-start gap-4">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <Truck className="w-8 h-8 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-orange-600 text-xl font-semibold mb-2 text-left">{t('home.features.1.title')}</h3>
                <p className="text-gray-600 text-left">{t('home.features.1.desc')}</p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-4">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-8 h-8 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-orange-600 text-xl font-semibold mb-2 text-left">{t('home.features.2.title')}</h3>
                <p className="text-gray-600 text-left">{t('home.features.2.desc')}</p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-4">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-orange-600 text-xl font-semibold mb-2 text-left">{t('home.features.3.title')}</h3>
                <p className="text-gray-600 text-left">{t('home.features.3.desc')}</p>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8 py-4">
            <div className="flex flex-row items-start gap-4">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-orange-600 text-xl font-semibold mb-2 text-left">{t('home.features.4.title')}</h3>
                <p className="text-gray-600 text-left">{t('home.features.4.desc')}</p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-4">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-orange-600 text-xl font-semibold mb-2 text-left">{t('home.features.5.title')}</h3>
                <p className="text-gray-600 text-left">{t('home.features.5.desc')}</p>
              </div>
            </div>
            <div className="flex flex-row items-start gap-4">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="w-8 h-8 text-orange-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-orange-600 text-xl font-semibold mb-2 text-left">{t('home.features.6.title')}</h3>
                <p className="text-gray-600 text-left">{t('home.features.6.desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary-blue">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 py-4">
            <div className="flex flex-row items-start gap-4">
              <div className="flex-1">
                <h3 className="mb-6 text-3xl font-semibold mb-2 text-left">
                  <span className='text-white'>{t('home.usp.1.title1')}</span> <span className='text-orange-600'>{t('home.usp.1.title2')}</span>
                </h3>
                <div className="text-white font-light text-xl text-left">
                  <p className="mb-6 leading-relaxed">{t('home.usp.1.desc1')}</p>
                  <p className="mb-6 leading-relaxed">{t('home.usp.1.desc2')}</p>
                  <p className="mb-6 leading-relaxed">{t('home.usp.1.desc3')}</p>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start gap-4">
              <div className="flex-1">
                <img src="/img/home-usp-1.png" alt="Shipme USP" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 pb-24 bg-gray-50">
        <div className="container mx-auto px-4 mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">{t('home.partners.title')}</h2>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            <div className="flex items-center space-x-12 px-8">
              <img src="/partner/dhl-logo.png" alt="DHL" className="h-16 grayscale-0 transition opacity-60 hover:opacity-100" />
              <img src="/partner/ups-logo.png" alt="UPS" className="h-16 grayscale-0 transition opacity-60 hover:opacity-100" />
              <img src="/partner/fedex-logo.png" alt="FedEx" className="h-16 grayscale-0 transition opacity-60 hover:opacity-100" />
              <img src="/partner/dhl-logo.png" alt="DHL" className="h-16 grayscale-0 transition opacity-60 hover:opacity-100" />
              <img src="/partner/ups-logo.png" alt="UPS" className="h-16 grayscale-0 transition opacity-60 hover:opacity-100" />
              <img src="/partner/fedex-logo.png" alt="FedEx" className="h-16 grayscale-0 transition opacity-60 hover:opacity-100" />
            </div>
          </div>
        </div>
      </section>

      {/* <section className="py-16 text-white" style={{ backgroundColor: '#002D5F' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-4">{t('home.tracking.title')}</h2>
            <p className="text-xl mb-8 text-blue-50">{t('home.tracking.subtitle')}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder={t('home.tracking.placeholder')}
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-orange-300"
              />
              <button className="bg-white text-orange-500 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition">
                {t('home.tracking.trackNow')}
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('home.pricing.title')}</h2>
            <p className="text-xl text-gray-600">{t('home.pricing.subtitle')}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-orange-500 transition">
              <h3 className="text-2xl font-semibold mb-2">{t('home.pricing.basic.title')}</h3>
              <div className="text-4xl font-bold text-orange-500 mb-4">{t('home.pricing.basic.price')}<span className="text-xl text-gray-500">{t('home.pricing.basic.perShipment')}</span></div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li>✓ {t('home.pricing.basic.feature1')}</li>
                <li>✓ {t('home.pricing.basic.feature2')}</li>
                <li>✓ {t('home.pricing.basic.feature3')}</li>
                <li>✓ {t('home.pricing.basic.feature4')}</li>
              </ul>
              <button className="w-full border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">
                {t('home.pricing.basic.button')}
              </button>
            </div>
            <div className="border-2 border-orange-500 rounded-xl p-8 relative bg-orange-50">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                {t('home.pricing.professional.popular')}
              </div>
              <h3 className="text-2xl font-semibold mb-2">{t('home.pricing.professional.title')}</h3>
              <div className="text-4xl font-bold text-orange-500 mb-4">{t('home.pricing.professional.price')}<span className="text-xl text-gray-500">{t('home.pricing.basic.perShipment')}</span></div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li>✓ {t('home.pricing.professional.feature1')}</li>
                <li>✓ {t('home.pricing.professional.feature2')}</li>
                <li>✓ {t('home.pricing.professional.feature3')}</li>
                <li>✓ {t('home.pricing.professional.feature4')}</li>
                <li>✓ {t('home.pricing.professional.feature5')}</li>
              </ul>
              <button className="w-full bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600 transition">
                {t('home.pricing.professional.button')}
              </button>
            </div>
            <div className="border-2 border-gray-200 rounded-xl p-8 hover:border-orange-500 transition">
              <h3 className="text-2xl font-semibold mb-2">{t('home.pricing.enterprise.title')}</h3>
              <div className="text-4xl font-bold text-orange-500 mb-4">{t('home.pricing.enterprise.price')}</div>
              <ul className="space-y-3 text-gray-600 mb-8">
                <li>✓ {t('home.pricing.enterprise.feature1')}</li>
                <li>✓ {t('home.pricing.enterprise.feature2')}</li>
                <li>✓ {t('home.pricing.enterprise.feature3')}</li>
                <li>✓ {t('home.pricing.enterprise.feature4')}</li>
                <li>✓ {t('home.pricing.enterprise.feature5')}</li>
              </ul>
              <button className="w-full border-2 border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50 transition">
                {t('home.pricing.enterprise.button')}
              </button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
