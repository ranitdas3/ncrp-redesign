import React from 'react';
import { MagnifyingGlass, X } from '@phosphor-icons/react';

export default function CrimeSearchBar({ searchQuery, setSearchQuery, currentLang }) {
  const placeholderText = currentLang === 'hi'
    ? 'कीवर्ड से खोजें (जैसे UPI, इंस्टाग्राम, डिजिटल अरेस्ट, CSAM...)'
    : 'Search by keyword (e.g. UPI fraud, Instagram, loan app, digital arrest, CSAM...)';

  return (
    <div style={{ marginBottom: '24px' }}>
      {/* Search Container with Right CTA Button */}
      <div 
        className="ux4g-search-bar-wrapper"
        style={{
          display: 'flex',
          alignItems: 'stretch',
          backgroundColor: '#ffffff',
          border: '2px solid #0A3161',
          borderRadius: '12px',
          overflow: 'hidden',
          boxShadow: '0 4px 14px rgba(10, 49, 97, 0.08)',
          transition: 'all 0.2s ease-in-out'
        }}>
        
        {/* Left Input Field Area */}
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, paddingLeft: '16px', paddingRight: '8px', minWidth: 0 }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={placeholderText}
            aria-label={currentLang === 'hi' ? 'साइबर अपराध कीवर्ड खोजें' : 'Search cybercrime keywords'}
            style={{
              width: '100%',
              border: 'none',
              outline: 'none',
              fontSize: '1rem',
              padding: '12px 0',
              color: '#0f172a',
              backgroundColor: 'transparent',
              fontWeight: 500
            }}
          />

          {/* Clear Button inside Input area */}
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              title={currentLang === 'hi' ? 'खोज साफ़ करें' : 'Clear search'}
              aria-label={currentLang === 'hi' ? 'खोज साफ़ करें' : 'Clear search'}
              style={{
                background: '#e2e8f0',
                border: 'none',
                borderRadius: '50%',
                width: '24px',
                height: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                flexShrink: 0,
                color: '#475569',
                marginLeft: '6px',
                transition: 'background 0.2s ease'
              }}>
              <X size={14} weight="bold" />
            </button>
          )}
        </div>

        {/* Right CTA Button with Search Icon */}
        <button
          type="button"
          className="ux4g-search-cta-btn"
          onClick={() => {}}
          aria-label={currentLang === 'hi' ? 'खोजें' : 'Search'}
          style={{
            backgroundColor: '#0A3161',
            color: '#ffffff',
            border: 'none',
            padding: '0 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            fontSize: '0.98rem',
            fontWeight: 700,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background-color 0.2s ease-in-out'
          }}>
          <MagnifyingGlass size={20} color="#ffffff" weight="bold" />
          <span>{currentLang === 'hi' ? 'खोजें' : 'Search'}</span>
        </button>

      </div>
    </div>
  );
}
