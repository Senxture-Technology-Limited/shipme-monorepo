import { useTranslation } from 'react-i18next';
import QuoteSection from '../components/QuoteSection';

export default function Quote() {
  const { t } = useTranslation();

  return (
    <div>
      <section className="relative pt-32 pb-16 text-white overflow-hidden" style={{ backgroundColor: '#002D5F' }}>
        <div className="absolute inset-0 opacity-20">
          <img
            src="https://images.pexels.com/photos/4246119/pexels-photo-4246119.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('quote.hero.title')}</h1>
            <p className="text-xl text-blue-100">
              {t('quote.hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <QuoteSection />
        </div>
      </section>
    </div>
  );
}
