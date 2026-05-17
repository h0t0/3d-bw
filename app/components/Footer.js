import Link from 'next/link';
import styles from './Footer.module.css';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/vision', label: 'Vision' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
];

const services = ['PMO Setup & Optimization', 'Portfolio Governance', 'Agile Transformation', 'Executive Dashboards', 'Strategy Execution', 'Operational Efficiency'];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.glow} />
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <div className={styles.logo}>
              <span className={styles.logoDot} />
              Operion
            </div>
            <p className={styles.tagline}>
              Transforming how enterprises deliver strategy.<br />
              PMO consulting built for the modern era.
            </p>
            <div className={styles.socials}>
              <a href="mailto:hello@operion.co" className={styles.social} aria-label="Email">✉</a>
              <a href="https://linkedin.com" className={styles.social} aria-label="LinkedIn">in</a>
            </div>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Navigation</h4>
            <ul>
              {navLinks.map(l => (
                <li key={l.href}><Link href={l.href} className={styles.colLink}>{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Services</h4>
            <ul>
              {services.map(s => (
                <li key={s}><span className={styles.colText}>{s}</span></li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact</h4>
            <ul>
              <li><span className={styles.colText}>hello@operion.co</span></li>
              <li><span className={styles.colText}>+1 (800) 000-0000</span></li>
              <li><span className={styles.colText}>New York, NY · London, UK</span></li>
            </ul>
            <Link href="/contact" className="btn btn-primary btn-sm" style={{ marginTop: '1.25rem', display: 'inline-flex' }}>
              Get in Touch →
            </Link>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copy}>© {new Date().getFullYear()} Operion Consulting. All rights reserved.</p>
          <p className={styles.copy} style={{ opacity: 0.4 }}>PMO · Governance · Transformation</p>
        </div>
      </div>
    </footer>
  );
}
