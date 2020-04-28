// SELECTOR
const todo_input = document.querySelector( '.task-input' );
const todo_btn = document.querySelector( '.submit-btn' );
const todo_list = document.querySelector( '.task-list' );
const filterOption = document.querySelector( '.filter-todo' );

// EVENT LISTENER
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

    //todo input to empty
    todo_input.value = "";
    //append to ul list
    todo_list.appendChild( todoDiv );
}

// delete and check function

function deleteCheck( e ) {
    const item = e.target;
    //delete item
    if ( item.classList[ 0 ] === 'trash-btn' ) {
        const todo = item.parentElement;
        //Animation
        todo.classList.add( 'fall' );
        //event
        todo.addEventListener( 'transitionend', function () {
            todo.remove();
        } );

    }

    if ( item.classList[ 0 ] === 'complet-btn' ) {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}


//function for filter
function filterTodo( e ) {
    const todos = todo_list.childNodes;
    console.log(todos);
    todos.forEach( inPlace => {

        switch(e.target.value){

            case "all":
                inPlace.style.display = "flex";
            break;
            case "completed":
                
                if(inPlace.classList.contains('completed')){
                    inPlace.style.display = "flex";
                }else{
                    inPlace.style.display = "none";
                }
                break;
            case "uncompleted":
                if(inPlace.classList.contains('completed')){
                    inPlace.style.display = "none";
                }else{
                    inPlace.style.display = "flex";
                }
                break;
        }
    });
}
