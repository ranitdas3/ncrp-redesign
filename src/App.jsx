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
  
  // Accessibility & Localization State
  const [fontSize, setFontSize] = useState('md'); // 'sm', 'md', 'lg'
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [currentLang, setCurrentLang] = useState('en'); // 'en', 'hi', 'bn', etc.

  // Handle Category Selection from Dashboard Card
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
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

      {/* Portal Navigation Ribbon with 3 Tabs */}
      <nav style={{ background: '#0A3161', borderBottom: '1px solid #08264d' }}>
        <div className="ux4g-container" style={{ display: 'flex', gap: '20px', padding: '0 16px', overflowX: 'auto' }}>
          
          {/* TAB 1: Report A Cyber Crime */}
          <button
            type="button"
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
            🚨 {currentLang === 'hi' ? 'साइबर अपराध रिपोर्ट करें' : 'Report A Cyber Crime'}
          </button>

          {/* TAB 2: Track your Complaint */}
          <button
            type="button"
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
            🔍 {currentLang === 'hi' ? 'शिकायत की स्थिति ट्रैक करें' : 'Track your Complaint'}
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
