import { Menu, X, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const languages = [
  { code: 'zh-HK', name: '繁體中文' },
  // TODO: Add Chinese and English support
  // { code: 'zh-CN', name: '简体中文' },
  // { code: 'en', name: 'English' },
];

export default function Header() {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  // Initialize language from query parameter on mount and sync when URL changes
  useEffect(() => {
    const langFromURL = searchParams.get('lang');
    if (langFromURL && languages.some(lang => lang.code === langFromURL)) {
      if (i18n.language !== langFromURL) {
        i18n.changeLanguage(langFromURL);
      }
    } else if (!langFromURL) {
      // If no lang param, set default to zh-HK
      setSearchParams({ lang: 'zh-HK' }, { replace: true });
      if (i18n.language !== 'zh-HK') {
        i18n.changeLanguage('zh-HK');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setSearchParams({ lang: lng }, { replace: true });
    setLangMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}>
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 pr-5">
            <img src="/logo/logo-full-1.png" alt="ShipMeHK" className="h-12" />
          </Link>

          <div className="hidden lg:flex items-center space-x-8 whitespace-nowrap">
            <Link to="/" className={`hover:text-orange-500 transition ${scrolled ? 'text-gray-700' : 'text-white'
              }`}>{t('nav.home')}</Link>
            <Link to="/about" className={`hover:text-orange-500 transition ${scrolled ? 'text-gray-700' : 'text-white'
              }`}>{t('nav.about')}</Link>
            <Link to="/services" className={`hover:text-orange-500 transition ${scrolled ? 'text-gray-700' : 'text-white'
              }`}>{t('nav.services')}</Link>
            <Link to="/contact" className={`hover:text-orange-500 transition ${scrolled ? 'text-gray-700' : 'text-white'
              }`}>{t('nav.contact')}</Link>

            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className={`flex items-center space-x-1 hover:text-orange-500 transition ${scrolled ? 'text-gray-700' : 'text-white'
                  }`}
              >
                <Globe className="w-5 h-5" />
                <span>{languages.find(lang => lang.code === i18n.language)?.name || 'EN'}</span>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`block w-full text-left px-4 py-2 hover:bg-orange-50 transition ${i18n.language === lang.code ? 'text-orange-500 font-semibold' : 'text-gray-700'
                        }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <Link to="/quote" className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition">
              {t('nav.getQuote')}
            </Link>
          </div>

          <button
            className={`lg:hidden transition-colors ${scrolled ? 'text-gray-900' : 'text-white'
              }`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-4 bg-white rounded-lg shadow-lg px-4 py-4 -mx-4">
            <Link to="/" className="block text-gray-700 hover:text-orange-500 transition" onClick={() => setMobileMenuOpen(false)}>{t('nav.home')}</Link>
            <Link to="/about" className="block text-gray-700 hover:text-orange-500 transition" onClick={() => setMobileMenuOpen(false)}>{t('nav.about')}</Link>
            <Link to="/services" className="block text-gray-700 hover:text-orange-500 transition" onClick={() => setMobileMenuOpen(false)}>{t('nav.services')}</Link>
            <Link to="/contact" className="block text-gray-700 hover:text-orange-500 transition" onClick={() => setMobileMenuOpen(false)}>{t('nav.contact')}</Link>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-2">Language</p>
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => changeLanguage(lang.code)}
                  className={`block w-full text-left px-4 py-2 rounded hover:bg-orange-50 transition ${i18n.language === lang.code ? 'text-orange-500 font-semibold' : 'text-gray-700'
                    }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>

            <Link to="/quote" className="block w-full text-center bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition" onClick={() => setMobileMenuOpen(false)}>
              {t('nav.getQuote')}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
