//select dom element
const input =document.getElementById('todo-input')
const addbtn=document.getElementById('add-btn')
const list=document.getElementById('todo-list')
//try to load  saved todos from localstorage
const saved=localStorage.getItem('todos');
const todos=saved? JSON.parse(saved):[];
function saveTodos(){
    localStorage.setItem('todos', JSON.stringify(todos));

}
//created a dom node for todo object and append to the list
function createtodoNode( todo, index){
    const li = document.createElement('li');
    //checkbox to toggle completion
    const checkbox=document.createElement('input')
    checkbox.type='checkbox'
    checkbox.checked=!!todo.completed;
    checkbox.addEventListener("change",()=>{
        todo.completed=checkbox.checked;
        //visual feedback 
        textSpan.style.textDecoration= todo.completed?'line-through': " ";
        saveTodos();
    })
//text ofn the todo 
    const textSpan=document.createElement('span')
    textSpan.textContent=todo.text;
    textSpan.style.margin='0 8px';
    if(todo.completed){
        textSpan.style.textDecoration='line-through'
    }
        //add double clicked listener
        textSpan.addEventListener("dblclick",()=> {
            const newText=prompt("edit todo",todo.text);
            if(newText!==null){
                todo.text=newText.trim()
                textSpan.textContent=todo.text;
                saveTodos

            }
        })
        //delete todo button
        const delbtn=document.createElement("button")
        delbtn.textContent="delete";
        delbtn.addEventListener('click',()=> {
            todos.splice(index,1)
            render();
            saveTodos();
        })
        li.appendChild(checkbox);
        li.appendChild(textSpan);
        li.appendChild(delbtn)
        return li;

  }

//render the whole todo list from todo arrray
function render(){
    list.innerHTML = '';
    //recreate each item 
    todos.forEach((todo, index) => {
        const node = createtodoNode(todo, index)
       
        list.appendChild(node)
    });
}
function addTodo(){
    const text =input.value.trim();
    if(! text){
        return
    }
    //push a new todo objects
    todos.push({text, completed:false});
    input.value ='';
    render()
    saveTodos()

}
addbtn.addEventListener("click",addTodo);
render();
