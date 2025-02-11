import './styles.css'
import { 
    createToDoListString, createButtonObjectString, resetInputFieldValues, toggleAddTaskBar
} from './UI';
import { createTask } from './task';

//sidebar content selectors
const createdProjectsBtns = document.querySelector('.created-projects-buttons');
const defaultProjectsBtns = document.querySelector('.default-projects-buttons');
const addProjectBtn = document.querySelector('.add-project-btn');

//main content selectors
const toDoListHeader = document.querySelector('.todo-list-header');
const toDoListContent = document.querySelector('.todo-list-content');
const taskBar = document.querySelector('.task-bar');

const titleInput = document.querySelector('.task-title');
const descriptionInput = document.querySelector('.task-description');
const dueDateInput = document.querySelector('.task-due-date');
const priorityInput = document.querySelector('.task-priority-level');

const addTaskBtn = document.querySelector('.add-task-btn');
const mainAddTaskBtn = document.querySelector('.main-add-task-btn');
const cancelBtn = document.querySelector('.task-cancel-btn');


//dialog selectors
const dialog = document.querySelector('dialog');
const taskTitle = document.querySelector('#dialog-task-title');
const taskDescription = document.querySelector('#dialog-task-description');
const taskDueDate = document.querySelector('#dialog-due-date');
const taskPriority = document.querySelector('#dialog-priority');
const dialogSaveBtn = document.querySelector('.save-btn');


//---SECTION FOR KEEPING TRACK ON THINGS TO WORK ON 
//to work on: written 14/1/25 -- 1. functionality to delete individual tasks(done)  1.2 functionality to delete projects(done)       2. make the code better organised          3. css styling       4. add local storage functionality（done)

//Make sure your app doesn’t crash if the data you may want to retrieve from localStorage isn’t there!


let toDoListArr = [ 
    {
        projectName: 'Inbox', 
        projectContent: [ {title: 'inbox item', description: 'cool', dueDate: '', priority: ''} ],
        isDefaultProject: true,
    }, 
];

/*note: for these event listeners, 
    it doesn't seem to work to put imported module functions directly as the 2nd argument in the event listener parameter,
    but it works when I use an arrow function to call the imported module function
*/
mainAddTaskBtn.addEventListener('click', () => {
    toggleAddTaskBar(taskBar, mainAddTaskBtn).showTaskBar();
});
cancelBtn.addEventListener('click', () => {
    toggleAddTaskBar(taskBar, mainAddTaskBtn).hideTaskBar() 
});

//convenience feature (pressing Enter button to submit)
titleInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      addTaskBtn.click();
    }
});



//--SECTION START OF MAIN FUNCTIONS
const getToDoListString = () => createToDoListString(toDoListArr[projectTabDataID].projectContent);
const getDefaultProjectButtons = () => createButtonObjectString(toDoListArr).defaultProjectsBtnList;
const getCreatedProjectButtons = () => createButtonObjectString(toDoListArr).createdProjectsBtnList;


function updateStorageArrValues() {
    localStorage.setItem( "localArr", JSON.stringify(toDoListArr) );
}

// taskTitle.onchange = populateStorage;

function getStorageArrValues() {
    return JSON.parse( localStorage.getItem( "localArr") );
}

(function initialiseWebPage() {
    document.addEventListener("DOMContentLoaded", () => {
        toDoListArr = getStorageArrValues();

        defaultProjectsBtns.innerHTML = getDefaultProjectButtons();
        createdProjectsBtns.innerHTML = getCreatedProjectButtons();
        let projectTabList = Array.from(document.querySelectorAll('.project-tab')); 
        projectTabList.forEach((item) => {
            item.addEventListener('click', tabIntoProject);
        });
        addDeleteProjectBtnEventListener();

        toDoListHeader.textContent = toDoListArr[0].projectName;
        toDoListContent.innerHTML = ( createToDoListString( toDoListArr[0].projectContent) );

        document.querySelector('.default-project-tab').addEventListener('click', tabIntoProject);
        addEditBtnEventListener();
        addDeleteBtnEventListener();
    });
})();

function getDialogTaskValues() { 
    let dialogBoxSelectorsArr = [taskTitle, taskDescription, taskDueDate, taskPriority];
    let dialogBoxTaskValuesArr = [];
    dialogBoxSelectorsArr.forEach( (item) => dialogBoxTaskValuesArr.push(item.value) );
    
    return dialogBoxTaskValuesArr;
};
function updateTaskContent(arr) {
    let updatedTaskInfoArr = getDialogTaskValues();
    let i = 0;
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
    let dialogBoxSelectorsArr = [taskTitle, taskDescription, taskDueDate, taskPriority];
    dialogBoxSelectorsArr.forEach((item) => {
        item.value = projectValuesArr[i];
        i++;
    });
};

dialogSaveBtn.addEventListener('click', () => {
    updateTaskContent(toDoListArr[projectTabDataID].projectContent[arrayItemEditID]);
    toDoListContent.innerHTML = getToDoListString();
    addEditBtnEventListener();
    addDeleteBtnEventListener();
});

addTaskBtn.addEventListener('click', function() {
    let newTask = createTask(titleInput.value, descriptionInput.value, dueDateInput.value, priorityInput.value);
    toDoListArr[projectTabDataID].projectContent.push(newTask);

    updateStorageArrValues();
    toDoListContent.innerHTML = getToDoListString();

    resetInputFieldValues([titleInput, descriptionInput, dueDateInput], priorityInput);
    addEditBtnEventListener();
    addDeleteBtnEventListener();
});

let arrayItemEditID;
function addEditBtnEventListener() {
    let editBtns = Array.from(document.querySelectorAll('.edit-btn'))
    editBtns.forEach((item) => {
        item.addEventListener('click', (e) => {
            dialog.showModal();
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

            toDoListContent.innerHTML = getToDoListString();

            addDeleteBtnEventListener();
            addEditBtnEventListener();
        })
    });
}


const createProject = (projectName, projectContent) => ( {projectName, projectContent} );
addProjectBtn.addEventListener('click', () => {
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
    createdProjectsBtns.innerHTML = getCreatedProjectButtons();

    let projectTabList = Array.from(document.querySelectorAll('.project-tab')); 
    projectTabList.forEach((item) => {
        item.addEventListener('click', tabIntoProject);
    })

    addDeleteProjectBtnEventListener();

});

let projectTabDataID = 0; 
function tabIntoProject(e) {
    projectTabDataID = e.target.dataset.id;
    // console.log('dataID is '+ dataID);
    toDoListHeader.textContent = toDoListArr[projectTabDataID].projectName;

    toDoListContent.innerHTML = ( createToDoListString( toDoListArr[projectTabDataID].projectContent) );

    toggleAddTaskBar(taskBar, mainAddTaskBtn).hideTaskBar()
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

            createdProjectsBtns.innerHTML = getCreatedProjectButtons();
            addDeleteProjectBtnEventListener();

            let projectTabList = Array.from(document.querySelectorAll('.project-tab')); 
            projectTabList.forEach((item) => {
                item.addEventListener('click', tabIntoProject);
            })
        })
    });
}



/*  notes/old code

loops over every property in an object and lets you change the value of each property
let test = function(arr) {
    Object.keys(arr).forEach( (key) => {
        arr[key] = i;
        i++;
    });
    return arr;
}

// taskTitle.value = toDoListArr[projectTabDataID].projectContent[arrayItemEditID].title;
// taskDescription.value = toDoListArr[projectTabDataID].projectContent[arrayItemEditID].description;
// taskDueDate.value = toDoListArr[projectTabDataID].projectContent[arrayItemEditID].dueDate;
// taskPriority.value = toDoListArr[projectTabDataID].projectContent[arrayItemEditID].priority;

*/