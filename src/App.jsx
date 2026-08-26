import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './styles/ux4g.css';
import LanguageToolbar from './components/LanguageToolbar';
import GovtHeader from './components/GovtHeader';
import CategorySelection from './components/CategorySelection';
import IncidentReportingFlow from './components/IncidentReportingFlow';
import LoginForm from './components/LoginForm';
import TrackComplaint from './components/TrackComplaint';
import GovtFooter from './components/GovtFooter';

export default function App() {
  const { t } = useTranslation();
  const [currentView, setCurrentView] = useState('categories');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [fontSize, setFontSize] = useState('md');
  const [isHighContrast, setIsHighContrast] = useState(false);

  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setCurrentView('wizard');
  };

  return (
    <div className={`ux4g-font-${fontSize} ${isHighContrast ? 'ux4g-theme-high-contrast' : ''}`} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      <LanguageToolbar
        fontSize={fontSize}
        setFontSize={setFontSize}
      />

      <GovtHeader />

      <nav style={{ background: '#0A3161', borderBottom: '1px solid #08264d' }}>
        <div className="ux4g-container" style={{ display: 'flex', gap: '20px', padding: '0 16px', overflowX: 'auto' }}>

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
            🚨 {t('navigation.reportCyberCrime')}
          </button>

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
            🔍 {t('navigation.trackComplaint')}
          </button>

        </div>
      </nav>

      <main style={{ flex: 1 }}>
        {currentView === 'categories' && (
          <CategorySelection
            onSelectCategory={handleSelectCategory}
          />
        )}

        {currentView === 'wizard' && selectedCategory && (
          <IncidentReportingFlow
            category={selectedCategory}
            onBackToCategories={() => setCurrentView('categories')}
          />
        )}

        {currentView === 'login' && (
          <LoginForm />
        )}

        {currentView === 'track' && (
          <TrackComplaint />
        )}
      </main>

      <GovtFooter />

    </div>
  );
}
