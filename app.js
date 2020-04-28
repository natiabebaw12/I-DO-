// SELECTOR
    const todo_input = document.querySelector('.task-input');
    const todo_btn = document.querySelector('.submit-btn');
    const todo_list = document.querySelector('.task-list');

// EVENT LISTENER
    todo_btn.addEventListener('click', addTodo);

    
//FUNCTIONS

function addTodo(event){
    event.preventDefault();//stops page refreshing
    
    
}