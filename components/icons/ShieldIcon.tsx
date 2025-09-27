import React from 'react';

// Fix: Update the component to accept a `title` prop. This fixes a TypeScript error in
// CoachResponse.tsx and improves accessibility by rendering an SVG <title> element,
// which provides a tooltip on hover.
interface ShieldIconProps extends React.SVGProps<SVGSVGElement> {
  title?: string;
}

export const ShieldIcon: React.FC<ShieldIconProps> = ({ title, ...props }) => (
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
    {title && <title>{title}</title>}
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);
