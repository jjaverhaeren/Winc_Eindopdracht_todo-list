let tasks = getTasks();


const trashcanEventListener =   () => {
const todoParents = Array.from(document.getElementsByClassName("todo-parent"));
 todoParents.forEach(todoParent => {
    todoParent.addEventListener('click', async (event) => {
        if (event.target.className === 'trashcan') {
            // console.log(`trashcan value = ${event.target.value}`);
            let id = event.target.value;
            deleteTaskFetch(id);
            // await deleteTaskFetch();
            // await buildDOM();
        }
    })
})
}

const checkboxEventListener =  () => {
    const todoParents = Array.from(document.getElementsByClassName("todo-parent"));
    todoParents.forEach(todoParent => {
        todoParent.addEventListener('click', event => {
            if (event.target.className === 'checkbox') {
                // console.log(checkboxValue);
                let allTodoTexts = document.getElementsByClassName('todo-text');
                let todoTextArray = Array.from(allTodoTexts);
                todoTextArray.forEach((todoText) => {
                    if (todoText.parentElement === event.target.parentElement) {
                        todoText.classList.toggle('todo-text_done');
                    }
                })
                let id = event.target.value;
                let description = event.target.name;
                if (event.target.done === false) {
                    done = true;
                } else {
                    done = false;
                }
                let body = {id, description, done}
                // updateTaskFetch(body);
                // console.log(`checkbox value = ${event.target.value}`);
            }
        })
    })
    }



const buildDOM = async () => {
    let tasks = await getTasks();
    clearList();
    if (tasks) {
    tasks.forEach((taskArray) => {
      let task = Object.values(taskArray);

      let tasktoList = document.createElement('li');
      tasktoList.classList.add('todo-text');
      tasktoList.value = task[0];
      tasktoList.innerHTML = task[1];

      let trashcan = document.createElement('img');
      trashcan.src = 'img/trash-can-icon.png';
      trashcan.classList.add('trashcan');
      trashcan.value = task[0];
    //   console.log(trashcan.value);

      let checkbox = document.createElement('input');
      checkbox.classList.add('checkbox');
      checkbox.type = 'checkbox';
      checkbox.value = task[0];
      checkbox.name = task[1];
      checkbox.done = task[2];
    //   console.log(checkbox.value);
    //   console.log(checkbox.name);
    //   console.log(checkbox.done);

      let section = document.createElement('section');
      section.classList.add('todo-parent')
      let listParent = document.getElementById('list-parent');
      section.appendChild(checkbox);
      section.appendChild(tasktoList);
      section.appendChild(trashcan);
      listParent.appendChild(section);
    })
    trashcanEventListener();
    checkboxEventListener();
} else {
    console.log(`No tasks found`);
}
  };



const newTask = () => {
    let newTaskInput = document.getElementById("new-task").value;
    // console.log(newTaskInput);
    return newTaskInput;
    }
    

const clearInput = () => {
   document.getElementById("new-task").value = ''; 
    }


const clearList = () => {
    const listParent = document.getElementById("list-parent");
    while (listParent.firstChild) {
        listParent.removeChild(listParent.firstChild);
    }
}

const clearFooter = () => {
    document.getElementById('footer').innerHTML = ``;
}

document.getElementById("new-task").addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        eventHandlerNewTaskInput();
        clearInput();
    }
});

const  eventHandlerNewTaskInput = async () => {
    const newTaskInput = await newTask();
    let POSTbody = {description: newTaskInput, done: false}
    await postData(url, POSTbody);
    await buildDOM();
    await clearInput();
}

const addTask = document.getElementById("add-task");
addTask.addEventListener('click', eventHandlerNewTaskInput);


const eventHandlerClearInput = () => {
    clearInput();
}

const inputField = document.getElementById('new-task');
inputField.addEventListener('focus', eventHandlerClearInput);


const eventHandlerDeleteTask = async () => {
    await deleteTaskFetch();
    await buildDOM();
}


buildDOM();

