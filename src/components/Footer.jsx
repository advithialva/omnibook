import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Brand and Description */}
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {t('app.title', 'OmniBook')}
            </h3>
            <p className="text-sm text-gray-600">
              {t('footer.description', 'Your personal digital library management system.')}
            </p>
          </div>

          {/* Copyright and Links */}
          <div className="text-center md:text-right">
            <div className="text-sm text-gray-500 mb-2">
              © {currentYear} {t('app.title', 'OmniBook')} • {t('footer.rights', 'All rights reserved.')}
            </div>
            <div className="flex flex-wrap justify-center md:justify-end space-x-4 text-sm">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('footer.privacy', 'Privacy')}
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('footer.terms', 'Terms')}
              </a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                {t('footer.contact', 'Contact')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
