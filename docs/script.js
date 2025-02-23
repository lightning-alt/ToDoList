// Get references to elements
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const personalizedMessage = document.getElementById('personalizedMessage');

// Function to add a task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return; // Do not add empty tasks

    const li = document.createElement('li');
    li.textContent = taskText;

    // Create a checkbox to mark as completed
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed');
    });

    // Create a delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskList.removeChild(li);
    });

    li.prepend(checkbox);
    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = ''; // Clear input field
};

// Check if we are on the name input page
if (nameForm) {
    // Function to handle name submission
    nameForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent the form from submitting

        const name = nameInput.value.trim(); // Get the name from the input
        localStorage.setItem('userName', name); // Store the name in local storage

        // Redirect to the To-Do List page
        window.location.href = 'todo.html'; // Ensure this file exists in the same directory
    });
}

// Check if we are on the To-Do List page
if (taskInput) {
    // Get the user's name from local storage
    const userName = localStorage.getItem('userName');

    // Display the personalized welcome message
    if (userName) {
        personalizedMessage.textContent = `Hello, ${userName}! Welcome to your personalized To-Do List!`;
    }

    // Event listener for adding tasks
    addTaskButton.addEventListener('click', addTask);

    // Allow pressing Enter to add a task
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });
}
