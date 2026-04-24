/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function Logo({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer Circle */}
      <circle cx="100" cy="100" r="85" fill="#C4D600" stroke="#FFFFFF" strokeWidth="4"/>
      <circle cx="100" cy="100" r="78" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
      
      {/* Building Icon */}
      <g transform="translate(100, 100)">
        {/* Center Building */}
        <path d="M -8 -45 L 8 -45 L 8 15 L -8 15 Z" fill="none" stroke="#FFFFFF" strokeWidth="3"/>
        <rect x="-4" y="-35" width="8" height="8" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <rect x="-4" y="-20" width="8" height="8" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <rect x="-4" y="-5" width="8" height="8" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        
        {/* Left Building */}
        <path d="M -35 -25 L -15 -25 L -15 15 L -35 15 Z" fill="none" stroke="#FFFFFF" strokeWidth="3"/>
        <rect x="-30" y="-18" width="6" height="6" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <rect x="-30" y="-8" width="6" height="6" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <rect x="-30" y="2" width="6" height="6" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <rect x="-22" y="-18" width="6" height="6" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <rect x="-22" y="-8" width="6" height="6" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <rect x="-22" y="2" width="6" height="6" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        
        {/* Right Building */}
        <path d="M 15 -25 L 35 -25 L 35 15 L 15 15 Z" fill="none" stroke="#FFFFFF" strokeWidth="3"/>
        <rect x="18" y="-18" width="6" height="6" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <rect x="18" y="-8" width="6" height="6" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <rect x="18" y="2" width="6" height="6" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <rect x="26" y="-18" width="6" height="6" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <rect x="26" y="-8" width="6" height="6" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        <rect x="26" y="2" width="6" height="6" fill="none" stroke="#FFFFFF" strokeWidth="2"/>
        
        {/* Roof Triangle */}
        <path d="M 0 -55 L 15 -45 L -15 -45 Z" fill="none" stroke="#FFFFFF" strokeWidth="3"/>
      </g>
      
      {/* Diagonal Line */}
      <line x1="30" y1="140" x2="170" y2="60" stroke="#C4D600" strokeWidth="8"/>
      
      {/* Text Ribbon Background */}
      <path d="M 20 120 L 180 120 L 190 140 L 180 160 L 20 160 L 10 140 Z" fill="#1E3A5F"/>
      
      {/* Continental Text (Stylized) */}
      <text x="100" y="105" fontFamily="'Brush Script MT', cursive" fontSize="32" fill="#1E3A5F" textAnchor="middle" fontStyle="italic" fontWeight="bold">
        Continental
      </text>
      
      {/* Construction Services Text */}
      <text x="100" y="148" fontFamily="Arial, sans-serif" fontSize="18" fill="#FFFFFF" textAnchor="middle" fontWeight="bold" letterSpacing="1">
        CONSTRUCTION SERVICES
      </text>
    </svg>
  );
}
