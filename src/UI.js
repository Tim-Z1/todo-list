//make some code to display the toDoList
export const createToDoListString = function(arr) {
    let str = '<ul>';
    let i = 0;

    arr.forEach(function(item, index, array) {
        str += 
        `<li> 
            title: ${item.title} 
            description: ${item.description} 
            due date: ${item.dueDate} 
            priority level: ${item.priority} 
            <button class='edit-btn' data-arrayID=${i}> Edit </button> 
            <button class='delete-btn' data-arrayID=${i}> Delete </button>
        </li>`;  
        i++;
    });
    
    return str += '</ul>';
    // return str;
}

export const createButtonObjectString = function(arr) {
    let defaultProjectsBtnList = ''; 
    let createdProjectsBtnList = ''; 
    let i = 0;
    arr.forEach(item => {
        if (item.isDefaultProject) {
            defaultProjectsBtnList += 
                ` <button class='default-project-tab' data-id='${i}'> ${item.projectName} </button> `;
                i++;
        } else {
            createdProjectsBtnList += 
            ` <div class='project-btn-container'>
                <button class='project-tab' data-id='${i}'> ${item.projectName} </button>
                <button class='delete-project-btn' data-id='${i}'> X </button> 
              </div>`;
            i++;
        }
    });
    return {defaultProjectsBtnList, createdProjectsBtnList};
}

export const resetInputFieldValues = function(arrInput, singleInput) {
    arrInput.forEach(item => item.value = '');

    singleInput.value = 'Medium';
}

export const initialiseToggleTaskBarUI = function(taskBar, addTaskBtn) {
    function show() {
        taskBar.style.display = 'block';
        addTaskBtn.style.display = 'none';
    };

    function hide() {
        taskBar.style.display = 'none';
        addTaskBtn.style.display = 'block';
    };
    
    return {show, hide};
}





//example output of createButtonObjectString
let buttonString = {defaultProjectsBtnList: '<button>inbox</button>', createdProjectsBtnList: '<button>new project</button>'};

//don't need this function atm but keeping it in case for now
// export const resetDialogInputValues = function(arr) {
//     arr.forEach(item => item.value = '');
// }
//     // resetDialogInputValues([taskTitle, taskDescription, taskDueDate, taskPriority]);