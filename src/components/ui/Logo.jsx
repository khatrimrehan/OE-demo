import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';

// Put your ORIGINAL logo file at public/assets/logo.png (or change this path). It is never modified.
export const LOGO_SRC = '/assets/logo.png';

export default function Logo({ className = 'h-9' }) {
  const [failed, setFailed] = useState(false);
  const { theme } = useTheme();
  return (
    <Link to="/" aria-label="Odour Elixirs — home" className="inline-flex items-center">
      {failed ? (
        // Temporary text stand-in shown ONLY until your logo file exists.
        <span className="font-serif text-2xl font-bold uppercase leading-none">Odour Elixirs</span>
      ) : (
        <img src={theme === 'dark' ? '/assets/Logos/OE_White.svg' : '/assets/Logos/OE_Black.svg'} alt="Odour Elixirs" className={`${className} w-[65px] sm:w-[70px]  h-auto`} onError={() => setFailed(true)} />
      )}
    </Link>
  );
}
