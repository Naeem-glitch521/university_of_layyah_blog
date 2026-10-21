// Mobile menu
const burger = document.getElementById('burger');
const sideBody = document.getElementById('sideBody');
burger.addEventListener('click', () => {
  const open = sideBody.classList.toggle('open');
  burger.setAttribute('aria-expanded', open);
});

// Filter by category and search
const posts = document.querySelectorAll('.post');
const cats = document.querySelectorAll('.cat');
const search = document.getElementById('search');
const empty = document.getElementById('empty');
const count = document.getElementById('count');
let category = 'all';

function applyFilters() {
  const term = search.value.trim().toLowerCase();
  let shown = 0;
  posts.forEach(p => {
    const ok = (category === 'all' || p.dataset.cat === category) &&
               p.textContent.toLowerCase().includes(term);
    p.hidden = !ok;
    if (ok) shown++;
  });
  empty.hidden = shown > 0;
  count.textContent = shown;
}
cats.forEach(c => c.addEventListener('click', () => {
  cats.forEach(x => x.classList.remove('active'));
  c.classList.add('active');
  category = c.dataset.cat;
  applyFilters();
}));
search.addEventListener('input', applyFilters);

// Read more / Show less
document.querySelectorAll('.toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const more = btn.previousElementSibling;
    more.hidden = !more.hidden;
    btn.textContent = more.hidden ? 'Read more' : 'Show less';
  });
});

// Dark mode (remembered if the browser allows it)
const themeBtn = document.getElementById('theme');
function setTheme(t) {
  document.documentElement.dataset.theme = t;
  themeBtn.textContent = t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  try { localStorage.setItem('theme', t); } catch (e) {}
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
setTheme(saved || 'light');
themeBtn.addEventListener('click', () =>
  setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

// Contact form validation
const form = document.getElementById('form');
const formMsg = document.getElementById('formMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim(), email = form.email.value.trim(), msg = form.msg.value.trim();
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !msg) {
    formMsg.className = 'err';
    formMsg.textContent = 'Please enter your name, a valid email and a message.';
    return;
  }
  formMsg.className = 'ok';
  formMsg.textContent = 'Thank you, ' + name + '. Your message has been sent.';
  form.reset();
});
