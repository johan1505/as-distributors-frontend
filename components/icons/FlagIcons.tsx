import type { SVGProps } from "react";

type FlagProps = SVGProps<SVGSVGElement>;

// United States flag
export function USFlag(props: FlagProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" {...props}>
      <clipPath id="us-clip">
        <rect width="60" height="30" />
      </clipPath>
      <g clipPath="url(#us-clip)">
        {/* Red and white stripes */}
        <rect width="60" height="30" fill="#B22234" />
        <path
          d="M0,3.46H60M0,8.08H60M0,12.69H60M0,17.31H60M0,21.92H60M0,26.54H60"
          stroke="#FFF"
          strokeWidth="2.31"
        />
        {/* Blue canton */}
        <rect width="24" height="16.15" fill="#3C3B6E" />
        {/* Stars (simplified grid) */}
        <g fill="#FFF">
          {[0, 1, 2, 3, 4].map((row) =>
            [0, 1, 2, 3, 4, 5].map((col) => (
              <circle
                key={`s1-${row}-${col}`}
                cx={2 + col * 4}
                cy={1.6 + row * 3.2}
                r="0.8"
              />
            )),
          )}
          {[0, 1, 2, 3].map((row) =>
            [0, 1, 2, 3, 4].map((col) => (
              <circle
                key={`s2-${row}-${col}`}
                cx={4 + col * 4}
                cy={3.2 + row * 3.2}
                r="0.8"
              />
            )),
          )}
        </g>
      </g>
    </svg>
  );
}

// Mexico flag
export function MXFlag(props: FlagProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" {...props}>
      <rect width="20" height="30" fill="#006847" />
      <rect x="20" width="20" height="30" fill="#FFF" />
      <rect x="40" width="20" height="30" fill="#CE1126" />
      {/* Simplified coat of arms */}
      <circle cx="30" cy="15" r="3.5" fill="#006847" />
      <circle cx="30" cy="15" r="2.5" fill="#FFF" />
      <circle cx="30" cy="15" r="1.5" fill="#006847" />
    </svg>
  );
}

// Samoa (WS) flag
export function WSFlag(props: FlagProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" {...props}>
      <rect width="60" height="30" fill="#CE1126" />
      {/* Blue canton */}
      <rect width="30" height="15" fill="#002B7F" />
      {/* Southern Cross stars */}
      <g fill="#FFF">
        <polygon points="10,3 10.7,5.2 13,5.2 11.1,6.6 11.8,8.8 10,7.4 8.2,8.8 8.9,6.6 7,5.2 9.3,5.2" />
        <polygon points="18,4 18.5,5.5 20,5.5 18.8,6.5 19.3,8 18,7 16.7,8 17.2,6.5 16,5.5 17.5,5.5" />
        <polygon points="14,8 14.5,9.5 16,9.5 14.8,10.5 15.3,12 14,11 12.7,12 13.2,10.5 12,9.5 13.5,9.5" />
        <polygon points="19,9 19.5,10.5 21,10.5 19.8,11.5 20.3,13 19,12 17.7,13 18.2,11.5 17,10.5 18.5,10.5" />
        <polygon points="16,2 16.3,3 17.3,3 16.5,3.6 16.8,4.6 16,4 15.2,4.6 15.5,3.6 14.7,3 15.7,3" />
      </g>
    </svg>
  );
}

// South Korea flag
export function KRFlag(props: FlagProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" {...props}>
      <rect width="60" height="30" fill="#FFF" />
      {/* Taegeuk (yin-yang) */}
      <circle cx="30" cy="15" r="7.5" fill="#CD2E3A" />
      <path d="M30,7.5 A3.75,3.75 0 0 1 30,15 A3.75,3.75 0 0 0 30,22.5 A7.5,7.5 0 0 1 30,7.5" fill="#0047A0" />
      {/* Trigrams */}
      <g stroke="#000" strokeWidth="1.2">
        {/* Top-left trigram */}
        <line x1="13" y1="4" x2="20" y2="7" />
        <line x1="12" y1="6" x2="19" y2="9" />
        <line x1="11" y1="8" x2="18" y2="11" />
        {/* Top-right trigram */}
        <line x1="40" y1="7" x2="47" y2="4" />
        <line x1="41" y1="9" x2="48" y2="6" />
        <line x1="42" y1="11" x2="49" y2="8" />
        {/* Bottom-left trigram */}
        <line x1="11" y1="19" x2="18" y2="22" />
        <line x1="12" y1="21" x2="19" y2="24" />
        <line x1="13" y1="23" x2="20" y2="26" />
        {/* Bottom-right trigram */}
        <line x1="42" y1="19" x2="49" y2="22" />
        <line x1="41" y1="21" x2="48" y2="24" />
        <line x1="40" y1="23" x2="47" y2="26" />
      </g>
    </svg>
  );
}

// China flag
export function CNFlag(props: FlagProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" {...props}>
      <rect width="60" height="30" fill="#DE2910" />
      {/* Large star */}
      <polygon
        points="10,7.5 11.8,12.8 17.3,12.8 12.8,16.2 14.5,21.5 10,18 5.5,21.5 7.2,16.2 2.7,12.8 8.2,12.8"
        fill="#FFDE00"
      />
      {/* Small stars */}
      <g fill="#FFDE00">
        <polygon points="20,3 20.6,4.8 22.5,4.8 21,5.9 21.6,7.7 20,6.6 18.4,7.7 19,5.9 17.5,4.8 19.4,4.8" />
        <polygon points="24,6 24.6,7.8 26.5,7.8 25,8.9 25.6,10.7 24,9.6 22.4,10.7 23,8.9 21.5,7.8 23.4,7.8" />
        <polygon points="24,12 24.6,13.8 26.5,13.8 25,14.9 25.6,16.7 24,15.6 22.4,16.7 23,14.9 21.5,13.8 23.4,13.8" />
        <polygon points="20,15 20.6,16.8 22.5,16.8 21,17.9 21.6,19.7 20,18.6 18.4,19.7 19,17.9 17.5,16.8 19.4,16.8" />
      </g>
    </svg>
  );
}

// Map locale codes to flag components
export const localeFlagMap: Record<string, React.ComponentType<FlagProps>> = {
  en: USFlag,
  es: MXFlag,
  sm: WSFlag,
  ko: KRFlag,
  zh: CNFlag,
};
