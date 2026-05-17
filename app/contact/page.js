'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    const io = new IntersectionObserver(e => e.forEach(x => { if (x.isIntersecting) x.target.classList.add('visible'); }), { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export default function ContactPage() {
  useScrollReveal();
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  };

  return (
    <main>
      <Navbar />

      {/* HERO */}
      <section style={{ padding: '10rem 0 4rem', background: '#010c1a', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, width: '500px', height: '500px', background: 'radial-gradient(circle at 70% 30%, rgba(0,212,255,0.08) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div className="container">
          <div className="reveal">
            <span className="text-label">Get In Touch</span>
            <h1 className="heading-display mt-2" style={{ maxWidth: '700px' }}>
              Let's start your<br /><span className="text-gradient">transformation</span>
            </h1>
            <p className="text-body mt-3" style={{ maxWidth: '520px' }}>
              Whether you're ready to build your first PMO or reinvent enterprise delivery — the conversation starts here.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="section" style={{ background: '#010c1a', paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '4rem', alignItems: 'start' }}>

            {/* FORM */}
            <div className="reveal-left">
              <div style={{ background: 'rgba(0,212,255,0.03)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '20px', padding: '2.5rem' }}>
                {status === 'success' ? (
                  <div style={{ textAlign: 'center', padding: '3rem 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✦</div>
                    <h3 className="heading-md mb-2" style={{ color: 'var(--color-accent)' }}>Message Received</h3>
                    <p className="text-body" style={{ maxWidth: '360px', margin: '0 auto' }}>Thank you, {form.name}. Our team will be in touch within 1 business day.</p>
                    <button onClick={() => { setStatus('idle'); setForm({ name:'',email:'',company:'',service:'',message:'' }); }}
                      className="btn btn-secondary" style={{ marginTop: '2rem' }}>Send Another Message</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} id="contact-form">
                    <h2 className="heading-md mb-4">Send us a message</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label className="form-label" htmlFor="name">Full Name *</label>
                        <input id="name" name="name" className="form-input" placeholder="John Smith" value={form.name} onChange={handleChange} required />
                      </div>
                      <div>
                        <label className="form-label" htmlFor="email">Email Address *</label>
                        <input id="email" name="email" type="email" className="form-input" placeholder="john@company.com" value={form.email} onChange={handleChange} required />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div>
                        <label className="form-label" htmlFor="company">Company</label>
                        <input id="company" name="company" className="form-input" placeholder="Your Organization" value={form.company} onChange={handleChange} />
                      </div>
                      <div>
                        <label className="form-label" htmlFor="service">Service of Interest</label>
                        <select id="service" name="service" className="form-input" value={form.service} onChange={handleChange} style={{ cursor: 'pointer' }}>
                          <option value="">Select a service...</option>
                          <option>PMO Setup & Optimization</option>
                          <option>Portfolio Governance</option>
                          <option>Agile Transformation</option>
                          <option>Executive Dashboards</option>
                          <option>Strategy Execution</option>
                          <option>Operational Efficiency</option>
                          <option>Not sure yet</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ marginBottom: '1.75rem' }}>
                      <label className="form-label" htmlFor="message">Message *</label>
                      <textarea id="message" name="message" className="form-input" rows={5}
                        placeholder="Tell us about your organization, current challenges, and what you're hoping to achieve..."
                        value={form.message} onChange={handleChange} required
                        style={{ resize: 'vertical', minHeight: '130px' }} />
                    </div>
                    <button type="submit" id="contact-submit" className="btn btn-primary w-full" style={{ justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1 }}>
                      {status === 'loading' ? 'Sending...' : 'Send Message →'}
                    </button>
                    <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.3)', textAlign: 'center', marginTop: '1rem' }}>No spam. No commitments. Just a conversation.</p>
                  </form>
                )}
              </div>
            </div>

            {/* CONTACT INFO */}
            <div className="reveal-right" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <h3 className="heading-md mb-4">Contact Information</h3>
                {[
                  { icon: '✉', label: 'Email', value: 'hello@operion.co', href: 'mailto:hello@operion.co' },
                  { icon: '☎', label: 'Phone (US)', value: '+1 (800) 000-0000', href: 'tel:+18000000000' },
                  { icon: '☎', label: 'Phone (UK)', value: '+44 20 0000 0000', href: 'tel:+442000000000' },
                  { icon: '⌖', label: 'New York', value: '1 World Trade Center, New York, NY 10007' },
                  { icon: '⌖', label: 'London', value: '1 Canada Square, Canary Wharf, London E14 5AB' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1.25rem', padding: '0 0 1.25rem', borderBottom: '1px solid rgba(0,212,255,0.07)' }}>
                    <span style={{ fontSize: '1rem', color: 'var(--color-accent)', minWidth: '20px', marginTop: '0.1rem' }}>{item.icon}</span>
                    <div>
                      <p style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.35)', marginBottom: '0.2rem' }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.8)', transition: 'color 0.2s' }}
                          onMouseEnter={e => e.target.style.color = 'var(--color-accent)'}
                          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.8)'}>{item.value}</a>
                      ) : (
                        <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ padding: '1.75rem', background: 'rgba(0,212,255,0.04)', border: '1px solid rgba(0,212,255,0.12)', borderRadius: '14px' }}>
                <h4 className="heading-sm mb-2">Response Time</h4>
                <p className="text-body" style={{ fontSize: '0.9rem' }}>We respond to all inquiries within <strong style={{ color: 'var(--color-accent)' }}>1 business day</strong>. For urgent matters, please call directly.</p>
              </div>

              <div style={{ padding: '1.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '14px' }}>
                <h4 className="heading-sm mb-2">Free Strategic Review</h4>
                <p className="text-body" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Every new engagement starts with a complimentary 30-minute strategic review — no commitments required.</p>
                <Link href="#contact-form" className="btn btn-secondary btn-sm">Book Now →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
