import React, { useState } from 'react';

export default function IncidentReportingFlow({ category, currentLang, onBackToCategories }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSubCrime, setSelectedSubCrime] = useState(category.subCrimes[0] || null);

  // Form State
  const [incidentDate, setIncidentDate] = useState('');
  const [financialLoss, setFinancialLoss] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [suspectDetails, setSuspectDetails] = useState('');
  const [description, setDescription] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  
  // Acknowledgment State
  const [ackNumber, setAckNumber] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle File Upload Simulation
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        name: file.name,
        size: (file.size / 1024).toFixed(1) + ' KB'
      }));
      setUploadedFiles(prev => [...prev, ...newFiles]);
    }
  };

  // Submit Handler
  const handleSubmitComplaint = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const generatedAck = 'NCRP-2026-' + Math.floor(100000 + Math.random() * 900000);
      setAckNumber(generatedAck);
      setCurrentStep(4);
    }, 1500);
  };

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', padding: '0 20px', textAlign: 'left' }}>
      
      {/* Back to Categories Button */}
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
          marginBottom: '20px',
          fontSize: '0.95rem'
        }}>
        ← {currentLang === 'hi' ? 'श्रेणियों पर वापस जाएं' : 'Back to All Categories'}
      </button>

      {/* Progress Steps Header - Left Aligned */}
      <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px 24px', marginBottom: '28px', boxShadow: '0 2px 6px rgba(0,0,0,0.03)', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
          {[
            { num: 1, label: 'Sub-Crime' },
            { num: 2, label: 'Incident Info' },
            { num: 3, label: 'Evidence' },
            { num: 4, label: 'Acknowledgment' },
          ].map((step) => (
            <div key={step.num} style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: currentStep >= step.num ? 1 : 0.4 }}>
              <div style={{
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: currentStep >= step.num ? '#0A3161' : '#cbd5e1',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.85rem',
                fontWeight: 'bold'
              }}>
                {step.num}
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: currentStep === step.num ? '700' : '500', color: '#0f172a' }}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
        
        {/* Progress Bar Line */}
        <div style={{ background: '#e2e8f0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
          <div style={{
            background: '#0A3161',
            height: '100%',
            width: `${((currentStep - 1) / 3) * 100}%`,
            transition: 'width 0.3s ease-in-out'
          }} />
        </div>
      </div>

      {/* STEP 1: Select Sub-Crime */}
      {currentStep === 1 && (
        <div className="ux4g-card" style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <span style={{ fontSize: '2rem' }}>{category.icon}</span>
            <div style={{ textAlign: 'left' }}>
              <h2 style={{ margin: 0, color: '#0A3161', fontSize: '1.4rem', textAlign: 'left' }}>{category.title}</h2>
              <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem', textAlign: 'left' }}>Select the specific type of incident that occurred</p>
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
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', color: '#0f172a', marginBottom: '4px', textAlign: 'left' }}>
                  {sub.name}
                </div>
                <span style={{ fontSize: '0.75rem', background: '#dbeafe', color: '#1e40af', padding: '2px 8px', borderRadius: '12px', fontWeight: 600 }}>
                  {sub.tag}
                </span>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="ux4g-btn ux4g-btn-primary ux4g-btn-block"
            onClick={() => setCurrentStep(2)}>
            Proceed to Incident Details →
          </button>
        </div>
      )}

      {/* STEP 2: Incident Details Form - Completely Left Aligned */}
      {currentStep === 2 && (
        <div className="ux4g-card" style={{ textAlign: 'left' }}>
          <h2 style={{ margin: '0 0 6px 0', color: '#0A3161', fontSize: '1.4rem', textAlign: 'left', fontWeight: 700 }}>
            Incident Information ({selectedSubCrime?.name})
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '24px', textAlign: 'left', lineHeight: 1.5 }}>
            Provide relevant dates, transaction numbers, and suspect details to help law enforcement investigate.
          </p>

          <form onSubmit={(e) => { e.preventDefault(); setCurrentStep(3); }} style={{ textAlign: 'left' }}>
            <div className="ux4g-form-group" style={{ textAlign: 'left' }}>
              <label className="ux4g-label" style={{ textAlign: 'left' }}>
                Date & Time of Incident <span className="required">*</span>
              </label>
              <input
                type="datetime-local"
                className="ux4g-input"
                required
                value={incidentDate}
                onChange={(e) => setIncidentDate(e.target.value)}
              />
            </div>

            {category.id === 'financial' && (
              <>
                <div className="ux4g-form-group" style={{ textAlign: 'left' }}>
                  <label className="ux4g-label" style={{ textAlign: 'left' }}>
                    Financial Loss Amount (INR ₹) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    className="ux4g-input"
                    placeholder="e.g. 50000"
                    required
                    value={financialLoss}
                    onChange={(e) => setFinancialLoss(e.target.value)}
                  />
                </div>

                <div className="ux4g-form-group" style={{ textAlign: 'left' }}>
                  <label className="ux4g-label" style={{ textAlign: 'left' }}>
                    Bank Transaction Reference / UTR Number
                  </label>
                  <input
                    type="text"
                    className="ux4g-input"
                    placeholder="e.g. 423910294810 or UTR string"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                  />
                </div>
              </>
            )}

            <div className="ux4g-form-group" style={{ textAlign: 'left' }}>
              <label className="ux4g-label" style={{ textAlign: 'left' }}>
                Suspect Details (Phone number, UPI ID, Social media profile, Website link)
              </label>
              <input
                type="text"
                className="ux4g-input"
                placeholder="e.g. Suspect Mobile: +91 98xxxxxx, UPI: suspect@ybl"
                value={suspectDetails}
                onChange={(e) => setSuspectDetails(e.target.value)}
              />
            </div>

            <div className="ux4g-form-group" style={{ textAlign: 'left' }}>
              <label className="ux4g-label" style={{ textAlign: 'left' }}>
                Brief Description of the Incident <span className="required">*</span>
              </label>
              <textarea
                className="ux4g-input"
                rows={4}
                required
                placeholder="Explain clearly what happened, step by step..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
              <button type="button" className="ux4g-btn ux4g-btn-secondary" onClick={() => setCurrentStep(1)}>
                ← Back
              </button>
              <button type="submit" className="ux4g-btn ux4g-btn-primary" style={{ flex: 1 }}>
                Continue to Evidence Upload →
              </button>
            </div>
          </form>
        </div>
      )}

      {/* STEP 3: Evidence Upload - Left Aligned */}
      {currentStep === 3 && (
        <div className="ux4g-card" style={{ textAlign: 'left' }}>
          <h2 style={{ margin: '0 0 6px 0', color: '#0A3161', fontSize: '1.4rem', textAlign: 'left', fontWeight: 700 }}>
            Upload Supporting Evidence
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '20px', textAlign: 'left' }}>
            Attach payment receipts, SMS screenshots, chat transcripts, or email headers (JPG, PNG, PDF max 10MB each).
          </p>

          <div style={{ border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '30px', textAlign: 'left', background: '#f8fafc', marginBottom: '20px' }}>
            <div style={{ fontSize: '2.2rem', marginBottom: '8px' }}>📁</div>
            <div style={{ fontWeight: 600, color: '#0f172a', marginBottom: '4px', textAlign: 'left' }}>Drag & Drop files here or browse</div>
            <div style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '14px', textAlign: 'left' }}>Supported formats: PDF, JPG, PNG</div>
            <label className="ux4g-btn ux4g-btn-secondary" style={{ cursor: 'pointer' }}>
              Select Files
              <input type="file" multiple accept="image/*,.pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div style={{ marginBottom: '20px', textAlign: 'left' }}>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px', textAlign: 'left' }}>Attached Files ({uploadedFiles.length}):</div>
              {uploadedFiles.map((file, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', background: '#e2e8f0', padding: '8px 12px', borderRadius: '6px', marginBottom: '6px', fontSize: '0.88rem' }}>
                  <span>📎 {file.name}</span>
                  <span style={{ color: '#64748b' }}>{file.size}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="button" className="ux4g-btn ux4g-btn-secondary" onClick={() => setCurrentStep(2)}>
              ← Back
            </button>
            <button
              type="button"
              className="ux4g-btn ux4g-btn-primary"
              style={{ flex: 1 }}
              onClick={handleSubmitComplaint}
              disabled={isSubmitting}>
              {isSubmitting ? 'Submitting Report...' : 'Submit Official Cyber Crime Complaint'}
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Complaint Acknowledgment Receipt */}
      {currentStep === 4 && (
        <div className="ux4g-card" style={{ textAlign: 'left', padding: '32px 24px' }}>
          <div style={{ width: '56px', height: '56px', background: '#e6f4ea', borderRadius: '50%', color: '#188038', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', marginBottom: '16px' }}>
            ✓
          </div>

          <h2 style={{ color: '#0A3161', margin: '0 0 8px 0', textAlign: 'left' }}>Complaint Successfully Registered!</h2>
          <p style={{ color: '#64748b', fontSize: '0.95rem', marginBottom: '24px', textAlign: 'left' }}>
            Your incident report has been securely transmitted to the relevant Cyber Crime Police Cell for investigation.
          </p>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '20px', borderRadius: '12px', marginBottom: '28px', textAlign: 'left' }}>
            <div style={{ fontSize: '0.85rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', textAlign: 'left' }}>Acknowledgment Reference Number</div>
            <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#0A3161', margin: '6px 0', letterSpacing: '1px', textAlign: 'left' }}>
              {ackNumber}
            </div>
            <div style={{ fontSize: '0.85rem', color: '#166534', background: '#dcfce7', padding: '4px 12px', borderRadius: '12px', display: 'inline-block' }}>
              Status: Assigned to State Cyber Cell
            </div>
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
