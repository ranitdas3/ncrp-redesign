import React from 'react';
import { useTranslation } from 'react-i18next';

export default function GovtHeader() {
  const { t } = useTranslation();

  return (
    <header style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
      <div className="ux4g-tricolor-ribbon" />

      <div className="ux4g-container" style={{ padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <svg width="36" height="58" viewBox="0 0 50 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 0L28 10H22L25 0Z" fill="#0A3161"/>
            <circle cx="25" cy="22" r="16" stroke="#0A3161" strokeWidth="3" fill="none"/>
            <circle cx="25" cy="22" r="4" fill="#FF9933"/>
            <path d="M12 42C12 40 38 40 38 42L35 60H15L12 42Z" fill="#0A3161"/>
            <rect x="8" y="62" width="34" height="6" rx="2" fill="#138808"/>
            <text x="25" y="76" fontSize="7" fontWeight="bold" textAnchor="middle" fill="#0A3161">सत्यमेव जयते</text>
          </svg>

          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', color: '#0A3161', fontWeight: 700, letterSpacing: '-0.2px' }}>
              {t('header.portalTitle')}
            </h1>
            <div style={{ fontSize: '0.82rem', color: '#596168', marginTop: '1px' }}>
              {t('header.ministry')}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#fce8e6', border: '1px solid #f5c6cb', padding: '6px 14px', borderRadius: '30px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#d93025', animation: 'pulse 1.5s infinite' }} />
          <div>
            <div style={{ fontSize: '0.7rem', color: '#721c24', fontWeight: 600, textTransform: 'uppercase' }}>
              {t('header.nationalHelpline')}
            </div>
            <div style={{ fontSize: '1.05rem', color: '#d93025', fontWeight: 800, lineHeight: 1 }}>
              📞 1930
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
