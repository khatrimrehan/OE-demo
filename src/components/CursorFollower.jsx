import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

/** Small, unobtrusive trailing dot, rendered only for precise mouse pointers. */
export default function CursorFollower() {
  const dotRef = useRef(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return undefined;

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let raf = 0;
    let x = 0;
    let y = 0;
    let destinationX = 0;
    let destinationY = 0;
    let initialized = false;

    const active = () => finePointer.matches && !reducedMotion.matches;

    const tick = () => {
      // Faster easing keeps the dot close to the pointer while moving.
      x += (destinationX - x) * 0.42;
      y += (destinationY - y) * 0.42;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(destinationX - x) > 0.12 || Math.abs(destinationY - y) > 0.12) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (event) => {
      if (!active()) return;
      // Slightly to the right and above the real cursor, not far behind it.
      destinationX = event.clientX + 1;
      destinationY = event.clientY - 5;
      if (!initialized) {
        x = destinationX;
        y = destinationY;
        initialized = true;
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      dot.classList.add('is-visible');
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const hide = () => dot.classList.remove('is-visible');
    const onMediaChange = () => {
      if (!active()) hide();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', hide);
    window.addEventListener('blur', hide);
    finePointer.addEventListener('change', onMediaChange);
    reducedMotion.addEventListener('change', onMediaChange);

    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', hide);
      window.removeEventListener('blur', hide);
      finePointer.removeEventListener('change', onMediaChange);
      reducedMotion.removeEventListener('change', onMediaChange);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Render outside #root to avoid the desktop zoom: 1.1 scaling the dot's position.
  // Mouse event clientX/clientY are viewport coordinates, so the dot must be too.
  return createPortal(
    <div ref={dotRef} aria-hidden="true" className="cursor-follower" />,
    document.body
  );
}
