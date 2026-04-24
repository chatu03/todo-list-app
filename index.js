// ======================= THEME LOGIC ===================
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.add('dark');
    localStorage.setItem('globalTheme', 'dark');
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) toggleBtn.innerHTML = '<span>☀️</span><span>Light</span>';
  } else {
    document.body.classList.remove('dark');
    localStorage.setItem('globalTheme', 'light');
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (toggleBtn) toggleBtn.innerHTML = '<span>🌙</span><span>Dark</span>';
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('globalTheme');
  if (savedTheme === 'dark') {
    applyTheme('dark');
  } else if (savedTheme === 'light') {
    applyTheme('light');
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) applyTheme('dark');
    else applyTheme('light');
  }
}

function setupThemeToggle() {
  const toggle = document.getElementById('themeToggleBtn');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('dark');
      if (isDark) applyTheme('light');
      else applyTheme('dark');
    });
  }
}

// Name submission handler
function handleNameSubmit() {
  const nameInput = document.getElementById('userName');
  const name = nameInput.value.trim();
  if (name === "") {
    alert("Please enter your name to continue 🌟");
    return;
  }
  localStorage.setItem('todoUserName', name);
  window.location.href = 'todo.html';
}

// Initialize page
initTheme();
setupThemeToggle();

const enterBtn = document.getElementById('enterBtn');
if (enterBtn) {
  enterBtn.addEventListener('click', handleNameSubmit);
}

const nameField = document.getElementById('userName');
if (nameField) {
  nameField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleNameSubmit();
  });
}