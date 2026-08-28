import React, { useState } from 'react';
import { CRIME_CATEGORIES } from '../data/crimeCategories';
import CategoryIcon from './CategoryIcon';
import CrimeSearchBar from './CrimeSearchBar';

export default function CategorySelection({ currentLang, onSelectCategory }) {
  const [searchQuery, setSearchQuery] = useState('');

  const cleanQuery = searchQuery.trim().toLowerCase();

  // Keyword Matching Logic
  const getFilteredCategories = () => {
    if (!cleanQuery) return CRIME_CATEGORIES.map(cat => ({ category: cat, matchedSubCrimes: [] }));

    return CRIME_CATEGORIES.map(cat => {
      const titleEn = cat.title.toLowerCase();
      const titleHi = (cat.titleHi || '').toLowerCase();
      const summary = cat.summary.toLowerCase();
      const description = (cat.description || '').toLowerCase();
      const catKeywords = (cat.keywords || []).map(k => k.toLowerCase());

      const categoryDirectMatch =
        titleEn.includes(cleanQuery) ||
        titleHi.includes(cleanQuery) ||
        summary.includes(cleanQuery) ||
        description.includes(cleanQuery) ||
        catKeywords.some(k => k.includes(cleanQuery));

      const matchedSubCrimes = (cat.subCrimes || []).filter(sub => {
        const subName = sub.name.toLowerCase();
        const subTag = (sub.tag || '').toLowerCase();
        const subKeywords = (sub.keywords || []).map(k => k.toLowerCase());

        return (
          subName.includes(cleanQuery) ||
          subTag.includes(cleanQuery) ||
          subKeywords.some(k => k.includes(cleanQuery))
        );
      });

      if (categoryDirectMatch || matchedSubCrimes.length > 0) {
        return { category: cat, matchedSubCrimes };
      }
      return null;
    }).filter(Boolean);
  };

  const filteredItems = getFilteredCategories();
  const othersCategory = CRIME_CATEGORIES.find(c => c.id === 'others');

  return (
    <div style={{ maxWidth: '820px', margin: '24px auto', padding: '0 20px', textAlign: 'left' }}>
      
      {/* Title & Subtitle matching Wireframe - Left Aligned */}
      <div style={{ marginBottom: '20px', textAlign: 'left' }}>
        <h1 className="ux4g-main-title" style={{ fontSize: '2.1rem', color: '#0f172a', margin: '0 0 6px 0', fontWeight: 700, letterSpacing: '-0.5px' }}>
          {currentLang === 'hi' ? 'साइबर अपराध की रिपोर्ट करें' : 'Report A Cyber Crime'}
        </h1>
        <p className="ux4g-main-subtitle" style={{ fontSize: '1rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
          {currentLang === 'hi'
            ? 'हमें बताएं कि क्या हुआ। हम रिपोर्ट करने के लिए आवश्यक जानकारी में आपका मार्गदर्शन करेंगे।'
            : 'Tell us what happened. We will guide you through the information needed to report it.'}
        </p>
      </div>

      {/* Sleek Keyword Search Bar */}
      <CrimeSearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentLang={currentLang}
      />

      {/* Search results count / active filter indicator when query present */}
      {cleanQuery && (
        <div style={{ marginBottom: '14px', fontSize: '0.9rem', color: '#475569', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>
            {currentLang === 'hi'
              ? `"${searchQuery}" के लिए परिणाम (${filteredItems.length} श्रेणी पाई गई)`
              : `Results for "${searchQuery}" (${filteredItems.length} ${filteredItems.length === 1 ? 'category' : 'categories'} found)`}
          </span>
          <button
            onClick={() => setSearchQuery('')}
            style={{ background: 'none', border: 'none', color: '#0A3161', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>
            {currentLang === 'hi' ? 'सभी दिखाएं' : 'Show All'}
          </button>
        </div>
      )}

      {/* Category List Cards */}
      {filteredItems.length > 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {filteredItems.map(({ category, matchedSubCrimes }) => (
            <div
              key={category.id}
              className="ux4g-category-card"
              style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
              }}>
              
              {/* Header row: Icon + Title + Arrow */}
              <div 
                onClick={() => onSelectCategory(category)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                
                {/* Left Content Area: Icon + Title + Single-Line Summary */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: 0, paddingRight: '16px' }}>
                  
                  {/* Phosphor Icon Thumbnail */}
                  <div
                    className="ux4g-category-icon-box"
                    style={{
                      width: '48px',
                      height: '44px',
                      borderRadius: '10px',
                      backgroundColor: '#e2e8f0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                    <CategoryIcon categoryId={category.id} size={24} color="#0A3161" />
                  </div>

                  {/* Title & Single-Line Comma-Separated Sub-Crimes */}
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <h3 className="ux4g-category-title" style={{ margin: '0 0 2px 0', fontSize: '1.15rem', color: '#0f172a', fontWeight: 600 }}>
                      {currentLang === 'hi' && category.titleHi ? category.titleHi : category.title}
                    </h3>
                    <p className="ux4g-category-subtext" style={{
                      margin: 0,
                      fontSize: '0.88rem',
                      color: '#64748b',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {category.summary}
                    </p>
                  </div>
                </div>

                {/* Action Chevron Arrow */}
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.1rem',
                  color: '#334155',
                  flexShrink: 0
                }}>
                  ➔
                </div>
              </div>

              {/* Matched Sub-Crimes Chips (Shown when searching and matching sub-crimes exist) */}
              {cleanQuery && matchedSubCrimes.length > 0 && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    borderTop: '1px stroke #e2e8f0',
                    paddingTop: '8px',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                  <span style={{ fontSize: '0.8rem', color: '#0A3161', fontWeight: 600 }}>
                    {currentLang === 'hi' ? 'मिलते-जुलते अपराध:' : 'Matching Sub-crimes:'}
                  </span>
                  {matchedSubCrimes.map((sub) => (
                    <button
                      key={sub.id}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectCategory(category, sub);
                      }}
                      style={{
                        background: '#e0e7ff',
                        color: '#1e3a8a',
                        border: '1px solid #c7d2fe',
                        borderRadius: '20px',
                        padding: '4px 12px',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        transition: 'all 0.15s ease-in-out'
                      }}>
                      <span>{sub.name}</span>
                      <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>➔</span>
                    </button>
                  ))}
                </div>
              )}

            </div>
          ))}
        </div>
      ) : (
        /* Empty State when no results match */
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px dashed #cbd5e1',
          borderRadius: '16px',
          padding: '36px 24px',
          textAlign: 'center',
          marginTop: '12px'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
          <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: '#0f172a', fontWeight: 700 }}>
            {currentLang === 'hi' ? 'कोई मिलान नहीं मिला' : 'No matching cybercrime category found'}
          </h3>
          <p style={{ margin: '0 0 20px 0', fontSize: '0.95rem', color: '#64748b' }}>
            {currentLang === 'hi'
              ? `"${searchQuery}" के लिए कोई विशिष्ट श्रेणी नहीं मिली। आप 'अन्य' श्रेणी के तहत रिपोर्ट दर्ज कर सकते हैं।`
              : `We couldn't find an exact category match for "${searchQuery}". You can proceed by reporting under the 'Others' category.`}
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            {othersCategory && (
              <button
                type="button"
                className="ux4g-btn ux4g-btn-primary"
                onClick={() => onSelectCategory(othersCategory)}>
                {currentLang === 'hi' ? 'अन्य श्रेणी में रिपोर्ट करें' : 'Report under Others Category'}
              </button>
            )}
            <button
              type="button"
              className="ux4g-btn ux4g-btn-secondary"
              onClick={() => setSearchQuery('')}>
              {currentLang === 'hi' ? 'खोज साफ़ करें' : 'Clear Search'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
