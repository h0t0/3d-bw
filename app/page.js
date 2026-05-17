'use client';
import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import styles from './page.module.css';

const HeroScene = dynamic(() => import('./components/3d/HeroScene'), { ssr: false });

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Counter({ value, suffix = '', prefix = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    let start = 0;
    const end = parseInt(value, 10);
    const step = Math.ceil(end / (1800 / 16));
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t = setInterval(() => {
        start = Math.min(start + step, end);
        el.textContent = prefix + start + suffix;
        if (start >= end) clearInterval(t);
      }, 16);
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [value, suffix, prefix]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const services = [
  { icon: '⬡', title: 'PMO Setup & Optimization', desc: 'Design and implement fit-for-purpose PMOs that align strategy with execution at scale.' },
  { icon: '◈', title: 'Portfolio Governance', desc: 'Build governance structures that give leaders clear visibility into every project and investment.' },
  { icon: '⟳', title: 'Agile Transformation', desc: 'Guide enterprises through agility — from coaching to cultural change at every level.' },
  { icon: '▣', title: 'Executive Dashboards', desc: 'Design real-time reporting systems that translate data into strategic insight.' },
  { icon: '◉', title: 'Strategy Execution', desc: 'Connect corporate strategy to project portfolios with proven frameworks.' },
  { icon: '◆', title: 'Operational Efficiency', desc: 'Eliminate bottlenecks and create lean operating models that scale with growth.' },
];

const clients = ['Meridian Group', 'Orix Capital', 'Velantis', 'Solarex', 'Qorex Corp', 'Trivent AG', 'Nexfield', 'Arctium'];

export default function Home() {
  useScrollReveal();
  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.heroCanvas}>
          <HeroScene />
        </div>
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <div className="reveal" style={{ transitionDelay: '0.1s' }}>
            <span className="badge badge-accent">
              <span style={{ fontSize: '0.55rem' }}>●</span> Enterprise PMO Consulting
            </span>
          </div>
          <h1 className={`heading-display ${styles.heroHeading} reveal`} style={{ transitionDelay: '0.2s' }}>
            Transform How Your<br />
            <span className="text-gradient">Organization Delivers</span>
          </h1>
          <p className={`${styles.heroSub} reveal`} style={{ transitionDelay: '0.3s' }}>
            Operion builds world-class PMO systems, governance frameworks, and agile operating
            models — enabling enterprises to execute strategy with precision, speed, and clarity.
          </p>
          <div className={`${styles.heroCtas} reveal`} style={{ transitionDelay: '0.4s' }}>
            <Link href="/contact" className="btn btn-primary btn-lg" id="hero-cta-primary">
              Start Your Transformation →
            </Link>
            <Link href="/services" className="btn btn-secondary btn-lg" id="hero-cta-secondary">
              Explore Services
            </Link>
          </div>
          <div className={`${styles.heroStats} reveal`} style={{ transitionDelay: '0.5s' }}>
            {[
              { value: '150', suffix: '+', label: 'Projects Delivered' },
              { value: '40', suffix: '%', label: 'Avg. Efficiency Gain' },
              { value: '98', suffix: '%', label: 'Client Satisfaction' },
              { value: '12', suffix: ' yrs', label: 'Domain Expertise' },
            ].map(s => (
              <div key={s.label} className={styles.heroStat}>
                <div className="stat-number"><Counter value={s.value} suffix={s.suffix} /></div>
                <div className={styles.heroStatLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.scrollCue}><div className={styles.scrollDot} /></div>
      </section>

      {/* PROBLEM */}
      <section className={`section ${styles.problemSection}`}>
        <div className="container">
          <div className={styles.problemGrid}>
            <div className="reveal-left">
              <span className="text-label">The Challenge</span>
              <h2 className="heading-xl mt-2">Most organizations are<br /><span className="text-gradient">losing the execution war</span></h2>
              <p className="text-body mt-3">Strategic vision is abundant — disciplined execution is rare. Without robust PMO infrastructure, projects stall, budgets spiral, and leadership loses visibility exactly when decisions matter most.</p>
              <div className={styles.problemStats}>
                {[
                  { pct: '70%', text: 'of strategic initiatives fail to achieve their targets' },
                  { pct: '3×', text: 'average cost overrun in organizations without PMO governance' },
                  { pct: '60%', text: 'of executives lack real-time insight into project status' },
                ].map(item => (
                  <div key={item.pct} className={styles.problemStat}>
                    <span className={styles.problemPct}>{item.pct}</span>
                    <p>{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal-right">
              <div className={styles.problemVisual}>
                <div className={styles.chaosBox}>
                  {['No clear ownership', 'Missed deadlines', 'Budget overruns', 'Siloed teams', 'No reporting', 'Strategy gap'].map(t => (
                    <div key={t} className={styles.chaosTag}>{t}</div>
                  ))}
                </div>
                <div className={styles.vsArrow}>→</div>
                <div className={styles.orderBox}>
                  {['Unified PMO', 'Live Dashboards', 'Governance Framework', 'Portfolio Clarity', 'Agile Execution', 'Strategic Alignment'].map(t => (
                    <div key={t} className={styles.orderItem}><span>✓</span> {t}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className={`section ${styles.solutionSection}`}>
        <div className={styles.solutionBg} />
        <div className="container text-center">
          <div className="reveal">
            <span className="text-label">Our Approach</span>
            <h2 className="heading-xl mt-2 mb-3">The Operion <span className="text-gradient">Transformation System</span></h2>
            <p className="text-body" style={{ maxWidth: '600px', margin: '0 auto 4rem' }}>
              A proven three-phase methodology that transforms PMO chaos into strategic clarity — tailored to your scale, sector, and ambitions.
            </p>
          </div>
          <div className={styles.phaseGrid}>
            {[
              { num: '01', phase: 'Diagnose', title: 'Deep Discovery', desc: 'We audit your PMO maturity, governance gaps, portfolio health, and team capability to build a precision roadmap.' },
              { num: '02', phase: 'Design', title: 'Framework Architecture', desc: 'We design custom governance structures, reporting systems, and agile workflows built for your organizational DNA.' },
              { num: '03', phase: 'Deploy', title: 'Embedded Transformation', desc: 'We implement, train, and embed — ensuring sustainable adoption and measurable performance improvement.' },
            ].map((item, i) => (
              <div key={item.num} className={`card card-glow reveal ${styles.phaseCard}`} style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className={styles.phaseNum}>{item.num}</div>
                <span className="text-label" style={{ color: 'var(--color-accent-light)' }}>{item.phase}</span>
                <h3 className="heading-md mt-2 mb-3">{item.title}</h3>
                <p className="text-body">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IMPACT */}
      <section className={`section ${styles.impactSection}`}>
        <div className="container">
          <div className="text-center reveal">
            <span className="text-label">Proven Impact</span>
            <h2 className="heading-xl mt-2 mb-3">Results that <span className="text-gradient">speak clearly</span></h2>
            <p className="text-body" style={{ maxWidth: '560px', margin: '0 auto 4rem' }}>Our engagements are measured by outcomes — real metrics from real transformations across industries.</p>
          </div>
          <div className="grid-4">
            {[
              { num: '40', suf: '%', label: 'Reduction in project delays', icon: '↗' },
              { num: '65', suf: '%', label: 'Improvement in reporting cycle time', icon: '⚡' },
              { num: '3×', suf: '', label: 'Faster portfolio decision-making', icon: '◈' },
              { num: '92', suf: '%', label: 'PMO frameworks still active 3 years post-engagement', icon: '✦' },
            ].map((item, i) => (
              <div key={item.label} className={`card card-glow metric-card reveal`} style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className={styles.impactIcon}>{item.icon}</div>
                <div className="stat-number">
                  {item.num.includes('×') ? item.num : <Counter value={item.num} suffix={item.suf} />}
                </div>
                <p className={styles.impactLabel}>{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES PREVIEW */}
      <section className={`section ${styles.servicesSection}`}>
        <div className="container">
          <div className="flex justify-between items-center mb-6 reveal" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <span className="text-label">What We Do</span>
              <h2 className="heading-lg mt-2">Core Services</h2>
            </div>
            <Link href="/services" className="btn btn-secondary">View All Services →</Link>
          </div>
          <div className="grid-3">
            {services.map((s, i) => (
              <div key={s.title} className={`card card-glow reveal ${styles.serviceCard}`} style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className={styles.serviceIcon}>{s.icon}</div>
                <h3 className="heading-sm mt-3 mb-2">{s.title}</h3>
                <p className="text-body" style={{ fontSize: '0.9375rem' }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT TRUST */}
      <section className={styles.trustSection}>
        <div className="container">
          <p className={styles.trustLabel}>Trusted by organizations across sectors</p>
          <div className={styles.marqueeWrapper}>
            <div className={styles.marqueeTrack}>
              {[...clients, ...clients].map((c, i) => (
                <div key={i} className={styles.logoItem}>{c}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section className={`section ${styles.quoteSection}`}>
        <div className="container-narrow text-center reveal">
          <div className={styles.quoteBlock}>
            <div className={styles.quoteMark}>"</div>
            <p className={styles.quoteText}>
              Operion didn't just build us a PMO — they transformed the way our entire leadership
              team thinks about execution. Six months in, we have complete portfolio visibility
              and our delivery velocity has tripled.
            </p>
            <div className={styles.quoteAuthor}>
              <div className={styles.quoteAvatar}>JR</div>
              <div>
                <strong>James Rosenberg</strong>
                <span>Chief Operating Officer, Meridian Group</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={`section ${styles.ctaSection}`}>
        <div className={styles.ctaBg} />
        <div className="container-narrow text-center reveal">
          <span className="text-label">Ready to Transform?</span>
          <h2 className="heading-xl mt-2 mb-3">
            Your next chapter starts<br /><span className="text-gradient">with a conversation</span>
          </h2>
          <p className="text-body" style={{ maxWidth: '500px', margin: '0 auto 2.5rem' }}>
            Schedule a complimentary strategic review. No obligations — just clarity on where you stand and what's possible.
          </p>
          <div className="flex gap-2 justify-center" style={{ flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg" id="home-final-cta">Book a Strategic Review →</Link>
            <Link href="/about" className="btn btn-secondary btn-lg">Learn About Us</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
