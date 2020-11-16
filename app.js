// Selectors 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

// Event listener 
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteOrCheck);
filterOption.addEventListener('click', filterTodo);

// when window loadead getTodos
document.addEventListener('DOMContentLoaded', getTodos);





// Function
function addTodo(event) {
    // prevents the refrest of page 
    event.preventDefault();
    //create a div with check and delete button and the todo task
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    // append child to todo 
    todoDiv.appendChild(newTodo);
    setTodosInLocalStorage(newTodo.innerText);

    //check mark button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //delete button 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append our div todo to todoList
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteOrCheck(event) {
    const item = event.target;
    // Delete button listener
    if (item.classList[0] === 'trash-btn') {
        const todoParent = item.parentElement;
        // Add animation of fall
        todoParent.classList.add("fall");
        deleteTodoFromLocalStorage(todoParent);
        // We also want that once the transition ends this element 
        // is als removed from the list after animation 
        todoParent.addEventListener("transitionend", function() {
            todoParent.remove();
        }) 
        console.log(todoList);
        // item.parentElement.remove();
    } 
    if (item.classList[0] === 'complete-btn') {
        item.parentElement.classList.toggle('completed');
    } 
} 

function filterTodo(event) {
    const todos = todoList.childNodes;
    console.log(todos);
    todos.forEach(function(todo) {
        console.log(event.target.value);
        switch(event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                     todo.style.display = "none";
                 }
                break;
        }
    });
} 

function setTodosInLocalStorage(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
    // localStorage.clear();
}

function deleteTodoFromLocalStorage(todo) {
    console.log("Inside delete function");
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }   
    const todoIndex = todo.children[0].innerText;
    console.log(todoIndex);
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }   
    todos.forEach(function(todo) {
        const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");

    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    // append child to todo 
    todoDiv.appendChild(newTodo);


    //check mark button 
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class = "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //delete button 
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append our div todo to todoList
    todoList.appendChild(todoDiv);
    })
}