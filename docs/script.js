// script.js

// Functionality for index.html
document.getElementById('submitName')?.onclick = function() {
    const username = document.getElementById('username')?.value; // Get the username from the input field
    if (username) {
        localStorage.setItem('username', username); // Store username in localStorage
        window.location.href = 'todo.html'; // Redirect to todo.html
    } else {
        alert('Please enter your name.'); // Alert if the input is empty
    }
};

// Functionality for todo.html
window.onload = function() {
    const username = localStorage.getItem('username'); // Retrieve username from localStorage
    if (username) {
        document.getElementById('welcomeMessage').innerText = `Welcome, ${username}!`; // Display welcome message with username
    } else {
        document.getElementById('welcomeMessage').innerText = 'Welcome!'; // Default welcome message
    }

    // Add task functionality
    document.getElementById('addTask')?.onclick = function() {
        const taskInput = document.getElementById('taskInput'); // Get the task input field
        const taskText = taskInput.value; // Get the value of the input field

        if (taskText) {
            const li = document.createElement('li'); // Create a new list item
            li.textContent = taskText; // Set the text of the list item

            // Create a button to mark the task as complete
            const markButton = document.createElement('button');
            markButton.textContent = '✔️';
            markButton.onclick = function() {
                li.style.textDecoration = 'line-through'; // Mark task as complete
            };

            // Create a button to delete the task
            const deleteButton = document.createElement('button');
            deleteButton.textContent = '❌';
            deleteButton.onclick = function() {
                li.remove(); // Delete task
            };

            // Append buttons to the list item
            li.appendChild(markButton);
            li.appendChild(deleteButton);
            document.getElementById('taskList').appendChild(li); // Add task to the list
            taskInput.value = ''; // Clear input field
        } else {
            alert('Please enter a task.'); // Alert if the input is empty
        }
    };
};
