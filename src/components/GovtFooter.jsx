import React from 'react';

export default function GovtFooter({ language }) {
  return (
    <footer style={{ background: '#0A3161', color: '#ffffff', marginTop: '60px', borderTop: '4px solid #FF9933' }}>
      <div className="ux4g-container" style={{ padding: '40px 16px 20px 16px' }}>
        {/* Footer Top Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px', marginBottom: '32px' }}>
          {/* Column 1: About Portal */}
          <div>
            <h4 style={{ color: '#FF9933', margin: '0 0 12px 0', fontSize: '1.1rem' }}>
              {language === 'hi' ? 'राष्ट्रीय साइबर अपराध पोर्टल' : 'National Cyber Crime Reporting Portal'}
            </h4>
            <p style={{ fontSize: '0.88rem', color: '#d1d5db', lineHeight: 1.6, margin: 0 }}>
              {language === 'hi' 
                ? 'यह पोर्टल भारत सरकार के गृह मंत्रालय की एक पहल है, जो नागरिकों को साइबर अपराधों की रिपोर्ट दर्ज करने की सुविधा प्रदान करती है।'
                : 'An initiative of the Ministry of Home Affairs, Government of India, to facilitate victims and complainants to report cyber crime complaints online.'}
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 style={{ color: '#FF9933', margin: '0 0 12px 0', fontSize: '1.1rem' }}>
              {language === 'hi' ? 'महत्वपूर्ण लिंक' : 'Important Links'}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '0.88rem', lineHeight: 2 }}>
              <li><a href="#terms" style={{ color: '#ffffff', textDecoration: 'none' }}>{language === 'hi' ? 'उपयोग की शर्तें' : 'Terms of Use'}</a></li>
              <li><a href="#privacy" style={{ color: '#ffffff', textDecoration: 'none' }}>{language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}</a></li>
              <li><a href="#hyperlink" style={{ color: '#ffffff', textDecoration: 'none' }}>{language === 'hi' ? 'हाइपरलिंकिंग नीति' : 'Hyperlinking Policy'}</a></li>
              <li><a href="#safety" style={{ color: '#ffffff', textDecoration: 'none' }}>{language === 'hi' ? 'साइबर सुरक्षा टिप्स' : 'Cyber Safety Tips'}</a></li>
            </ul>
          </div>

          {/* Column 3: Contact & Support */}
          <div>
            <h4 style={{ color: '#FF9933', margin: '0 0 12px 0', fontSize: '1.1rem' }}>
              {language === 'hi' ? 'सहायता केंद्र' : 'Help & Support'}
            </h4>
            <div style={{ fontSize: '0.88rem', color: '#d1d5db', lineHeight: 1.8 }}>
              <div>📞 {language === 'hi' ? 'टोल फ्री नंबर' : 'Toll-Free Helpline'}: <strong>1930</strong></div>
              <div>✉️ Email: <strong>denial-cyber@gov.in</strong></div>
              <div>🏢 Ministry of Home Affairs, North Block, New Delhi - 110001</div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div style={{ borderTop: '1px solid #ffffff33', paddingTop: '20px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px', fontSize: '0.82rem', color: '#9ca3af' }}>
          <div>
            © {new Date().getFullYear()} National Cyber Crime Reporting Portal. {language === 'hi' ? 'सर्वाधिकार सुरक्षित।' : 'All Rights Reserved.'}
          </div>

          {/* Accessibility & Compliance Badges */}
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
