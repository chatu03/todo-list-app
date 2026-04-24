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

// ======================= TODO CORE LOGIC ===================
let tasks = [];

// Load tasks from localStorage
function loadTasks() {
  const savedTasks = localStorage.getItem('todoTasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
  } else {
    tasks = [];
  }
  renderTasks();
}

// Save tasks to localStorage
function saveTasks() {
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
  updateStats();
}

// Add new task
function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  if (taskText === "") {
    alert("Please write something before adding ✏️");
    return;
  }
  
  const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false
  };
  
  tasks.push(newTask);
  saveTasks();
  renderTasks();
  input.value = "";
  input.focus();
}

// Toggle complete status
function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) {
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
  }
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  renderTasks();
}

// Update task statistics
function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const statsDiv = document.getElementById('taskStats');
  const completedSpan = document.getElementById('completedCount');
  
  if (statsDiv) {
    const totalSpan = statsDiv.querySelector('span:first-child');
    if (totalSpan) totalSpan.textContent = `${total} task${total !== 1 ? 's' : ''}`;
  }
  if (completedSpan) {
    completedSpan.textContent = `${completed} completed`;
  }
}

// Render tasks list
function renderTasks() {
  const tasksContainer = document.getElementById('tasksList');
  if (!tasksContainer) return;
  
  if (tasks.length === 0) {
    tasksContainer.innerHTML = '<div class="empty-state">✨ No tasks yet. Add your first task above!</div>';
    updateStats();
    return;
  }
  
  tasksContainer.innerHTML = '';
  tasks.forEach(task => {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task-item';
    
    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'task-check';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => toggleTask(task.id));
    
    // Task text
    const taskTextSpan = document.createElement('span');
    taskTextSpan.className = `task-text ${task.completed ? 'completed' : ''}`;
    taskTextSpan.textContent = task.text;
    taskTextSpan.addEventListener('click', () => toggleTask(task.id));
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑️';
    deleteBtn.className = 'delete-btn';
    deleteBtn.title = 'Delete task';
    deleteBtn.addEventListener('click', () => deleteTask(task.id));
    
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(taskTextSpan);
    taskDiv.appendChild(deleteBtn);
    tasksContainer.appendChild(taskDiv);
  });
  
  updateStats();
}

// Check name and redirect if not found
function checkUserName() {
  const userName = localStorage.getItem('todoUserName');
  if (!userName) {
    window.location.href = 'index.html';
    return null;
  }
  return userName;
}

// Display welcome message
function displayWelcome() {
  const userName = checkUserName();
  if (userName) {
    const welcomeDiv = document.getElementById('welcomeMsg');
    if (welcomeDiv) {
      welcomeDiv.innerHTML = `Welcome back, ${userName}! 🎯`;
    }
  }
}

// Handle enter key on task input
function setupEventListeners() {
  const addBtn = document.getElementById('addTaskBtn');
  const taskInput = document.getElementById('taskInput');
  
  if (addBtn) {
    addBtn.addEventListener('click', addTask);
  }
  
  if (taskInput) {
    taskInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTask();
    });
  }
}

// Initialize todo page
function initTodo() {
  initTheme();
  setupThemeToggle();
  checkUserName();
  displayWelcome();
  loadTasks();
  setupEventListeners();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTodo);
} else {
  initTodo();
}