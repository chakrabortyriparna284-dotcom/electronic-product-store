import React from 'react';
import { Cpu } from 'lucide-react';

export const AppleLogo = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.7 19.5c-.8 1.2-1.7 2.4-3 2.5-1.3.1-1.8-.8-3.3-.8-1.5 0-2 .8-3.3.8-1.3-.1-2.2-1.3-3-2.5-1.7-2.4-3-6.8-1.2-9.8 1-1.5 2.6-2.5 4.3-2.5 1.3 0 2.5.9 3.3.9.8 0 2.3-1.1 3.9-.9 1.4.1 2.5.6 3.2 1.7-2.8 1.7-2.3 5.5.4 6.7-.6 1.4-1.3 2.7-2.3 3.9zM15 6.7c.6-.8 1.1-1.9 1-3-.9.1-2.1.7-2.7 1.5-.6.7-1.1 1.9-.9 3 1.1 0 2-.7 2.6-1.5z" />
  </svg>
);

export const SamsungLogo = ({ size = 20, className = '' }) => (
  <svg width={size * 1.5} height={size} viewBox="0 0 48 24" fill="currentColor" className={className}>
    <text
      x="2"
      y="17"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontSize="12"
      fontWeight="900"
      letterSpacing="1.2"
    >
      SAMSUNG
    </text>
  </svg>
);

export const SonyLogo = ({ size = 20, className = '' }) => (
  <svg width={size * 1.4} height={size} viewBox="0 0 42 24" fill="currentColor" className={className}>
    <text
      x="2"
      y="17"
      fontFamily="Georgia, serif"
      fontSize="13"
      fontWeight="900"
      letterSpacing="2.5"
    >
      SONY
    </text>
  </svg>
);

export const XiaomiLogo = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" rx="6" fill="#FF6900" />
    <path
      d="M6.5 7h4v10h-2.2v-6.5h-.8L6.5 7zm6.2 0h4.8v10h-2.1v-6.2h-1.2V17h-2.1V7h.6z"
      fill="#FFFFFF"
    />
  </svg>
);

export const DellLogo = ({ size = 20, className = '' }) => (
  <svg width={size * 1.3} height={size} viewBox="0 0 36 24" fill="#0076CE" className={className}>
    <circle cx="18" cy="12" r="10.5" fill="none" stroke="#0076CE" strokeWidth="2" />
    <text
      x="18"
      y="16"
      textAnchor="middle"
      fontFamily="system-ui, sans-serif"
      fontSize="9.5"
      fontWeight="900"
      letterSpacing="0.5"
      fill="#0076CE"
    >
      DELL
    </text>
  </svg>
);

export const HPLogo = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <circle cx="12" cy="12" r="11" fill="#0096D6" />
    <text
      x="12"
      y="16"
      textAnchor="middle"
      fontFamily="system-ui, sans-serif"
      fontSize="11"
      fontWeight="900"
      fontStyle="italic"
      fill="#FFFFFF"
    >
      hp
    </text>
  </svg>
);

export const AsusLogo = ({ size = 20, className = '' }) => (
  <svg width={size * 1.3} height={size} viewBox="0 0 40 24" fill="currentColor" className={className}>
    <text
      x="2"
      y="17"
      fontFamily="system-ui, sans-serif"
      fontSize="13"
      fontWeight="900"
      letterSpacing="2"
    >
      ASUS
    </text>
  </svg>
);

export const LenovoLogo = ({ size = 20, className = '' }) => (
  <svg width={size * 1.6} height={size} viewBox="0 0 46 22" className={className}>
    <rect width="46" height="22" rx="4" fill="#E2231A" />
    <text
      x="23"
      y="15"
      textAnchor="middle"
      fontFamily="system-ui, sans-serif"
      fontSize="9.5"
      fontWeight="800"
      fill="#FFFFFF"
    >
      lenovo
    </text>
  </svg>
);

export const BoseLogo = ({ size = 20, className = '' }) => (
  <svg width={size * 1.3} height={size} viewBox="0 0 40 24" fill="currentColor" className={className}>
    <text
      x="2"
      y="17"
      fontFamily="system-ui, sans-serif"
      fontSize="13"
      fontWeight="900"
      fontStyle="italic"
      letterSpacing="1.5"
    >
      BOSE
    </text>
  </svg>
);

export const LogitechLogo = ({ size = 20, className = '' }) => (
  <svg width={size * 1.3} height={size} viewBox="0 0 38 24" fill="#00B8FC" className={className}>
    <text
      x="2"
      y="17"
      fontFamily="system-ui, sans-serif"
      fontSize="12"
      fontWeight="800"
      fill="#00B8FC"
    >
      logi
    </text>
  </svg>
);

export const BrandIcon = ({ brand, size = 18 }) => {
  switch (brand?.toLowerCase()) {
    case 'apple':
      return <AppleLogo size={size} />;
    case 'samsung':
      return <SamsungLogo size={size} />;
    case 'sony':
      return <SonyLogo size={size} />;
    case 'xiaomi':
      return <XiaomiLogo size={size} />;
    case 'dell':
      return <DellLogo size={size} />;
    case 'hp':
      return <HPLogo size={size} />;
    case 'asus':
      return <AsusLogo size={size} />;
    case 'lenovo':
      return <LenovoLogo size={size} />;
    case 'bose':
      return <BoseLogo size={size} />;
    case 'logitech':
      return <LogitechLogo size={size} />;
    default:
      return <Cpu size={size} />;
  }
};
