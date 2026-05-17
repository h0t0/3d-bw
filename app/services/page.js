'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const OrbitingCubes = dynamic(() => import('../components/3d/OrbitingCubes'), { ssr: false });

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }), { threshold: 0.1 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const tiers = [
  {
    id: 'starter',
    badge: 'tier-badge tier-starter',
    badgeLabel: '⬡ Starter',
    title: 'Small Businesses & Startups',
    subtitle: 'Build the foundation right from day one.',
    desc: 'For early-stage companies and growing teams who need structured delivery without the enterprise complexity. We set up lightweight, agile PMO systems that scale with you.',
    outcomes: ['Defined project delivery process', 'Basic governance framework', 'Team accountability structures', 'Agile coaching sessions (8 sessions)'],
    benefits: ['Faster team alignment', 'Fewer dropped balls', 'Clear project visibility for leadership', 'Foundation ready to scale'],
    cases: ['Tech startups post-seed', 'Professional services firms (10–50 people)', 'SMEs launching a transformation initiative'],
    accent: '#63bb8c',
  },
  {
    id: 'growth',
    badge: 'tier-badge tier-growth',
    badgeLabel: '◈ Growth',
    title: 'Medium Companies',
    subtitle: 'Structure your portfolio for disciplined growth.',
    desc: 'For organizations managing multiple concurrent projects, cross-functional teams, and increasing executive reporting demands. We implement a structured PMO with real governance.',
    outcomes: ['Full PMO implementation', 'Portfolio tracking system', 'Executive reporting dashboards', 'Governance playbook', 'Quarterly health reviews'],
    benefits: ['Real-time portfolio visibility', 'Reduced project overruns', 'Executive confidence in data', 'Scalable delivery engine'],
    cases: ['Companies with 50–500 employees', 'Firms managing 5–20 concurrent projects', 'Organizations preparing for rapid scale'],
    accent: 'var(--color-accent)',
  },
  {
    id: 'enterprise',
    badge: 'tier-badge tier-enterprise',
    badgeLabel: '✦ Enterprise',
    title: 'Large Enterprises',
    subtitle: 'Full transformation. Enterprise-grade execution.',
    desc: 'For large organizations requiring full-scale PMO transformation, multi-team coordination, C-suite reporting systems, and enterprise governance frameworks across business units.',
    outcomes: ['Enterprise PMO design & deployment', 'Full governance framework', 'Multi-tier reporting architecture', 'Change management & adoption plan', 'Multi-team coordination systems', 'Executive strategy-to-portfolio alignment'],
    benefits: ['Organization-wide delivery consistency', 'C-suite real-time strategic visibility', 'Portfolio ROI optimization', 'Lasting internal PMO capability'],
    cases: ['Enterprises with 500+ employees', 'Multi-business-unit organizations', 'Companies undergoing M&A or digital transformation'],
    accent: '#c9a96e',
  },
];

export default function ServicesPage() {
  useScrollReveal();
  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section style={{ padding: '12rem 0 6rem', background: '#010c1a', textAlign: 'center', position: 'relative', overflow: 'hidden', minHeight: '520px' }}>
        <OrbitingCubes />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 65% 65% at 50% 50%, rgba(1,12,26,0.25) 0%, rgba(1,12,26,0.82) 75%)', pointerEvents: 'none', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="text-label reveal">Our Services</span>
          <h1 className="heading-display mt-2 reveal" style={{ transitionDelay: '0.1s' }}>
            The Right PMO,<br /><span className="text-gradient">at the Right Scale</span>
          </h1>
          <p className="text-body mt-3 reveal" style={{ maxWidth: '580px', margin: '1.5rem auto 0', transitionDelay: '0.2s' }}>
            From lightweight agile setups for startups to full enterprise governance transformations — our service tiers are engineered for where you are and where you're going.
          </p>
        </div>
      </section>

      {/* TIER CARDS */}
      {tiers.map((tier, ti) => (
        <section key={tier.id} id={tier.id} className="section" style={{ background: ti % 2 === 0 ? '#020f1e' : '#010c1a' }}>
          <div className="container">
            <div style={{ display: 'grid', gridTemplateColumns: ti === 1 ? '1fr 1.4fr' : '1.4fr 1fr', gap: '4rem', alignItems: 'start' }}>
              <div className={ti === 1 ? 'reveal-right' : 'reveal-left'} style={{ order: ti === 1 ? 2 : 1 }}>
                <span className={tier.badge} style={{ borderColor: `${tier.accent}33` }}>{tier.badgeLabel}</span>
                <h2 className="heading-lg mb-2">{tier.title}</h2>
                <p style={{ fontSize: '1.0625rem', color: tier.accent, fontWeight: 600, marginBottom: '1rem' }}>{tier.subtitle}</p>
                <p className="text-body mb-4">{tier.desc}</p>

                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '0.875rem' }}>Use Cases</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {tier.cases.map(c => (
                      <span key={c} style={{ padding: '0.3rem 0.75rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '100px', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.55)' }}>{c}</span>
                    ))}
                  </div>
                </div>

                <Link href="/contact" className="btn btn-primary" id={`services-cta-${tier.id}`} style={{ background: `linear-gradient(135deg, ${tier.accent}, ${tier.accent}99)` }}>
                  Get Started →
                </Link>
              </div>

              <div className={ti === 1 ? 'reveal-left' : 'reveal-right'} style={{ order: ti === 1 ? 1 : 2, display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div className="card" style={{ background: `rgba(${tier.accent === '#63bb8c' ? '99,187,140' : tier.accent === '#c9a96e' ? '201,169,110' : '0,212,255'},0.04)`, border: `1px solid ${tier.accent}22` }}>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: tier.accent, marginBottom: '1rem' }}>Deliverables</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', listStyle: 'none', padding: 0 }}>
                    {tier.outcomes.map(o => (
                      <li key={o} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.75)' }}>
                        <span style={{ color: tier.accent, fontWeight: 700, flexShrink: 0, marginTop: '0.05rem' }}>→</span>
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="card" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <h4 style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: '1rem' }}>Key Benefits</h4>
                  <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', listStyle: 'none', padding: 0 }}>
                    {tier.benefits.map(b => (
                      <li key={b} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.9375rem', color: 'rgba(255,255,255,0.65)' }}>
                        <span style={{ color: '#63bb8c', fontWeight: 700, flexShrink: 0 }}>✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          {ti < tiers.length - 1 && <div className="divider" style={{ marginTop: '5rem' }} />}
        </section>
      ))}

      {/* BOTTOM CTA */}
      <section className="section" style={{ background: '#020f1e', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,212,255,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container-narrow reveal" style={{ position: 'relative', zIndex: 1 }}>
          <span className="text-label">Not Sure Where to Start?</span>
          <h2 className="heading-xl mt-2 mb-3">Let's find the right <span className="text-gradient">engagement model</span> for you</h2>
          <p className="text-body mb-4" style={{ maxWidth: '520px', margin: '0 auto 2rem' }}>Every organization is different. Book a free 30-minute strategic call and we'll recommend the exact service tier and approach for your situation.</p>
          <Link href="/contact" className="btn btn-primary btn-lg" id="services-final-cta">Book a Free Consultation →</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
