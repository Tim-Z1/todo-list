//make some code to display the toDoList
export const displayToDoList = function (arr) {
    let str = '<ul>';

    // let titleMapped = arr.map(function(item, index, array) {
    //     // returns the new value instead of item
    //     return item.title;
    // });
    let i = 0;
    arr.forEach(function(item, index, array) {
        str += `<li> 
            title: ${item.title} 
            description: ${item.description} 
            due date: ${item.dueDate} 
            priority level: ${item.priority} 
            <button class='edit-btn' data-arrayID=${i}> Edit </button> 
            <button class='delete-btn' data-arrayID=${i}> Delete </button>
        </li>`;  
        i++;
        
        // console.log(`arr item: ${item.title}`);
        // console.log('index' + index);
        // console.log('str value: ' + str);
    });
    
    str += '</ul>';
    
    return str;
}



// arr = [ {title: 'test', description: 'test2'}, {title:'another', description: 'something'} ]

// arr.forEach(function(item) {
//     console.log(item);
// })