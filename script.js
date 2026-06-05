const CHARS = {
  upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lower: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
};

function getCharset() {
  let charset = '';
  if (document.getElementById('opt-upper').checked)   charset += CHARS.upper;
  if (document.getElementById('opt-lower').checked)   charset += CHARS.lower;
  if (document.getElementById('opt-numbers').checked) charset += CHARS.numbers;
  if (document.getElementById('opt-symbols').checked) charset += CHARS.symbols;
  return charset;
}

function generate() {
  const length = parseInt(document.getElementById('length-slider').value);
  const charset = getCharset();

  if (!charset) {
    setOutput('Seleccioná al menos una opción', true);
    return;
  }

  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);

  let password = '';
  for (let i = 0; i < length; i++) {
    password += charset[randomValues[i] % charset.length];
  }

  setOutput(password, false);
  updateStrength(password);
}

function setOutput(text, isPlaceholder) {
  const el = document.getElementById('password-output');
  el.textContent = text;
  el.classList.toggle('placeholder', isPlaceholder);
}

function updateStrength(password) {
  let score = 0;

  if (password.length >= 8)  score++;
  if (password.length >= 12) score++;
  if (password.length >= 20) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  const percent = Math.round((score / 7) * 100);
  const fill = document.getElementById('strength-fill');
  const text = document.getElementById('strength-text');

  fill.style.width = percent + '%';

  if (score <= 2) {
    fill.style.background = '#e05252';
    text.textContent = 'Débil';
    text.style.color = '#e05252';
  } else if (score <= 4) {
    fill.style.background = '#e09a2b';
    text.textContent = 'Regular';
    text.style.color = '#e09a2b';
  } else if (score <= 5) {
    fill.style.background = '#4e9e5f';
    text.textContent = 'Buena';
    text.style.color = '#4e9e5f';
  } else {
    fill.style.background = '#2d7d4f';
    text.textContent = 'Muy segura';
    text.style.color = '#2d7d4f';
  }
}

function copyPassword() {
  const password = document.getElementById('password-output').textContent;
  const btn = document.getElementById('copy-btn');

  if (
    password === 'Presioná generar' ||
    password === 'Seleccioná al menos una opción'
  ) return;

  navigator.clipboard.writeText(password).then(() => {
    btn.classList.add('copied');
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="1.8"
        stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"/>
      </svg>`;
    setTimeout(() => {
      btn.classList.remove('copied');
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" stroke-width="1.8"
          stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>`;
    }, 1800);
  });
}

document.getElementById('password-output').classList.add('placeholder');
