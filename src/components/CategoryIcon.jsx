import React from 'react';
import {
  UsersThree,
  CurrencyInr,
  IdentificationCard,
  ChatTeardropDots,
  DesktopTower,
  Globe,
  FileText,
  ShieldWarning
} from '@phosphor-icons/react';

export default function CategoryIcon({ categoryId, size = 24, color = '#0b2e59' }) {
  switch (categoryId) {
    case 'women-children':
      return <UsersThree size={size} color={color} weight="bold" />;
    case 'financial':
      return <CurrencyInr size={size} color={color} weight="bold" />;
    case 'identity':
      return <IdentificationCard size={size} color={color} weight="bold" />;
    case 'online-abuse':
      return <ChatTeardropDots size={size} color={color} weight="bold" />;
    case 'technical':
      return <DesktopTower size={size} color={color} weight="bold" />;
    case 'content':
      return <Globe size={size} color={color} weight="bold" />;
    case 'others':
      return <FileText size={size} color={color} weight="bold" />;
    default:
      return <ShieldWarning size={size} color={color} weight="bold" />;
  }
}
