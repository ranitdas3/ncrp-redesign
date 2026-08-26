import React, { useState, useEffect } from 'react';
import TrackComplaint from './TrackComplaint';

export default function LoginForm({ language }) {
  const [activeTab, setActiveTab] = useState('otp'); // 'otp' or 'password'
  
  // Form State
  const [mobileNumber, setMobileNumber] = useState('');
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [otpTimer, setOtpTimer] = useState(0);

  // Captcha State
  const [captchaCode, setCaptchaCode] = useState('');
  const [userCaptcha, setUserCaptcha] = useState('');
  
  // Feedback State
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate random captcha code
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
    generateCaptcha();
  }, []);

  // Timer effect for OTP resend
  useEffect(() => {
    let interval = null;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  // Handle Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!mobileNumber || mobileNumber.length !== 10 || !/^\d+$/.test(mobileNumber)) {
      setErrorMessage(language === 'hi' ? 'मोबाइल नंबर 10 अंकों का होना चाहिए। कृपया पुनः जाँचें।' : 'It looks like the mobile number needs to be 10 digits. Please check and re-enter.');
      return;
    }

    if (userCaptcha.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setErrorMessage(language === 'hi' ? 'कैप्चा कोड मेल नहीं खा रहा है। कृपया नया कोड दर्ज करें।' : 'The captcha code doesn\'t match the image shown. A new code has been generated for you.');
      generateCaptcha();
      return;
    }

    setOtpSent(true);
    setOtpTimer(30);
    setSuccessMessage(language === 'hi' ? `ओटीपी मो. ${mobileNumber} पर भेज दिया गया है।` : `OTP sent successfully to +91 ${mobileNumber}`);
    generateCaptcha();
  };

  // Handle Submit Form
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (activeTab === 'otp') {
      if (!otpSent) {
        setErrorMessage(language === 'hi' ? 'आगे बढ़ने से पहले कृपया ओटीपी प्राप्त करें।' : 'Please request an OTP verification code first before proceeding.');
        return;
      }
      if (!otpInput || otpInput.length !== 6) {
        setErrorMessage(language === 'hi' ? 'कृपया मोबाइल पर प्राप्त 6-अंकों का ओटीपी दर्ज करें।' : 'It looks like the OTP code is incomplete. Please enter the 6-digit verification code sent to your mobile.');
        return;
      }
    } else {
      if (!userId.trim()) {
        setErrorMessage(language === 'hi' ? 'कृपया अपना यूजर आई डी दर्ज करें।' : 'It looks like the User ID field is empty. Please enter your User ID or Email ID.');
        return;
      }
      if (!password) {
        setErrorMessage(language === 'hi' ? 'कृपया अपना पासवर्ड दर्ज करें।' : 'It looks like the password field is empty. Please enter your password to continue.');
        return;
      }
      if (userCaptcha.trim().toLowerCase() !== captchaCode.toLowerCase()) {
        setErrorMessage(language === 'hi' ? 'कैप्चा कोड मेल नहीं खा रहा है। कृपया नया कोड दर्ज करें।' : 'The captcha code doesn\'t match the image shown. A new code has been generated for you.');
        generateCaptcha();
        return;
      }
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage(language === 'hi' ? 'सफलतापूर्वक लॉग इन हुआ! पोर्टल पर आपका स्वागत है।' : 'Login Successful! Welcome to NCRP Portal.');
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '520px', margin: '40px auto', padding: '0 16px' }}>
      <div className="ux4g-card">
        {/* Card Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 6px 0', color: '#0A3161', fontSize: '1.5rem', fontWeight: 700 }}>
            {language === 'hi' ? 'नागरिक लॉगिन' : 'Citizen Login'}
          </h2>
          <p style={{ margin: 0, color: '#596168', fontSize: '0.9rem' }}>
            {language === 'hi' ? 'राष्ट्रीय साइबर अपराध पोर्टल में साइन इन करें' : 'Sign in to access cybercrime reporting services'}
          </p>
        </div>

        {/* Authentication Mode Tabs */}
        <div className="ux4g-tabs">
          <button 
            type="button"
            className={`ux4g-tab-btn ${activeTab === 'otp' ? 'active' : ''}`}
            onClick={() => { setActiveTab('otp'); setErrorMessage(''); setSuccessMessage(''); }}>
            {language === 'hi' ? '📱 मोबाइल ओटीपी' : '📱 Mobile OTP'}
          </button>
          <button 
            type="button"
            className={`ux4g-tab-btn ${activeTab === 'password' ? 'active' : ''}`}
            onClick={() => { setActiveTab('password'); setErrorMessage(''); setSuccessMessage(''); }}>
            {language === 'hi' ? '🔑 यूजर आई डी व पासवर्ड' : '🔑 User ID & Password'}
          </button>
          <button 
            type="button"
            className={`ux4g-tab-btn ${activeTab === 'track' ? 'active' : ''}`}
            onClick={() => { setActiveTab('track'); setErrorMessage(''); setSuccessMessage(''); }}>
            {language === 'hi' ? '🔍 शिकायत ट्रैक करें' : '🔍 Track your Complaint'}
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="ux4g-alert ux4g-alert-error" role="alert">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="ux4g-alert ux4g-alert-success" role="alert">
            ✅ {successMessage}
          </div>
        )}

        {/* Login Form / Track Form */}
        {activeTab === 'track' ? (
          <TrackComplaint currentLang={language} />
        ) : (
          <form onSubmit={handleSubmit}>
          {activeTab === 'otp' ? (
            /* TAB 1: Mobile OTP Flow */
            <>
              <div className="ux4g-form-group">
                <label className="ux4g-label" htmlFor="mobileInput">
                  {language === 'hi' ? 'पंजीकृत मोबाइल नंबर' : 'Registered Mobile Number'}<span className="required">*</span>
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
                    placeholder="e.g. 9876543210"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                    disabled={otpSent}
                  />
                </div>
              </div>

              {otpSent && (
                <div className="ux4g-form-group">
                  <label className="ux4g-label" htmlFor="otpInput">
                    {language === 'hi' ? '6-अंकों का ओटीपी दर्ज करें' : 'Enter 6-Digit OTP'}<span className="required">*</span>
                  </label>
                  <input
                    id="otpInput"
                    type="text"
                    maxLength={6}
                    className="ux4g-input"
                    placeholder="Enter 6-digit OTP"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.85rem' }}>
                    <span style={{ color: '#596168' }}>
                      {otpTimer > 0 ? `Resend OTP in ${otpTimer}s` : ''}
                    </span>
                    {otpTimer === 0 && (
                      <button 
                        type="button" 
                        onClick={handleSendOtp}
                        style={{ background: 'none', border: 'none', color: '#0A3161', fontWeight: 600, cursor: 'pointer', padding: 0, textDecoration: 'underline' }}>
                        Resend OTP
                      </button>
                    )}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* TAB 2: User ID & Password Flow */
            <>
              <div className="ux4g-form-group">
                <label className="ux4g-label" htmlFor="userIdInput">
                  {language === 'hi' ? 'यूजर आई डी / ईमेल' : 'User ID / Email ID'}<span className="required">*</span>
                </label>
                <input
                  id="userIdInput"
                  type="text"
                  className="ux4g-input"
                  placeholder="Enter User ID or Email"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>

              <div className="ux4g-form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="ux4g-label" htmlFor="passwordInput" style={{ margin: 0 }}>
                    {language === 'hi' ? 'पासवर्ड' : 'Password'}<span className="required">*</span>
                  </label>
                  <a href="#forgot" style={{ fontSize: '0.85rem', color: '#0A3161', textDecoration: 'none', fontWeight: 600 }}>
                    {language === 'hi' ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
                  </a>
                </div>
                <div className="ux4g-input-wrapper">
                  <input
                    id="passwordInput"
                    type={showPassword ? 'text' : 'password'}
                    className="ux4g-input"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: 'absolute', right: '12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem', color: '#596168' }}
                    title={showPassword ? 'Hide Password' : 'Show Password'}>
                    {showPassword ? '👁️' : '🙈'}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Security Captcha Section (Required for both tabs unless OTP already validated) */}
          {(!otpSent || activeTab === 'password') && (
            <div className="ux4g-form-group" style={{ background: '#f8f9fa', padding: '14px', borderRadius: '6px', border: '1px solid #e9ecef' }}>
              <label className="ux4g-label">
                {language === 'hi' ? 'सुरक्षा कैप्चा' : 'Security Captcha'}<span className="required">*</span>
              </label>
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
                <div className="ux4g-captcha-code">{captchaCode}</div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="ux4g-btn ux4g-btn-secondary"
                  style={{ padding: '6px 12px', fontSize: '0.85rem' }}
                  title="Refresh Captcha">
                  🔄 Refresh
                </button>
              </div>
              <input
                type="text"
                className="ux4g-input"
                placeholder={language === 'hi' ? 'ऊपर दिया गया कैप्चा कोड दर्ज करें' : 'Enter Captcha code shown above'}
                value={userCaptcha}
                onChange={(e) => setUserCaptcha(e.target.value)}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ marginTop: '24px' }}>
            {activeTab === 'otp' && !otpSent ? (
              <button 
                type="button" 
                onClick={handleSendOtp}
                className="ux4g-btn ux4g-btn-primary ux4g-btn-block">
                {language === 'hi' ? 'ओटीपी भेजें (Get OTP)' : 'Send OTP'}
              </button>
            ) : (
              <button 
                type="submit" 
                className="ux4g-btn ux4g-btn-primary ux4g-btn-block"
                disabled={isLoading}>
                {isLoading ? (language === 'hi' ? 'सत्यापित हो रहा है...' : 'Authenticating...') : (language === 'hi' ? 'साइन इन करें' : 'Sign In')}
              </button>
            )}
          </div>
        </form>
        )}

        {/* MeriPehchaan / SSO Integration */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #e0e0e0', textAlign: 'center' }}>
          <div style={{ fontSize: '0.85rem', color: '#596168', marginBottom: '12px' }}>
            {language === 'hi' ? 'अथवा सरकारी डिजिटल आईडी से साइन इन करें:' : 'Or sign in using National Single Sign-On:'}
          </div>
          <button 
            type="button"
            className="ux4g-btn ux4g-btn-secondary ux4g-btn-block"
            style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.1rem' }}>🇮🇳</span>
            <span>{language === 'hi' ? 'मेरीपहचान (Parichay SSO) द्वारा लॉगिन' : 'Login with MeriPehchaan (SSO)'}</span>
          </button>
        </div>

        {/* Register Link Footer */}
        <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.9rem', color: '#596168' }}>
          {language === 'hi' ? 'क्या आपका खाता नहीं है?' : "Don't have an account?"}{' '}
          <a href="#register" style={{ color: '#0A3161', fontWeight: 700, textDecoration: 'none' }}>
            {language === 'hi' ? 'नया नागरिक खाता पंजीकृत करें' : 'Register Citizen Account'}
          </a>
        </div>
      </div>
    </div>
  );
}
