export const createTask = function (title, description, dueDate, priority, completionStatus) {
    return {title, description, dueDate, priority, completionStatus};
}

//updateTaskContent fn from index.js can probably be moved here into task.js and be imported back there as a module


//code for editing a task
const setToDoAsCompleted = function (todo) {
    todo.completionStatus = 'completed';
    console.log (`setting ${todo} as completed`);
}