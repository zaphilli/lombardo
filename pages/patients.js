import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function PatientsPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return undefined;
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 900) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <>
      <Head>
        <title>Patients | Dr. Gregg Lombardo, Oral &amp; Maxillofacial Surgery</title>
        <meta
          name="description"
          content="Patient information for Dr. Gregg Lombardo Oral & Maxillofacial Surgery in Wilmington, NC, including forms, insurance details, CareCredit, and pre/post-op instructions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/main.css" />
        <link rel="stylesheet" href="/css/patients.css" />
      </Head>

      <div className="patients-page">
        <nav id="navbar">
          <a className="nav-brand" href="/#top" aria-label="Go to top of main page" style={{ textDecoration: 'none' }}>
            <span className="name">Dr. Gregg Lombardo</span>
            <span className="title">Oral &amp; Maxillofacial Surgery</span>
          </a>
          <ul className="nav-links">
            <li><a href="/#services">Procedures</a></li>
            <li><a href="/#about">About</a></li>
            <li><a href="/patients">Patients</a></li>
            <li><a href="/referring-doctors">Referring Doctors</a></li>
            <li><a href="/#contact" className="nav-cta">Contact Us</a></li>
          </ul>
          <button
            type="button"
            className="mobile-menu-btn"
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-nav-menu"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
          <ul id="mobile-nav-menu" className={`mobile-nav-menu${mobileMenuOpen ? ' open' : ''}`}>
            <li><a href="/#services" onClick={() => setMobileMenuOpen(false)}>Procedures</a></li>
            <li><a href="/#about" onClick={() => setMobileMenuOpen(false)}>About</a></li>
            <li><a href="/patients" onClick={() => setMobileMenuOpen(false)}>Patients</a></li>
            <li><a href="/referring-doctors" onClick={() => setMobileMenuOpen(false)}>Referring Doctors</a></li>
            <li><a href="/#contact" className="mobile-nav-cta" onClick={() => setMobileMenuOpen(false)}>Contact Us</a></li>
          </ul>
        </nav>

        <header className="patients-hero">
          <div className="hero-inner">
            <div className="section-label">Patient Information</div>
            <h1 className="patients-title">A Comfortable, Clear<br />Path for <em>Your Visit</em></h1>
            <p className="patients-sub">From consultation through follow-up, our team is here to answer questions and provide state-of-the-art care in a friendly, reassuring environment.</p>
          </div>
        </header>

        <main className="patients-main">
          <section className="patients-section">
            <h2>Your Visit</h2>
            <p>Your first appointment begins with a consultation to review your diagnosis and build a treatment plan. Many outpatient procedures can be scheduled quickly to help minimize discomfort.</p>
            <p>To help your visit run smoothly, complete these forms before you arrive:</p>
            <ul>
              <li><a href="https://pdf.dsnforms.com/dsn/patient_form.html?p=t9r8r5" target="_blank" rel="noopener noreferrer">Patient Registration Forms</a></li>
              <li><a href="https://drgregglombardo.com/wp-content/uploads/2016/08/after-hours-call-form.pdf" target="_blank" rel="noopener noreferrer">After Hours Call Form (PDF)</a></li>
            </ul>
            <p>Please bring your referral slip, records or x-rays from your dentist, and current medication and medical history details.</p>
          </section>

          <section className="patients-section">
            <h2>Insurance Information</h2>
            <p>Our office works with several insurance providers, including:</p>
            <div className="pill-list">
              <span>Ameritas</span><span>Reliance Standard</span><span>Principal Life</span><span>United Healthcare</span><span>Lincoln</span><span>Cigna DPPO</span><span>GEHA</span><span>Delta Dental</span><span>MetLife</span><span>Aetna</span><span>Coventry</span>
            </div>
            <p>We also help file claims for non-contracted companies and can assist in verifying eligibility and coverage when needed.</p>
          </section>

          <section className="patients-section">
            <h2>CareCredit</h2>
            <p>CareCredit is available for qualified patients to help break treatment costs into monthly payments.</p>
            <ul>
              <li>Low minimum monthly payment options</li>
              <li>No-interest promotional financing options may be available</li>
              <li>No annual fee and no pre-payment penalties</li>
            </ul>
            <p>Learn more at <a href="https://www.carecredit.com" target="_blank" rel="noopener noreferrer">CareCredit.com</a> or <a href="https://www.carecredit.com/apply/" target="_blank" rel="noopener noreferrer">apply online</a>.</p>
          </section>

          <section className="patients-section two-col">
            <div>
              <h2>Pre-Operative Instructions</h2>
              <p>Review these instructions before your procedure, especially if sedation is planned. They cover preparation, surgery-day planning, and safety guidelines.</p>
              <a className="doc-link" href="https://drgregglombardo.com/wp-content/uploads/2014/06/glddsPreOpForm.pdf" target="_blank" rel="noopener noreferrer">Download Pre-Op Instructions (PDF)</a>
            </div>
            <div>
              <h2>Post-Operative Instructions</h2>
              <p>Follow these recovery guidelines for the day of surgery and the days after. Contact the office right away if you experience unexpected complications.</p>
              <a className="doc-link" href="https://drgregglombardo.com/wp-content/uploads/2014/06/glddsPostOpForm.pdf" target="_blank" rel="noopener noreferrer">Download Post-Op Instructions (PDF)</a>
            </div>
          </section>

          <section className="patients-section notes">
            <h2>Additional Notes</h2>
            <p>Need a PDF reader? <a href="https://get.adobe.com/reader/" target="_blank" rel="noopener noreferrer">Download Adobe Reader</a>.</p>
            <p>Card transactions include a 4% processing fee. Cash transactions are priced separately.</p>
            <p>Questions before or after surgery? <a href="/#contact">Contact our office</a> at <a href="tel:9107621555">(910) 762-1555</a>.</p>
          </section>
        </main>

        <footer>
          <div className="brand">Gregg A. Lombardo, DDS &nbsp;·&nbsp; Oral &amp; Maxillofacial Surgery</div>
          <div className="copy">© 2025 Dr. Gregg Lombardo · Wilmington, NC · (910) 762-1555</div>
        </footer>
      </div>
    </>
  );
}
