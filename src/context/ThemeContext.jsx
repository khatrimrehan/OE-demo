// import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
// import { flushSync } from 'react-dom';

// const ThemeContext = createContext({ theme: 'dark', toggleTheme: () => {} });
// const KEY = 'oe-theme';

// const read = () => {
//   try { return localStorage.getItem(KEY) === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
// };

// export function ThemeProvider({ children }) {
//   const [theme, setTheme] = useState(read); // default: dark

//   useEffect(() => {
//     document.documentElement.setAttribute('data-theme', theme);
//     try { localStorage.setItem(KEY, theme); } catch { /* ignore */ }
//     const meta = document.querySelector('meta[name="theme-color"]');
//     if (meta) meta.setAttribute('content', theme === 'dark' ? '#191B1B' : '#ffffff');
//   }, [theme]);

//   // Pass the click event so the animation can expand from the button
//   const toggleTheme = useCallback((e) => {
//     const next = theme === 'dark' ? 'light' : 'dark';
//     const root = document.documentElement;
//     const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
//     const apply = () => flushSync(() => setTheme(next));

//     if (reduce) return apply();

//     if (document.startViewTransition) {
//       const r = e?.currentTarget?.getBoundingClientRect?.();
//       const x = r ? r.left + r.width / 2 : window.innerWidth - 40;
//       const y = r ? r.top + r.height / 2 : 36;
//       const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
//       root.style.setProperty('--tx', `${x}px`);
//       root.style.setProperty('--ty', `${y}px`);
//       root.style.setProperty('--tr', `${radius}px`);
//       document.startViewTransition(apply);
//     } else {
//       root.classList.add('theme-fade');
//       apply();
//       setTimeout(() => root.classList.remove('theme-fade'), 2900);
//     }
//   }, [theme]);

//   const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);
//   return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
// }

// export const useTheme = () => useContext(ThemeContext);


import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { flushSync } from 'react-dom';

const ThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

const KEY = 'oe-theme';
const ANIMATION_DURATION = 550;

const read = () => {
  try {
    return localStorage.getItem(KEY) === 'light'
      ? 'light'
      : 'dark';
  } catch {
    return 'dark';
  }
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(read);
  const isTransitioning = useRef(false);

  useEffect(() => {
    document.documentElement.setAttribute(
      'data-theme',
      theme
    );
  }, [theme]);

  const toggleTheme = useCallback(
    (e) => {
      if (isTransitioning.current) return;

      const next = theme === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;

      const reduceMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      const rect =
        e?.currentTarget?.getBoundingClientRect();

      const x = rect
        ? rect.left + rect.width / 2
        : window.innerWidth / 2;

      const y = rect
        ? rect.top + rect.height / 2
        : window.innerHeight / 2;

      // Reach the farthest screen corner.
      const radius = Math.ceil(
        Math.max(
          Math.hypot(x, y),
          Math.hypot(window.innerWidth - x, y),
          Math.hypot(x, window.innerHeight - y),
          Math.hypot(
            window.innerWidth - x,
            window.innerHeight - y
          )
        )
      );

      // Apply all theme changes synchronously.
      const applyTheme = () => {
        root.setAttribute('data-theme', next);

        const meta = document.querySelector(
          'meta[name="theme-color"]'
        );

        if (meta) {
          meta.setAttribute(
            'content',
            next === 'dark' ? '#191B1B' : '#ffffff'
          );
        }

        try {
          localStorage.setItem(KEY, next);
        } catch {
          // Ignore storage errors.
        }

        flushSync(() => setTheme(next));
      };

      if (
        reduceMotion ||
        !document.startViewTransition
      ) {
        applyTheme();
        return;
      }

      isTransitioning.current = true;
      root.classList.add('theme-switching');

      const transition =
        document.startViewTransition(applyTheme);

      transition.ready
        .then(() => {
          root.animate(
            {
              clipPath: [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${radius}px at ${x}px ${y}px)`,
              ],
            },
            {
              duration: ANIMATION_DURATION,
              easing: 'linear',
              pseudoElement:
                '::view-transition-new(root)',
              fill: 'both',
            }
          );
        })
        .catch(() => {});

      const cleanup = () => {
        root.classList.remove('theme-switching');
        isTransitioning.current = false;
      };

      transition.finished.then(cleanup, cleanup);
    },
    [theme]
  );

  const value = useMemo(
    () => ({ theme, toggleTheme }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
