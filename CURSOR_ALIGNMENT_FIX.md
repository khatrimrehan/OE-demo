# Cursor positioning correction

The original stylesheet uses `#root { zoom: 1.1; }` on desktop, while `CursorFollower` measures the pointer using `event.clientX/clientY` (unzoomed viewport coordinates). Because the dot was rendered inside `#root`, its positioning was scaled and the separation from the cursor increased toward the right of the screen.

This version renders `CursorFollower` in a React portal under `document.body`, outside the zoomed `#root`. The website keeps its 110% visual zoom. The dot remains close to the pointer across the full viewport.

Updated file: `src/components/CursorFollower.jsx`. No other website behavior has been changed.
