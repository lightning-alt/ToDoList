// Constants for DOM elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const personalizedMessage = document.getElementById('personalizedMessage');

// Constants for task management
const DELETE_BUTTON_TEXT = 'Delete';

// Load tasks from Local Storage on page load
document.addEventListener('DOMContentLoaded', loadTasks);

// Event listeners
addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
nameForm.addEventListener('submit', handleNameSubmission);

// Load tasks from Local Storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

// Function to add a task to the DOM
function addTaskToDOM(taskText, completed = false) {
    const li = document.createElement('li');
    li.textContent = taskText;
    if (completed) {
        li.classList.add('completed');
    }

    // Create a checkbox to mark as completed
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = completed;
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
        updateLocalStorage();
    });

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = DELETE_BUTTON_TEXT;
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
        updateLocalStorage();
    });

    li.prepend(checkbox);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
}

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === '') {
        alert('Please enter a task.'); // Alert if the input is empty
        return;
    }

    addTaskToDOM(taskText);
    updateLocalStorage(); // Update Local Storage
    taskInput.value = ''; // Clear input field
}

// Function to update Local Storage
function updateLocalStorage() {
    const tasks = [];
    const taskItems = taskList.querySelectorAll('li');
    taskItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        tasks.push({
            text: item.textContent.replace(DELETE_BUTTON_TEXT, '').trim(),
            completed: checkbox.checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to handle name submission
function handleNameSubmission(event) {
    event.preventDefault(); // Prevent the form from submitting

    const name = nameInput.value.trim(); // Get the name from the input
    if (name) {
        personalizedMessage.textContent = `Hello, ${name}! Welcome to your personalized To-Do List!`;
        personalizedMessage.style.display = 'block'; // Show the personalized message
        nameInput.value = ''; // Clear the input field
    } else {
        alert('Please enter your name.'); // Alert if the name is empty
    }
}
