export default function Pill({ children, className = '' }) {
  return <span className={`inline-flex items-center rounded-none bg-surface px-3 py-1 text-[15px] text-ink ${className}`}>{children}</span>;
}
