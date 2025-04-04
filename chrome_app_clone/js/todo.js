const toggleButton = document.querySelector('.todo-toggle');
const toggleIcon = toggleButton.querySelector('.toggle-icon');
const todoPanel = document.querySelector('.todo-panel');
const todoList = document.querySelector('#todos');
const todoForm = document.querySelector('#todo-form');
const todoInput = todoForm.querySelector('input');

toggleButton.addEventListener('click', () => {
    const isOpen = todoPanel.classList.toggle('open');
    toggleButton.classList.toggle('open');
});

const TODO_KEY = "todos";
const TODO_LI_CLASS = "todo-node";
const TODO_CHECKBOX_CLASS = "todo-checkbox";

let todos = [];

function saveTodos() {
    localStorage.setItem(TODO_KEY, JSON.stringify(todos));
}

function deleteTodo(event) {
    const button = event.target.closest("button");
    const li = button.parentElement;
    li.remove();

    todos = todos.filter((todo) => todo.id !== Number(li.id));
    saveTodos();

}

function toggleTodo(event) {
    const checkbox = event.target;
    const li = checkbox.parentElement;
    const target = todos.find((todo) => todo.id === Number(li.id));
    if (target) {
        target.done = !target.done;
        saveTodos();
    }
}

function printTodo(todo) {
    const li = document.createElement("li");
    li.id = todo.id;
    li.classList.add(TODO_LI_CLASS)
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add(TODO_CHECKBOX_CLASS);
    if (todo.done === true) checkbox.checked = true; 
    checkbox.addEventListener("change", toggleTodo);
    const span = document.createElement("span");
    span.innerText = todo.text;
    const removeButton = document.createElement("button");
    removeButton.addEventListener("click", deleteTodo);
    const xIcon = document.createElement("i");
    xIcon.classList.add("fas", "fa-times");
    xIcon.style.color = "white";
    removeButton.appendChild(xIcon);
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(removeButton);
    todoList.appendChild(li);
}

function onTodoSubmit(event) {
    event.preventDefault();
    const newTodo = {
        id: Date.now(),
        text: todoInput.value,
        done: false,
    };
    todoInput.value = '';

    todos.push(newTodo);
    printTodo(newTodo);
    saveTodos();
}

todos = localStorage.getItem(TODO_KEY);
if (todos !== null) {
    todos = JSON.parse(todos);
    todos.forEach((todo) => printTodo(todo));
} else {
    todos = [];
}

todoForm.addEventListener("submit", onTodoSubmit);