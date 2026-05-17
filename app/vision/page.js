'use client';
import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const WaveGrid = dynamic(() => import('../components/3d/WaveGrid'), { ssr: false });

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }), { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const pillars = [
  { num: '01', title: 'Intelligence-Led Governance', desc: 'Future PMOs will be driven by real-time data, predictive analytics, and AI-augmented decision support. We are already building this infrastructure for our clients.' },
  { num: '02', title: 'Adaptive Portfolio Management', desc: 'Static annual plans are obsolete. Tomorrow\'s organizations need living portfolios that flex with market reality while maintaining strategic coherence.' },
  { num: '03', title: 'Human-Centered Delivery', desc: 'Technology enables execution, but humans drive it. Our frameworks are engineered for adoption — culturally aware, psychologically safe, and team-first.' },
  { num: '04', title: 'Enterprise Agility at Scale', desc: 'Agile is no longer a team practice. It is an organizational philosophy. We design enterprise agility that works from the C-suite to the sprint team.' },
];

export default function VisionPage() {
  useScrollReveal();
  return (
    <main>
      <Navbar />

      {/* CINEMATIC OPENER */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#010c1a', position: 'relative', overflow: 'hidden', textAlign: 'center' }}>
        <WaveGrid />
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(1,12,26,0.3) 0%, rgba(1,12,26,0.85) 75%)', pointerEvents: 'none', zIndex: 1 }} />
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <span className="text-label reveal">Our Vision</span>
          <h1 className="heading-display mt-3 reveal" style={{ transitionDelay: '0.15s', maxWidth: '900px', margin: '1rem auto 0' }}>
            The Future of<br /><span className="text-gradient">Enterprise Delivery</span>
          </h1>
          <p className="text-body mt-4 reveal" style={{ maxWidth: '640px', margin: '1.5rem auto 0', transitionDelay: '0.25s', fontSize: '1.125rem' }}>
            We believe the next decade will redefine how organizations turn ambition into achievement. Operion exists to lead that transformation.
          </p>
          <div className="reveal mt-6" style={{ transitionDelay: '0.35s' }}>
            <Link href="/contact" className="btn btn-primary btn-lg" id="vision-hero-cta">Shape the Future With Us →</Link>
          </div>
        </div>
      </section>

      {/* TRANSFORMATION PHILOSOPHY */}
      <section className="section" style={{ background: '#020f1e' }}>
        <div className="container">
          <div className="grid-2" style={{ gap: '5rem', alignItems: 'center' }}>
            <div className="reveal-left">
              <span className="text-label">Transformation Philosophy</span>
              <h2 className="heading-xl mt-2 mb-4">We don't implement systems.<br /><span className="text-gradient">We change how organizations think.</span></h2>
              <p className="text-body mb-3">Most consulting firms deliver frameworks and leave. Operion embeds deeply, challenges assumptions, and builds the internal capability that makes transformation stick long after we're gone.</p>
              <p className="text-body mb-3">We believe sustainable change happens at three levels simultaneously: the structural (governance, process), the behavioral (habits, culture), and the strategic (decision-making, leadership).</p>
              <p className="text-body">When all three align, organizations don't just improve — they evolve into execution machines.</p>
            </div>
            <div className="reveal-right">
              {[
                { label: 'Structural Change', pct: 95, desc: 'Governance, frameworks, and process' },
                { label: 'Behavioral Change', pct: 80, desc: 'Culture, habits, and team dynamics' },
                { label: 'Strategic Alignment', pct: 90, desc: 'Leadership mindset and decision systems' },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '0.9375rem', fontWeight: 600 }}>{item.label}</span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--color-accent)' }}>{item.pct}%</span>
                  </div>
                  <div style={{ height: '4px', background: 'rgba(0,212,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${item.pct}%`, background: 'var(--gradient-accent)', borderRadius: '4px', transition: 'width 1.2s ease' }} />
                  </div>
                  <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', marginTop: '0.35rem' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FUTURE OF PMO */}
      <section className="section" style={{ background: '#010c1a' }}>
        <div className="container">
          <div className="text-center reveal" style={{ marginBottom: '4rem' }}>
            <span className="text-label">The Future of PMO</span>
            <h2 className="heading-xl mt-2">Four pillars of the <span className="text-gradient">next-generation PMO</span></h2>
          </div>
          <div className="grid-2" style={{ gap: '1.5rem' }}>
            {pillars.map((p, i) => (
              <div key={p.num} className="card card-glow reveal" style={{ transitionDelay: `${i * 0.1}s`, padding: '2.5rem' }}>
                <div style={{ fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: '3rem', fontWeight: 800, color: 'rgba(0,212,255,0.1)', lineHeight: 1, marginBottom: '1rem' }}>{p.num}</div>
                <h3 className="heading-md mb-3">{p.title}</h3>
                <p className="text-body">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP MINDSET */}
      <section className="section" style={{ background: '#020f1e' }}>
        <div className="container-narrow text-center">
          <span className="text-label reveal">Leadership Mindset</span>
          <h2 className="heading-xl mt-2 mb-4 reveal" style={{ transitionDelay: '0.1s' }}>
            The leaders who <span className="text-gradient">win tomorrow</span>
          </h2>
          {[
            '"Speed without structure is chaos. Structure without speed is bureaucracy. We build the bridge between them."',
            '"The organizations that will dominate the next decade are not those with the best strategies — but those with the best execution infrastructure."',
            '"A PMO is not a cost center. It is the nervous system of a high-performing organization."',
          ].map((quote, i) => (
            <div key={i} className="reveal" style={{ transitionDelay: `${i * 0.12}s`, marginBottom: '1.5rem', padding: '1.75rem 2rem', background: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.1)', borderRadius: '14px', textAlign: 'left' }}>
              <p style={{ fontSize: '1.0625rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', fontStyle: 'italic' }}>{quote}</p>
              <p style={{ fontSize: '0.8125rem', color: 'var(--color-accent)', marginTop: '0.75rem', fontStyle: 'normal' }}>— Operion Leadership Principles</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ background: '#010c1a', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 50% 60% at 50% 100%, rgba(0,212,255,0.08) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div className="container-narrow reveal" style={{ position: 'relative', zIndex: 1 }}>
          <span className="text-label">Join the Movement</span>
          <h2 className="heading-xl mt-2 mb-3">Be part of the <span className="text-gradient">transformation story</span></h2>
          <p className="text-body mb-4" style={{ maxWidth: '520px', margin: '0 auto 2rem' }}>Whether you're building your first PMO or reinventing enterprise delivery, Operion is your partner for the journey ahead.</p>
          <div className="flex gap-2 justify-center" style={{ flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg" id="vision-cta">Start Your Transformation →</Link>
            <Link href="/services" className="btn btn-secondary btn-lg">Our Services</Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
