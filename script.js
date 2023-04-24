let input= document.querySelector('.input');
let todoButton = document.querySelector('.button');
let showTodos =  document.querySelector('.todos-container')
let todoInput;

let todo = "";
let isCompleted = false;

let localData = JSON.parse(localStorage.getItem("todo"));
let todoList = localData || [];
// function to return unique id
function uuid(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(param) {
        let number = Math.random() *16 |0;
        let randomNumber = param == 'x' ? number : (number & 0x3 | 0x8);
        return randomNumber.toString(16); 
    })
}
//Event listner to add wishlist in todo list by clicking on Add button
todoButton.addEventListener('click', (e)=> {
    e.preventDefault();
    todoInput = input.value;
    if(todoInput.length > 0)
    {
        todoList.push({ 
            id: uuid(),
            todo : todoInput, 
            isCompleted: false
        })
    }
    renderTodoList(todoList);
    localStorage.setItem("todo", JSON.stringify(todoList));
    todoInput.value = "";
})
/* Event listner to strike through the todo list once we clicked on a specific wishlist
we will apply event listner to the whole todo container bcoz there will be numerous todos and applying
event listner to all of them will be costly as well as we don't know the number
*/
showTodos.addEventListener('click', (e) => {
    let key= e.target.dataset.key;
    let delKey = e.target.dataset.todokey;
    todoList = todoList.map((todo) => 
          key === todo.id? {...todo, isCompleted: !isCompleted}: todo
         );
    todoList = todoList.filter(todo => todo.id !== delKey);
    localStorage.setItem("todo",JSON.stringify(todoList));
    renderTodoList(todoList);
    console.log(todoList);
})

function renderTodoList(todoList){
   showTodos.innerHTML = todoList.map(({id, todo, isCompleted}) => `<div> <input id="item-${id}" 
   type="checkbox" data-key= ${id} ${isCompleted ? "checked" : ""}> 
   <label for="item-${id} class= "todo todo-text t-pointer ${isCompleted ? "checked-todo" : ""} 
   data-key= ${id}>${todo}</label> 
   <button class= "btn "><span dataset-todokey = ${id} class="material-icons-outlined">
   delete
   </span></button></div>`)
}

renderTodoList(todoList);