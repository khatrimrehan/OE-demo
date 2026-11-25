/** Shimmering placeholder block. Size it with className (e.g. "h-4 w-32"). */
export default function Skeleton({ className = '', rounded = 'rounded-none', ...rest }) {
  return <div aria-hidden="true" className={`skeleton ${rounded} ${className}`} {...rest} />;
}

/* Wrapper used by every page-level skeleton: announces loading to screen readers once. */
function Status({ className = '', children }) {
  return (
    <div role="status" aria-live="polite" className={className}>
      <span className="sr-only">Loading…</span>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Building blocks — each mirrors the real component's box sizes       */
/* ------------------------------------------------------------------ */

/** Mirrors <Pill>: text-[15px] + py-1  ->  ~30px tall. */
export function PillSkeleton({ className = 'w-28' }) {
  return <Skeleton className={`h-[30px] ${className}`} />;
}

/** Mirrors <SectionHeader>: pill row, then heading (+ optional action button) on one line. */
export function HeadingSkeleton({ action = false }) {
  return (
    <div>
      <PillSkeleton />
      <div className="mt-5 flex flex-nowrap items-end justify-between gap-3 sm:gap-6">
        <div className="min-w-0 flex-1">
          <Skeleton className="h-[26px] w-4/5 max-w-[520px] min-[400px]:h-[31px] sm:h-10 md:h-12" />
        </div>
        {action && <Skeleton className="h-10 w-24 shrink-0" />}
      </div>
    </div>
  );
}

/** Mirrors <ProductCard>: 3/4 image, then title + descriptor on the left and price chip on the right. */
export function ProductCardSkeleton() {
  return (
    <div>
      <Skeleton style={{ aspectRatio: '3 / 4' }} />
      <div className="mt-3 flex items-start justify-between gap-1 p-1">
        <div>
          {/* h3 text-2xl leading-tight = 30px */}
          <div className="flex h-[30px] items-center"><Skeleton className="h-6 w-36" /></div>
          {/* descriptor text-[15px] = ~23px line */}
          <div className="flex h-[23px] items-center"><Skeleton className="h-3.5 w-44" /></div>
        </div>
        {/* price chip: px-4 py-2 text-[16px] = 40px tall */}
        <Skeleton className="mt-1 h-10 w-[88px] shrink-0" />
      </div>
    </div>
  );
}

/** Mirrors the journal card: surface card, 4/3 image, category pill, title. */
export function JournalCardSkeleton() {
  return (
    <div className="overflow-hidden bg-surface">
      <Skeleton style={{ aspectRatio: '4 / 3' }} />
      <div className="p-4">
        <Skeleton className="h-[29px] w-24 !bg-page" />
        <Skeleton className="mt-3 h-[22px] w-4/5" />
        <Skeleton className="mt-2 h-[22px] w-2/5" />
      </div>
    </div>
  );
}

/** Mirrors <DiscoverySection compact>: pill, 16/10 image on the left, copy + price + button on the right. */
export function DiscoverySkeleton({ compact = false }) {
  return (
    <div className={`mx-auto max-w-page px-5 md:px-8 ${compact ? 'pt-8 md:pt-10' : 'py-20 md:py-32'}`}>
      <PillSkeleton className="w-32" />
      <div className="mt-8 grid items-stretch gap-8 md:grid-cols-2 md:gap-14">
        <Skeleton className="w-full" style={{ aspectRatio: '16 / 10' }} />
        <div className="flex flex-col gap-6 md:justify-around md:gap-10">
          <div>
            <Skeleton className="h-[35px] w-5/6 md:h-[50px]" />
            <Skeleton className="mt-2 h-[35px] w-2/3 md:h-[50px]" />
            <Skeleton className="mt-4 h-4 w-full max-w-md" />
            <Skeleton className="mt-2 h-4 w-3/4 max-w-md" />
            <Skeleton className="mt-5 h-8 w-28" />
          </div>
          <Skeleton className="h-11 w-40 self-start" />
        </div>
      </div>
    </div>
  );
}

function CardGrid({ count = 6 }) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => <ProductCardSkeleton key={i} />)}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Page-level skeletons (one per route layout)                         */
/* ------------------------------------------------------------------ */

/** / — hero, discovery, about, collection, journal, promo banner and FAQ, in page order. */
function HomeSkeleton() {
  const Rule = () => <hr aria-hidden="true" className="mx-auto h-px w-[90%] border-0 bg-ink/10" />;
  return (
    <>
      {/* Hero */}
      <div className="mx-auto flex min-h-[85svh] w-full max-w-[1600px] flex-col items-center justify-center px-4 pb-4 pt-24 text-center sm:px-6 md:pt-28">
        <div className="flex w-full flex-col items-center">
          <Skeleton className="h-[34px] w-[88%] max-w-[560px] sm:h-[45px] md:h-[54px]" />
          <Skeleton className="mt-2 h-[34px] w-[40%] max-w-[260px] sm:h-[45px] md:h-[54px]" />
          <Skeleton className="mt-4 h-4 w-72 max-w-full sm:mt-5" />
          <Skeleton className="mt-2 h-4 w-52 max-w-full" />
          <Skeleton className="mt-5 h-11 w-[480px] sm:mt-6" />
        </div>
        <Skeleton className="mt-8 w-full max-w-[990px] sm:mt-10" style={{ aspectRatio: '1672 / 941' }} />
      </div>
      <Rule />

      {/* Discovery set (full size, not compact) */}
      <DiscoverySkeleton />
      <Rule />

      {/* About us */}
      <div className="mx-auto max-w-page px-5 py-14 md:px-8">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5"><PillSkeleton className="w-28" /></div>
          <div className="space-y-3 md:col-span-7">
            <Skeleton className="h-6 w-full md:h-7" />
            <Skeleton className="h-6 w-11/12 md:h-7" />
            <Skeleton className="h-6 w-3/4 md:h-7" />
            <Skeleton className="mt-6 h-6 w-full md:h-7" />
            <Skeleton className="h-6 w-2/3 md:h-7" />
          </div>
        </div>
      </div>
      <Rule />

      {/* Collection */}
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <HeadingSkeleton action />
        <CardGrid count={6} />
      </div>
      <Rule />

      {/* Journal */}
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <HeadingSkeleton action />
        <div className="mt-10 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => <JournalCardSkeleton key={i} />)}
        </div>
      </div>
      <Rule />

      {/* Promo banner */}
      <div className="mx-auto max-w-page px-5 py-10 md:px-8">
        <div className="flex flex-col items-center bg-surface px-6 py-20 md:py-28">
          <Skeleton className="h-10 w-72 max-w-full !bg-page md:h-[50px]" />
          <Skeleton className="mt-4 h-4 w-64 max-w-full !bg-page" />
          <Skeleton className="mt-6 h-11 w-44 !bg-page" />
        </div>
      </div>
      <Rule />

      {/* FAQ */}
      <div className="mx-auto flex max-w-page flex-col items-center px-5 py-20 md:px-8 md:py-28">
        <PillSkeleton className="w-20" />
        <Skeleton className="mt-5 h-9 w-80 max-w-full md:h-[53px] md:w-[460px]" />
        <Skeleton className="mt-4 h-4 w-[280px] max-w-full" />
        <Skeleton className="mt-5 h-10 w-36" />
        <div className="mt-10 flex w-full max-w-[620px] flex-col gap-2">
          {[0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
      </div>
    </>
  );
}

/** /shop — discovery band + "Find Your Signature." collection. */
function ShopSkeleton() {
  return (
    <>
      <DiscoverySkeleton compact />
      <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
        <HeadingSkeleton />
        <CardGrid count={6} />
      </div>
    </>
  );
}

/** /journal — heading with "Follow Us" button + article cards. */
function JournalSkeleton() {
  return (
    <div className="mx-auto max-w-page px-5 py-16 md:px-8 md:py-24">
      <HeadingSkeleton action />
      <div className="mt-10 grid grid-cols-1 gap-5 min-[480px]:grid-cols-2 lg:grid-cols-3">
        {[0, 1, 2].map((i) => <JournalCardSkeleton key={i} />)}
      </div>
    </div>
  );
}

/** /product/:slug and /discovery-set — breadcrumb, thumbnails + framed image, details, "You may also like". */
function ProductSkeleton() {
  return (
    <div className="mx-auto max-w-page px-5 py-10 md:px-8 md:py-16">
      <Skeleton className="mb-6 h-4 w-40" />
      <div className="grid items-start gap-10 md:grid-cols-2 md:gap-14">
        <div className="mx-auto flex w-full max-w-[440px] flex-col-reverse gap-3 md:mx-0 md:flex-row">
          <div className="grid shrink-0 grid-cols-4 gap-2 md:w-[68px] md:grid-cols-1 md:content-start">
            {[0, 1, 2, 3].map((i) => <Skeleton key={i} style={{ aspectRatio: '3 / 4' }} />)}
          </div>
          <Skeleton className="min-w-0 flex-1" style={{ aspectRatio: '3 / 4' }} />
        </div>
        <div>
          <Skeleton className="h-10 w-3/4 md:h-12" />
          <Skeleton className="mt-3 h-4 w-44" />
          <Skeleton className="mt-6 h-8 w-28" />
          <div className="mt-6 max-w-md space-y-2.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Skeleton className="h-11 w-[120px]" />
            <Skeleton className="h-11 w-36" />
          </div>
          <div className="mt-10 max-w-md divide-y divide-line border-y border-line">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex justify-between gap-6 py-4">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-24">
        <Skeleton className="h-9 w-64" />
        <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 min-[480px]:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => <ProductCardSkeleton key={i} />)}
        </div>
      </div>
    </div>
  );
}

/** /journal/:slug — back link, meta line, title, 16/9 image, body. */
function ArticleSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:py-20">
      <Skeleton className="h-4 w-20" />
      <Skeleton className="mt-6 h-4 w-40" />
      <Skeleton className="mt-3 h-10 w-4/5 md:h-12" />
      <Skeleton className="mt-8 w-full" style={{ aspectRatio: '16 / 9' }} />
      <div className="mt-8 space-y-5">
        {[0, 1, 2].map((p) => (
          <div key={p} className="space-y-2.5">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** /cart — title, line items (4/5 thumb) and summary card with button. */
function CartSkeleton() {
  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8 md:py-20">
      <Skeleton className="h-10 w-56 md:h-12" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div className="divide-y divide-line border-y border-line">
          {[0, 1].map((i) => (
            <div key={i} className="flex gap-4 py-5">
              <Skeleton className="w-24 shrink-0" style={{ aspectRatio: '4 / 5' }} />
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex justify-between gap-3">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-32" />
                    <Skeleton className="h-4 w-44" />
                  </div>
                  <Skeleton className="h-5 w-16" />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <Skeleton className="h-10 w-[104px]" />
                  <Skeleton className="h-5 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="h-fit bg-surface p-6">
          <Skeleton className="h-5 w-24 !bg-page" />
          <div className="mt-4 space-y-3">
            <div className="flex justify-between"><Skeleton className="h-4 w-20 !bg-page" /><Skeleton className="h-4 w-16 !bg-page" /></div>
            <div className="flex justify-between border-t border-line pt-3"><Skeleton className="h-5 w-14 !bg-page" /><Skeleton className="h-5 w-20 !bg-page" /></div>
          </div>
          <Skeleton className="mt-6 h-11 w-full !bg-page" />
        </div>
      </div>
    </div>
  );
}

/** /checkout — title, form fields grid, payment options, order summary. */
function CheckoutSkeleton() {
  const Field = ({ wide }) => (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <Skeleton className="mb-1 h-4 w-24" />
      <Skeleton className={wide ? 'h-[84px] w-full' : 'h-[46px] w-full'} />
    </div>
  );
  return (
    <div className="mx-auto max-w-page px-5 py-12 md:px-8 md:py-20">
      <Skeleton className="h-10 w-48 md:h-12" />
      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        <div>
          <Skeleton className="h-5 w-44" />
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field /><Field /><Field /><Field wide /><Field /><Field /><Field />
          </div>
          <Skeleton className="mt-8 h-5 w-24" />
          <Skeleton className="mt-3 h-[82px] w-full" />
        </div>
        <div className="h-fit bg-surface p-6">
          <Skeleton className="h-5 w-32 !bg-page" />
          <div className="mt-4 space-y-3">
            <div className="flex justify-between"><Skeleton className="h-4 w-28 !bg-page" /><Skeleton className="h-4 w-16 !bg-page" /></div>
            <div className="flex justify-between border-t border-line pt-4"><Skeleton className="h-4 w-20 !bg-page" /><Skeleton className="h-4 w-16 !bg-page" /></div>
            <div className="flex justify-between"><Skeleton className="h-5 w-14 !bg-page" /><Skeleton className="h-5 w-20 !bg-page" /></div>
          </div>
          <Skeleton className="mt-6 h-11 w-full !bg-page" />
        </div>
      </div>
    </div>
  );
}

/** /info/:page — title and a few heading + paragraph sections. */
function InfoSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-12 md:py-20">
      <Skeleton className="h-10 w-2/3 md:h-12" />
      {[0, 1, 2].map((i) => (
        <div key={i} className="mt-8">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}

const VARIANTS = {
  home: HomeSkeleton,
  shop: ShopSkeleton,
  list: ShopSkeleton,
  journal: JournalSkeleton,
  product: ProductSkeleton,
  article: ArticleSkeleton,
  cart: CartSkeleton,
  checkout: CheckoutSkeleton,
  info: InfoSkeleton,
};

/** Route-level fallback shown while a lazy page chunk loads. */
export function PageSkeleton({ variant = 'shop' }) {
  const Layout = VARIANTS[variant] || ShopSkeleton;
  return (
    <Status>
      <Layout />
    </Status>
  );
}
