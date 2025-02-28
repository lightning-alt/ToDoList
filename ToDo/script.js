// script.js

// Functionality for index.html
document.getElementById('submitName')?.onclick = function() {
    const username = document.getElementById('username')?.value;
    if (username) {
        localStorage.setItem('username', username);
        window.location.href = 'todo.html';
    } else {
        alert('Please enter your name.');
    }
};

// Functionality for todo.html
if (document.getElementById('welcomeMessage')) {
    const username = localStorage.getItem('username');
    if (username) {
        document.getElementById('welcomeMessage').innerText = `Welcome, ${username}!`;
    } else {
        document.getElementById('welcomeMessage').innerText = 'Welcome!';
    }
}

document.getElementById('addTask')?.onclick = function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value;

    if (taskText) {
        const li = document.createElement('li');
        li.textContent = taskText;

        const markButton = document.createElement('button');
        markButton.textContent = '✔️';
        markButton.onclick = function() {
            li.style.textDecoration = 'line-through';
        };

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '❌';
        deleteButton.onclick = function() {
            li.remove();
        };

        li.appendChild(markButton);
        li.appendChild(deleteButton);
        document.getElementById('taskList').appendChild(li);
        taskInput.value = '';
    } else {
        alert('Please enter a task.');
    }
};
