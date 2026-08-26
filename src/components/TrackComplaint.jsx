import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

export default function TrackComplaint() {
  const { t } = useTranslation();
  const [ackNo, setAckNo] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('SESraS');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [trackingResult, setTrackingResult] = useState(null);

  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
    let code = '';
    const randomArray = new Uint32Array(6);
    if (typeof window !== 'undefined' && window.crypto) {
      window.crypto.getRandomValues(randomArray);
      for (let i = 0; i < 6; i++) {
        code += chars.charAt(randomArray[i] % chars.length);
      }
    } else {
      code = 'SESraS';
    }
    setCaptchaCode(code);
    setUserCaptcha('');
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!ackNo.trim()) {
      setErrorMessage(t('validation.enterAcknowledgement'));
      return;
    }
    if (userCaptcha.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setErrorMessage(t('validation.invalidCaptchaCode'));
      generateCaptcha();
      return;
    }

    setOtpSent(true);
    setOtpInput('849201');
    setSuccessMessage(t('messages.otpSentToRegistered', { ackNo }));
  };

  const handleVerifyOtpAndTrack = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!otpInput || otpInput.length !== 6) {
      setErrorMessage(t('validation.enterOtp'));
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setTrackingResult({
        ackNo: ackNo.trim(),
        status: 'Assigned to State Cyber Cell',
        category: 'Cyber Crime Investigation Unit',
        dateFiled: new Date().toLocaleDateString(),
        currentStage: 2,
      });
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '560px', margin: '40px auto', padding: '0 16px', textAlign: 'left' }}>

      <div className="ux4g-card" style={{ padding: '32px 36px', background: '#ffffff', borderRadius: '16px' }}>

        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 6px 0', fontSize: '1.5rem', color: '#0A3161', fontWeight: 800, letterSpacing: '-0.4px' }}>
            {t('tracking.title')}
          </h2>
          <div style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.4 }}>
            {t('tracking.description')}
          </div>
        </div>

        {errorMessage && (
          <div className="ux4g-alert ux4g-alert-error" style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '8px' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="ux4g-alert ux4g-alert-success" style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '8px' }}>
            ✅ {successMessage}
          </div>
        )}

        {!trackingResult ? (
          <div>
            {!otpSent ? (
              <form onSubmit={handleSendOtp}>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: '8px' }}>
                    {t('tracking.acknowledgementNo')} <span style={{ color: '#d93025' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="ux4g-input"
                    placeholder={t('tracking.acknowledgementNo')}
                    value={ackNo}
                    onChange={(e) => setAckNo(e.target.value)}
                    style={{ width: '100%', borderRadius: '8px', padding: '12px 16px', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '24px'
                }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: '12px' }}>
                    {t('tracking.securityCaptcha')} <span style={{ color: '#d93025' }}>*</span>
                  </label>

                  <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{
                      background: 'repeating-linear-gradient(45deg, #f1f5f9, #f1f5f9 10px, #e2e8f0 10px, #e2e8f0 20px)',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '8px 20px',
                      fontFamily: 'monospace',
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      letterSpacing: '4px',
                      color: '#0A3161',
                      textDecoration: 'line-through',
                      userSelect: 'none',
                      display: 'inline-block'
                    }}>
                      {captchaCode}
                    </div>

                    <button
                      type="button"
                      onClick={generateCaptcha}
                      style={{
                        background: '#ffffff',
                        border: '1.5px solid #0A3161',
                        color: '#0A3161',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontWeight: 600,
                        fontSize: '0.88rem',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}>
                      🔄 {t('common.refresh')}
                    </button>
                  </div>

                  <input
                    type="text"
                    className="ux4g-input"
                    placeholder={t('captcha.enterCaptchaAbove')}
                    value={userCaptcha}
                    onChange={(e) => setUserCaptcha(e.target.value)}
                    style={{ width: '100%', borderRadius: '8px', padding: '12px 16px', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    width: '100%',
                    background: '#0A3161',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '14px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'background 0.2s ease'
                  }}>
                  {t('tracking.sendOtp')}
                </button>

              </form>
            ) : (
              <form onSubmit={handleVerifyOtpAndTrack}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: '8px' }}>
                    {t('tracking.enter6DigitOtp')} <span style={{ color: '#d93025' }}>*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    className="ux4g-input"
                    placeholder={t('tracking.enter6DigitOtpCode')}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    style={{ width: '100%', borderRadius: '8px', padding: '12px 16px', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    className="ux4g-btn ux4g-btn-secondary"
                    onClick={() => setOtpSent(false)}>
                    ← {t('common.back')}
                  </button>

                  <button
                    type="submit"
                    className="ux4g-btn ux4g-btn-primary"
                    style={{ flex: 1 }}
                    disabled={isSubmitting}>
                    {isSubmitting ? t('tracking.verifyingAndFetching') : t('tracking.submitAndViewStatus')}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          <div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 800, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                {t('tracking.officialTrackingReport')}
              </div>

              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0A3161', letterSpacing: '1px', margin: '6px 0 14px 0' }}>
                {trackingResult.ackNo}
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ background: '#dcfce7', color: '#166534', fontWeight: 600, fontSize: '0.84rem', padding: '5px 14px', borderRadius: '14px' }}>
                  {t('tracking.status')}: {trackingResult.status}
                </span>
                <span style={{ background: '#e2e8f0', color: '#334155', fontWeight: 600, fontSize: '0.84rem', padding: '5px 14px', borderRadius: '14px' }}>
                  {t('tracking.unit')}: {trackingResult.category}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '28px', paddingLeft: '4px' }}>
              {[
                { title: t('tracking.complaintRegistered'), desc: t('tracking.complaintRegisteredDesc'), state: 'done' },
                { title: t('tracking.assignedToCyberCell'), desc: t('tracking.assignedToCyberCellDesc'), state: 'active' },
                { title: t('tracking.evidenceAnalysis'), desc: t('tracking.evidenceAnalysisDesc'), state: 'pending' },
                { title: t('tracking.finalResolution'), desc: t('tracking.finalResolutionDesc'), state: 'pending' },
              ].map((st, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    background: st.state === 'done' ? '#16a34a' : st.state === 'active' ? '#0A3161' : '#cbd5e1',
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    flexShrink: 0
                  }}>
                    {st.state === 'done' ? '✓' : idx + 1}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.94rem', color: st.state === 'pending' ? '#64748b' : '#0f172a' }}>
                      {st.title}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '2px' }}>
                      {st.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="ux4g-btn ux4g-btn-secondary"
              onClick={() => { setTrackingResult(null); setOtpSent(false); setAckNo(''); }}>
              {t('tracking.trackAnotherComplaint')}
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
