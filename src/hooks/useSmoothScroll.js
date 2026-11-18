import { useEffect } from 'react';

/**
 * Inertial ("buttery") scrolling with no dependencies, for wheel, trackpad AND touch.
 *
 * - Wheel / trackpad: the scroll position eases toward a target every frame, so a scroll glides to
 *   rest instead of jumping or stopping abruptly.
 * - Touch: the page follows your finger closely while it is down, then keeps gliding after you let
 *   go (flick momentum) and eases to a soft stop at the `ease` rate.
 * - Left native on purpose: pinch-zoom, horizontal swipes (carousels), nested scroll areas, form
 *   fields, pull-to-refresh at the very top, and while the page is scroll-locked (mobile menu open).
 * - Skipped for reduced-motion users. Keyboard, scrollbar drag, anchors and route changes stay native
 *   and the scroller re-syncs to wherever they put the page.
 *
 * ease:       0.05 (floaty) … 0.2 (snappy). Used for the glide of wheel scrolling and touch release.
 * multiplier: how far one wheel tick travels.
 * flick:      how far a touch flick carries after release (ms of velocity to project).
 */
export default function useSmoothScroll({ ease = 0.07, multiplier = 1, flick = 420 } = {}) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const root = document.documentElement;
    const FOLLOW = 0.65; // how tightly the page tracks a finger that is still down
    const maxScroll = () => Math.max(0, root.scrollHeight - window.innerHeight);
    const clamp = (v) => Math.min(maxScroll(), Math.max(0, v));
    const locked = () => document.body.style.overflow === 'hidden';

    let current = window.scrollY;
    let target = current;
    let lastSet = current;
    let raf = 0;
    let last = 0;
    let dragging = false;

    // Is there a nested scroller under the pointer/finger that can still scroll in this direction?
    const nestedCanScroll = (el, dy) => {
      for (let n = el; n && n !== document.body && n !== root; n = n.parentElement) {
        if (n.hasAttribute && n.hasAttribute('data-native-scroll')) return true;
        const { overflowY } = getComputedStyle(n);
        if ((overflowY === 'auto' || overflowY === 'scroll') && n.scrollHeight > n.clientHeight + 1) {
          const atTop = n.scrollTop <= 0;
          const atBottom = n.scrollTop + n.clientHeight >= n.scrollHeight - 1;
          if ((dy < 0 && !atTop) || (dy > 0 && !atBottom)) return true;
        }
      }
      return false;
    };

    const stop = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      last = 0;
    };

    const tick = (now) => {
      const dt = Math.min(64, now - (last || now));
      last = now;
      target = clamp(target);
      const diff = target - current;
      if (!dragging && Math.abs(diff) < 0.4) {
        current = target;
        lastSet = current;
        window.scrollTo({ top: current, behavior: 'instant' });
        raf = 0;
        last = 0;
        return;
      }
      // Frame-rate independent easing (same feel on 60Hz and 120Hz screens)
      const k = dragging ? FOLLOW : ease;
      current += diff * (1 - Math.pow(1 - k, dt / 16.667));
      lastSet = current;
      window.scrollTo({ top: current, behavior: 'instant' });
      raf = requestAnimationFrame(tick);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    /* ---------- wheel / trackpad ---------- */
    const onWheel = (e) => {
      if (e.defaultPrevented || e.ctrlKey || e.metaKey) return; // pinch-zoom / browser zoom
      if (locked()) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return; // horizontal gesture
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16;
      else if (e.deltaMode === 2) dy *= window.innerHeight;
      if (nestedCanScroll(e.target, dy)) return;

      e.preventDefault();
      if (!raf) { current = window.scrollY; target = current; }
      target = clamp(target + dy * multiplier);
      kick();
    };

    /* ---------- touch ---------- */
    let mode = 'idle'; // idle | pending | drag | native
    let startX = 0;
    let startY = 0;
    let prevY = 0;
    let prevT = 0;
    let velocity = 0; // px per ms, in scroll direction (positive = scroll down)
    let touchTarget = null;

    const onTouchStart = (e) => {
      if (e.touches.length !== 1 || locked()) { mode = 'native'; return; }
      const t = e.touches[0];
      touchTarget = e.target;
      if (touchTarget.closest && touchTarget.closest('input, textarea, select, [contenteditable="true"]')) {
        mode = 'native';
        return;
      }
      // Catch a gliding page under the finger
      stop();
      current = target = lastSet = window.scrollY;
      startX = t.clientX;
      startY = prevY = t.clientY;
      prevT = e.timeStamp;
      velocity = 0;
      mode = 'pending';
    };

    const onTouchMove = (e) => {
      if (mode === 'native' || mode === 'idle') return;
      if (e.touches.length !== 1) { // second finger = pinch: hand everything back to the browser
        if (mode === 'drag') { dragging = false; stop(); }
        mode = 'native';
        return;
      }
      const t = e.touches[0];

      if (mode === 'pending') {
        const dx = t.clientX - startX;
        const dy = t.clientY - startY;
        if (Math.abs(dx) < 4 && Math.abs(dy) < 4) return; // wait for a clear direction
        const scrollDir = -dy; // finger up = scroll down
        const horizontal = Math.abs(dx) > Math.abs(dy);
        const pullDownAtTop = scrollDir < 0 && window.scrollY <= 0; // keep pull-to-refresh
        if (horizontal || pullDownAtTop || nestedCanScroll(touchTarget, scrollDir)) {
          mode = 'native';
          return;
        }
        mode = 'drag';
        dragging = true;
        prevY = startY; // include the movement we waited on
      }

      if (e.cancelable) e.preventDefault();
      const delta = prevY - t.clientY;
      const dt = Math.max(1, e.timeStamp - prevT);
      velocity = velocity * 0.6 + (delta / dt) * 0.4; // smoothed velocity
      prevY = t.clientY;
      prevT = e.timeStamp;
      target = clamp(target + delta);
      kick();
    };

    const onTouchEnd = () => {
      if (mode === 'drag') {
        dragging = false;
        // Stale velocity (finger rested before lifting) means no flick
        const idle = performance.now() - prevT;
        const v = idle > 90 ? 0 : velocity;
        target = clamp(target + v * flick);
        kick();
      }
      mode = 'idle';
    };

    // Something else moved the page (keyboard, scrollbar drag, anchor, route change): follow it.
    const onScroll = () => {
      if (dragging) return;
      if (Math.abs(window.scrollY - lastSet) > 2) {
        current = target = lastSet = window.scrollY;
        stop();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', onTouchEnd, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      window.removeEventListener('scroll', onScroll);
      stop();
    };
  }, [ease, multiplier, flick]);
}
