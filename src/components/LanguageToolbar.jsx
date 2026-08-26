import React from 'react';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'bn', name: 'বাংলা' },
  { code: 'gu', name: 'ગુજરાતી' },
  { code: 'mr', name: 'मराठी' },
  { code: 'kn', name: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'മലയാളം' },
  { code: 'ta', name: 'தமிழ்' },
  { code: 'te', name: 'తెలుగు' },
  { code: 'or', name: 'ଓଡ଼ିଆ' },
];

export default function LanguageToolbar({ currentLang, onSelectLang, fontSize, setFontSize }) {
  return (
    <div style={{ backgroundColor: '#e2e8f0', borderBottom: '1px solid #cbd5e1', padding: '6px 0', fontSize: '0.85rem' }}>
      <div className="ux4g-container ux4g-mobile-toolbar-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        
        {/* Desktop Language Selection List */}
        <div className="ux4g-desktop-lang-list" style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelectLang(lang.code)}
              style={{
                background: 'none',
                border: 'none',
                padding: '8px 6px',
                minHeight: '36px',
                cursor: 'pointer',
                fontWeight: currentLang === lang.code ? '700' : '400',
                color: currentLang === lang.code ? '#0A3161' : '#475569',
                borderBottom: currentLang === lang.code ? '2.5px solid #0A3161' : '2.5px solid transparent',
                fontSize: '0.88rem'
              }}>
              {lang.name}
            </button>
          ))}
        </div>

        {/* Mobile Language Selection Accessible Dropdown (Shown ONLY on Mobile < 640px Screens) */}
        <select
          className="ux4g-mobile-lang-select"
          style={{ display: 'none' }}
          value={currentLang}
          aria-label="Select Portal Language"
          onChange={(e) => onSelectLang(e.target.value)}>
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              🌐 {lang.name}
            </option>
          ))}
        </select>

        {/* Text Sizing Segmented Controller */}
        <div className="ux4g-text-size-box" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#334155' }}>
          <span className="ux4g-text-size-label" style={{ fontWeight: 600, fontSize: '0.85rem' }}>Text Size:</span>
          <div className="ux4g-text-size-segmented" style={{ display: 'inline-flex', background: '#cbd5e1', padding: '2px', borderRadius: '8px', gap: '2px' }}>
            <button 
              type="button"
              className="ux4g-text-size-btn"
              aria-label="Small font size"
              onClick={() => setFontSize('sm')} 
              style={{ 
                background: fontSize === 'sm' ? '#0A3161' : 'transparent', 
                color: fontSize === 'sm' ? '#ffffff' : '#334155', 
                border: 'none', 
                borderRadius: '6px', 
                minWidth: '34px',
                height: '32px',
                padding: '0 8px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}>
              A-
            </button>
            <button 
              type="button"
              className="ux4g-text-size-btn"
              aria-label="Default font size"
              onClick={() => setFontSize('md')} 
              style={{ 
                background: fontSize === 'md' ? '#0A3161' : 'transparent', 
                color: fontSize === 'md' ? '#ffffff' : '#334155', 
                border: 'none', 
                borderRadius: '6px', 
                minWidth: '34px',
                height: '32px',
                padding: '0 8px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}>
              A
            </button>
            <button 
              type="button"
              className="ux4g-text-size-btn"
              aria-label="Large font size"
              onClick={() => setFontSize('lg')} 
              style={{ 
                background: fontSize === 'lg' ? '#0A3161' : 'transparent', 
                color: fontSize === 'lg' ? '#ffffff' : '#334155', 
                border: 'none', 
                borderRadius: '6px', 
                minWidth: '34px',
                height: '32px',
                padding: '0 8px', 
                cursor: 'pointer', 
                fontWeight: 'bold',
                fontSize: '0.82rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease'
              }}>
              A+
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
