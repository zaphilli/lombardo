import Head from 'next/head';
import { useEffect } from 'react';

export default function ReferringDoctorsPage() {
  useEffect(() => {
    const navbar = document.getElementById('navbar');
    if (!navbar) return undefined;
    const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <Head>
        <title>Referring Doctors | Dr. Gregg Lombardo, OMS</title>
        <meta
          name="description"
          content="Referring doctors portal for Dr. Gregg Lombardo's oral surgery practice in Wilmington, NC."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/main.css" />
        <link rel="stylesheet" href="/css/referring.css" />
      </Head>

      <div className="referring-page">
        <div className="bg-deco" />
        <div className="bg-glow" />

        <nav id="navbar" className="referring-nav">
          <a className="nav-brand-link" href="/#top" aria-label="Go to top of main page">
            <div className="brand-mark">GL</div>
            <div>
              <span className="brand-name">Dr. Gregg Lombardo, DDS</span>
              <span className="brand-sub">Oral &amp; Maxillofacial Surgery</span>
            </div>
          </a>
          <a className="nav-back-link" href="/">← Back to Main Site</a>
        </nav>

        <main>
          <div className="center-card">
            <div className="eyebrow">Referring Doctors</div>
            <h1>Refer a Patient to<br /><em>Dr. Lombardo</em></h1>
            <p className="descriptor">
              We welcome referrals from dental offices throughout the Wilmington area. Click below to complete our secure online referral form - it only takes a few minutes.
            </p>
            <div className="cta-wrap">
              <a
                className="btn-refer"
                href="https://pdf.dsnforms.com/dsn/online_referral_form.html?p=t9r8r5"
                target="_blank"
                rel="noopener noreferrer"
              >
                Submit a Referral <span className="btn-icon">→</span>
              </a>
            </div>
            <div className="info-strips">
              <div className="strip">
                <div className="strip-label">Phone</div>
                <div className="strip-val"><a href="tel:9107621555">(910) 762-1555</a></div>
              </div>
              <div className="strip">
                <div className="strip-label">Fax</div>
                <div className="strip-val">(910) 726-9094</div>
              </div>
              <div className="strip">
                <div className="strip-label">Hours</div>
                <div className="strip-val">Mon - Thu, 9am - 4pm</div>
              </div>
              <div className="strip">
                <div className="strip-label">Location</div>
                <div className="strip-val">1510 Medical Center Dr, Wilmington</div>
              </div>
            </div>
          </div>
        </main>

        <footer className="referring-footer">
          © Dr. Gregg Lombardo · Oral &amp; Maxillofacial Surgery · Wilmington, NC
        </footer>
      </div>
    </>
  );
}
