export const createTask = function (title, description, dueDate, priority, completionStatus) {
    return {title, description, dueDate, priority, completionStatus};
}



//code for editing a task
const setToDoAsCompleted = function (todo) {
    todo.completionStatus = 'completed';
    console.log (`setting ${todo} as completed`);
}