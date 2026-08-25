import React from 'react';
import { CRIME_CATEGORIES } from '../data/crimeCategories';
import CategoryIcon from './CategoryIcon';

export default function CategorySelection({ currentLang, onSelectCategory }) {
  return (
    <div style={{ maxWidth: '820px', margin: '24px auto', padding: '0 20px', textAlign: 'left' }}>
      
      {/* Title & Subtitle matching Wireframe - Left Aligned */}
      <div style={{ marginBottom: '20px', textAlign: 'left' }}>
        <h1 style={{ fontSize: '2.1rem', color: '#0f172a', margin: '0 0 6px 0', fontWeight: 700, letterSpacing: '-0.5px' }}>
          {currentLang === 'hi' ? 'साइबर अपराध की रिपोर्ट करें' : 'Report A Cyber Crime'}
        </h1>
        <p style={{ fontSize: '1rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
          {currentLang === 'hi'
            ? 'हमें बताएं कि क्या हुआ। हम रिपोर्ट करने के लिए आवश्यक जानकारी में आपका मार्गदर्शन करेंगे।'
            : 'Tell us what happened. We will guide you though the information needed to report it.'}
        </p>
      </div>

      {/* Category List Cards matching Wireframe Layout - Compact Height for 4+ Cards in First Viewport */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {CRIME_CATEGORIES.map((category) => (
          <div
            key={category.id}
            onClick={() => onSelectCategory(category)}
            className="ux4g-category-card"
            style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '16px',
              padding: '14px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.2s ease-in-out',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)'
            }}>
            
            {/* Left Content Area: Icon + Title + Single-Line Summary */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: 0, paddingRight: '16px' }}>
              
              {/* Phosphor Icon Thumbnail */}
              <div style={{
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

              {/* Title & Single-Line Comma-Separated Sub-Crimes with Ellipsis */}
              <div style={{ minWidth: 0, flex: 1 }}>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '1.15rem', color: '#0f172a', fontWeight: 600 }}>
                  {currentLang === 'hi' && category.titleHi ? category.titleHi : category.title}
                </h3>
                <p style={{
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

            {/* Right Action Chevron Arrow matching Wireframe */}
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
        ))}
      </div>

    </div>
  );
}
