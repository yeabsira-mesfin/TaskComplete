let tasks = [];

// Fetch tasks from API
async function fetchTasks() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
}

// Render tasks to the DOM
function renderTasks(taskList) {
  const todoList = document.getElementById('todo-list');
  todoList.innerHTML = ''; // Clear current list

  taskList.forEach(task => {
    const listItem = document.createElement('li');
    listItem.textContent = (task.title);
    listItem.className = task.completed ? 'completed' : '';
    listItem.onclick = () => toggleTask(task.id);
    todoList.appendChild(listItem);
  });
}

// Toggle task completion
function toggleTask(taskId) {
  tasks = tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  );
  renderTasks(tasks);
}

// Filter tasks
function filterTasks(filter) {
  if (filter === 'completed') {
    renderTasks(tasks.filter(task => task.completed));
  } else if (filter === 'incomplete') {
    renderTasks(tasks.filter(task => !task.completed));
  } else {
    renderTasks(tasks);
  }
}

// Initialize app
fetchTasks();
