// User Name Handling
function handleNameSubmit(event) {
    event.preventDefault();
    const userName = document.getElementById('userName').value;
    localStorage.setItem('userName', userName);
    initializeApp();
}

function initializeApp() {
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.getElementById('nameForm').classList.add('hidden');
        document.getElementById('appContainer').classList.remove('hidden');
        document.getElementById('userNameDisplay').textContent = userName;
        loadTasks();
    }
}

// Logout Functionality
function handleLogout() {
    localStorage.removeItem('userName');
    tasks = [];
    saveTasks();
    document.getElementById('nameForm').classList.remove('hidden');
    document.getElementById('appContainer').classList.add('hidden');
}

// Task Handling
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
        taskItem.innerHTML = `
            <input type="checkbox" 
                   class="task-checkbox" 
                   ${task.completed ? 'checked' : ''}
                   onchange="toggleTask(${index})">
            <span class="task-text">${task.text}</span>
            <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(taskItem);
    });
}

function handleTaskSubmit(event) {
    event.preventDefault();
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = '';
        saveTasks();
        loadTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    loadTasks();
}

function deleteTask(index) {
    tasks = tasks.filter((_, i) => i !== index);
    saveTasks();
    loadTasks();
}

// Initialize app
window.onload = initializeApp;
