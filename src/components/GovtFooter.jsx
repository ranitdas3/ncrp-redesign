import React from 'react';
import { useTranslation } from 'react-i18next';

export default function GovtFooter() {
  const { t } = useTranslation();

  return (
    <footer style={{ background: '#0A3161', color: '#ffffff', marginTop: '60px', borderTop: '4px solid #FF9933' }}>
      <div className="ux4g-container" style={{ padding: '40px 16px 20px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', marginBottom: '32px' }}>
          <div>
            <h4 style={{ color: '#FF9933', margin: '0 0 12px 0', fontSize: '1.1rem' }}>
              {t('footer.portalTitle')}
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#d1d5db', lineHeight: 1.6, margin: 0 }}>
              {t('footer.portalDescription')}
            </p>
          </div>

          <div>
            <h4 style={{ color: '#FF9933', margin: '0 0 12px 0', fontSize: '1.1rem' }}>
              {t('footer.importantLinks')}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.88rem', lineHeight: 2 }}>
              <li><a href="#terms" style={{ color: '#ffffff', textDecoration: 'none' }}>{t('footer.termsOfUse')}</a></li>
              <li><a href="#privacy" style={{ color: '#ffffff', textDecoration: 'none' }}>{t('footer.privacyPolicy')}</a></li>
              <li><a href="#hyperlink" style={{ color: '#ffffff', textDecoration: 'none' }}>{t('footer.hyperlinkingPolicy')}</a></li>
              <li><a href="#safety" style={{ color: '#ffffff', textDecoration: 'none' }}>{t('footer.cyberSafetyTips')}</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#FF9933', margin: '0 0 12px 0', fontSize: '1.1rem' }}>
              {t('footer.helpSupport')}
            </h4>
            <div style={{ fontSize: '0.88rem', color: '#d1d5db', lineHeight: 1.8 }}>
              <div>📞 {t('footer.tollFreeHelpline')}: <strong>1930</strong></div>
              <div>✉️ {t('footer.email')}: <strong>denial-cyber@gov.in</strong></div>
              <div>🏢 Ministry of Home Affairs, North Block, New Delhi - 110001</div>
            </div>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #ffffff33', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', fontSize: '0.82rem', color: '#9ca3af' }}>
          <div>
            © {new Date().getFullYear()} National Cyber Crime Reporting Portal. {t('footer.allRightsReserved')}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ border: '1px solid #ffffff44', padding: '2px 8px', borderRadius: '4px', background: '#08264d', color: '#FF9933', fontWeight: 'bold' }}>
              UX4G 3.0 Standard
            </span>
            <span style={{ border: '1px solid #ffffff44', padding: '2px 8px', borderRadius: '4px', background: '#08264d', color: '#138808', fontWeight: 'bold' }}>
              WCAG 2.1 AA Compliant
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
