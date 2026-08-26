import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import TrackComplaint from './TrackComplaint';

export default function LoginForm() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('otp');

  const [mobileNumber, setMobileNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);

  const [captchaCode, setCaptchaCode] = useState(() => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  });
  const [userCaptcha, setUserCaptcha] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(code);
    setUserCaptcha('');
  };

  useEffect(() => {
    let interval = null;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!mobileNumber || mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      setErrorMessage(t('validation.invalidMobile'));
      return;
    }

    if (userCaptcha.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setErrorMessage(t('validation.invalidCaptcha'));
      generateCaptcha();
      return;
    }

    setOtpSent(true);
    setOtpTimer(30);
    setSuccessMessage(t('otp.sentSuccessfully', { mobileNumber }));
    generateCaptcha();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (activeTab === 'otp') {
      if (!otpSent) {
        setErrorMessage(t('validation.requestOtpFirst'));
        return;
      }
      if (!otpInput || otpInput.length !== 6) {
        setErrorMessage(t('validation.enterOtp'));
        return;
      }
    } else {
      if (!userId.trim()) {
        setErrorMessage(t('validation.enterUserId'));
        return;
      }
      if (!password) {
        setErrorMessage(t('validation.enterPassword'));
        return;
      }
      if (userCaptcha.trim().toLowerCase() !== captchaCode.toLowerCase()) {
        setErrorMessage(t('validation.invalidCaptchaCode'));
        generateCaptcha();
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(t('messages.loginSuccess'));
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '520px', margin: '40px auto', padding: '0 16px' }}>
      <div className="ux4g-card">
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 6px 0', color: '#0A3161', fontSize: '1.5rem', fontWeight: 700 }}>
            {t('login.citizenLogin')}
          </h2>
          <p style={{ margin: 0, color: '#596168', fontSize: '0.9rem' }}>
            {t('login.signInSubtitle')}
          </p>
        </div>

        <div className="ux4g-tabs">
          <button
            type="button"
            className={`ux4g-tab-btn ${activeTab === 'otp' ? 'active' : ''}`}
            onClick={() => { setActiveTab('otp'); setErrorMessage(''); setSuccessMessage(''); }}>
            {t('login.mobileOtp')}
          </button>
          <button
            type="button"
            className={`ux4g-tab-btn ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => { setActiveTab('password'); setErrorMessage(''); setSuccessMessage(''); }}>
            {t('login.userIdPassword')}
          </button>
          <button
            type="button"
            className={`ux4g-tab-btn ${activeTab === 'track' ? 'active' : ''}`}
            onClick={() => { setActiveTab('track'); setErrorMessage(''); setSuccessMessage(''); }}>
            {t('login.trackYourComplaint')}
          </button>
        </div>

        {errorMessage && (
          <div className="ux4g-alert ux4g-alert-error" role="alert">
            ⚠️ {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="ux4g-alert ux4g-alert-success" role="alert">
            ✅ {successMessage}
          </div>
        )}

        {activeTab === 'track' ? (
          <TrackComplaint />
        ) : (
          <form onSubmit={handleSubmit}>
          {activeTab === 'otp' ? (
            <>
              <div className="ux4g-form-group">
                <label className="ux4g-label" htmlFor="mobileInput">
                  {t('login.registeredMobileNumber')}<span className="required">*</span>
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ padding: '10px 14px', background: '#e9ecef', border: '1.5px solid #d1d5db', borderRadius: '6px', fontWeight: 'bold', color: '#495057' }}>
                    +91
                  </div>
                  <input
                    id="mobileInput"
                    type="tel"
                    maxLength={10}
                    className="ux4g-input"
                    placeholder={t('login.placeholderMobile')}
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    disabled={otpSent}
                  />
                </div>
              </div>

              {otpSent && (
                <div className="ux4g-form-group">
                  <label className="ux4g-label" htmlFor="otpInput">
                    {t('login.enter6DigitOtp')}<span className="required">*</span>
                  </label>
                  <input
                    id="otpInput"
                    type="text"
                    maxLength={6}
                    className="ux4g-input"
                    placeholder={t('login.enter6DigitOtp')}
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.85rem' }}>
                    <span style={{ color: '#596168' }}>
                      {otpTimer > 0 ? t('common.otpSentIn', { seconds: otpTimer }) : ''}
                    </span>
                    {otpTimer === 0 && (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        style={{ background: 'none', border: 'none', color: '#0A3161', fontWeight: 600, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
                        {t('common.resendOtp')}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="ux4g-form-group">
                <label className="ux4g-label" htmlFor="userIdInput">
                  {t('login.userIdEmail')}<span className="required">*</span>
                </label>
                <input
                  id="userIdInput"
                  type="text"
                  className="ux4g-input"
                  placeholder={t('login.placeholderUserId')}
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>

              <div className="ux4g-form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="ux4g-label" htmlFor="passwordInput" style={{ margin: 0 }}>
                    {t('login.password')}<span className="required">*</span>
                  </label>
                  <a href="#forgot" style={{ fontSize: '0.85rem', color: '#0A3161', textDecoration: 'none', fontWeight: 600 }}>
                    {t('login.forgotPassword')}
                  </a>
                </div>
                <div className="ux4g-input-wrapper">
                  <input
                    id="passwordInput"
                    type={showPassword ? 'text' : 'password'}
                    className="ux4g-input"
                    placeholder={t('login.placeholderPassword')}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: '#596168' }}
                    title={showPassword ? t('login.hidePassword') : t('login.showPassword')}>
                    {showPassword ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>
            </>
          )}

          {(!otpSent || activeTab === 'password') && (
            <div className="ux4g-form-group" style={{ background: '#f8f9fa', padding: '14px', borderRadius: '6px', border: '1px solid #e9ecef' }}>
              <label className="ux4g-label">
                {t('login.securityCaptcha')}<span className="required">*</span>
              </label>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
                <div className="ux4g-captcha-code">{captchaCode}</div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="ux4g-btn ux4g-btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  title={t('captcha.refresh')}>
                  🔄 {t('common.refresh')}
                </button>
              </div>
              <input
                type="text"
                className="ux4g-input"
                placeholder={t('captcha.enterCaptchaAbove')}
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
              />
            </div>
          )}

          <div style={{ marginTop: '24px' }}>
            {activeTab === 'otp' && !otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="ux4g-btn ux4g-btn-primary ux4g-btn-block">
                {t('common.sendOtp')}
              </button>
            ) : (
              <button
                type="submit"
                className="ux4g-btn ux4g-btn-primary ux4g-btn-block"
                disabled={isLoading}>
                {isLoading ? t('login.authenticating') : t('login.signIn')}
              </button>
            )}
          </div>
        </form>
        )}

        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#596168', marginBottom: '12px' }}>
            {t('login.ssoText')}
          </div>
          <button
            type="button"
            className="ux4g-btn ux4g-btn-secondary ux4g-btn-block"
            style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.1rem' }}>🇮🇳</span>
            <span>{t('login.loginWithMeriPehchaan')}</span>
          </button>
        </div>

        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#596168' }}>
          {t('login.noAccount')}{' '}
          <a href="#register" style={{ color: '#0A3161', fontWeight: 700, textDecoration: 'none' }}>
            {t('login.registerCitizenAccount')}
          </a>
        </div>
      </div>
    </div>
  );
}
