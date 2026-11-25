/** Shimmering placeholder block. Size it with className (e.g. "h-4 w-32"). */
export default function Skeleton({ className = '', rounded = 'rounded-none', ...rest }) {
  return <div aria-hidden="true" className={`skeleton ${rounded} ${className}`} {...rest} />;
}

export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton rounded="rounded-none" style={{ aspectRatio: '3 / 4' }} />
      <div className="mt-3 flex items-start justify-between gap-3 p-1">
        <div className="space-y-2">
          <Skeleton className="h-7 w-32" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton rounded="rounded-none" className="h-10 w-20 shrink-0" />
      </div>
    </div>
  );
}

export function JournalCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-none bg-surface">
      <Skeleton rounded="rounded-none" style={{ aspectRatio: '4 / 3' }} />
      <div className="p-4">
        <Skeleton rounded="rounded-none" className="h-7 w-28" />
        <Skeleton className="mt-3 h-6 w-4/5" />
      </div>
    </div>
  );
}

/** Section heading placeholder: pill + two-line title. */
export function HeadingSkeleton() {
  return (
    <div>
      <Skeleton rounded="rounded-none" className="h-7 w-24" />
      <Skeleton className="mt-5 h-9 w-64 max-w-full md:h-12 md:w-96" />
    </div>
  );
}

/** Route-level fallback shown while a lazy page chunk loads. */
export function PageSkeleton({ variant = 'list' }) {
  return (
    <div role="status" aria-live="polite" className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
      <span className="sr-only">Loading…</span>
      {variant === 'product' && (
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
          <Skeleton rounded="rounded-none" className="mx-auto w-full max-w-[440px]" style={{ aspectRatio: '3 / 4' }} />
          <div className="space-y-4">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton rounded="rounded-none" className="mt-6 h-11 w-48" />
          </div>
        </div>
      )}
      {variant === 'article' && (
        <div className="mx-auto max-w-2xl space-y-4">
          <Skeleton rounded="rounded-none" className="h-7 w-28" />
          <Skeleton className="h-10 w-4/5" />
          <Skeleton rounded="rounded-none" className="mt-6 w-full" style={{ aspectRatio: '16 / 9' }} />
          {[0, 1, 2, 3].map((i) => <Skeleton key={i} className={`h-4 ${i === 3 ? 'w-2/3' : 'w-full'}`} />)}
        </div>
      )}
      {variant === 'list' && (
        <>
          <HeadingSkeleton />
          <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => <ProductCardSkeleton key={i} />)}
          </div>
        </>
      )}
    </div>
  );
}
