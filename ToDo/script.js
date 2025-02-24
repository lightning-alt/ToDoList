const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const personalizedMessage = document.getElementById('personalizedMessage');

// Load tasks from Local Storage
const loadTasks = () => {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
};

// Function to add a task to the DOM
const addTaskToDOM = (taskText, completed = false) => {
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
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
        updateLocalStorage();
    });

    li.prepend(checkbox);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
};

// Function to add a task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    addTaskToDOM(taskText);
    updateLocalStorage(); // Update Local Storage
    taskInput.value = ''; // Clear input field
};

// Function to update Local Storage
const updateLocalStorage = () => {
    const tasks = [];
    const taskItems = taskList.querySelectorAll('li');
    taskItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        tasks.push({
            text: item.textContent.replace('Delete', '').trim(),
            completed: checkbox.checked
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to handle name submission
nameForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting

    const name = nameInput.value.trim(); // Get the name from the input
    personalizedMessage.textContent = `Hello, ${name}! Welcome to your personalized To-Do List!`;
    personalizedMessage.style.display = 'block'; // Show the personalized message

    // Optionally, clear the input field
    nameInput.value = '';
});

// Load tasks on page load
loadTasks();

// Event listener for adding tasks
addTaskButton.addEventListener('click', addTask);

// Allow pressing Enter to add a task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
