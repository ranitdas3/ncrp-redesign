import React, { useState } from 'react';

export default function IncidentReportingFlow({ category, currentLang, onBackToCategories }) {
  const [currentStep, setCurrentStep] = useState(1);
  const isWomenChildren = category?.id === 'women-children';

  // Sub-Crime Selection State (No pill pre-selected by default)
  const [selectedSubCrime, setSelectedSubCrime] = useState(null);

  // Intake State (Principle 1: Capture Fast, Structure Later)
  const [description, setDescription] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceTimer, setVoiceTimer] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Dynamic Category-Specific Incident Details
  const [incidentFields, setIncidentFields] = useState({
    // Smart Defaults & Background Enrichment
    incidentDate: new Date().toISOString().slice(0, 16),
    locationContext: 'New Delhi, India (Captured via Network IP)',
    deviceMeta: 'macOS / Chrome Browser (Auto-Verified)',
    complainantPhone: '+91 98765 43210 (Linked Citizen ID)',

    // Extracted / Category-Specific Fields
    financialLoss: '',
    transactionRef: '',
    victimBank: 'State Bank of India',
    suspectDetails: '',
    platform: '',
    contentType: '',
    targetSystem: '',
  });

  // Acknowledgment State
  const [ackNumber, setAckNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [followUpSent, setFollowUpSent] = useState(false);

  // Feature: Speak Complaint (Voice Input Simulation)
  const handleToggleVoice = () => {
    if (isRecordingVoice) {
      setIsRecordingVoice(false);
    } else {
      setIsRecordingVoice(true);
      setVoiceTimer(1);
      const timer = setInterval(() => {
        setVoiceTimer((prev) => {
          if (prev >= 3) {
            clearInterval(timer);
            setIsRecordingVoice(false);
            const voiceText = 'Incident occurred yesterday around 8 PM on Instagram. Received threatening harassment messages from profile @cyber_harasser_99.';
            setDescription(voiceText);
            autoExtractFromText(voiceText);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  // Feature: Scan Screenshot / Receipt (OCR Scanning Simulation)
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        const scannedText = `[Scanned from ${file.name}]: Suspect handle @cyber_harasser_99 on Telegram. Loss amount Rs 25,000 via UTR 429184029102.`;
        setDescription(scannedText);
        autoExtractFromText(scannedText);
      }, 1200);
    }
  };

  // Smart Auto-Fill & Extraction Engine
  const autoExtractFromText = (text) => {
    const textLower = text.toLowerCase();
    
    // Extract Financial Loss (e.g. Rs 25,000 or 25000)
    const amountMatch = text.match(/(?:rs\.?|inr|₹|\$)\s*([\d,]+)/i) || text.match(/(\d{4,6})\s*(?:debited|lost|transferred|rupees)/i);
    const extractedLoss = amountMatch ? amountMatch[1].replace(/,/g, '') : incidentFields.financialLoss;

    // Extract UTR / Transaction Ref
    const utrMatch = text.match(/(?:utr|txn|ref|transaction)\s*[:#-]?\s*([a-z0-9]{8,18})/i);
    const extractedUtr = utrMatch ? utrMatch[1] : incidentFields.transactionRef;

    // Extract Suspect Handle / Phone / UPI
    const handleMatch = text.match(/@[a-zA-Z0-9._]+/);
    const phoneMatch = text.match(/(?:\+91\s*|0)?([6-9]\d{9})/);
    const upiMatch = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z]{3,})/);
    let extractedSuspect = incidentFields.suspectDetails;
    if (handleMatch) extractedSuspect = handleMatch[0];
    else if (upiMatch) extractedSuspect = `UPI: ${upiMatch[0]}`;
    else if (phoneMatch) extractedSuspect = `+91 ${phoneMatch[1]}`;

    // Extract Platform
    let extractedPlatform = incidentFields.platform;
    if (textLower.includes('instagram')) extractedPlatform = 'Instagram';
    else if (textLower.includes('whatsapp')) extractedPlatform = 'WhatsApp';
    else if (textLower.includes('telegram')) extractedPlatform = 'Telegram';
    else if (textLower.includes('phonepe') || textLower.includes('gpay') || textLower.includes('upi')) extractedPlatform = 'UPI App';

    setIncidentFields((prev) => ({
      ...prev,
      financialLoss: extractedLoss,
      transactionRef: extractedUtr,
      suspectDetails: extractedSuspect,
      platform: extractedPlatform,
    }));
  };

  // Proceed to Step 2 or Direct Submission
  const handleAnalyzeAndProceed = (directSubmit = false) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      autoExtractFromText(description);

      if (directSubmit) {
        finalizeComplaint();
      } else {
        setCurrentStep(2);
      }
    }, 500);
  };

  // Submit Handler
  const finalizeComplaint = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedAck = 'NCRP-2026-' + Math.floor(100000 + Math.random() * 900000);
      setAckNumber(generatedAck);
      setCurrentStep(3);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '820px', margin: '24px auto', padding: '0 20px', textAlign: 'left' }}>
      
      {/* Back Navigation Button */}
      <div style={{ marginBottom: '16px' }}>
        <button
          type="button"
          onClick={onBackToCategories}
          style={{
            background: 'none',
            border: 'none',
            color: '#0A3161',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: 0,
            fontSize: '0.95rem'
          }}>
          ← {currentLang === 'hi' ? 'श्रेणियों पर वापस जाएं' : 'Back to All Categories'}
        </button>
      </div>

      {/* Progressive Disclosure Header (Visible Progress Bar) */}
      <div style={{ background: '#fff', border: '1px solid #cbd5e1', borderRadius: '16px', padding: '16px 20px', marginBottom: '24px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          {[
            { num: 1, title: 'Register Incident', detail: 'Voice, Text or Photo' },
            { num: 2, title: 'Incident Details', detail: 'Category-Specific Fields' },
            { num: 3, title: 'Registered & Saved', detail: 'Instant Receipt' }
          ].map((s) => (
            <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: currentStep >= s.num ? 1 : 0.4 }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: currentStep >= s.num ? '#0b2e59' : '#cbd5e1',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 'bold'
              }}>
                {currentStep > s.num ? '✓' : s.num}
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: currentStep === s.num ? '700' : '600', color: '#0f172a' }}>{s.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#e2e8f0', height: '5px', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{
            background: '#0b2e59',
            height: '100%',
            width: currentStep === 1 ? '33%' : currentStep === 2 ? '66%' : '100%',
            transition: 'width 0.3s ease-in-out'
          }} />
        </div>
      </div>

      {/* ======================================================================= */}
      {/* STEP 1: WIREFRAME LAYOUT FOR WOMEN & CHILDREN                           */}
      {/* ======================================================================= */}
      {currentStep === 1 && isWomenChildren && (
        <div className="ux4g-wireframe-card">
          
          {/* Header with Emoji Icon Box + Category Title */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
            <div style={{
              width: '44px',
              height: '44px',
              backgroundColor: '#6ba0c7',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.4rem',
              color: '#ffffff',
              flexShrink: 0
            }}>
              👩‍👧‍👦
            </div>
            <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#0f172a', fontWeight: 700, letterSpacing: '-0.5px' }}>
              {category.title}
            </h2>
          </div>

          {/* Sub-Category Selector Pills with Red Star */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px', letterSpacing: '-0.3px' }}>
              <span style={{ color: '#d93025', marginRight: '4px' }}>*</span> SELECT THE SPECIFIC TYPE OF INCIDENT THAT OCCURED
            </label>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {category.subCrimes.map((sub) => {
                const isSelected = selectedSubCrime?.id === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setSelectedSubCrime(sub)}
                    className={`ux4g-pill-chip ${isSelected ? 'selected' : ''}`}>
                    {sub.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Description Section with Red Star + Speak & Scan Buttons Above */}
          <div style={{ marginTop: '32px', marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px', letterSpacing: '-0.3px' }}>
              <span style={{ color: '#d93025', marginRight: '4px' }}>*</span> GIVE DESCRIPTION OF THE INCIDENT
            </label>

            {/* Fast Input Action Buttons with Icons */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '14px', flexWrap: 'wrap' }}>
              
              {/* Speak Complaint Button */}
              <button
                type="button"
                onClick={handleToggleVoice}
                style={{
                  background: isRecordingVoice ? '#fee2e2' : '#ffffff',
                  border: isRecordingVoice ? '1.5px solid #ef4444' : '1px solid #cbd5e1',
                  borderRadius: '16px',
                  padding: '8px 20px',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: isRecordingVoice ? '#b91c1c' : '#1e293b',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
                className={isRecordingVoice ? 'ux4g-voice-pulse' : ''}>
                🎙️ {isRecordingVoice ? `Recording... (${voiceTimer}s)` : 'Speak Complaint'}
              </button>

              {/* Scan Screenshot / Receipt Button */}
              <label style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '16px',
                padding: '8px 20px',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#1e293b',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                📸 {isAnalyzing ? 'Scanning Screenshot...' : 'Scan Screenshot/Receipt'}
                <input type="file" accept="image/*,.pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
              </label>

            </div>

            {/* Textarea Input Box */}
            <textarea
              className="ux4g-input"
              rows={5}
              placeholder="Describe what Happened (e.g date/time step by step)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                borderRadius: '16px',
                padding: '14px 16px',
                fontSize: '0.95rem',
                borderColor: '#cbd5e1',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Primary Action Buttons matching wireframe layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <button
              type="button"
              className="ux4g-btn-dark-navy"
              disabled={isAnalyzing}
              onClick={() => handleAnalyzeAndProceed(false)}>
              {isAnalyzing ? 'Analyzing...' : 'Analyze & Review Details →'}
            </button>

            <button
              type="button"
              className="ux4g-btn-outline-navy"
              disabled={isAnalyzing}
              onClick={() => handleAnalyzeAndProceed(true)}>
              Direct 1-Click Register (Fastest)
            </button>
          </div>

        </div>
      )}

      {/* ======================================================================= */}
      {/* STEP 1 FOR OTHER CATEGORIES (Standard Category Flow)                    */}
      {/* ======================================================================= */}
      {currentStep === 1 && !isWomenChildren && (
        <div className="ux4g-card" style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '2rem' }}>{category.icon}</span>
            <div>
              <h2 style={{ margin: 0, color: '#0A3161', fontSize: '1.4rem' }}>{category.title}</h2>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>Select the specific type of incident that occurred</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            {category.subCrimes.map((sub) => (
              <div
                key={sub.id}
                onClick={() => setSelectedSubCrime(sub)}
                style={{
                  padding: '14px',
                  borderRadius: '10px',
                  border: selectedSubCrime?.id === sub.id ? '2px solid #0A3161' : '1px solid #cbd5e1',
                  background: selectedSubCrime?.id === sub.id ? '#e8f0fe' : '#ffffff',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0f172a', marginBottom: '4px' }}>
                  {sub.name}
                </div>
                <span style={{ fontSize: '0.75rem', background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                  {sub.tag}
                </span>
              </div>
            ))}
          </div>

          <div className="ux4g-form-group">
            <label className="ux4g-label">Incident Description</label>
            <textarea
              className="ux4g-input"
              rows={4}
              placeholder="Describe what happened..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <button
            type="button"
            className="ux4g-btn ux4g-btn-primary ux4g-btn-block"
            onClick={() => handleAnalyzeAndProceed(false)}>
            Proceed to Incident Details →
          </button>
        </div>
      )}

      {/* ======================================================================= */}
      {/* STEP 2: CATEGORY-SPECIFIC INCIDENT DETAILS                              */}
      {/* ======================================================================= */}
      {currentStep === 2 && (
        <div className="ux4g-card">
          
          {/* Header Title */}
          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '1.35rem', color: '#0f172a', fontWeight: 700, letterSpacing: '-0.4px' }}>
              Incident Details ({category?.title})
            </h2>
            <div style={{ fontSize: '0.86rem', color: '#64748b' }}>
              Confirm or complete the details below before official case registration.
            </div>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); finalizeComplaint(); }}>
            
            {/* Common Mandatory Field: Incident Date & Time */}
            <div className="ux4g-form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  <span style={{ color: '#d93025', marginRight: '4px' }}>*</span> Incident Date & Time
                </label>
                <span className="ux4g-confidence-badge">✓ Pre-Filled</span>
              </div>
              <input
                type="datetime-local"
                className="ux4g-input"
                required
                value={incidentFields.incidentDate}
                onChange={(e) => setIncidentFields({ ...incidentFields, incidentDate: e.target.value })}
              />
            </div>

            {/* ----------------------------------------------------------------- */}
            {/* DYNAMIC CATEGORY-SPECIFIC FIELDS LOGIC                           */}
            {/* ----------------------------------------------------------------- */}

            {/* 1. WOMEN & CHILDREN FIELDS */}
            {category?.id === 'women-children' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="ux4g-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                      <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span style={{ color: '#d93025', marginRight: '4px' }}>*</span> Suspect Handle / Phone / Profile
                      </label>
                      {incidentFields.suspectDetails && (
                        <span className="ux4g-confidence-badge">✓ Auto-Extracted</span>
                      )}
                    </div>
                    <input
                      type="text"
                      className="ux4g-input"
                      required
                      placeholder="e.g. @cyber_harasser_99 or +91 98765xxxx"
                      value={incidentFields.suspectDetails}
                      onChange={(e) => setIncidentFields({ ...incidentFields, suspectDetails: e.target.value })}
                    />
                  </div>

                  <div className="ux4g-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                      <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span style={{ color: '#d93025', marginRight: '4px' }}>*</span> Social Media / Platform
                      </label>
                      {incidentFields.platform && (
                        <span className="ux4g-confidence-badge">✓ Auto-Detected</span>
                      )}
                    </div>
                    <select
                      className="ux4g-input"
                      required
                      value={incidentFields.platform || 'Instagram'}
                      onChange={(e) => setIncidentFields({ ...incidentFields, platform: e.target.value })}>
                      <option value="Instagram">Instagram</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Telegram">Telegram</option>
                      <option value="X (Twitter)">X (Twitter)</option>
                      <option value="Facebook">Facebook</option>
                      <option value="Snapchat">Snapchat</option>
                      <option value="Other Website">Other Website</option>
                    </select>
                  </div>
                </div>

                <div className="ux4g-form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                    <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Incident Content Type
                    </label>
                  </div>
                  <input
                    type="text"
                    className="ux4g-input"
                    placeholder="e.g. Harassing messages, non-consensual photo, threat call"
                    value={incidentFields.contentType}
                    onChange={(e) => setIncidentFields({ ...incidentFields, contentType: e.target.value })}
                  />
                </div>
              </>
            )}

            {/* 2. FINANCIAL FRAUD FIELDS */}
            {category?.id === 'financial' && (
              <>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="ux4g-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                      <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span style={{ color: '#d93025', marginRight: '4px' }}>*</span> Financial Loss Amount (₹)
                      </label>
                      {incidentFields.financialLoss && (
                        <span className="ux4g-confidence-badge">✓ Auto-Extracted</span>
                      )}
                    </div>
                    <input
                      type="number"
                      className="ux4g-input"
                      required
                      placeholder="e.g. 25000"
                      value={incidentFields.financialLoss}
                      onChange={(e) => setIncidentFields({ ...incidentFields, financialLoss: e.target.value })}
                    />
                  </div>

                  <div className="ux4g-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                      <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        <span style={{ color: '#d93025', marginRight: '4px' }}>*</span> Bank Txn Ref / UTR Number
                      </label>
                      {incidentFields.transactionRef && (
                        <span className="ux4g-confidence-badge">✓ Auto-Extracted</span>
                      )}
                    </div>
                    <input
                      type="text"
                      className="ux4g-input"
                      required
                      placeholder="e.g. 423910294810"
                      value={incidentFields.transactionRef}
                      onChange={(e) => setIncidentFields({ ...incidentFields, transactionRef: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="ux4g-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                      <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Victim Bank Name
                      </label>
                      <span className="ux4g-confidence-badge">✓ Pre-Filled</span>
                    </div>
                    <input
                      type="text"
                      className="ux4g-input"
                      value={incidentFields.victimBank}
                      onChange={(e) => setIncidentFields({ ...incidentFields, victimBank: e.target.value })}
                    />
                  </div>

                  <div className="ux4g-form-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                      <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Suspect UPI ID / Mobile
                      </label>
                    </div>
                    <input
                      type="text"
                      className="ux4g-input"
                      placeholder="e.g. fraudster@upi or suspect mobile"
                      value={incidentFields.suspectDetails}
                      onChange={(e) => setIncidentFields({ ...incidentFields, suspectDetails: e.target.value })}
                    />
                  </div>
                </div>
              </>
            )}

            {/* 3. IDENTITY FRAUD / ACCOUNT TAKEOVER FIELDS */}
            {category?.id === 'identity' && (
              <>
                <div className="ux4g-form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                    <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <span style={{ color: '#d93025', marginRight: '4px' }}>*</span> Compromised Account / SIM / Identity
                    </label>
                  </div>
                  <input
                    type="text"
                    className="ux4g-input"
                    required
                    placeholder="e.g. Instagram Handle, WhatsApp Number, SIM Card, Aadhaar ID"
                    value={incidentFields.platform}
                    onChange={(e) => setIncidentFields({ ...incidentFields, platform: e.target.value })}
                  />
                </div>

                <div className="ux4g-form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                    <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Suspect / Impersonator Contact
                    </label>
                  </div>
                  <input
                    type="text"
                    className="ux4g-input"
                    placeholder="e.g. Impersonator profile link or phone number"
                    value={incidentFields.suspectDetails}
                    onChange={(e) => setIncidentFields({ ...incidentFields, suspectDetails: e.target.value })}
                  />
                </div>
              </>
            )}

            {/* 4. OTHER CATEGORIES */}
            {category?.id !== 'women-children' && category?.id !== 'financial' && category?.id !== 'identity' && (
              <>
                <div className="ux4g-form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                    <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      <span style={{ color: '#d93025', marginRight: '4px' }}>*</span> Platform / Website / Target System
                    </label>
                  </div>
                  <input
                    type="text"
                    className="ux4g-input"
                    required
                    placeholder="e.g. Website URL, App Name, IP Address, or System Name"
                    value={incidentFields.platform || incidentFields.targetSystem}
                    onChange={(e) => setIncidentFields({ ...incidentFields, platform: e.target.value, targetSystem: e.target.value })}
                  />
                </div>

                <div className="ux4g-form-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                    <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      Suspect Details
                    </label>
                  </div>
                  <input
                    type="text"
                    className="ux4g-input"
                    placeholder="e.g. Suspect phone number, handle, or contact"
                    value={incidentFields.suspectDetails}
                    onChange={(e) => setIncidentFields({ ...incidentFields, suspectDetails: e.target.value })}
                  />
                </div>
              </>
            )}

            {/* Full Complaint Description Preview */}
            <div className="ux4g-form-group" style={{ marginBottom: '24px' }}>
              <label className="ux4g-label">Full Complaint Description Provided</label>
              <textarea
                className="ux4g-input"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <button type="button" className="ux4g-btn ux4g-btn-secondary" onClick={() => setCurrentStep(1)}>
                ← Back to Register Incident
              </button>
              <button
                type="submit"
                className="ux4g-btn ux4g-btn-primary"
                style={{ flex: 1 }}
                disabled={isSubmitting}>
                {isSubmitting ? 'Registering Complaint...' : 'Register Official Cyber Crime Complaint →'}
              </button>
            </div>

          </form>

        </div>
      )}

      {/* ======================================================================= */}
      {/* STEP 3: ACKNOWLEDGMENT RECEIPT                                          */}
      {/* ======================================================================= */}
      {currentStep === 3 && (
        <div className="ux4g-card" style={{ textAlign: 'left', padding: '32px 24px' }}>
          <div style={{ width: '56px', height: '56px', background: '#e6f4ea', borderRadius: '50%', color: '#188038', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', marginBottom: '16px' }}>
            ✓
          </div>

          <h2 style={{ color: '#0A3161', margin: '0 0 8px 0' }}>Complaint Successfully Registered!</h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '24px' }}>
            Your incident report has been securely registered and assigned to the Cyber Crime Police Cell.
          </p>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', marginBottom: '28px' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Acknowledgment Reference Number</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0A3161', margin: '6px 0', letterSpacing: '1px' }}>
              {ackNumber}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#166534', background: '#dcfce7', padding: '4px 12px', borderRadius: '12px', display: 'inline-block' }}>
              Status: Assigned to State Cyber Cell ({category?.title} {selectedSubCrime ? `- ${selectedSubCrime.name}` : ''})
            </div>
          </div>

          {/* Registered Details Summary */}
          <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '14px 16px', marginBottom: '24px', fontSize: '0.9rem' }}>
            <div style={{ fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Registered Incident Details:</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', color: '#475569' }}>
              <div><strong>Incident Date:</strong> {new Date(incidentFields.incidentDate).toLocaleString()}</div>
              <div><strong>Location (Auto-Enriched):</strong> {incidentFields.locationContext}</div>
              {incidentFields.financialLoss && <div><strong>Financial Loss:</strong> ₹{incidentFields.financialLoss}</div>}
              {incidentFields.transactionRef && <div><strong>Txn Ref / UTR:</strong> {incidentFields.transactionRef}</div>}
              {incidentFields.platform && <div><strong>Platform:</strong> {incidentFields.platform}</div>}
              {incidentFields.suspectDetails && <div><strong>Suspect Details:</strong> {incidentFields.suspectDetails}</div>}
            </div>
          </div>

          {/* Optional Post-Submission Follow-Up Link */}
          <div style={{ background: '#ffffff', border: '1px solid #cbd5e1', padding: '14px', borderRadius: '10px', marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#0f172a' }}>📱 Add evidence documents later?</div>
              <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Send an upload link to SMS/Email for optional evidence attachments.</div>
            </div>
            <button
              type="button"
              className="ux4g-btn ux4g-btn-secondary"
              style={{ fontSize: '0.82rem', whiteSpace: 'nowrap' }}
              onClick={() => setFollowUpSent(true)}>
              {followUpSent ? '✓ Upload Link Sent!' : '📲 Send Upload Link'}
            </button>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" className="ux4g-btn ux4g-btn-secondary" onClick={() => window.print()}>
              🖨️ Print Receipt
            </button>
            <button type="button" className="ux4g-btn ux4g-btn-primary" onClick={onBackToCategories}>
              Return to Category Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
