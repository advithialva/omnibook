import { useTranslation } from 'react-i18next';
import { useState } from 'react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
    { code: 'hi', label: 'हिंदी', flag: '🇮🇳' },
    { code: 'ko', label: '한국어', flag: '🇰🇷' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Current selection display */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          padding: '0.5rem 2rem 0.5rem 0.75rem',
          cursor: 'pointer',
          fontSize: '0.875rem',
          outline: 'none',
          minWidth: '120px'
        }}
        onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
      >
        <span style={{ fontSize: '1rem' }}>{currentLanguage.flag}</span>
        <span>{currentLanguage.label}</span>
      </button>

      {/* Dropdown arrow */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        paddingRight: '0.5rem',
        pointerEvents: 'none'
      }}>
        <svg 
          style={{ 
            width: '1rem', 
            height: '1rem', 
            color: '#9ca3af',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s'
          }} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '0.25rem',
          backgroundColor: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          zIndex: 50
        }}>
          {languages.map(language => (
            <button
              key={language.code}
              onClick={() => handleLanguageChange(language.code)}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.5rem 0.75rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                border: 'none',
                backgroundColor: language.code === i18n.language ? '#f3f4f6' : 'transparent',
                textAlign: 'left'
              }}
              onMouseEnter={(e) => {
                if (language.code !== i18n.language) {
                  e.target.style.backgroundColor = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (language.code !== i18n.language) {
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={{ fontSize: '1rem' }}>{language.flag}</span>
              <span>{language.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 40
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageSwitcher;
