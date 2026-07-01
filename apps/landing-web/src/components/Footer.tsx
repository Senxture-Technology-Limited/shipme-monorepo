import { Mail, MapPin, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/logo/logo-full-1.png" alt="Footer Logo" className="h-16 mx-auto mb-6" />
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-6 h-6 text-gray-400" />
              <p className="text-gray-400">{t('footer.address')}: {t('global.address')}</p>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <Phone className="w-6 h-6 text-gray-400" />
              <p className="text-gray-400">{t('footer.phone')}: {t('global.phone')}</p>
            </div>
            <div className="flex items-center space-x-2 mb-4">
              <Mail className="w-6 h-6 text-gray-400" />
              <p className="text-gray-400">{t('footer.email')}: {t('global.email')}</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-orange-500">{t('footer.section2.title')}</h3>
            <ul className="text-gray-400">
              <li className='mb-4'><p>{t('footer.section2.para1')}</p></li>
              <li className='mb-4'><p>{t('footer.section2.para2')}</p></li>
              <li className='mb-4'><p>{t('footer.section2.para3')}</p></li>
              <li className='mb-4'><p>{t('footer.section2.para4')}</p></li>
              <li className='mb-4'><p>{t('footer.section2.para5')}</p></li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-orange-500">{t('footer.section3.title')}</h3>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-orange-500 transition">{t('nav.home')}</a></li>
              <li><a href="/about" className="hover:text-orange-500 transition">{t('nav.about')}</a></li>
              <li><a href="/services" className="hover:text-orange-500 transition">{t('nav.services')}</a></li>
              <li><a href="/contact" className="hover:text-orange-500 transition">{t('nav.contact')}</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>© {currentYear}{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
