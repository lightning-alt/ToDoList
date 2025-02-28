// Check if user is logged in
const userName = localStorage.getItem('todoUserName');
if(!userName && window.location.pathname.endsWith('todo.html')) {
    window.location.href = 'index.html';
}

// Display welcome message
if(window.location.pathname.endsWith('todo.html')) {
    document.getElementById('welcomeName').textContent = userName;
}

// Logout function
function logout() {
    localStorage.removeItem('todoUserName');
    window.location.href = 'index.html';
}

// Modified todo list code (keep all previous todo functions)
// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Initial render
if(window.location.pathname.endsWith('todo.html')) {
    renderTodos();
}

// Keep all the existing todo functions (addTodo, toggleComplete, deleteTodo, renderTodos, saveTodos)
// Add the Enter key event listener
if(window.location.pathname.endsWith('todo.html')) {
    document.getElementById('todoInput').addEventListener('keypress', function(e) {
        if(e.key === 'Enter') {
            addTodo();
        }
    });
}
