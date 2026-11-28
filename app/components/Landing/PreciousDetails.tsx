import { useId } from "react";

// Original vector cuts: a stepped octagonal stone, platinum bezel, and four prongs.
export function CutGem({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  const colors = ["#f8faf3", "#728280", "#dbe7e3", "#394543", "#acbebb", "#ffffff", "#61736e", "#d0ddd5"];
  return (
    <svg viewBox="0 0 120 120" fill="none" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={`${id}-metal`} x1="15" y1="6" x2="96" y2="114" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset=".2" stopColor="#adb8b6" /><stop offset=".42" stopColor="#f7faf8" /><stop offset=".54" stopColor="#4a5054" /><stop offset=".75" stopColor="#e5e8e2" /><stop offset="1" stopColor="#62696a" /></linearGradient>
        <linearGradient id={`${id}-table`} x1="39" y1="31" x2="83" y2="93" gradientUnits="userSpaceOnUse"><stop stopColor={colors[2]} /><stop offset=".38" stopColor={colors[1]} /><stop offset=".66" stopColor={colors[4]} /><stop offset="1" stopColor={colors[3]} /></linearGradient>
      </defs>
      <path d="M35 5 85 5 115 35 115 85 85 115 35 115 5 85 5 35Z" fill={`url(#${id}-metal)`} />
      <path d="M36 10H84L110 36V84L84 110H36L10 84V36Z" fill={colors[3]} />
      <path d="M36 12 43 33 77 33 84 12Z" fill={colors[0]} /><path d="M84 12 77 33 88 44 108 36Z" fill={colors[6]} />
      <path d="M108 36 88 44 88 77 108 84Z" fill={colors[2]} /><path d="M108 84 88 77 77 88 84 108Z" fill={colors[1]} />
      <path d="M84 108 77 88 43 88 36 108Z" fill={colors[7]} /><path d="M36 108 43 88 32 77 12 84Z" fill={colors[3]} />
      <path d="M12 84 32 77 32 44 12 36Z" fill={colors[0]} /><path d="M12 36 32 44 43 33 36 12Z" fill={colors[4]} />
      <path d="M43 33H77L88 44V77L77 88H43L32 77V44Z" fill={`url(#${id}-table)`} />
      <path d="m36 12 7 21 34 0M12 36l20 8v33l-20 7m24 24 7-20h34l7 20m24-72-20 8v33l20 7" stroke={colors[5]} strokeOpacity=".55" strokeWidth=".8" />
      <path d="m43 33-7 27 7 28m34-55 7 27-7 28M32 44l28-6 28 6M32 77l28 6 28-6" stroke={colors[2]} strokeWidth="1.2" strokeOpacity=".65" />
      <path d="m36 12-24 24m72-24 24 24m0 48-24 24m-48 0L12 84" stroke="#fff" strokeWidth="1.5" strokeOpacity=".8" />
      {[ [29, 27], [91, 27], [29, 93], [91, 93] ].map(([cx, cy]) => <ellipse key={`${cx}-${cy}`} cx={cx} cy={cy} rx="3" ry="5" transform={`rotate(${cx < 60 ? -40 : 40} ${cx} ${cy})`} fill={`url(#${id}-metal)`} />)}
      <path d="m25 19 1.5 8L35 29l-8.5 1.5L25 39l-1.5-8.5L15 29l8.5-2Z" fill="#fff" />
    </svg>
  );
}

export function SilverFlare({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 100 100" fill="none" aria-hidden="true" focusable="false" className={className}>
      <defs><linearGradient id={`${id}-chrome`} x1="8" y1="16" x2="82" y2="96" gradientUnits="userSpaceOnUse"><stop stopColor="#fbf9ed" /><stop offset=".32" stopColor="#aab8b6" /><stop offset=".49" stopColor="#fff" /><stop offset=".51" stopColor="#52615e" /><stop offset=".7" stopColor="#d8e2de" /><stop offset="1" stopColor="#818684" /></linearGradient></defs>
      <path d="m50 1 9 34 26-20-20 26 34 9-34 9 20 26-26-20-9 34-9-34-26 20 20-26L1 50l34-9-20-26 26 20Z" fill={`url(#${id}-chrome)`} stroke="#e9ede6" strokeWidth=".5" />
      <path d="m50 1 0 49L1 50l40-9Zm0 49 49 0-40 9-9 40Zm0 0 35-35-26 26Zm0 0L15 85l26-26Z" fill="#fff" fillOpacity=".4" />
    </svg>
  );
}

// A short pavé setting used as trim, with the center stone following the active accent.
export function RhinestoneTrim({ className }: { className?: string }) {
  const id = useId().replace(/:/g, "");
  return (
    <svg viewBox="0 0 180 32" fill="none" aria-hidden="true" focusable="false" className={className}>
      <defs>
        <linearGradient id={`${id}-rim`} x1="-5" y1="-6" x2="5" y2="6" gradientUnits="userSpaceOnUse"><stop stopColor="#fff" /><stop offset=".3" stopColor="#7e8989" /><stop offset=".51" stopColor="#f6fff5" /><stop offset=".53" stopColor="#4c5b59" /><stop offset="1" stopColor="#c4d0cd" /></linearGradient>
        <radialGradient id={`${id}-face`} cx=".32" cy=".24" r=".8"><stop stopColor="#fff" /><stop offset=".4" stopColor="currentColor" /><stop offset="1" stopColor="#263931" /></radialGradient>
        <g id={`${id}-stone`}>
          <circle r="6" fill={`url(#${id}-rim)`} />
          <path d="m-2-4.7 4 0 2.7 2.7 0 4L2 4.7h-4L-4.7 2v-4Z" fill={`url(#${id}-face)`} />
          <path d="m-2-4.7 1 2.5 2 0 1-2.5ZM-4.7-2l2.5 1v2L-4.7 2Z" fill="#fff" fillOpacity=".9" />
          <path d="M2 4.7 1 2.2h-2l-1 2.5Zm2.7-6.7-2.5 1v2L4.7 2Z" fill="#101c18" fillOpacity=".65" />
          <path d="m-1-2.2 2 0 1.2 1.2 0 2L1 2.2h-2L-2.2 1v-2Z" fill="currentColor" fillOpacity=".65" />
          <circle cx="-2.5" cy="-3" r=".9" fill="#fff" />
        </g>
      </defs>
      <path d="M11 16Q90 27 169 16" stroke="#c7d1c3" strokeOpacity=".18" />
      {Array.from({ length: 13 }, (_, i) => {
        const x = 11 + i * 158 / 12;
        const y = 16 + Math.sin(i / 12 * Math.PI) * 5;
        const size = i === 6 ? 1.12 : i % 3 === 0 ? .88 : .7;
        return <use key={i} href={`#${id}-stone`} transform={`translate(${x} ${y}) rotate(${i * 19}) scale(${size})`}
          style={{ color: i === 6 ? "var(--accent, #d0ff71)" : "#d4dfda" }} />;
      })}
    </svg>
  );
}
