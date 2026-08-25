import React, { useState } from 'react';

export default function IncidentReportingFlow({ category, currentLang, onBackToCategories }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [detailsPage, setDetailsPage] = useState(1);

  // Sub-Crime Selection State (No pill pre-selected by default)
  const [selectedSubCrime, setSelectedSubCrime] = useState(null);

  // Intake State
  const [description, setDescription] = useState('');
  const [isRecordingVoice, setIsRecordingVoice] = useState(false);
  const [voiceTimer, setVoiceTimer] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Evidence Options Menu Popover State
  const [showEvidenceMenu, setShowEvidenceMenu] = useState(false);

  // Evidence files list attached to the case
  const [attachedFiles, setAttachedFiles] = useState([]);

  // Dynamic Category-Specific Incident Details Fields
  const [incidentFields, setIncidentFields] = useState({
    incidentDate: new Date().toISOString().slice(0, 16),
    suspectDetails: '',
    platform: '',
    contentType: '',
    incidentLocation: 'New Delhi, India (Captured via Network IP)',
    suspectIpEmail: '',
    witnessContact: '',

    financialLoss: category?.id === 'financial' ? '32500' : '',
    transactionRef: category?.id === 'financial' ? '429184029102' : '',
    victimBank: 'State Bank of India',
    targetSystem: '',
    phishingUrl: '',
    compromisedIdentity: '',
  });

  // Acknowledgment State
  const [ackNumber, setAckNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [followUpSent, setFollowUpSent] = useState(false);

  // Category Total Fields Calculation for Platform-Wide >5 Field Pagination Engine
  const totalCategoryFields = category?.id === 'women-children' ? 7 : category?.id === 'financial' ? 6 : 5;
  const hasMultipleDetailsPages = totalCategoryFields > 5;

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
            const voiceText = `Incident report for ${category?.title}. Details captured via voice intake. Suspect handle @cyber_suspect_99.`;
            setDescription((p) => (p ? `${p}\n${voiceText}` : voiceText));
            autoExtractFromText(voiceText);
            setAttachedFiles((prevFiles) => [
              ...prevFiles,
              'voice_statement_' + Math.floor(1000 + Math.random() * 9000) + '.aac'
            ]);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
  };

  // Feature: Add Evidence File
  const handleFileUpload = (e, optionType = 'Evidence') => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const firstFile = files[0];
      setIsAnalyzing(true);
      setShowEvidenceMenu(false);
      setTimeout(() => {
        setIsAnalyzing(false);
        const scannedText = `[Scanned ${optionType} from ${firstFile.name}]: Details extracted for ${category?.title}. Loss/Ref info: UTR 429184029102.`;
        setDescription((prev) => (prev ? `${prev}\n${scannedText}` : scannedText));
        autoExtractFromText(scannedText);
        
        const fileNames = files.map((f) => f.name);
        setAttachedFiles((prevFiles) => [...prevFiles, ...fileNames]);
      }, 1000);
    }
  };

  // Feature: Delete Evidence Item from Summary Card
  const handleDeleteEvidence = (indexToDelete) => {
    setAttachedFiles((prev) => prev.filter((_, idx) => idx !== indexToDelete));
  };

  // Feature: Quick Add Evidence from Summary Card
  const handleQuickAddEvidenceFromCard = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      const fileNames = files.map((f) => f.name);
      setAttachedFiles((prevFiles) => [...prevFiles, ...fileNames]);
    }
  };

  // Smart Auto-Fill & Extraction Engine
  const autoExtractFromText = (text) => {
    const textLower = text.toLowerCase();
    
    // Extract Financial Loss
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

  // Evidence Strength Score Calculation
  const calculateEvidenceScore = () => {
    let score = 0;
    if (selectedSubCrime) score += 1;
    if (description.trim().length > 15 || incidentFields.suspectDetails || incidentFields.financialLoss) score += 1;
    if (attachedFiles.length > 0 || isRecordingVoice) score += 1;
    return score;
  };

  const evidenceScore = calculateEvidenceScore();
  const evidenceLevel = evidenceScore <= 1 ? 'WEAK' : evidenceScore === 2 ? 'OKAY' : 'STRONG';
  const evidenceBadge = evidenceScore <= 1
    ? { bg: '#fef2f2', color: '#ef4444', border: '#fca5a5' }
    : evidenceScore === 2
    ? { bg: '#fffbeb', color: '#d97706', border: '#fcd34d' }
    : { bg: '#f0fdf4', color: '#16a34a', border: '#86efac' };

  // Proceed Handler
  const handleAnalyzeAndProceed = (directSubmit = false) => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      autoExtractFromText(description);

      if (directSubmit) {
        finalizeComplaint();
      } else {
        setCurrentStep(2);
        setDetailsPage(1);
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

  // Category-specific Action Button Label
  const getActionBtnLabel = () => {
    if (category?.id === 'women-children') return '📸 Add Evidence';
    if (category?.id === 'financial') return '📸 Scan Receipt / Screenshot';
    if (category?.id === 'identity') return '📸 Upload Profile / Chat Screenshot';
    if (category?.id === 'technical') return '📸 Attach Log / System Report';
    return '📸 Scan Screenshot / Receipt';
  };

  // Case Summary Component (Persists dynamically across Steps 1 and 2 for ALL categories)
  const renderCaseSummaryCard = () => (
    <div style={{
      background: '#ffffff',
      border: '1px solid #cbd5e1',
      borderRadius: '16px',
      boxShadow: '0 4px 16px rgba(15, 23, 42, 0.04)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      position: 'sticky',
      top: '20px'
    }}>
      {/* Case Summary Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', background: '#fafafa' }}>
        <h3 style={{ margin: 0, fontSize: '0.88rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.3px', textTransform: 'uppercase' }}>
          CASE SUMMARY
        </h3>
      </div>

      {/* Case ID & Evidence Strength */}
      <div style={{ padding: '18px 20px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.5px', marginBottom: '14px' }}>
          {ackNumber ? ackNumber : 'NCRP-2026 - XXXXX'}
        </div>

        {/* Evidence Strength Meter */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.5px' }}>
              EVIDENCE STRENGTH
            </span>
            <span style={{
              fontSize: '0.68rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '4px',
              border: `1px solid ${evidenceBadge.border}`,
              color: evidenceBadge.color,
              background: evidenceBadge.bg,
              letterSpacing: '0.5px'
            }}>
              {evidenceLevel}
            </span>
          </div>

          {/* Multi-Segment Color Bar */}
          <div style={{ display: 'flex', gap: '4px', height: '8px', borderRadius: '4px', overflow: 'hidden', background: '#e2e8f0' }}>
            <div style={{ flex: 1, background: '#ef4444', opacity: evidenceScore >= 1 ? 1 : 0.25, transition: 'all 0.3s' }} />
            <div style={{ flex: 1, background: '#f59e0b', opacity: evidenceScore >= 2 ? 1 : 0.25, transition: 'all 0.3s' }} />
            <div style={{ flex: 1, background: '#22c55e', opacity: evidenceScore >= 3 ? 1 : 0.25, transition: 'all 0.3s' }} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.68rem', color: '#94a3b8', fontWeight: 600 }}>
            <span>WEAK</span>
            <span>OKAY</span>
            <span>STRONG</span>
          </div>
        </div>
      </div>

      {/* Dynamic Category & Sub-Category Summary Rows */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.84rem' }}>
          <span style={{ fontWeight: 700, color: '#64748b', fontSize: '0.76rem', letterSpacing: '0.4px' }}>CATEGORY</span>
          <span style={{ fontWeight: 600, color: '#0f172a' }}>{category?.title}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.84rem' }}>
          <span style={{ fontWeight: 700, color: '#64748b', fontSize: '0.76rem', letterSpacing: '0.4px' }}>SUB-CATEGORY</span>
          <span style={{ fontWeight: 600, color: selectedSubCrime ? '#0f172a' : '#94a3b8' }}>
            {selectedSubCrime ? selectedSubCrime.name : 'Not selected yet'}
          </span>
        </div>

        {incidentFields.financialLoss && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.84rem' }}>
            <span style={{ fontWeight: 700, color: '#64748b', fontSize: '0.76rem', letterSpacing: '0.4px' }}>LOSS AMOUNT</span>
            <span style={{ fontWeight: 700, color: '#b91c1c' }}>₹{incidentFields.financialLoss}</span>
          </div>
        )}

        {incidentFields.transactionRef && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.84rem' }}>
            <span style={{ fontWeight: 700, color: '#64748b', fontSize: '0.76rem', letterSpacing: '0.4px' }}>UTRN / REF</span>
            <span style={{ fontWeight: 600, color: '#0f172a' }}>{incidentFields.transactionRef}</span>
          </div>
        )}

        {incidentFields.platform && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.84rem' }}>
            <span style={{ fontWeight: 700, color: '#64748b', fontSize: '0.76rem', letterSpacing: '0.4px' }}>PLATFORM</span>
            <span style={{ fontWeight: 600, color: '#0f172a' }}>{incidentFields.platform}</span>
          </div>
        )}

        {incidentFields.suspectDetails && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.84rem' }}>
            <span style={{ fontWeight: 700, color: '#64748b', fontSize: '0.76rem', letterSpacing: '0.4px' }}>SUSPECT</span>
            <span style={{ fontWeight: 600, color: '#0f172a' }}>{incidentFields.suspectDetails}</span>
          </div>
        )}
      </div>

      {/* Evidence Section with Delete and Direct Add Controls */}
      <div style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#64748b', letterSpacing: '0.4px' }}>
            EVIDENCE
          </span>
          <label style={{
            fontSize: '0.74rem',
            color: '#0b2e59',
            fontWeight: 700,
            cursor: 'pointer',
            background: '#e5f0ff',
            padding: '3px 8px',
            borderRadius: '6px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            + Add Evidence
            <input type="file" multiple accept="image/*,.pdf,.aac,.mp3,.mp4" onChange={handleQuickAddEvidenceFromCard} style={{ display: 'none' }} />
          </label>
        </div>

        {attachedFiles.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {attachedFiles.map((filename, idx) => (
              <div key={idx} style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                borderRadius: '8px',
                padding: '7px 10px',
                fontSize: '0.8rem',
                fontFamily: 'monospace',
                color: '#1e293b',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  📄 {filename}
                </span>
                <button
                  type="button"
                  title="Delete evidence"
                  onClick={() => handleDeleteEvidence(idx)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#ef4444',
                    fontWeight: 800,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    padding: '0 4px',
                    lineHeight: 1
                  }}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '0.78rem', color: '#94a3b8', fontStyle: 'italic', padding: '4px 0' }}>
            No evidence added yet
          </div>
        )}
      </div>

    </div>
  );

  // Steps header list
  const stepsList = hasMultipleDetailsPages
    ? [
        { num: 1, title: 'Register Incident', detail: 'Voice, Text or Photo' },
        { num: 2, title: 'Incident Details', detail: 'Primary Info' },
        { num: 3, title: 'Additional Details', detail: 'Secondary Info' },
        { num: 4, title: 'Registration', detail: 'Acknowledgment number' }
      ]
    : [
        { num: 1, title: 'Register Incident', detail: 'Voice, Text or Photo' },
        { num: 2, title: 'Incident Details', detail: 'Category-Specific Fields' },
        { num: 3, title: 'Registration', detail: 'Acknowledgment number' }
      ];

  const activeStepNum = currentStep === 1 ? 1 : currentStep === 3 ? (hasMultipleDetailsPages ? 4 : 3) : (detailsPage === 1 ? 2 : 3);
  const progressPercent = (activeStepNum / stepsList.length) * 100;
  const showSummarySideCard = currentStep !== 3;

  return (
    <div style={{
      maxWidth: showSummarySideCard ? '1180px' : '820px',
      margin: '24px auto',
      padding: '0 20px',
      textAlign: 'left',
      transition: 'max-width 0.3s ease'
    }}>
      
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
          {stepsList.map((s) => (
            <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: activeStepNum >= s.num ? 1 : 0.4 }}>
              <div style={{
                width: '26px',
                height: '26px',
                borderRadius: '50%',
                background: activeStepNum >= s.num ? '#0b2e59' : '#cbd5e1',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 'bold'
              }}>
                {activeStepNum > s.num ? '✓' : s.num}
              </div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: activeStepNum === s.num ? '700' : '600', color: '#0f172a' }}>{s.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{s.detail}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: '#e2e8f0', height: '5px', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{
            background: '#0b2e59',
            height: '100%',
            width: `${progressPercent}%`,
            transition: 'width 0.3s ease-in-out'
          }} />
        </div>
      </div>

      {/* Main Grid Wrapper (Persistent Side Card for ALL categories in Steps 1 & 2) */}
      <div style={showSummarySideCard ? { display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '24px', alignItems: 'start' } : {}}>
        
        {/* Left Form Area */}
        <div>

          {/* STEP 1: DYNAMIC EXPRESS INTAKE LAYOUT FOR ALL CATEGORIES */}
          {currentStep === 1 && (
            <div className="ux4g-wireframe-card">
              
              {/* Header with Icon Box + Category Title */}
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
                  {category?.icon || '🛡️'}
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

              {/* Description Section with Red Star + Fast Intake Buttons */}
              <div style={{ marginTop: '32px', marginBottom: '16px', position: 'relative' }}>
                <label style={{ display: 'block', fontSize: '0.92rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px', letterSpacing: '-0.3px' }}>
                  <span style={{ color: '#d93025', marginRight: '4px' }}>*</span> GIVE DESCRIPTION OF THE INCIDENT
                </label>

                {/* Fast Input Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '14px', flexWrap: 'wrap', position: 'relative' }}>
                  
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

                  {/* Dynamic Evidence Action Button */}
                  <button
                    type="button"
                    onClick={() => setShowEvidenceMenu(!showEvidenceMenu)}
                    style={{
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
                    {isAnalyzing ? 'Scanning Evidence...' : `${getActionBtnLabel()} ▾`}
                  </button>

                  {/* Multiple Evidence Options Dropdown Menu */}
                  {showEvidenceMenu && (
                    <div style={{
                      position: 'absolute',
                      top: '46px',
                      left: '180px',
                      zIndex: 10,
                      background: '#ffffff',
                      border: '1px solid #cbd5e1',
                      borderRadius: '12px',
                      boxShadow: '0 8px 24px rgba(15, 23, 42, 0.12)',
                      padding: '8px',
                      minWidth: '240px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px'
                    }}>
                      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', padding: '4px 10px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Select Evidence Type to Upload:
                      </div>

                      {[
                        { label: '🖼️ Screenshot / Image File', type: 'Screenshot' },
                        { label: '💬 Chat Log / Message Export', type: 'Chat Log' },
                        { label: '🎙️ Audio / Voice Recording', type: 'Voice Audio' },
                        { label: '📄 PDF Report / Document', type: 'PDF Document' },
                        { label: '🧾 Payment Receipt / Invoice', type: 'Receipt' },
                      ].map((opt, idx) => (
                        <label key={idx} style={{
                          padding: '8px 12px',
                          fontSize: '0.86rem',
                          fontWeight: 500,
                          color: '#0f172a',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'background 0.2s'
                        }}
                        className="ux4g-option-hover">
                          {opt.label}
                          <input
                            type="file"
                            multiple
                            accept="image/*,.pdf,.aac,.mp3,.mp4,.txt"
                            onChange={(e) => handleFileUpload(e, opt.type)}
                            style={{ display: 'none' }}
                          />
                        </label>
                      ))}
                    </div>
                  )}

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

          {/* STEP 2: DYNAMIC CATEGORY-SPECIFIC INCIDENT DETAILS */}
          {currentStep === 2 && (
            <div className="ux4g-card">
              
              {/* Header Title */}
              <div style={{ marginBottom: '20px' }}>
                <h2 style={{ margin: '0 0 4px 0', fontSize: '1.35rem', color: '#0f172a', fontWeight: 700, letterSpacing: '-0.4px' }}>
                  {detailsPage === 1 ? 'Incident Details' : 'Additional Incident Details'}
                </h2>
                <div style={{ fontSize: '0.86rem', color: '#64748b' }}>
                  Confirm or complete the details below before official case registration.
                </div>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                if (hasMultipleDetailsPages && detailsPage === 1) {
                  setDetailsPage(2);
                } else {
                  finalizeComplaint();
                }
              }}>
                
                {/* PAGE 1: PRIMARY FIELDS */}
                {detailsPage === 1 && (
                  <>
                    {/* Common Field 1: Incident Date & Time */}
                    <div className="ux4g-form-group" style={{ marginBottom: '16px' }}>
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

                    {/* DYNAMIC CATEGORY FIELDS */}

                    {/* 1. FINANCIAL FRAUD FIELDS */}
                    {category?.id === 'financial' && (
                      <>
                        <div className="ux4g-form-group" style={{ marginBottom: '16px' }}>
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

                        <div className="ux4g-form-group" style={{ marginBottom: '16px' }}>
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

                        <div className="ux4g-form-group" style={{ marginBottom: '16px' }}>
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

                        <div className="ux4g-form-group" style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                            <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              Suspect UPI ID / Mobile / Bank Account
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
                      </>
                    )}

                    {/* 2. WOMEN & CHILDREN FIELDS */}
                    {category?.id === 'women-children' && (
                      <>
                        <div className="ux4g-form-group" style={{ marginBottom: '16px' }}>
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

                        <div className="ux4g-form-group" style={{ marginBottom: '16px' }}>
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

                        <div className="ux4g-form-group" style={{ marginBottom: '16px' }}>
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

                    {/* 3. IDENTITY FRAUD / OTHER CATEGORIES DEFAULT FIELDS */}
                    {category?.id !== 'financial' && category?.id !== 'women-children' && (
                      <>
                        <div className="ux4g-form-group" style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                            <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              <span style={{ color: '#d93025', marginRight: '4px' }}>*</span> Target Platform / Website / Account
                            </label>
                          </div>
                          <input
                            type="text"
                            className="ux4g-input"
                            required
                            placeholder="e.g. Instagram, WhatsApp, Bank Portal, SIM Card, URL"
                            value={incidentFields.platform || incidentFields.targetSystem}
                            onChange={(e) => setIncidentFields({ ...incidentFields, platform: e.target.value, targetSystem: e.target.value })}
                          />
                        </div>

                        <div className="ux4g-form-group" style={{ marginBottom: '16px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                            <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              Suspect Details / Contact
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

                    {/* Common Field 5: Incident Location Context */}
                    <div className="ux4g-form-group" style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                        <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <span style={{ color: '#d93025', marginRight: '4px' }}>*</span> Incident Location / Network City
                        </label>
                        <span className="ux4g-confidence-badge">✓ Pre-Filled</span>
                      </div>
                      <input
                        type="text"
                        className="ux4g-input"
                        required
                        value={incidentFields.incidentLocation}
                        onChange={(e) => setIncidentFields({ ...incidentFields, incidentLocation: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {/* PAGE 2: SECONDARY FIELDS (IF >5 FIELDS TOTAL) */}
                {detailsPage === 2 && (
                  <>
                    <div className="ux4g-form-group" style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                        <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Secondary Suspect IP / Contact Email
                        </label>
                      </div>
                      <input
                        type="text"
                        className="ux4g-input"
                        placeholder="e.g. Suspect IP 192.168.x.x or suspect email address"
                        value={incidentFields.suspectIpEmail}
                        onChange={(e) => setIncidentFields({ ...incidentFields, suspectIpEmail: e.target.value })}
                      />
                    </div>

                    <div className="ux4g-form-group" style={{ marginBottom: '24px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px', gap: '8px' }}>
                        <label className="ux4g-label" style={{ margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          Witness Contact / Secondary Reference
                        </label>
                      </div>
                      <input
                        type="text"
                        className="ux4g-input"
                        placeholder="e.g. Secondary contact or witness mobile number"
                        value={incidentFields.witnessContact}
                        onChange={(e) => setIncidentFields({ ...incidentFields, witnessContact: e.target.value })}
                      />
                    </div>
                  </>
                )}

                {/* Clean Action Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    className="ux4g-btn ux4g-btn-secondary"
                    onClick={() => {
                      if (detailsPage === 2) {
                        setDetailsPage(1);
                      } else {
                        setCurrentStep(1);
                      }
                    }}>
                    ← Back
                  </button>

                  <button
                    type="submit"
                    className="ux4g-btn ux4g-btn-primary"
                    style={{ flex: 1 }}
                    disabled={isSubmitting}>
                    {hasMultipleDetailsPages && detailsPage === 1
                      ? 'Continue to Additional Details →'
                      : isSubmitting
                      ? 'Registering Complaint...'
                      : 'Register Official Cyber Crime Complaint →'}
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* STEP 3: REGISTERED CONFIRMATION SCREEN (DYNAMIC FOR ALL CATEGORIES) */}
          {currentStep === 3 && (
            <div>
              
              {/* Main Official Registration Card */}
              <div className="ux4g-card" style={{ textAlign: 'left', padding: '32px 36px' }}>
                
                {/* Header Success Row */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{
                    width: '44px',
                    height: '44px',
                    background: '#e6f4ea',
                    color: '#16a34a',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    flexShrink: 0
                  }}>
                    ✓
                  </div>
                  <div>
                    <h2 style={{ margin: 0, color: '#0b2e59', fontSize: '1.45rem', fontWeight: 800 }}>
                      Complaint Successfully Registered!
                    </h2>
                    <div style={{ color: '#64748b', fontSize: '0.92rem', marginTop: '2px' }}>
                      Your case is saved in the National Cyber Crime Reporting System.
                    </div>
                  </div>
                </div>

                {/* Official Acknowledgment Number Card */}
                <div style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '20px 24px',
                  marginBottom: '24px'
                }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.6px', textTransform: 'uppercase' }}>
                    OFFICIAL ACKNOWLEDGMENT NUMBER
                  </div>

                  <div style={{ fontSize: '2.1rem', fontWeight: 800, color: '#0b2e59', letterSpacing: '1px', margin: '6px 0 14px 0' }}>
                    {ackNumber || 'NCRP-2026-625957'}
                  </div>

                  <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                    <span style={{ background: '#dcfce7', color: '#166534', fontWeight: 600, fontSize: '0.84rem', padding: '5px 14px', borderRadius: '14px' }}>
                      Status: Assigned to State Cyber Cell
                    </span>
                    <span style={{ background: '#e2e8f0', color: '#334155', fontWeight: 600, fontSize: '0.84rem', padding: '5px 14px', borderRadius: '14px' }}>
                      Category: {category?.title} {selectedSubCrime ? `(${selectedSubCrime.name})` : ''}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    className="ux4g-btn-outline-navy"
                    style={{ padding: '10px 20px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => window.print()}>
                    🖨️ Print Official Receipt
                  </button>

                  <button
                    type="button"
                    className="ux4g-btn-dark-navy"
                    style={{ padding: '10px 24px', borderRadius: '8px' }}
                    onClick={onBackToCategories}>
                    Return to Dashboard
                  </button>
                </div>

              </div>

              {/* Dashed Box Below: Add Evidence Documents (Optional Follow-Up) */}
              <div style={{
                border: '1.5px dashed #94a3b8',
                borderRadius: '16px',
                padding: '24px 28px',
                background: '#ffffff',
                marginTop: '24px',
                textAlign: 'left'
              }}>
                {/* Header Row */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '10px' }}>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📎 Add Evidence Documents (Optional Follow-Up)
                  </div>

                  <span style={{ background: '#e0f2fe', color: '#0369a1', fontWeight: 600, fontSize: '0.8rem', padding: '4px 12px', borderRadius: '12px' }}>
                    Does not block registered case
                  </span>
                </div>

                <div style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: 1.4, marginBottom: '18px' }}>
                  Upload screenshots, payment receipts, bank statement PDFs, or chat history now or send a link to upload later when you have time.
                </div>

                {/* Drag & Drop Dropzone Box */}
                <div style={{
                  border: '1px dashed #cbd5e1',
                  borderRadius: '12px',
                  padding: '24px',
                  textAlign: 'center',
                  background: '#fafafa'
                }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📁</div>
                  <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem', marginBottom: '4px' }}>
                    Drag & drop evidence files here
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b', marginBottom: '14px' }}>
                    Supports JPG, PNG, PDF (Max 10MB each)
                  </div>

                  <label style={{
                    background: '#ffffff',
                    border: '1.5px solid #0b2e59',
                    color: '#0b2e59',
                    fontWeight: 600,
                    fontSize: '0.88rem',
                    padding: '8px 20px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'inline-block'
                  }}>
                    Browse Files
                    <input type="file" multiple accept="image/*,.pdf,.aac,.mp3,.mp4" onChange={handleQuickAddEvidenceFromCard} style={{ display: 'none' }} />
                  </label>
                </div>

                {/* Mobile/Desktop Link Box */}
                <div style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '14px 18px',
                  display: 'flex',
                  justify: 'space-between',
                  alignItems: 'center',
                  marginTop: '16px',
                  background: '#ffffff',
                  flexWrap: 'wrap',
                  gap: '12px'
                }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0f172a' }}>
                      📱 Uploading from Mobile or Desktop later?
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '2px' }}>
                      Send an upload link to your SMS/Email so you can upload documents whenever ready.
                    </div>
                  </div>

                  <button
                    type="button"
                    className="ux4g-btn-outline-navy"
                    style={{ fontSize: '0.84rem', padding: '8px 16px', borderRadius: '8px', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
                    onClick={() => setFollowUpSent(true)}>
                    {followUpSent ? '✓ Upload Link Sent!' : '📲 Send Upload Link'}
                  </button>
                </div>

              </div>

            </div>
          )}

        </div>

        {/* Right Side Bar (Persistent Case Summary Card dynamically active for ALL categories in Steps 1 & 2) */}
        {showSummarySideCard && renderCaseSummaryCard()}

      </div>

    </div>
  );
}
