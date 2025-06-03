import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** Styles */
import './Header.scss';

const NAVIGATION_ITEMS = [
  { path: '/', label: 'Home' },
  { path: '/drivers', label: 'Drivers' },
  // { path: '/countries', label: 'Countries' },
  { path: '/teams', label: 'Teams' },
];

interface HeaderProps {
  isVisible?: boolean;
}

function Header({ isVisible = true }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className={`header ${isVisible ? 'visible' : ''}`}>
      <nav className='navigation'>
        <ul className='navigation-list'>
          {NAVIGATION_ITEMS.map(({ path, label }) => (
            <li key={path} className='navigation-item'>
              <Link
                href={path}
                className={`navigation-link ${
                  pathname === path ? 'selected' : ''
                }`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
