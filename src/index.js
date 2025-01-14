import './styles.css';
import { displayToDoList } from './UI';
import { createTask } from './task';

const titleInput = document.querySelector('.task-title');
const descriptionInput = document.querySelector('.task-description');
const addTaskBtn = document.querySelector('.add-task-btn');
const toDoList = document.querySelector('.to-do-list');
const mainAddTaskBtn = document.querySelector('.main-add-task-btn');
const taskBox = document.querySelector('.task-box');
const cancelBtn = document.querySelector('.task-cancel-btn');
const dueDateInput = document.querySelector('.task-due-date');
const priorityInput = document.querySelector('.task-priority-level');
const inboxBtn = document.querySelector('.inbox-btn');
const h2 = document.querySelector('.h2');
const listContainer = document.querySelector('.list-container');
const addProjectBtn = document.querySelector('.add-project-btn');
const createdProjects = document.querySelector('.created-projects');


//to work on: written 14/1/25 -- 1. functionality to delete individual tasks(done)                                     2. make the code better organised          3. css styling       4. add local storage functionality

//i should probably make inbox also part of myProject array to cut down on repetitive code

/* 
1. make a function factory that creates objects (each object is a 'todo')

2. every 'todo' object has the following properties:
    -task title
    -task description (optional imo)
    -task priority
    -task due date
    -task status (completed or not completed)
    -task location? (e.g. inbox or projects)

3. every 'todo' object has a way to edit any of the above properties

4. every 'todo' object can be deleted (might be a good idea to add a confirmation msg before deleting 'are you sure you want to delete? y/n')

5. Have the following sections: 
    -Inbox
    -Today
    -Upcoming
    -Projects (be able to add and delete projects)


    ------------------------------------
*/


const dialog = document.querySelector('dialog');
const taskTitle = document.querySelector('#dialog-task-title');
const taskDescription = document.querySelector('#dialog-task-description');
const taskDueDate = document.querySelector('#dialog-due-date');
const taskPriority = document.querySelector('#dialog-priority');

const saveBtn = document.querySelector('.save-btn');

let arrayItemEditID;

saveBtn.addEventListener('click', () =>{
    console.log(taskTitle.value);

    if (inboxTab) {
        inboxArr[arrayItemEditID].title = taskTitle.value;
        inboxArr[arrayItemEditID].description = taskDescription.value;
        inboxArr[arrayItemEditID].dueDate = taskDueDate.value;
        inboxArr[arrayItemEditID].priority = taskPriority.value;

        listContainer.innerHTML = ( displayToDoList(inboxArr) );       
    } else {
        myProjects[projectTabDataID].array[arrayItemEditID].title = taskTitle.value;
        myProjects[projectTabDataID].array[arrayItemEditID].description = taskDescription.value;
        myProjects[projectTabDataID].array[arrayItemEditID].dueDate = taskDueDate.value;
        myProjects[projectTabDataID].array[arrayItemEditID].priority = taskPriority.value;

        listContainer.innerHTML = ( displayToDoList( myProjects[projectTabDataID].array ) );
    }
    addEditBtnEventListener();
    addDeleteBtnEventListener();
    resetDialogInputValues();
});
function resetDialogInputValues(){
    taskTitle.value = '';
    taskDescription.value = '';
    taskDueDate.value = '';
    taskPriority.value = '';
}

function addEditBtnEventListener() {
    let editBtns = Array.from(document.querySelectorAll('.edit-btn'))
    editBtns.forEach((item) => {
        item.addEventListener('click', (e) => {
            dialog.showModal();
            arrayItemEditID = e.target.dataset.arrayid;

            if (inboxTab) {
                taskTitle.value = inboxArr[arrayItemEditID].title;
                taskDescription.value = inboxArr[arrayItemEditID].description;
                taskDueDate.value = inboxArr[arrayItemEditID].dueDate;
                taskPriority.value = inboxArr[arrayItemEditID].priority;

            } else {
                taskTitle.value = myProjects[projectTabDataID].array[arrayItemEditID].title;
                taskDescription.value = myProjects[projectTabDataID].array[arrayItemEditID].description;
                taskDueDate.value = myProjects[projectTabDataID].array[arrayItemEditID].dueDate;
                taskPriority.value = myProjects[projectTabDataID].array[arrayItemEditID].priority;
            }

            // console.log(e.target.dataset.arrayid);
            // console.log('projectTabID is ' + projectTabDataID);
        });
    })
}

let deleteItemID;
function addDeleteBtnEventListener(){
    let deleteBtns = Array.from(document.querySelectorAll('.delete-btn'))
    deleteBtns.forEach((item) => {
        item.addEventListener('click', (e) => {
            deleteItemID = e.target.dataset.arrayid
            console.log('delete btn working ' + deleteItemID);

            if (inboxTab) {
                inboxArr.splice(deleteItemID, 1);
                listContainer.innerHTML = ( displayToDoList(inboxArr) ); 
                addDeleteBtnEventListener();
                addEditBtnEventListener();
                // console.log(inboxArr);
            } else {
                myProjects[projectTabDataID].array.splice(deleteItemID, 1);
                listContainer.innerHTML = ( displayToDoList( myProjects[projectTabDataID].array ) );
                addDeleteBtnEventListener();
                addEditBtnEventListener();
                // console.log(myProjects[projectTabDataID].array);
            }
        })
    });
}
let inboxArr = [{title: 'ok', description: 'cool'}, {title: 'ok2', description: 'cool2'}];
taskBox.style.display = 'none';

mainAddTaskBtn.addEventListener('click', () => {
    taskBox.style.display = 'block';
    mainAddTaskBtn.style.display = 'none';
});

const resetInputFieldValues = function () {
    titleInput.value = '';
    descriptionInput.value = '';
    dueDateInput.value = '';
    priorityInput.value = 'Medium';
}

let inboxTab = true;
inboxBtn.addEventListener('click', () => {
    h2.textContent = 'Inbox';
    inboxTab = true;
    listContainer.innerHTML = ( displayToDoList(inboxArr) );
    collapseAddTaskBar();
    addEditBtnEventListener();
    addDeleteBtnEventListener();
});


addTaskBtn.addEventListener('click', function() {
    let newTask = createTask(titleInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value);

    if (inboxTab) {
        console.log(dueDateInput.value);
        inboxArr.push(newTask);
        listContainer.innerHTML = ( displayToDoList(inboxArr) );
        console.log(inboxArr);
    } else {
        myProjects[projectTabDataID].array.push(newTask);
        listContainer.innerHTML = ( displayToDoList( myProjects[projectTabDataID].array ) );
    }

    resetInputFieldValues();

    addEditBtnEventListener();
    addDeleteBtnEventListener();
});


addProjectBtn.addEventListener('click', () => {
    let i = 0;
    let userInput = prompt('Enter Project Name');

    myProjects.push( createProject(userInput, []) );
    console.log(myProjects);

    (function displayProjects() {
        let projects = '';
        
        myProjects.forEach(function(item) {
            projects += `<button class='projectTab' data-id='${i}'> ${item.projectName}</button>`
            createdProjects.innerHTML = projects;
            i++;
        });
    })()

    projectTabList = Array.from(document.querySelectorAll('.projectTab')); 

    projectTabList.forEach((item) => {
        item.addEventListener('click', tabIntoProject)
    })
});

let projectTabList;

let projectTabDataID; 
function tabIntoProject(e) {
    inboxTab = false;
    projectTabDataID = e.target.dataset.id;
    // console.log('dataID is '+ dataID);
    h2.textContent = myProjects[projectTabDataID].projectName;

    listContainer.innerHTML = ( displayToDoList( myProjects[projectTabDataID].array) );

    collapseAddTaskBar();
    addEditBtnEventListener();
    addDeleteBtnEventListener();
}

let myProjects = [ 
    // {projectName: 'New Project', array: [{title: 'new project', description: 'cool'}], dataID: 0}, 
    // {projectName: 'Test Project', array: [{title: 'test project', description: 'cooler'}], dataID: 1},
];


const createProject = function (projectName, array, dataIdentification) {
    return {projectName, array, dataIdentification};
}

titleInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTaskBtn.click();
    }
});

cancelBtn.addEventListener('click', collapseAddTaskBar);

function collapseAddTaskBar () {
    taskBox.style.display = 'none';
    mainAddTaskBtn.style.display = 'block';
}
