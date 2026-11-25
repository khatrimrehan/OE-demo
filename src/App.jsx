
import { Component, lazy, Suspense, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { PageSkeleton } from './components/ui/Skeleton';
import useSmoothScroll from './hooks/useSmoothScroll';

import StampLoader from './components/StampLoader';
import Navbar from './components/Navbar';
import CursorFollower from './components/CursorFollower';
import Footer from './components/Footer';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const Cart = lazy(() => import('./pages/Cart'));
const Checkout = lazy(() => import('./pages/Checkout'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const JournalPage = lazy(() => import('./pages/JournalPage'));
const ArticlePage = lazy(() => import('./pages/ArticlePage'));
const InfoPage = lazy(() => import('./pages/InfoPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Scroll to top whenever the route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
  }, [pathname]);

  return null;
}

// Error Boundary
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="mx-auto max-w-page px-5 py-32 text-center">
          <h1 className="text-3xl">
            Something went wrong.
          </h1>

          <p className="mt-3 text-sm text-muted">
            Please refresh the page and try again.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-none bg-ink px-6 py-3 text-onink"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading fallback: a skeleton shaped like the page that is loading
const Loading = () => {
  const { pathname } = useLocation();
  let variant = 'shop';
  if (pathname === '/') variant = 'home';
  else if (pathname.startsWith('/product') || pathname === '/discovery-set') variant = 'product';
  else if (pathname.startsWith('/journal/')) variant = 'article';
  else if (pathname === '/journal') variant = 'journal';
  else if (pathname === '/cart') variant = 'cart';
  else if (pathname === '/checkout') variant = 'checkout';
  else if (pathname.startsWith('/info/')) variant = 'info';
  return <PageSkeleton variant={variant} />;
};

// Pages with forms / primary buttons: the bottom blur would smudge them
const NO_BOTTOM_BLUR = ['/cart', '/checkout', '/order-confirmation'];

// Main App
export default function App() {
  useSmoothScroll();
  const { pathname } = useLocation();
  return (
    <>
      <StampLoader />
      <ScrollToTop />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-none focus:bg-ink focus:px-4 focus:py-2 focus:text-onink"
      >
        Skip to content
      </a>

      <Navbar />
      <CursorFollower />

      <div className="relative">
      <main id="main">
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/shop" element={<Shop />} />

              <Route
                path="/product/:slug"
                element={<ProductPage />}
              />

              <Route
                path="/discovery-set"
                element={<ProductPage slugOverride="discovery-set" />}
              />

              <Route path="/cart" element={<Cart />} />

              <Route path="/checkout" element={<Checkout />} />

              <Route
                path="/order-confirmation"
                element={<OrderConfirmation />}
              />

              <Route path="/journal" element={<JournalPage />} />

              <Route
                path="/journal/:slug"
                element={<ArticlePage />}
              />

              <Route
                path="/info/:page"
                element={<InfoPage />}
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>

      {/* Blur fade at the bottom of the screen; stops above the footer */}
      {!NO_BOTTOM_BLUR.includes(pathname) && <div aria-hidden="true" className="bottom-blur" />}
      </div>

      <Footer />
    </>
  );
}
