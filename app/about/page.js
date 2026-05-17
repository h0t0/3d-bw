'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const FloatingRings = dynamic(() => import('../components/3d/FloatingRings'), { ssr: false });

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }), { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const values = [
  { icon: '◆', title: 'Execution First', desc: 'We believe strategy without execution is hallucination. Every engagement is built around measurable delivery.' },
  { icon: '⬡', title: 'Radical Clarity', desc: 'We eliminate ambiguity from governance, reporting, and decision-making so leaders can act with confidence.' },
  { icon: '◉', title: 'Client Obsession', desc: 'Your success is the only KPI that matters. We embed deeply, act as partners, and leave lasting capability.' },
  { icon: '▣', title: 'Systems Thinking', desc: 'We see organizations as living systems. Our solutions are holistic, interconnected, and built to last.' },
  { icon: '⟳', title: 'Continuous Improvement', desc: 'We apply the same agile principles to ourselves that we recommend to our clients. We never stop learning.' },
  { icon: '◈', title: 'Integrity Always', desc: 'We tell clients what they need to hear, not what they want to hear. Trust is non-negotiable.' },
];

const team = [
  { initials: 'AK', name: 'Alexandra Kim', title: 'Founder & Managing Director', expertise: 'Enterprise PMO · 15 yrs' },
  { initials: 'MR', name: 'Marcus Reid', title: 'Partner, Portfolio Governance', expertise: 'Portfolio Strategy · 12 yrs' },
  { initials: 'SN', name: 'Sofia Nakamura', title: 'Head of Agile Transformation', expertise: 'Agile & Scrum · 10 yrs' },
  { initials: 'DL', name: 'Daniel Laurent', title: 'Director, Executive Reporting', expertise: 'BI & Dashboards · 11 yrs' },
];

export default function AboutPage() {
  useScrollReveal();
  return (
    <main>
      <Navbar />

      {/* PAGE HERO */}
      <section style={{ padding: '12rem 0 6rem', background: 'linear-gradient(180deg, #020f1e 0%, #010c1a 100%)', position: 'relative', overflow: 'hidden', minHeight: '520px' }}>
        <FloatingRings />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 70% at 50% 50%, rgba(1,12,26,0.35) 0%, rgba(1,12,26,0.8) 80%)', pointerEvents: 'none', zIndex: 1 }} />
        <div className="container text-center" style={{ position: 'relative', zIndex: 2 }}>
          <span className="text-label reveal">Our Story</span>
          <h1 className="heading-display mt-2 reveal" style={{ transitionDelay: '0.1s' }}>
            Built by practitioners.<br /><span className="text-gradient">For practitioners.</span>
          </h1>
          <p className="text-body mt-3 reveal" style={{ maxWidth: '620px', margin: '1.5rem auto 0', transitionDelay: '0.2s' }}>
            Operion was founded by leaders who lived the consequences of broken PMOs — and decided to fix the problem at its root.
          </p>
        </div>
      </section>

      {/* STORY */}
      <section className="section" style={{ background: '#010c1a' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '5rem', alignItems: 'center' }}>
            <div className="reveal-left">
              <span className="text-label">Why We Exist</span>
              <h2 className="heading-lg mt-2 mb-3">The problem was hiding in plain sight</h2>
              <p className="text-body mb-3">
                After decades of working inside global enterprises, our founders witnessed a recurring pattern: brilliant strategies dying in execution. Not because teams lacked talent — but because the infrastructure to deliver was broken.
              </p>
              <p className="text-body mb-3">
                PMOs were either too rigid or nonexistent. Governance was theatre. Reporting was lagging. And the gap between boardroom strategy and project reality was a chasm no dashboard could bridge.
              </p>
              <p className="text-body">
                In 2018, we founded Operion with one mission: to build the execution infrastructure that modern enterprises actually deserve.
              </p>
            </div>
            <div className="reveal-right">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { year: '2018', event: 'Operion founded in New York. First 3 enterprise clients.' },
                  { year: '2019', event: 'Launched the Operion Governance Framework (OGF v1).' },
                  { year: '2021', event: 'Expanded to London. Passed 50 successful PMO transformations.' },
                  { year: '2023', event: 'Introduced Executive Dashboard as a Service (EDaaS).' },
                  { year: '2025', event: '150+ projects. 98% client satisfaction. Global reach.' },
                ].map(item => (
                  <div key={item.year} style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-accent)', minWidth: '42px', paddingTop: '0.1rem' }}>{item.year}</span>
                    <div style={{ flex: 1, paddingBottom: '1.25rem', borderBottom: '1px solid rgba(0,212,255,0.08)' }}>
                      <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.7)' }}>{item.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="section" style={{ background: '#020f1e' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '2rem' }}>
            {[
              {
                label: 'Our Mission',
                title: 'Make execution the competitive advantage',
                body: "We partner with organizations to build the PMO systems, governance structures, and operating models that transform strategy from vision into verifiable results — at any scale.",
                accent: 'var(--color-accent)',
              },
              {
                label: 'Our Vision',
                title: 'A world where no good strategy fails in execution',
                body: "We envision a future where every organization — from ambitious startups to global enterprises — has access to the project delivery infrastructure they need to turn their best ideas into reality.",
                accent: '#c9a96e',
              },
            ].map(item => (
              <div key={item.label} className="card card-glow reveal" style={{ padding: '2.5rem' }}>
                <div style={{ width: '3rem', height: '3px', background: item.accent, borderRadius: '2px', marginBottom: '1.5rem' }} />
                <span className="text-label">{item.label}</span>
                <h3 className="heading-md mt-2 mb-3">{item.title}</h3>
                <p className="text-body">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="section" style={{ background: '#010c1a' }}>
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
            <span className="text-label">What We Stand For</span>
            <h2 className="heading-xl mt-2">Core <span className="text-gradient">Values</span></h2>
          </div>
          <div className="grid-3">
            {values.map((v, i) => (
              <div key={v.title} className="card card-glow reveal" style={{ transitionDelay: `${i * 0.07}s` }}>
                <div className="icon-box" style={{ marginBottom: '1.25rem' }}>{v.icon}</div>
                <h3 className="heading-sm mb-2">{v.title}</h3>
                <p className="text-body" style={{ fontSize: '0.9375rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="section" style={{ background: '#020f1e' }}>
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
            <span className="text-label">Leadership</span>
            <h2 className="heading-xl mt-2">The <span className="text-gradient">Team</span></h2>
            <p className="text-body mt-3" style={{ maxWidth: '520px', margin: '1rem auto 0' }}>Senior practitioners with decades of frontline PMO and transformation experience.</p>
          </div>
          <div className="grid-4">
            {team.map((m, i) => (
              <div key={m.name} className="card card-glow reveal text-center" style={{ transitionDelay: `${i * 0.08}s`, padding: '2.5rem 1.75rem' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--gradient-accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.25rem', color: 'white', margin: '0 auto 1.25rem' }}>{m.initials}</div>
                <h3 className="heading-sm">{m.name}</h3>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-accent-light)', marginTop: '0.35rem' }}>{m.title}</p>
                <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.25rem' }}>{m.expertise}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#010c1a', textAlign: 'center' }}>
        <div className="container-narrow reveal">
          <span className="text-label">Work With Us</span>
          <h2 className="heading-xl mt-2 mb-3">Ready to <span className="text-gradient">transform</span> your organization?</h2>
          <Link href="/contact" className="btn btn-primary btn-lg" id="about-cta">Start the Conversation →</Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
