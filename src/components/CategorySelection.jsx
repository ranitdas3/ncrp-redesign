import React from 'react';
import { useTranslation } from 'react-i18next';
import { CRIME_CATEGORIES } from '../data/crimeCategories';
import CategoryIcon from './CategoryIcon';

export default function CategorySelection({ onSelectCategory }) {
  const { t } = useTranslation();

  return (
    <div style={{ maxWidth: '820px', margin: '24px auto', padding: '0 20px', textAlign: 'left' }}>

      <div style={{ marginBottom: '20px', textAlign: 'left' }}>
        <h1 style={{ fontSize: '2.1rem', color: '#0f172a', margin: '0 0 6px 0', fontWeight: 700, letterSpacing: '-0.5px' }}>
          {t('categories.pageHeading')}
        </h1>
        <p style={{ fontSize: '1rem', color: '#475569', margin: 0, lineHeight: 1.4 }}>
          {t('categories.pageDescription')}
        </p>
      </div>

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

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1, minWidth: 0, paddingRight: '16px' }}>

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

              <div style={{ minWidth: 0, flex: 1 }}>
                <h3 style={{ margin: '0 0 2px 0', fontSize: '1.15rem', color: '#0f172a', fontWeight: 600 }}>
                  {t(category.titleKey)}
                </h3>
                <p style={{
                  margin: 0,
                  fontSize: '0.88rem',
                  color: '#64748b',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {t(category.summaryKey)}
                </p>
              </div>
            </div>

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
