//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo')

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

//functions
function addTodo(event){
    event.preventDefault(); //prevent from submitting
    // <div class="todo">
    //             <li></li>
    //             <button>delete</button>
    //             <button>checked</button>
    // </div>

    //DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add("todo");
    //LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);
    //ADD todo to local storage
    saveLocalTodos(todoInput.value);
    //CHECK button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    //TRASH button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //append to list
    todoList.appendChild(todoDiv);
    //clear input
    todoInput.value = "";
}

function deleteCheck(event){

    const item = event.target;

    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }
    else{
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

function filterTodo(event){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(event.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
        }
    });
}


function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement('div');
        todoDiv.classList.add("todo");
        //LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        //CHECK button
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);
        //TRASH button
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //append to list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}