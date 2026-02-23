import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    procedure: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return undefined;

    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.phone) {
      alert('Please fill in your first name, last name, and phone number.');
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        setStatus('error');
        return;
      }

      setStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        procedure: '',
        message: '',
      });
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <Head>
        <title>Dr. Gregg Lombardo | Oral &amp; Maxillofacial Surgery | Wilmington, NC</title>
        <meta
          name="description"
          content="Dr. Gregg Lombardo, Board Certified Oral & Maxillofacial Surgeon in Wilmington, NC. Specializing in dental implants, wisdom teeth, bone grafting, and more since 2003."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/main.css" />
      </Head>

      <div id="top">
        <nav id="navbar">
          <a className="nav-brand" href="/#top" aria-label="Go to top of main page" style={{ textDecoration: 'none' }}>
            <span className="name">Dr. Gregg Lombardo</span>
            <span className="title">Oral &amp; Maxillofacial Surgery</span>
          </a>
          <ul className="nav-links">
            <li><a href="#services">Procedures</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="/patients">Patients</a></li>
            <li><a href="#team">Our Team</a></li>
            <li><a href="/referring-doctors">Referring Doctors</a></li>
            <li><a href="#contact" className="nav-cta">Contact Us</a></li>
          </ul>
        </nav>

        <section className="hero">
          <div className="hero-left">
            <div className="hero-eyebrow fade-up delay-1">Board Certified · Wilmington, NC · Since 2003</div>
            <h1 className="fade-up delay-2">Precision Care<br />for Your <em>Oral Health</em></h1>
            <p className="hero-sub fade-up delay-3">
              Gregg A. Lombardo, DDS, brings over two decades of expertise in oral and maxillofacial surgery - combining advanced technique with a patient-first approach in a state-of-the-art Wilmington practice.
            </p>
            <div className="hero-actions fade-up delay-4">
              <a href="#contact" className="btn-primary">Request Appointment</a>
              <a href="#services" className="btn-outline">View Procedures</a>
            </div>
            <div className="hero-stats fade-up delay-5">
              <div>
                <div className="stat-num">20+</div>
                <div className="stat-label">Years of Practice</div>
              </div>
              <div>
                <div className="stat-num">7</div>
                <div className="stat-label">Procedures Offered</div>
              </div>
              <div>
                <div className="stat-num">Board</div>
                <div className="stat-label">Certified Surgeon</div>
              </div>
            </div>
          </div>
          <div className="hero-right">
            <div className="hero-img-placeholder" />
            <div className="hero-right-content">
              <div className="hero-right-panel">
                <h2>Gregg Lombardo, DDS, Wilmington&apos;s Oral Surgeon and Implant Center</h2>
                <p>
                  From wisdom teeth removal, to dental implants and bone grafting, Dr. Lombardo offers a variety of oral surgical services along with the highest standard of oral care. Certified by the American Board of Oral and Maxillofacial Surgeons, Dr. Lombardo has served patients in the Wilmington area since 2003. Dr. Lombardo has served as adjunct clinical professor at the University of North Carolina at Chapel Hill.
                </p>
                <p>
                  Dr. Lombardo and his team strive to provide state of the art surgical care in a comforting and friendly environment. Dr. Lombardo is available anytime to answer surgical questions or concerns that arise after a procedure in order to provide continual care and ensure patient comfort. Our office boasts the latest technology designed to be as minimally invasive as possible. Because your comfort comes first we offer several anesthetic options from local to IV general anesthesia.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="trust-bar">
          <div className="trust-item"><span className="dot" />American Board of Oral &amp; Maxillofacial Surgeons</div>
          <div className="trust-item"><span className="dot" />UNC Chapel Hill Adjunct Professor</div>
          <div className="trust-item"><span className="dot" />IV &amp; Local Anesthesia Available</div>
          <div className="trust-item"><span className="dot" />Serving Wilmington Since 2003</div>
        </div>

        <section id="services">
          <div style={{ maxWidth: '680px' }}>
            <div className="section-label">Our Procedures</div>
            <h2 className="section-title">Comprehensive Oral Surgical Care</h2>
            <p className="section-body" style={{ color: 'rgba(255,255,255,0.5)' }}>
              From routine wisdom tooth removal to complex dental implant reconstruction, our practice offers the full spectrum of oral and maxillofacial surgical services.
            </p>
          </div>
          <div className="services-grid">
            <div className="service-card"><div className="service-num">01</div><div className="service-name">Wisdom Teeth</div><p className="service-desc">Expert extraction of impacted or troublesome wisdom teeth in a comfortable, state-of-the-art environment with appropriate anesthesia options.</p></div>
            <div className="service-card"><div className="service-num">02</div><div className="service-name">Dental Implants</div><p className="service-desc">Permanent, reliable tooth replacement for single teeth or full mouth restorations. Wilmington&apos;s premier dental implant center.</p></div>
            <div className="service-card"><div className="service-num">03</div><div className="service-name">Bone Grafting</div><p className="service-desc">Regenerative procedures to restore bone volume and structure, preparing the jaw for implant placement and other restorations.</p></div>
            <div className="service-card"><div className="service-num">04</div><div className="service-name">Apicoectomy</div><p className="service-desc">Minimally invasive root-end surgery to treat persistent infections and preserve natural teeth when standard root canal therapy is insufficient.</p></div>
            <div className="service-card"><div className="service-num">05</div><div className="service-name">Impacted Canines</div><p className="service-desc">Surgical exposure and repositioning of impacted canine teeth, working in coordination with your orthodontist for optimal alignment.</p></div>
            <div className="service-card"><div className="service-num">06</div><div className="service-name">Oral Pathology</div><p className="service-desc">Diagnosis and treatment of abnormal conditions of the oral cavity, including biopsies and evaluation of suspicious lesions.</p></div>
            <div className="service-card"><div className="service-num">07</div><div className="service-name">Pre-Prosthetic Surgery</div><p className="service-desc">Preparation of the oral structures to ensure the ideal foundation for dentures and other prosthetic appliances for lasting comfort.</p></div>
          </div>
        </section>

        <section id="about">
          <div className="about-img-wrap">
            <div className="about-img-box"><span className="initials">GL</span></div>
            <div className="about-accent" />
          </div>
          <div>
            <div className="section-label">About Dr. Lombardo</div>
            <h2 className="section-title">Decades of Expertise,<br />Patient-First Care</h2>
            <p className="section-body">Dr. Gregg Lombardo was born and raised in Glastonbury, Connecticut, and earned his DDS from the University of North Carolina at Chapel Hill in 1994. After completing his four-year Oral and Maxillofacial Surgery degree from West Virginia University, he opened his Wilmington practice in 2003.</p>
            <p className="section-body" style={{ marginTop: '16px' }}>Beyond his surgical work, Dr. Lombardo serves as an adjunct clinical professor at UNC Chapel Hill and maintains certifications in BLS and ACLS. He is passionate about continuing education and holds himself to the highest standards of surgical care.</p>
            <div className="about-credentials">
              <div className="credential">DDS, University of North Carolina at Chapel Hill, 1994</div>
              <div className="credential">Oral &amp; Maxillofacial Surgery, West Virginia University, 2001</div>
              <div className="credential">Diplomate, American Board of Oral &amp; Maxillofacial Surgeons</div>
              <div className="credential">Fellow, American Association of Oral &amp; Maxillofacial Surgeons</div>
              <div className="credential">Adjunct Clinical Professor, UNC Chapel Hill (since 2006)</div>
            </div>
            <div className="memberships">
              <div className="memberships-label">Professional Memberships</div>
              <ul>
                <li>Wilmington Tri-County Dental Society</li>
                <li>American Dental Association</li>
                <li>International Association of Oral Surgeons</li>
              </ul>
            </div>
          </div>
        </section>

        <section id="team">
          <div className="section-label">Our Team</div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>Meet the People<br />Behind Your Care</h2>
          <div className="team-grid">
            <div className="team-card">
              <div className="team-avatar"><img src="https://drgregglombardo.com/wp-content/uploads/2016/08/lombardo2-245-369.jpg" alt="Dr. Gregg Lombardo, Oral Surgeon" /></div>
              <div className="team-name">Dr. Gregg Lombardo</div>
              <div className="team-role">Oral Surgeon</div>
            </div>
            <div className="team-card">
              <div className="team-avatar"><img src="https://drgregglombardo.com/wp-content/uploads/2016/08/tina-245-369.jpg" alt="Tina, Surgical Assistant" /></div>
              <div className="team-name">Tina</div>
              <div className="team-role">Surgical Assistant</div>
            </div>
            <div className="team-card">
              <div className="team-avatar"><img src="https://drgregglombardo.com/wp-content/uploads/2016/08/jessica-245-369.jpg" alt="Jessica, Practice Manager" /></div>
              <div className="team-name">Jessica</div>
              <div className="team-role">Practice Manager</div>
            </div>
            <div className="team-card">
              <div className="team-avatar"><img src="https://drgregglombardo.com/wp-content/uploads/2016/08/teresa-245-369.jpg" alt="Teresa, Insurance Coordinator" /></div>
              <div className="team-name">Teresa</div>
              <div className="team-role">Insurance Coordinator</div>
            </div>
          </div>
        </section>

        <section id="contact">
          <div>
            <div className="section-label">Get In Touch</div>
            <h2 className="section-title">Schedule Your<br />Consultation</h2>
            <p className="section-body">We welcome new patients and referrals. Our team is here to answer any questions and guide you through your care journey.</p>
            <div className="contact-info">
              <div className="contact-item"><div className="contact-item-label">Address</div><div className="contact-item-value">1510 Medical Center Drive<br />Wilmington, NC 28401</div></div>
              <div className="contact-item"><div className="contact-item-label">Phone</div><div className="contact-item-value"><a href="tel:9107621555">(910) 762-1555</a></div></div>
              <div className="contact-item"><div className="contact-item-label">Fax</div><div className="contact-item-value">(910) 726-9094</div></div>
              <div className="contact-item"><div className="contact-item-label">Email</div><div className="contact-item-value"><a href="mailto:info@drgregglombardo.com">info@drgregglombardo.com</a></div></div>
              <div className="contact-item"><div className="contact-item-label">Office Hours</div><div className="contact-item-value">Monday - Thursday: 9am - 4pm</div></div>
            </div>
          </div>
          <div className="contact-form-wrap">
            <div className="form-title">Request an Appointment</div>
            {status === 'success' && <div className="form-success-msg">✓ Thank you! We&apos;ll be in touch shortly.</div>}
            {status === 'error' && <div className="form-error-msg">Something went wrong. Please call us at (910) 762-1555.</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id="firstName" placeholder="Jane" value={formData.firstName} onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id="lastName" placeholder="Smith" value={formData.lastName} onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input type="tel" id="phone" placeholder="(910) 000-0000" value={formData.phone} onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))} />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" placeholder="jane@example.com" value={formData.email} onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))} />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="procedure">Procedure of Interest</label>
                <select id="procedure" value={formData.procedure} onChange={(e) => setFormData((p) => ({ ...p, procedure: e.target.value }))}>
                  <option value="">Select a procedure...</option>
                  <option>Wisdom Teeth Removal</option>
                  <option>Dental Implants</option>
                  <option>Bone Grafting</option>
                  <option>Apicoectomy</option>
                  <option>Impacted Canines</option>
                  <option>Oral Pathology</option>
                  <option>Pre-Prosthetic Surgery</option>
                  <option>General Consultation</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="message">Message (optional)</label>
                <textarea id="message" placeholder="Tell us about your situation..." value={formData.message} onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))} />
              </div>
              <button className="btn-submit" id="submitBtn" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Request'}
              </button>
            </form>
          </div>
        </section>

        <footer>
          <div className="brand">Gregg A. Lombardo, DDS &nbsp;·&nbsp; Oral &amp; Maxillofacial Surgery</div>
          <div className="copy">© 2025 Dr. Gregg Lombardo · Wilmington, NC · (910) 762-1555</div>
        </footer>
      </div>
    </>
  );
}
