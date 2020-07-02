let showFormBtn = document.querySelector('.show-form-btn');
let saveFormBtn = document.querySelector('.todo-form__save-btn');
let closeFormBtn = document.querySelector('.todo-form__close-btn');
let todoForm = document.querySelector('.todo-form');
let todoList = document.querySelector('.todo-list');
let todoTextArea = document.querySelector('.todo-form__text-area');



function showForm() {

    showFormBtn.addEventListener('click', () => {
        todoForm.classList.add('show-todo-form');
    });
}
showForm();

function closeForm() {

    closeFormBtn.addEventListener('click', (e) => {
        e.preventDefault();
        todoTextArea.value = '';
        todoForm.classList.remove('show-todo-form');
    });
}
closeForm();


document.addEventListener('DOMContentLoaded', getTodos);
saveFormBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);


function addTodo(event) {
    event.preventDefault();

    if (todoTextArea.value !== '') {
        let newTodo = document.createElement('li');
        newTodo.classList.add('todo-list__item');
        todoList.appendChild(newTodo);

        let todoText = document.createElement('div');
        todoText.innerText = todoTextArea.value;
        todoText.classList.add('todo-list__item-text');
        newTodo.appendChild(todoText);

        let trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<img src="./img/icons/cross.svg" alt="trash" class="todo-list__trash-btn-icon">';
        trashBtn.classList.add('todo-list__trash-btn');
        newTodo.appendChild(trashBtn);

        saveToLS(todoTextArea.value);

        todoTextArea.value = '';
    }
}



function deleteCheck(e) {

    let item = e.target;

    if (item.classList[0] === 'todo-list__complete-btn') {
        let todo = item.parentElement;
        todo.classList.toggle('completed');
    }

    if (item.classList[0] === 'todo-list__trash-btn') {
        let todo = item.parentElement;
        todo.classList.add('deleted');
        removeLSTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }
}



function saveToLS(todo) {
    // check ls
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}



function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        let newTodo = document.createElement('li');
        newTodo.classList.add('todo-list__item');
        todoList.appendChild(newTodo);

        let todoText = document.createElement('div');
        todoText.innerText = todo;
        todoText.classList.add('todo-list__item-text');
        newTodo.appendChild(todoText);

        let trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<img src="./img/icons/cross.svg" alt="trash" class="todo-list__trash-btn-icon">';
        trashBtn.classList.add('todo-list__trash-btn');
        newTodo.appendChild(trashBtn);
    });
}



function removeLSTodos(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    let todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}