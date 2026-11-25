import { useEffect, useRef, useState } from 'react';
import { ImageOff } from 'lucide-react';

/**
 * Image with a fixed aspect ratio (no layout shift), a shimmer skeleton while it loads,
 * and a calm placeholder (no endless shimmer) if the asset is missing.
 */
export default function SmartImage({ src, alt, ratio, className = '', imgClassName = 'object-cover', eager = false, ...rest }) {
  const [status, setStatus] = useState('loading'); // loading | loaded | failed
  const imgRef = useRef(null);

  // Reset when the source changes (e.g. product gallery) and catch images already in the browser cache.
  useEffect(() => {
    setStatus('loading');
    const el = imgRef.current;
    if (el && el.complete) setStatus(el.naturalWidth > 0 ? 'loaded' : 'failed');
  }, [src]);

  return (
    <div className={`relative overflow-hidden bg-surface ${className}`} style={ratio ? { aspectRatio: ratio } : undefined}>
      {status === 'loading' && <div aria-hidden="true" className="skeleton absolute inset-0" />}
      {status === 'failed' ? (
        <div role="img" aria-label={alt || undefined} className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center text-xs text-muted">
          <ImageOff size={20} aria-hidden="true" strokeWidth={1.5} />
          {alt && <span className="line-clamp-2">{alt}</span>}
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          fetchpriority={eager ? 'high' : undefined}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('failed')}
          className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${status === 'loaded' ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
          {...rest}
        />
      )}
    </div>
  );
}
