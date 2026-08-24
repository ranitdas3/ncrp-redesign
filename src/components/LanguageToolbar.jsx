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
        
        {/* Language Selection List as shown in Wireframe */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => onSelectLang(lang.code)}
              style={{
                background: 'none',
                border: 'none',
                padding: '2px 4px',
                cursor: 'pointer',
                fontWeight: currentLang === lang.code ? '700' : '400',
                color: currentLang === lang.code ? '#0A3161' : '#475569',
                borderBottom: currentLang === lang.code ? '2px solid #0A3161' : '2px solid transparent',
                fontSize: '0.85rem'
              }}>
              {lang.name}
            </button>
          ))}
        </div>

        {/* Text Sizing Controls matching Wireframe */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#334155' }}>
          <span style={{ fontWeight: 500 }}>Text Size:</span>
          <button 
            type="button"
            onClick={() => setFontSize('sm')} 
            style={{ background: fontSize === 'sm' ? '#0A3161' : 'transparent', color: fontSize === 'sm' ? '#fff' : '#0f172a', border: '1px solid #94a3b8', borderRadius: '3px', padding: '1px 6px', cursor: 'pointer', fontWeight: 'bold' }}>
            A-
          </button>
          <button 
            type="button"
            onClick={() => setFontSize('md')} 
            style={{ background: fontSize === 'md' ? '#0A3161' : 'transparent', color: fontSize === 'md' ? '#fff' : '#0f172a', border: '1px solid #94a3b8', borderRadius: '3px', padding: '1px 6px', cursor: 'pointer', fontWeight: 'bold' }}>
            A
          </button>
          <button 
            type="button"
            onClick={() => setFontSize('lg')} 
            style={{ background: fontSize === 'lg' ? '#0A3161' : 'transparent', color: fontSize === 'lg' ? '#fff' : '#0f172a', border: '1px solid #94a3b8', borderRadius: '3px', padding: '1px 6px', cursor: 'pointer', fontWeight: 'bold' }}>
            A+
          </button>
        </div>

      </div>
    </div>
  );
}
