// SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterTodos = document.querySelector('.filter-todos');

// FUNCTIONS
// ES6 Syntax
const createTodoItem = (event) => {
    event.preventDefault(); // Stops form from performing browser default action (submit)
    // Create todo item container and add the 'todo' class
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo');
    // Create LI item (containing item name, complete button, delete button) within the UL list.
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');
    todoItem.appendChild(newTodo); // Add todo text to created LI element.
    // Create item completion button.
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="zmdi zmdi-check"></i>';
    completeButton.classList.add('complete-btn');
    todoItem.appendChild(completeButton)
    // Create item deletion button.  (I'm aware of the repetition here.)
    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="zmdi zmdi-delete"></i>';
    deleteButton.classList.add('delete-btn');
    todoItem.appendChild(deleteButton);
    // Finally add the item to the actual list and clear the input field for the next entry.
    todoList.appendChild(todoItem);
    saveLocally(todoInput.value)
    todoInput.value = '';
}

const deleteComplete = (event) => {
    const item = event.target;
    if (item.classList[0] === 'delete-btn') {
        const todo = item.parentElement;
        todo.classList.add('falloff')
        deleteLocalTodo(todo)
        // Had paused the video and noticed that it wasn't deleting the items from the flow of the page.  This was the solution I came up with before resuming the video.
        // setTimeout(() => {
        //     todo.remove()
        // }, 300);

        // This is the method of removing the item from the page flow presented in the video.  I prefer this as it doesn't require knowing the duration of the animation/transition.
        todo.addEventListener('transitionend', () => {
            todo.remove();
        })
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

const filterList = (event) => {
    // For a reason I cannot find the node list from childNodes returns some weird text node before nodes that actually exist.  Instead, I chose to just use querySelectorAll for the list of todos.
    //const todos = todoList.childNodes;
    const todos = todoList.querySelectorAll('.todo');
    todos.forEach((todo) => {
        console.log(event.target.value)
        switch(event.target.value){
            case "all":
                todo.style.display = 'flex';
                break;
            case "complete":
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;  // Managed to skip the error Dev Ed experienced by actually having the break in my statement which he originally overlooked.
            case "incomplete":
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    })
}

const saveLocally = (todo) => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos))
}

const deleteLocalTodo = (todo) => {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const index = todo.children[0].innerText
    todos.splice(todos.indexOf(index), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

const loadLocalData = (todo) => {
    console.log("Loading local data.")
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach((todo) => {
      // Create todo item container and add the 'todo' class
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo');
        // Create LI item (containing item name, complete button, delete button) within the UL list.
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');
        todoItem.appendChild(newTodo); // Add todo text to created LI element.
        // Create item completion button.
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="zmdi zmdi-check"></i>';
        completeButton.classList.add('complete-btn');
        todoItem.appendChild(completeButton)
        // Create item deletion button.  (I'm aware of the repetition here.)
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="zmdi zmdi-delete"></i>';
        deleteButton.classList.add('delete-btn');
        todoItem.appendChild(deleteButton);
        // Finally add the item to the actual list and clear the input field for the next entry.
        todoList.appendChild(todoItem);  
    })   
}

// EVENT LISTENERS
todoButton.addEventListener('click', createTodoItem);
todoList.addEventListener('click', deleteComplete);  // Refer to NOTE 1 at bottom of document.
filterTodos.addEventListener('click', filterList);
document.addEventListener('DOMContentLoaded', loadLocalData)

// NOTE 1: I never knew that, by setting an event listener on a parent element, I could find out what it was clicking on in terms of children.  This should make some things I've been trying to do infinitely more simple.