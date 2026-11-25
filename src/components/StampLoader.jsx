import { useEffect, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

/**
 * Stamp loading screen — the logo slams onto the page like an ink stamp.
 * Place at: src/components/StampLoader.jsx
 * Logos used: /assets/Logos/OE_White.png (dark theme) and OE_Black.png (light theme)
 *
 * Props:
 *  minDuration – minimum ms the loader stays up (default 2400)
 *  oncePerSession – only show on first visit of the session (default false = shows on every load/refresh)
 */
const css = `
.oe-stamp{position:fixed;inset:0;z-index:9999;display:grid;place-items:center;background:rgb(var(--c-page));transition:opacity .5s ease}
.oe-stamp.out{opacity:0;pointer-events:none}
.oe-stamp .oe-shake{position:relative;width:min(56vw,420px);animation:oe-shake .38s linear .54s both}
.oe-stamp img{display:block;width:100%;height:auto}
.oe-stamp .oe-logo{position:relative;z-index:2;opacity:0;transform-origin:50% 55%;animation:oe-stamp .9s cubic-bezier(.55,0,.8,.45) both}
.oe-stamp .oe-ghost{position:absolute;inset:0;z-index:1;opacity:0;filter:blur(12px);animation:oe-ink .9s ease-out both}
.oe-stamp .oe-bar{position:absolute;left:50%;bottom:14vh;width:120px;height:1px;margin-left:-60px;background:rgb(var(--c-line));overflow:hidden;opacity:0;animation:oe-fade .4s ease 1.1s forwards}
.oe-stamp .oe-bar::after{content:"";position:absolute;inset:0;background:rgb(var(--c-ink));transform:translateX(-100%);animation:oe-load 1.2s ease-in-out infinite}
@keyframes oe-stamp{0%{opacity:0;transform:scale(1.75) rotate(-2.5deg);filter:blur(9px)}30%{opacity:1}60%{opacity:1;transform:scale(1) rotate(0);filter:blur(0)}72%{transform:scale(.962)}100%{opacity:1;transform:scale(1)}}
@keyframes oe-ink{0%,58%{opacity:0;transform:scale(1)}62%{opacity:.28;transform:scale(1.012)}100%{opacity:0;transform:scale(1.04)}}
@keyframes oe-shake{0%{transform:translate(0,0)}20%{transform:translate(-1px,2px)}45%{transform:translate(1px,-1px)}70%{transform:translate(0,1px)}100%{transform:translate(0,0)}}
@keyframes oe-fade{to{opacity:1}}
@keyframes oe-load{to{transform:translateX(100%)}}
@media (prefers-reduced-motion:reduce){.oe-stamp .oe-logo{animation:oe-fade .6s both}.oe-stamp .oe-shake,.oe-stamp .oe-ghost{animation:none}}
`;

export default function StampLoader({ minDuration = 2400, oncePerSession = false }) {
  const { theme } = useTheme();
  const [state, setState] = useState(() => {
    try {
      if (oncePerSession && sessionStorage.getItem('oe-stamped')) return 'gone';
    } catch (e) {}
    return 'show';
  });

  useEffect(() => {
    if (state !== 'show') return;
    const start = performance.now();
    let timer;
    const finish = () => {
      const wait = Math.max(0, minDuration - (performance.now() - start));
      timer = setTimeout(() => {
        setState('out');
        try { sessionStorage.setItem('oe-stamped', '1'); } catch (e) {}
        setTimeout(() => setState('gone'), 550);
      }, wait);
    };
    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });
    return () => { clearTimeout(timer); window.removeEventListener('load', finish); };
  }, [state, minDuration]);

  if (state === 'gone') return null;
  const src = theme === 'dark' ? '/assets/Logos/OE_White.png' : '/assets/Logos/OE_Black.png';

  return (
    <div className={`oe-stamp${state === 'out' ? ' out' : ''}`} role="status" aria-label="Loading Odour Elixirs">
      <style>{css}</style>
      <div className="oe-shake">
        <img className="oe-ghost" src={src} alt="" />
        <img className="oe-logo" src={src} alt="Odour Elixirs" />
      </div>
      <div className="oe-bar" />
    </div>
  );
}
