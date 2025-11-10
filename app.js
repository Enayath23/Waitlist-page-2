const form = document.getElementById('waitlistForm');
const emailEl = document.getElementById('email');
const btn = document.getElementById('submitBtn');
const msg = document.getElementById('msg');

const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailEl.value.trim();
  msg.textContent = '';

  if (!isValidEmail(email)) {
    msg.textContent = 'Please enter a valid email.';
    return;
  }

  btn.disabled = true;
  try {
    const res = await fetch('/api/join', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ email })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err?.error || 'Something went wrong.');
    }

    msg.textContent = 'You’re on the list. Check your inbox for a confirmation.';
    form.reset();
  } catch (err) {
    msg.textContent = err.message;
  } finally {
    btn.disabled = false;
  }
});
