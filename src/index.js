//NOTE: Trying out using underscore ('_') to differentiate HTML selectors from normal JS variables
//---SECTION FOR HTML SELECTORS
    //sidebar content selectors
const _createdProjectsBtns = document.querySelector('.created-projects-buttons');
const _defaultProjectsBtns = document.querySelector('.default-projects-buttons');
const _addProjectBtn = document.querySelector('.add-project-btn');

    //main content selectors
const _toDoListHeader = document.querySelector('.todo-list-header');
const _toDoListContent = document.querySelector('.todo-list-content');
const _taskBar = document.querySelector('.task-bar');

const _titleInput = document.querySelector('#task-title');
const _descriptionInput = document.querySelector('#task-description');
const _dueDateInput = document.querySelector('#task-due-date');
const _priorityInput = document.querySelector('#task-priority-level');

const _addTaskBtn = document.querySelector('.add-task-btn');
const _mainAddTaskBtn = document.querySelector('.main-add-task-btn');
const _cancelBtn = document.querySelector('.task-cancel-btn');

    //_dialog selectors
const _dialog = document.querySelector('dialog');
const _taskTitle = document.querySelector('#dialog-task-title');
const _taskDescription = document.querySelector('#dialog-task-description');
const _taskDueDate = document.querySelector('#dialog-due-date');
const _taskPriority = document.querySelector('#dialog-priority');
const _dialogSaveBtn = document.querySelector('.save-btn');


/* ---SECTION FOR KEEPING TRACK ON THINGS TO WORK ON   
    ---TASKS TO BE COMPLETED:  
    -make the code better organised (and separate UI code from core functionality code)   
    -css styling      

    -if nothing is entered in task inputs (form task bar) and 'add task' btn is clicked, it should show a msg that says can't have input fields empty 
    -ability to edit project names    
    -ability to set completion status for a task
    ---------------
    *how the todolist webapp should look:
    View all todos in each project (probably just the title and duedate… perhaps changing color for different priorities).
    Expand a single todo to see/edit its details.

    **possible optional future features:
    -ability to drag and swap the order of tasks being displayed  


    ---Completed Tasks:
    -functionality to delete individual tasks(done)
    -functionality to delete projects(done)
    -add local storage functionality（done)
    -app won't work if data in localStorage doesn't exist (done)
*/


//---SECTION FOR MODULE IMPORTS
import './styles.css'

import { 
    createToDoListString, createButtonObjectString, resetInputFieldValues, initialiseToggleTaskBarUI
} from './UI';

import { 
    createTask, 
} from './task';


//---SECTION START FOR CODE---

//main array that stores the entire todo list content
let toDoListArr = [ 
    {
        projectName: 'Inbox', 
        projectContent: [ {title: 'inbox item', description: 'cool', dueDate: '', priority: ''} ],
        isDefaultProject: true,
    }, 
];

//toggle taskbar section
let toggleTaskBarUI = initialiseToggleTaskBarUI(_taskBar, _mainAddTaskBtn);
_mainAddTaskBtn.addEventListener('click', (toggleTaskBarUI.show) );
_cancelBtn.addEventListener('click', (toggleTaskBarUI.hide) );

//convenience feature (pressing Enter button to submit)
_titleInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      _addTaskBtn.click();
    }
});


//generate strings for HTML content 
function getStrings() {
    const toDoListContent = () => createToDoListString(toDoListArr[projectTabDataID].projectContent);
    const defaultProjectButtons = () => createButtonObjectString(toDoListArr).defaultProjectsBtnList;
    const createdProjectButtons = () => createButtonObjectString(toDoListArr).createdProjectsBtnList;

    return {toDoListContent, defaultProjectButtons, createdProjectButtons};
}
const getStringFor = getStrings();


//local storage functions
const updateStorageArrValues = () => localStorage.setItem( "localArr", JSON.stringify(toDoListArr) );
const getStorageArrValues = () => JSON.parse( localStorage.getItem( "localArr") );

(function initialiseWebPage() {
    document.addEventListener("DOMContentLoaded", () => {
        if (!localStorage.getItem("localArr")) {
            updateStorageArrValues();
        }
        toDoListArr = getStorageArrValues();

        //project buttons
            //display html content
        _defaultProjectsBtns.innerHTML = getStringFor.defaultProjectButtons();
        _createdProjectsBtns.innerHTML = getStringFor.createdProjectButtons();
            //add event listeners
        addTabIntoProjectEventListener();
        addDeleteProjectBtnEventListener();

        //todo list content 
            //display html content
        _toDoListHeader.textContent = toDoListArr[0].projectName;
        _toDoListContent.innerHTML = ( getStringFor.toDoListContent() );
            //add event listeners
        document.querySelector('.default-project-tab').addEventListener('click', tabIntoProject);
        addEditBtnEventListener();
        addDeleteBtnEventListener();
    });
})();


//dialog box functions
function getDialogTaskValues() { 
    let dialogBoxSelectorsArr = [_taskTitle, _taskDescription, _taskDueDate, _taskPriority];
    let dialogBoxTaskValuesArr = [];
    dialogBoxSelectorsArr.forEach( (item) => dialogBoxTaskValuesArr.push(item.value) );
    
    return dialogBoxTaskValuesArr;
};

function updateTaskContent(arr) {
    let updatedTaskInfoArr = getDialogTaskValues();
    let i = 0;
        //loops through an array's keys (in our case, a specified projectContent array: title, description etc.)
    Object.keys(arr).forEach((key) => {
        arr[key] = updatedTaskInfoArr[i];
        i++;
    });
};
function prefillDialogValues(arr) {
    let i = 0;
    let projectValuesArr = [];
    (function updateProjectValuesArr(){
        Object.keys(arr).forEach((key) => {
            projectValuesArr.push( arr[key] );
            i++;
        });
    })();

    i = 0;
    let dialogBoxSelectorsArr = [_taskTitle, _taskDescription, _taskDueDate, _taskPriority];
    dialogBoxSelectorsArr.forEach((item) => {
        item.value = projectValuesArr[i];
        i++;
    });
};

_dialogSaveBtn.addEventListener('click', () => {
    updateTaskContent(toDoListArr[projectTabDataID].projectContent[arrayItemEditID]);
    updateStorageArrValues();

    _toDoListContent.innerHTML = getStringFor.toDoListContent();

    addEditBtnEventListener();
    addDeleteBtnEventListener();
});


//adding event listeners to groups of html classes
function addTabIntoProjectEventListener() {
    let projectTabList = Array.from(document.querySelectorAll('.project-tab')); 
    projectTabList.forEach((item) => {
        item.addEventListener('click', tabIntoProject);
    });
}
    
_addTaskBtn.addEventListener('click', function() {
    //Application logic
    let newTask = createTask(_titleInput.value, _descriptionInput.value, _dueDateInput.value, _priorityInput.value);
    toDoListArr[projectTabDataID].projectContent.push(newTask);
    updateStorageArrValues();

    //DOM-related code
    _toDoListContent.innerHTML = getStringFor.toDoListContent();
    resetInputFieldValues([_titleInput, _descriptionInput, _dueDateInput], _priorityInput);
    addEditBtnEventListener();
    addDeleteBtnEventListener();
});

let arrayItemEditID;
function addEditBtnEventListener() {
    let editBtns = Array.from(document.querySelectorAll('.edit-btn'))
    editBtns.forEach((item) => {
        item.addEventListener('click', (e) => {
            _dialog.showModal();
            arrayItemEditID = e.target.dataset.arrayid;

            prefillDialogValues(toDoListArr[projectTabDataID].projectContent[arrayItemEditID]);
            // console.log(e.target.dataset.arrayid);
            // console.log('projectTabID is ' + projectTabDataID);
        });
    })
}

function addDeleteBtnEventListener() {
    let deleteBtns = Array.from(document.querySelectorAll('.delete-btn'))
    deleteBtns.forEach((item) => {
        item.addEventListener('click', (e) => {
            let deleteItemID = e.target.dataset.arrayid
            toDoListArr[projectTabDataID].projectContent.splice(deleteItemID, 1);

            updateStorageArrValues();

            _toDoListContent.innerHTML = getStringFor.toDoListContent();

            addDeleteBtnEventListener();
            addEditBtnEventListener();
        })
    });
}


const createProject = (projectName, projectContent) => ( {projectName, projectContent} );
_addProjectBtn.addEventListener('click', () => {
    //I feel like the code inside of this event listener could be optimised
    let promptName = prompt('Enter Project Name');
    if (promptName === '') {
        while (promptName === '') {
            promptName = prompt('Name cannot be blank. Please enter a project name');

            if (promptName === null) {
                console.log('cancel btn pressed')
                break;
            }
            if (promptName !== '') {
                toDoListArr.push( createProject(promptName, []) ); 
                break;
            }
        }
    } else if (promptName === null) {
        console.log('cancel button pressed');
        return;
    } else toDoListArr.push( createProject(promptName, []) );

    console.log(toDoListArr);
    
    updateStorageArrValues();
    _createdProjectsBtns.innerHTML = getStringFor.createdProjectButtons();

    addTabIntoProjectEventListener();
    addDeleteProjectBtnEventListener();

});

let projectTabDataID = 0; 
function tabIntoProject(e) {
    projectTabDataID = e.target.dataset.id;
    // console.log('dataID is '+ dataID);
    _toDoListHeader.textContent = toDoListArr[projectTabDataID].projectName;

    _toDoListContent.innerHTML = ( getStringFor.toDoListContent() );

    toggleTaskBarUI.hide();
    addEditBtnEventListener();
    addDeleteBtnEventListener();
}

function addDeleteProjectBtnEventListener() {
    let deleteProjectBtns = Array.from(document.querySelectorAll('.delete-project-btn'))
    deleteProjectBtns.forEach((item) => {
        item.addEventListener('click', (e) => {
            let deleteItemID = e.target.dataset.id
            toDoListArr.splice(deleteItemID, 1);
            updateStorageArrValues();

            _createdProjectsBtns.innerHTML = getStringFor.createdProjectButtons();

            addDeleteProjectBtnEventListener();
            addTabIntoProjectEventListener();
        })
    });
}

/* Organising my code: What am I trying to do right now? 
I'm trying to separate my code into more logical sections:
    -basic functionality of the todo list should be in task.js
    -code that renders the display onto the webpage should in UI.js
    -piecing the code together i.e. combining UI.js and task.js code should be done in index.js
*/


/* Pseudocode / Code logic flow (todo list)
-General Overview- (local storage is also utilised)
1. An 'Inbox' project is created and is the default project container for users to enter in todo list tasks
2. You can add, delete and edit tasks
3. You can create new project containers and name them whatever you like 
4. You can also delete any project containers if you wish to except for the default one ('Inbox')
5. (to be implemented) You can also edit the name of any project (except 'Inbox')


--How the above features are implemented--

->How data in Javascript is stored to be manipulated later<-
    -A 'todolist' array is created that contains all the data for displaying what's needed for this todolist webapp
        -the todolist array contains one object per project container: 
        *(e.g. toDoListArr = {Inbox}, {Project 1}, {Project 2} etc.)*
            -inside of every object is a projectName and projectContent key/value pair
                -projectName is as the name implies, a string of the project's name
                -projectContent contains data necessary for displaying todo list information/tasks
                    -inside of projectContent is an array with one object per task (e.g. buy milk, wash dishes, study etc.)
                        -inside of the projectContent array every object has the following key/value pairs: title, description, dueDate, priority
                        *(e.g. Inbox's projectContent: [ {title: 'buy milk' etc.}, {title: 'study' etc.} ])*

->Adding Tasks<-
    -(event listener) when 'Add Task' btn is clicked:
        -takes in user input for the following parameters: _taskTitle, description, dueDate, priority
        -creates a new object inside of currently tabbed in projects' projectContent array and adds said input into the newly created object

->Deleting Tasks<-
    -(event listener) when 'Delete' btn is clicked:
        -finds the correct 'task'
        -deletes the 'task' from the currently tabbed in projects' projectContent array

->Editing Tasks<-
    -(event listener) when 'Edit' btn is clicked:
        -finds the correct 'task'
        -opens up a _dialog box 
            -takes in user input for the following parameters: _taskTitle, description, dueDate, priority
                -clicking 'Save' btn updates the currently selected task by changing the data in the currently tabbed projects' projectContent array
                -clicking 'Cancel' btn closes _dialog box with no changes to be updated

->Adding Projects<-
    -(event listener) when 'Add Project' btn is clicked: 
        -takes in user input for projectName
            -if OK is clicked then a new object is created in toDoList array with the user input string as the new object's projectName value
        
->Deleting Projects<-
    -(event listener) when 'X' btn is clicked:
        -finds the correct currently tabbed into project
            -deletes the project from toDoList array (i.e. deletes the object associated to it)

->Editing Projects Name(NOT YET IMPLEMENTED)<-
    -(event listener) when 'Edit' btn is clicked: 
        -opens up a user prompt for user input
        -takes in user prompt input
            -if OK is clicked then the currently selected project for edit is changed to a new name according to the user prompt input

->Switching between projects<-
    -(event listener) when a 'project' btn is clicked:
        -the appropriate project in toDoList array is selected
        -it takes that project's data and displays its todo list content (i.e. projectContent)
        -edit and delete event listener btns are re-added for each todo list task

->How the HTML is structured<-

->Displaying content in HTML<-
*/

/*  notes/old code

loops over every property in an object and lets you change the value of each property
let test = function(arr) {
    Object.keys(arr).forEach( (key) => {
        arr[key] = i;
        i++;
    });
    return arr;
}

// _taskTitle.value = toDoListArr[projectTabDataID].projectContent[arrayItemEditID].title;
// _taskDescription.value = toDoListArr[projectTabDataID].projectContent[arrayItemEditID].description;
// _taskDueDate.value = toDoListArr[projectTabDataID].projectContent[arrayItemEditID].dueDate;
// _taskPriority.value = toDoListArr[projectTabDataID].projectContent[arrayItemEditID].priority;

// _taskTitle.onchange = populateStorage;
*/
