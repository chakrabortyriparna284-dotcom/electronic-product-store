import React from 'react';

export const AdidasLogo = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M2.5 19h3.2L11 8.5 7.8 8.5z" />
    <path d="M7.8 19h3.2l5.3-8.8-3.2 0z" />
    <path d="M13.1 19h3.2L22 13.8l-3.2 0z" />
  </svg>
);

export const ColumbiaLogo = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#0284C7" className={className}>
    <rect x="7" y="3" width="4.5" height="4.5" rx="1" />
    <rect x="12.5" y="3" width="4.5" height="4.5" rx="1" />
    <rect x="3" y="7" width="4.5" height="4.5" rx="1" />
    <rect x="16.5" y="7" width="4.5" height="4.5" rx="1" />
    <rect x="3" y="12.5" width="4.5" height="4.5" rx="1" />
    <rect x="16.5" y="12.5" width="4.5" height="4.5" rx="1" />
    <rect x="7" y="16.5" width="4.5" height="4.5" rx="1" />
    <rect x="12.5" y="16.5" width="4.5" height="4.5" rx="1" />
    <rect x="8.5" y="8.5" width="7" height="7" rx="1.5" fill="#38BDF8" />
  </svg>
);

export const DemixLogo = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 15l9-8 9 8-3.5 2L12 12l-5.5 5z" />
    <path d="M6 18l6-5 6 5-2 1.5-4-3-4 3z" />
  </svg>
);

export const NewBalanceLogo = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <text
      x="2"
      y="18"
      fontFamily="Impact, Arial Black, sans-serif"
      fontSize="18"
      fontWeight="900"
      fontStyle="italic"
      letterSpacing="-1.5"
    >
      NB
    </text>
  </svg>
);

export const NikeLogo = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M21.7 6.4c-4.8 2.2-9.6 5.8-13.8 10.4-1.8 2-3.3 2.5-4.4 2.2-.9-.3-1.4-1.2-1.5-2.5-.1-1.6.8-3.7 2.4-5.8 2.8-3.7 6.7-6.2 10.9-7.1 2.2-.5 4.3-.3 5.4.3.8.5 1.3 1.4 1 2.5z" />
  </svg>
);

export const XiaomiLogo = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
    <rect width="24" height="24" rx="7" fill="#FF6900" />
    <path
      d="M6.5 7h4v10h-2.2v-6.5h-.8L6.5 7zm6.2 0h4.8v10h-2.1v-6.2h-1.2V17h-2.1V7h.6z"
      fill="#FFFFFF"
    />
  </svg>
);

export const AsicsLogo = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 4C7.6 4 4 7.6 4 12s3.6 8 8 8c2.9 0 5.5-1.5 6.9-3.9l-2.6-1.5C15.3 16 13.7 17 12 17c-2.8 0-5-2.2-5-5s2.2-5 5-5c1.7 0 3.3 1 4.3 2.4l2.6-1.5C17.5 5.5 14.9 4 12 4z" />
  </svg>
);

export const AppleLogo = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M18.7 19.5c-.8 1.2-1.7 2.4-3 2.5-1.3.1-1.8-.8-3.3-.8-1.5 0-2 .8-3.3.8-1.3-.1-2.2-1.3-3-2.5-1.7-2.4-3-6.8-1.2-9.8 1-1.5 2.6-2.5 4.3-2.5 1.3 0 2.5.9 3.3.9.8 0 2.3-1.1 3.9-.9 1.4.1 2.5.6 3.2 1.7-2.8 1.7-2.3 5.5.4 6.7-.6 1.4-1.3 2.7-2.3 3.9zM15 6.7c.6-.8 1.1-1.9 1-3-.9.1-2.1.7-2.7 1.5-.6.7-1.1 1.9-.9 3 1.1 0 2-.7 2.6-1.5z" />
  </svg>
);

export const BrandIcon = ({ brand, size = 18 }) => {
  switch (brand?.toLowerCase()) {
    case 'adidas':
      return <AdidasLogo size={size} />;
    case 'columbia':
      return <ColumbiaLogo size={size} />;
    case 'demix':
      return <DemixLogo size={size} />;
    case 'new balance':
      return <NewBalanceLogo size={size} />;
    case 'nike':
      return <NikeLogo size={size} />;
    case 'xiaomi':
      return <XiaomiLogo size={size} />;
    case 'asics':
      return <AsicsLogo size={size} />;
    case 'apple':
      return <AppleLogo size={size} />;
    default:
      return null;
  }
};
