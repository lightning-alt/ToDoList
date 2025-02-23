const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const nameForm = document.getElementById('nameForm');
const nameInput = document.getElementById('nameInput');
const personalizedMessage = document.getElementById('personalizedMessage');

// Function to add a task
const addTask = () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

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

// Function to handle name submission
nameForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting

    const name = nameInput.value.trim(); // Get the name from the input
    personalizedMessage.textContent = `Hello, ${name}! Welcome to your personalized To-Do List!`;
    personalizedMessage.style.display = 'block'; // Show the personalized message

    // Optionally, clear the input field
    nameInput.value = '';
});

// Event listener for adding tasks
addTaskButton.addEventListener('click', addTask);

// Allow pressing Enter to add a task
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});
