const DesaLogo = ({ className = 'w-10 h-10' }: { className?: string }) => (
  <svg
    viewBox="0 0 50 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
    focusable="false"
  >
    {/* Left minaret */}
    <rect x="2" y="16" width="7" height="34" rx="1.5" fill="currentColor" opacity="0.9" />
    <path d="M2 16 L5.5 8 L9 16Z" fill="currentColor" />
    <rect x="3.5" y="23" width="4" height="6" rx="0.5" fill="white" opacity="0.6" />
    {/* Right minaret */}
    <rect x="41" y="16" width="7" height="34" rx="1.5" fill="currentColor" opacity="0.9" />
    <path d="M41 16 L44.5 8 L48 16Z" fill="currentColor" />
    <rect x="42.5" y="23" width="4" height="6" rx="0.5" fill="white" opacity="0.6" />
    {/* Main hall */}
    <rect x="9" y="30" width="32" height="20" rx="2" fill="currentColor" />
    {/* Central dome */}
    <path d="M25 10 C18 10 14 17 14 25 L36 25 C36 17 32 10 25 10Z" fill="currentColor" />
    {/* Finial */}
    <line x1="25" y1="3" x2="25" y2="10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <ellipse cx="25" cy="3" rx="1.5" ry="2" fill="currentColor" />
    {/* Door arch */}
    <path d="M21 50 L21 40 Q25 35.5 29 40 L29 50Z" fill="white" opacity="0.85" />
    {/* Side windows */}
    <ellipse cx="15" cy="38" rx="2.5" ry="3" fill="white" opacity="0.75" />
    <ellipse cx="35" cy="38" rx="2.5" ry="3" fill="white" opacity="0.75" />
    {/* Dome oculus */}
    <ellipse cx="25" cy="19" rx="3.5" ry="4" fill="white" opacity="0.4" />
  </svg>
);

export default DesaLogo;
