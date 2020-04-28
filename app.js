// SELECTOR
const todo_input = document.querySelector( '.task-input' );
const todo_btn = document.querySelector( '.submit-btn' );
const todo_list = document.querySelector( '.task-list' );
const filterOption = document.querySelector( '.filter-todo' );

// EVENT LISTENER
document.addEventListener('DOMContentLoaded', getTodos);
todo_btn.addEventListener( 'click', addTodo );
todo_list.addEventListener( 'click', deleteCheck );
filterOption.addEventListener( 'click', filterTodo );

//FUNCTIONS
function addTodo( event ) {
    event.preventDefault(); //stops page refreshing

    //todo DIV
    const todoDiv = document.createElement( 'div' );
    todoDiv.classList.add( 'todo' );
    //todo list
    const newTodo = document.createElement( 'li' );
    newTodo.classList.add( 'todo-item' );
    newTodo.innerHTML = todo_input.value;

    todoDiv.appendChild( newTodo );

    //add todo to local storage
    saveToLocal(todo_input.value);

    //check button
    const completedBtn = document.createElement( 'button' );
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add( 'complet-btn' );
    todoDiv.appendChild( completedBtn );

    //delete button
    const trashBtn = document.createElement( 'button' );
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add( 'trash-btn' );
    todoDiv.appendChild( trashBtn );

    
    //append to ul list
    todo_list.appendChild( todoDiv );
    //todo input to empty
    todo_input.value = "";
}

// delete and check function

function deleteCheck( e ) {
    const item = e.target;
    //delete item
    if ( item.classList[ 0 ] === 'trash-btn' ) {
        const todo = item.parentElement;
        //Animation
        todo.classList.add( 'fall' );
        //remove from the local storage too
        removeFromStorage(todo);
        //event
        todo.addEventListener( 'transitionend', function () {
            todo.remove();
        } );

    }

    if ( item.classList[ 0 ] === 'complet-btn' ) {
        const todo = item.parentElement;
        todo.classList.toggle( 'completed' );
    }
}


//function for filter
function filterTodo( e ) {
    const todos = todo_list.childNodes;
    console.log( todos );
    todos.forEach( inPlace => {

        switch ( e.target.value ) {

            case "all":
                inPlace.style.display = "flex";
                break;
            case "completed":

                if ( inPlace.classList.contains( 'completed' ) ) {
                    inPlace.style.display = "flex";
                } else {
                    inPlace.style.display = "none";
                }
                break;
            case "uncompleted":
                if ( inPlace.classList.contains( 'completed' ) ) {
                    inPlace.style.display = "none";
                } else {
                    inPlace.style.display = "flex";
                }
                break;
        }
    } );
}

//save the todos in local storage
function saveToLocal(todo){
    // CHECK IF ALREADY HAVE TASK
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

//grt todos from local storage and display
function getTodos(){

    let todos;

     // CHECK IF ALREADY HAVE TASK
   
     if(localStorage.getItem('todos') === null){
         todos = [];
     }else{
         todos = JSON.parse(localStorage.getItem('todos'));
     }

     todos.forEach(function(todo){
        //todo DIV
    const todoDiv = document.createElement( 'div' );
    todoDiv.classList.add( 'todo' );
    //todo list
    const newTodo = document.createElement( 'li' );
    newTodo.classList.add( 'todo-item' );
    newTodo.innerHTML = todo;

    todoDiv.appendChild( newTodo );

    //check button
    const completedBtn = document.createElement( 'button' );
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add( 'complet-btn' );
    todoDiv.appendChild( completedBtn );

    //delete button
    const trashBtn = document.createElement( 'button' );
    trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
    trashBtn.classList.add( 'trash-btn' );
    todoDiv.appendChild( trashBtn );

    
    //append to ul list
    todo_list.appendChild( todoDiv );
    //todo input to empty
     });
}

//remove from the storage when deleting the todo

function removeFromStorage(todo){
    // CHECK IF ALREADY HAVE TASK
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    console.log(todoIndex);
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}