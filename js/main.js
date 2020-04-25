"use strict";var showFormBtn=document.querySelector(".show-form-btn"),saveFormBtn=document.querySelector(".todo-form__save-btn"),closeFormBtn=document.querySelector(".todo-form__close-btn"),todoForm=document.querySelector(".todo-form"),todoList=document.querySelector(".todo-list"),todoTextArea=document.querySelector(".todo-form__text-area");function showForm(){showFormBtn.addEventListener("click",function(){todoForm.classList.add("show-todo-form")})}function closeForm(){closeFormBtn.addEventListener("click",function(t){t.preventDefault(),todoTextArea.value="",todoForm.classList.remove("show-todo-form")})}function addTodo(t){t.preventDefault();var e=document.createElement("li");e.classList.add("todo-list__item"),todoList.appendChild(e);var o=document.createElement("div");o.innerText=todoTextArea.value,o.classList.add("todo-list__item-text"),e.appendChild(o),saveToLS(todoTextArea.value);var s=document.createElement("button");s.innerHTML='<img src="./img/icons/cross.svg" alt="trash" class="todo-list__trash-btn-icon">',s.classList.add("todo-list__trash-btn"),e.appendChild(s),todoTextArea.value=""}function deleteCheck(t){var e=t.target;"todo-list__complete-btn"===e.classList[0]&&e.parentElement.classList.toggle("completed");if("todo-list__trash-btn"===e.classList[0]){var o=e.parentElement;o.classList.add("deleted"),removeLSTodos(o),o.addEventListener("transitionend",function(){o.remove()})}}function saveToLS(t){var e;(e=null===localStorage.getItem("todos")?[]:JSON.parse(localStorage.getItem("todos"))).push(t),localStorage.setItem("todos",JSON.stringify(e))}function getTodos(){(null===localStorage.getItem("todos")?[]:JSON.parse(localStorage.getItem("todos"))).forEach(function(t){var e=document.createElement("li");e.classList.add("todo-list__item"),todoList.appendChild(e);var o=document.createElement("div");o.innerText=t,o.classList.add("todo-list__item-text"),e.appendChild(o);var s=document.createElement("button");s.innerHTML='<img src="./img/icons/cross.svg" alt="trash" class="todo-list__trash-btn-icon">',s.classList.add("todo-list__trash-btn"),e.appendChild(s)})}function removeLSTodos(t){var e;e=null===localStorage.getItem("todos")?[]:JSON.parse(localStorage.getItem("todos"));var o=t.children[0].innerText;e.splice(e.indexOf(o),1),localStorage.setItem("todos",JSON.stringify(e))}showForm(),closeForm(),document.addEventListener("DOMContentLoaded",getTodos),saveFormBtn.addEventListener("click",addTodo),todoList.addEventListener("click",deleteCheck);