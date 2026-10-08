import { Phone, Mail, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { WhatsappUrl } from '../config/const';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div>

      <section className="bg-primary-blue">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <section className="relative pt-32 pb-16 text-white overflow-hidden" style={{ backgroundColor: '#002D5F' }}>
              <div className="absolute inset-0 opacity-50 h-full">
                <img src="/img/contact-img-1.jpg" alt="Contact" className="w-full h-full object-cover" />
              </div>
            </section>

            <div className="py-60 px-20">
              <h2 className="text-6xl font-bold text-white mb-8">{t('contact.info.title')}</h2>
              <p className="text-2xl font-light text-white mb-8">{t('contact.info.desc')}</p>
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-orange-500">{t('contact.info.address')}</h3>
                    <p className="text-white">{t('global.address')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-orange-500">{t('contact.info.phone')}</h3>
                    <p className="text-white">{t('global.phone')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-1 text-orange-500">{t('contact.info.email')}</h3>
                    <p className="text-white">{t('global.email')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      <section className="relative pt-16 pb-16 text-white overflow-hidden" style={{ backgroundColor: '#002D5F' }}>
        <div className="absolute inset-0 opacity-20 pointer-events-none h-full">
          <img src="/img/contact-footer-1.png" alt="Footer" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <img src="/logo/logo-full-1.png" alt="Footer Logo" className="h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">{t('contact.footer.title')}</h2>
            <button className="bg-orange-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-600 transition" onClick={() => window.open(WhatsappUrl, '_blank')}>
              {t('contact.footer.button')}
            </button>
          </div>
        </div>
      </section>
    </div >
  );
}
