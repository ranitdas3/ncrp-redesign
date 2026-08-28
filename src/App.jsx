import React, { useState } from 'react';
import './styles/ux4g.css';
import LanguageToolbar from './components/LanguageToolbar';
import GovtHeader from './components/GovtHeader';
import CategorySelection from './components/CategorySelection';
import IncidentReportingFlow from './components/IncidentReportingFlow';
import LoginForm from './components/LoginForm';
import TrackComplaint from './components/TrackComplaint';
import GovtFooter from './components/GovtFooter';

export default function App() {
  const [currentView, setCurrentView] = useState('categories'); // 'categories', 'wizard', 'login', 'track'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCrime, setSelectedSubCrime] = useState(null);
  
  // Accessibility & Localization State
  const [fontSize, setFontSize] = useState('md'); // 'sm', 'md', 'lg'
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [currentLang, setCurrentLang] = useState('en'); // 'en', 'hi', 'bn', etc.

  // Handle Category Selection from Dashboard Card / Search Result
  const handleSelectCategory = (category, subCrime = null) => {
    setSelectedCategory(category);
    setSelectedSubCrime(subCrime);
    setCurrentView('wizard');
  };

  return (
    <div className={`ux4g-font-${fontSize} ${isHighContrast ? 'ux4g-theme-high-contrast' : ''}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Multi-Language & Accessibility Toolbar matching Low-fi Wireframe */}
      <LanguageToolbar
        currentLang={currentLang}
        onSelectLang={setCurrentLang}
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      {/* Main Government Header */}
      <GovtHeader
        fontSize={fontSize}
        setFontSize={setFontSize}
        isHighContrast={isHighContrast}
        setIsHighContrast={setIsHighContrast}
        language={currentLang}
        setLanguage={setCurrentLang}
      />

      {/* Attached Mobile National Helpline Banner (Shown directly on top of navigation tabs on mobile) */}
      <a 
        href="tel:1930" 
        className="ux4g-mobile-helpline-banner" 
        style={{ textDecoration: 'none' }}>
        <span>
          {currentLang === 'hi' ? '🚨 राष्ट्रीय साइबर हेल्पलाइन:' :
           currentLang === 'bn' ? '🚨 জাতীয় সাইবার হেল্পলাইন:' :
           currentLang === 'gu' ? '🚨 રાષ્ટ્રીય સાયબર હેલ્પલાઇન:' :
           currentLang === 'mr' ? '🚨 राष्ट्रीय सायबर हेल्पलाइन:' :
           currentLang === 'kn' ? '🚨 ರಾಷ್ಟ್ರೀಯ ಸೈಬರ್ ಹೆಲ್ಪ್‌ಲೈನ್:' :
           currentLang === 'ml' ? '🚨 ദേശീയ സൈബർ ഹെൽപ്‌ലൈൻ:' :
           currentLang === 'ta' ? '🚨 தேசிய சைபர் உதவி எண்:' :
           currentLang === 'te' ? '🚨 జాతీయ సైబర్ హెల్ప్‌లైన్:' :
           currentLang === 'or' ? '🚨 ଜାତୀୟ ସାଇବର୍ ହେଲ୍ପଲାଇନ୍:' :
           '🚨 National Cyber Helpline:'}
        </span>
        <span style={{ textDecoration: 'underline', fontWeight: 800 }}>📞 1930</span>
      </a>

      {/* Portal Navigation Ribbon with 2 Tabs (Tighter layout for mobile screens) */}
      <nav style={{ background: '#0A3161', borderBottom: '1px solid #08264d' }}>
        <div className="ux4g-container ux4g-main-nav-container">
          
          {/* TAB 1: Report A Cyber Crime */}
          <button
            type="button"
            className="ux4g-main-nav-btn"
            onClick={() => setCurrentView('categories')}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              padding: '12px 16px',
              fontSize: '0.95rem',
              fontWeight: currentView === 'categories' || currentView === 'wizard' ? '700' : '400',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              borderBottom: currentView === 'categories' || currentView === 'wizard' ? '3px solid #FF9933' : '3px solid transparent'
            }}>
            🚨 {currentLang === 'hi' ? 'साइबर अपराध रिपोर्ट करें' : 'Report Cyber Crime'}
          </button>

          {/* TAB 2: Track your Complaint */}
          <button
            type="button"
            className="ux4g-main-nav-btn"
            onClick={() => setCurrentView('track')}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              padding: '12px 16px',
              fontSize: '0.95rem',
              fontWeight: currentView === 'track' ? '700' : '400',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              borderBottom: currentView === 'track' ? '3px solid #FF9933' : '3px solid transparent'
            }}>
            🔍 {currentLang === 'hi' ? 'शिकायत ट्रैक करें' : 'Track Complaint'}
          </button>

        </div>
      </nav>

      {/* View Router */}
      <main style={{ flex: 1 }}>
        {currentView === 'categories' && (
          <CategorySelection
            currentLang={currentLang}
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentView === 'wizard' && selectedCategory && (
          <IncidentReportingFlow
            category={selectedCategory}
            initialSubCrime={selectedSubCrime}
            currentLang={currentLang}
            onBackToCategories={() => setCurrentView('categories')}
          />
        )}

        {currentView === 'login' && (
          <LoginForm language={currentLang} />
        )}

        {currentView === 'track' && (
          <TrackComplaint currentLang={currentLang} />
        )}
      </main>

      {/* Government Footer */}
      <GovtFooter language={currentLang} />

    </div>
  );
}
