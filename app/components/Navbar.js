'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css';

const links = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/vision', label: 'Vision' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoDot} />
          Operion
        </Link>

        <ul className={styles.links}>
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} className={`${styles.link} ${pathname === l.href ? styles.active : ''}`}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/contact" className={`btn btn-primary btn-sm ${styles.cta}`}>
          Get Started →
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          id="nav-hamburger"
        >
          <span className={`${styles.bar} ${open ? styles.barOpen1 : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barOpen2 : ''}`} />
          <span className={`${styles.bar} ${open ? styles.barOpen3 : ''}`} />
        </button>
      </div>

      {open && (
        <div className={styles.drawer}>
          {links.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className={`${styles.drawerLink} ${pathname === l.href ? styles.drawerActive : ''}`}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%', justifyContent: 'center' }}>
            Get Started →
          </Link>
        </div>
      )}
    </nav>
  );
}
