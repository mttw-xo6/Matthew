import React from 'react';

export const AppleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M12 20.94c1.5 0 2.75 1.06 4 0c1.25-1.06 2.5-2.25 2.5-4.44c0-1.5-1.5-3.5-3-3.5c-1.5 0-2.5 2-3.5 2s-2-2-3.5-2c-1.5 0-3 2-3 3.5c0 2.19 1.25 3.38 2.5 4.44c1.25 1.06 2.5 0 4 0Z" />
    <path d="M12 14.94v-1.5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1.5" />
    <path d="M12 10.94V7a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v6" />
  </svg>
);