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
      <div className="ux4g-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        
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

        {/* Mobile Language Selection Accessible Dropdown (Shown on < 640px Screens) */}
        <select
          className="ux4g-mobile-lang-select"
          value={currentLang}
          aria-label="Select Portal Language"
          onChange={(e) => onSelectLang(e.target.value)}>
          {LANGUAGES.map((lang) => (
            <option key={lang.code} value={lang.code}>
              🌐 {lang.name}
            </option>
          ))}
        </select>

        {/* Text Sizing Controls with 44px Minimum Touch Target */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#334155' }}>
          <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Text Size:</span>
          <button 
            type="button"
            aria-label="Small font size"
            onClick={() => setFontSize('sm')} 
            style={{ 
              background: fontSize === 'sm' ? '#0A3161' : '#ffffff', 
              color: fontSize === 'sm' ? '#ffffff' : '#0f172a', 
              border: '1.5px solid #94a3b8', 
              borderRadius: '6px', 
              minWidth: '40px',
              minHeight: '38px',
              padding: '4px 10px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            A-
          </button>
          <button 
            type="button"
            aria-label="Default font size"
            onClick={() => setFontSize('md')} 
            style={{ 
              background: fontSize === 'md' ? '#0A3161' : '#ffffff', 
              color: fontSize === 'md' ? '#ffffff' : '#0f172a', 
              border: '1.5px solid #94a3b8', 
              borderRadius: '6px', 
              minWidth: '40px',
              minHeight: '38px',
              padding: '4px 10px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            A
          </button>
          <button 
            type="button"
            aria-label="Large font size"
            onClick={() => setFontSize('lg')} 
            style={{ 
              background: fontSize === 'lg' ? '#0A3161' : '#ffffff', 
              color: fontSize === 'lg' ? '#ffffff' : '#0f172a', 
              border: '1.5px solid #94a3b8', 
              borderRadius: '6px', 
              minWidth: '40px',
              minHeight: '38px',
              padding: '4px 10px', 
              cursor: 'pointer', 
              fontWeight: 'bold',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
            A+
          </button>
        </div>

      </div>
    </div>
  );
}
