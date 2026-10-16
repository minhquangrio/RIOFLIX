import React from "react";

export function OnflixLogo({ className = "h-10 object-contain" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 font-extrabold tracking-wider text-2xl select-none ${className}`}>
      <span className="text-white">ON</span>
      <span className="text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">FLIX</span>
    </div>
  );
}

export function RioflixLogo({ className = "h-10 object-contain" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1 font-extrabold tracking-wider text-2xl select-none ${className}`}>
      <span className="text-white">RIO</span>
      <span className="text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded border border-green-500/20">FLIX</span>
    </div>
  );
}

export function RoPhimIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 756 400" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-label="Rổ Phim">
      <g stroke="currentColor" strokeWidth="25" strokeLinecap="round" strokeLinejoin="round">
        <path d="M306.981 47.5651L308.727 48.1247L308.713 48.0713L463.976 97.8623L463.976 97.8624C496.984 108.439 508.032 149.672 484.735 175.336L484.735 175.336L373.937 297.446C348.554 325.415 302.318 314.215 292.551 277.763L246.341 105.303C236.574 68.8517 271.015 36.0348 306.981 47.5651Z" />
        <path d="M444.89 447.398C580.774 410.989 667.781 283.462 658.012 148.181C679.697 149.896 697.565 168.655 695.911 191.907C686.281 326.882 592.778 446.97 454.743 483.956C316.708 520.942 175.674 463.641 99.8617 351.618C86.7996 332.271 92.8741 307.117 110.774 294.831C169.905 416.877 309.013 483.807 444.89 447.398Z" />
        <path d="M248.603 324.122C252.126 336.368 257.715 347.195 264.776 356.373C231.692 336.147 203.263 306.954 183.379 271.253L198.381 267.509C215.85 263.149 234.365 274.627 239.725 293.26L248.603 324.122Z" />
        <path d="M432.717 396.574C537.784 370.26 603.299 270.194 595.911 159.932L628.894 151.671C641.255 281.252 565.482 400.228 442.588 431.007C319.694 461.786 190.428 394.163 131.817 276.166L164.8 267.905C217.384 366.848 327.65 422.888 432.717 396.574Z" />
        <path d="M401.816 359.37L401.816 359.37L555.343 181.325C561.736 173.945 570.011 168.642 579.258 165.699C583.971 264.416 524.259 353.21 429.446 376.824C409.238 381.857 388.839 383.53 368.73 382.303C380.931 377.931 392.302 370.382 401.816 359.37Z" />
      </g>
    </svg>
  );
}

export function TelegramIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21.542 2.5a1.2 1.2 0 0 1 .458 1.488l-4 16a1.2 1.2 0 0 1-2.228-.228L13 13l-4 4-2-7 12-7z" />
      <path d="M13 13l6-8" />
    </svg>
  );
}
