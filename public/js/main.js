/* ============================================================
   DR. GREGG LOMBARDO — FRONTEND JS
   ============================================================ */

/* ── NAV SCROLL EFFECT ── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 80);
  });
}

/* ── CONTACT FORM SUBMISSION ── */
async function submitForm() {
  const btn      = document.getElementById('submitBtn');
  const success  = document.getElementById('form-success');
  const error    = document.getElementById('form-error');

  const firstName = document.getElementById('firstName')?.value.trim();
  const lastName  = document.getElementById('lastName')?.value.trim();
  const phone     = document.getElementById('phone')?.value.trim();
  const email     = document.getElementById('email')?.value.trim();
  const procedure = document.getElementById('procedure')?.value;
  const message   = document.getElementById('message')?.value.trim();

  // Basic validation
  if (!firstName || !lastName || !phone) {
    alert('Please fill in your first name, last name, and phone number.');
    return;
  }

  btn.disabled    = true;
  btn.textContent = 'Sending…';
  success.style.display = 'none';
  error.style.display   = 'none';

  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, phone, email, procedure, message }),
    });

    if (res.ok) {
      success.style.display = 'block';
      // Clear form
      ['firstName','lastName','phone','email','message'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
      });
      const proc = document.getElementById('procedure');
      if (proc) proc.selectedIndex = 0;
    } else {
      error.style.display = 'block';
    }
  } catch (e) {
    error.style.display = 'block';
  } finally {
    btn.disabled    = false;
    btn.textContent = 'Send Request';
  }
}
