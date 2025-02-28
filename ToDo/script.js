// Check if user is logged in
const userName = localStorage.getItem('todoUser Name'); // Fixed key name
if (!userName && window.location.pathname.endsWith('todo.html')) {
    window.location.href = 'index.html';
}

// Display welcome message
if (window.location.pathname.endsWith('todo.html')) {
    document.getElementById('welcomeName').textContent = userName;
}

// Logout function
function logout() {
    localStorage.removeItem('todoUser Name'); // Fixed key name
    window.location.href = 'index.html';
}

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Initial render
if (window.location.pathname.endsWith('todo.html')) {
    renderTodos();
}

function addTodo() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {
        todos.push({
            text: text,
            completed: false,
            id: Date.now()
        });
        
        input.value = '';
        saveTodos();
        renderTodos();
    }
}

function toggleComplete(id) {
    todos = todos.map(todo => {
        if (todo.id === id) {
            return { ...todo, completed: !todo.completed };
        }
        return todo;
    });
    saveTodos();
    renderTodos();
}

function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    saveTodos();
    renderTodos();
}

function
