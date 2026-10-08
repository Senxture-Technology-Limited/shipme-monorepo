import { useTranslation } from 'react-i18next';
import { WhatsappUrl } from '../config/const';

export default function Services() {
  const { t } = useTranslation();

  return (
    <div>
      <section className="relative pt-32 pb-16 text-white overflow-hidden" style={{ backgroundColor: '#002D5F' }}>
        <div className="absolute inset-0 opacity-20">
          <img
            src="/slider/service-slider-1.jpg"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('services.hero.title')}</h1>
            <p className="text-xl text-blue-100">
              {t('services.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">

        <section className="bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 transition">
                <img src="/img/service-solution-1.png" alt="Service" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white p-8 transition flex flex-col justify-center">
                <h3 className="text-3xl font-semibold mb-4">{t('services.solution.1.title')}</h3>
                <p className="text-primary-blue mb-4 text-xl leading-10">{t('services.solution.1.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 transition flex flex-col justify-center">
                <h3 className="text-3xl font-semibold mb-4">{t('services.solution.2.title')}</h3>
                <p className="text-primary-blue mb-4 text-xl leading-10">{t('services.solution.2.desc')}</p>
              </div>
              <div className="bg-white p-8 transition">
                <img src="/img/service-solution-2.png" alt="Service" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 transition">
                <img src="/img/service-solution-3.png" alt="Service" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white p-8 transition flex flex-col justify-center">
                <h3 className="text-3xl font-semibold mb-4">{t('services.solution.3.title')}</h3>
                <p className="text-primary-blue mb-4 text-xl leading-10">{t('services.solution.3.desc')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 transition flex flex-col justify-center">
                <h3 className="text-3xl font-semibold mb-4">{t('services.solution.4.title')}</h3>
                <p className="text-primary-blue mb-4 text-xl leading-10">{t('services.solution.4.desc')}</p>
              </div>
              <div className="bg-white p-8 transition">
                <img src="/img/service-solution-4.png" alt="Service" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 transition">
                <img src="/img/service-solution-5.png" alt="Service" className="w-full h-full object-cover" />
              </div>
              <div className="bg-white p-8 transition flex flex-col justify-center">
                <h3 className="text-3xl font-semibold mb-4">{t('services.solution.5.title')}</h3>
                <p className="text-primary-blue mb-4 text-xl leading-10">{t('services.solution.5.desc')}</p>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="relative pt-16 pb-16 text-white overflow-hidden" style={{ backgroundColor: '#002D5F' }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <img src="/img/service-footer-1.png" alt="Footer" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <img src="/logo/logo-full-1.png" alt="Footer Logo" className="h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">{t('services.footer.title')}</h2>
            <button className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition" onClick={() => window.open(WhatsappUrl, '_blank')}>
              {t('services.footer.button')}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
