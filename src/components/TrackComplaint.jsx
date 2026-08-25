import React, { useState } from 'react';

export default function TrackComplaint() {
  const [ackNo, setAckNo] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpInput, setOtpInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('SESraS');
  const [userCaptcha, setUserCaptcha] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Status Result View State
  const [trackingResult, setTrackingResult] = useState(null);

  // Generate random captcha code
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
      setErrorMessage('Please enter your Acknowledgement No.');
      return;
    }
    if (userCaptcha.trim().toLowerCase() !== captchaCode.toLowerCase()) {
      setErrorMessage('Invalid Captcha code. Please re-enter Captcha.');
      generateCaptcha();
      return;
    }

    setOtpSent(true);
    setOtpInput('849201'); // Pre-fill simulated OTP
    setSuccessMessage(`OTP sent successfully to registered mobile number for ${ackNo}`);
  };

  const handleVerifyOtpAndTrack = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!otpInput || otpInput.length !== 6) {
      setErrorMessage('Please enter the 6-digit OTP code.');
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
      
      {/* Outer Card matching Redesign Wireframe Screenshot media_1787676778901.png */}
      <div className="ux4g-card" style={{ padding: '32px 36px', background: '#ffffff', borderRadius: '16px' }}>
        
        {/* Title & Subtitle */}
        <div style={{ marginBottom: '24px' }}>
          <h2 style={{ margin: '0 0 6px 0', fontSize: '1.5rem', color: '#0A3161', fontWeight: 800, letterSpacing: '-0.4px' }}>
            Track your Complaint Status
          </h2>
          <div style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.4 }}>
            Check real-time investigation status of your registered cyber crime complaint.
          </div>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="ux4g-alert ux4g-alert-error" style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '8px' }}>
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Success Alert */}
        {successMessage && (
          <div className="ux4g-alert ux4g-alert-success" style={{ marginBottom: '20px', padding: '12px 16px', borderRadius: '8px' }}>
            ✅ {successMessage}
          </div>
        )}

        {!trackingResult ? (
          <div>
            {!otpSent ? (
              /* STEP 1: FORM MATCHING WIREFRAME SCREENSHOT EXACTLY */
              <form onSubmit={handleSendOtp}>
                
                {/* Field 1: Acknowledgement No */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: '8px' }}>
                    Acknowledgement No <span style={{ color: '#d93025' }}>*</span>
                  </label>
                  <input
                    type="text"
                    className="ux4g-input"
                    placeholder="Enter Acknowledgement No here."
                    value={ackNo}
                    onChange={(e) => setAckNo(e.target.value)}
                    style={{ width: '100%', borderRadius: '8px', padding: '12px 16px', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Field 2: Security Captcha Container Box */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '16px 20px',
                  marginBottom: '24px'
                }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: '12px' }}>
                    Security Captcha <span style={{ color: '#d93025' }}>*</span>
                  </label>

                  {/* Captcha Code Graphic Box + Refresh Button Row */}
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
                      🔄 Refresh
                    </button>
                  </div>

                  {/* Captcha Input Box */}
                  <input
                    type="text"
                    className="ux4g-input"
                    placeholder="Enter Captcha code shown above"
                    value={userCaptcha}
                    onChange={(e) => setUserCaptcha(e.target.value)}
                    style={{ width: '100%', borderRadius: '8px', padding: '12px 16px', fontSize: '0.95rem', boxSizing: 'border-box' }}
                  />
                </div>

                {/* Primary Action Button: Send OTP */}
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
                  Send OTP
                </button>

              </form>
            ) : (
              /* STEP 2: ENTER OTP & VIEW STATUS */
              <form onSubmit={handleVerifyOtpAndTrack}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.95rem', color: '#1e293b', marginBottom: '8px' }}>
                    Enter 6-Digit OTP <span style={{ color: '#d93025' }}>*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    className="ux4g-input"
                    placeholder="Enter 6-digit OTP code"
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
                    ← Back
                  </button>

                  <button
                    type="submit"
                    className="ux4g-btn ux4g-btn-primary"
                    style={{ flex: 1 }}
                    disabled={isSubmitting}>
                    {isSubmitting ? 'Verifying & Fetching Status...' : 'Submit & View Complaint Status →'}
                  </button>
                </div>
              </form>
            )}
          </div>
        ) : (
          /* LIVE STATUS TIMELINE VIEW */
          <div>
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px 24px', marginBottom: '24px' }}>
              <div style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 800, letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                OFFICIAL TRACKING REPORT
              </div>

              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#0A3161', letterSpacing: '1px', margin: '6px 0 14px 0' }}>
                {trackingResult.ackNo}
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ background: '#dcfce7', color: '#166534', fontWeight: 600, fontSize: '0.84rem', padding: '5px 14px', borderRadius: '14px' }}>
                  Status: {trackingResult.status}
                </span>
                <span style={{ background: '#e2e8f0', color: '#334155', fontWeight: 600, fontSize: '0.84rem', padding: '5px 14px', borderRadius: '14px' }}>
                  Unit: {trackingResult.category}
                </span>
              </div>
            </div>

            {/* Investigation Progress Timeline */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', marginBottom: '28px', paddingLeft: '4px' }}>
              {[
                { title: 'Complaint Registered & Encrypted', desc: 'Securely received on NCRP portal', state: 'done' },
                { title: 'Assigned to State Cyber Crime Cell', desc: 'Investigation officer assigned', state: 'active' },
                { title: 'Evidence Analysis & Suspect Tracking', desc: 'Reviewing attached screenshots & transaction data', state: 'pending' },
                { title: 'Final Resolution / Action Taken', desc: 'Official case report closed', state: 'pending' },
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
              ← Track Another Complaint
            </button>
          </div>
        )}

      </div>

    </div>
  );
}
