// Selectors
var todoInput = document.querySelector('.todo-input');
var todoButton = document.querySelector('.todo-button');
var todoList = document.querySelector('.todo-list');
var filterOption = document.querySelector('.filter-todo');
var inputUser = document.querySelector('#name')
var alertMessage = document.querySelector('#alertMessage')

// EventListeners
document.addEventListener('DOMContentLoaded',getTodos);
todoButton.addEventListener('click' , addtodo);
todoList.addEventListener('click' , checkDelete);
filterOption.addEventListener('click' , filterTodo);
inputUser.addEventListener('input',function(el){
    console.log(inputUser.value);
    localStorage.setItem('username',inputUser.value);
});
 


// Funcation

function addtodo (el){
    console.log(el);
    console.log(todoInput.value);
    // prvent refreshing
    el.preventDefault();
    var todos;
    if(localStorage.todos != null){
    todos = JSON.parse(localStorage.getItem('todos'));
    console.log(todos);
    console.log(todoInput.value)
    }
    if(todoInput.value.trim().length!=0 && !todos.includes(todoInput.value)){
        // add to do div
    var todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create li 
    var newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todoInput.value;
    // append to (Tododiv)
    todoDiv.appendChild(newTodo);
    // todo add to localstorage
    // completed btn
    var completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    completedButton.classList.add('checked-btn');
    todoDiv.appendChild(completedButton);
    // save LocalStorage
    saveLocalTodos(todoInput.value);
    // remove btn
    var removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    removeButton.classList.add('removed-btn');
    todoDiv.appendChild(removeButton);
    // append List
    todoList.appendChild(todoDiv);
    alertMessage.classList.add('hide') 
    // alert message
    alertMessage.classList.add('hide');
    // clear input value
    todoInput.value = '';
   
    } else{
        // make alert
        alertMessage.classList.remove('hide');
    }
     
    
}

function checkDelete(el){
    var element = el.target;
    // delet todo task
   if(element.classList[0] === 'checked-btn'){
    var todo = element.parentElement;
    todo.classList.toggle('completed');
   }
   if(element.classList[0] === 'removed-btn'){
    var todo = element.parentElement;
    todo.classList.add('drop');
    removeLocalTodos(todo);
    todo.addEventListener('transitionend', function(){
        todo.remove();
    });
   }
}

function filterTodo(element){ 
    var todos = todoList.childNodes;
    // console.log(todos)
    todos.forEach(function(todo){
        switch(element.target.value){

            case "all":  
            todo.style.display = 'flex';
            break;
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex';
                } else{
                    todo.style.display = 'none';
                }
                break;
                case "uncompleted":
                    if(!todo.classList.contains('completed')){
                        todo.style.display = 'flex';
                    } else{
                        todo.style.display = 'none';
                    }
                    break;
                
        }
    })
}

function saveLocalTodos(todo){
    // have todo or not
    let todos;
    if(localStorage.getItem ('todos')=== null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos(){
    
    // have todo or not
    let todos;
    if(localStorage.getItem ('todos')=== null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        // add to do div
    var todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // create li 
    var newTodo = document.createElement('li');
    newTodo.classList.add('todo-item');
    newTodo.innerText = todo;
    // append to (Tododiv)
    todoDiv.appendChild(newTodo);
    // completed btn
    var completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    completedButton.classList.add('checked-btn');
    todoDiv.appendChild(completedButton);
    // remove btn
    var removeButton = document.createElement('button');
    removeButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    removeButton.classList.add('removed-btn');
    todoDiv.appendChild(removeButton);
    // append List
    todoList.appendChild(todoDiv);
    })
    

}

function removeLocalTodos(todo){
    // have todo or not
    let todos;
    if(localStorage.getItem ('todos')=== null){
        todos = [];
    } else{
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    var todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem('todos',JSON.stringify(todos));
}

// create user 
if(localStorage.getItem('username')!= null) {
    inputUser.value = localStorage.getItem('username');
};

// avoid douple input

function avoidDoubleInput(){
    var todos = JSON.parse(localStorage.getItem('todos'));
    console.log(todos);
    todos.forEach(function(element , index , arr){
        if(todoInput.value.toLowerCase() == element.toLowerCase()){
            console.log('found');
        } else{
            console.log('notfound');
        }
    });
}

