console.clear();
const readlineSync = require('readline-sync');
const fs = require('fs');


var taskListJSON = fs.readFileSync('tasklist.json', 'utf8');
let taskList = JSON.parse(taskListJSON);

function taskListConvert(taskList) {
    taskListJSON = JSON.stringify(taskList);
    // JSON'ı bir dosyaya yaz
    fs.writeFileSync('tasklist.json', taskListJSON);
}


function displayTasks(taskArr) {

    console.clear();
    
    let longestTaskStr = taskList.map(item => item.taskName.length).reduce((acc, currentValue) => Math.max(acc, currentValue), 0);
    // console.log(longestTaskStr)
    
    let allTaskLength = taskList.map(item => Object.values(item).join("").length).reduce((acc, currentValue) => Math.max(acc, currentValue), 0);
    // console.log(allTaskLength)
    
    if (taskArr.length === 0) {
        console.log('No tasks available.');
    } else {
        console.log('Here are your tasks:');
        let minusAdd = "---------------------------";
        for (let i = 0; i < allTaskLength; i++) {
            minusAdd = minusAdd + "-";
        };
        for (let i = 0; i < taskArr.length; i++) {
            let taskName = taskArr[i].taskName;
            for(let i = taskName.length; i < longestTaskStr+1; i++) {
                taskName = taskName + " ";
            }
            console.log(minusAdd);
            console.log(`| ${i + 1}. | ${taskName} | ${taskArr[i].status} | (id: ${taskArr[i].id}) \t|`);
        }
        console.log(minusAdd);
    }
}   
    
function addTask() {
    const taskName = readlineSync.question('Enter the task name: ');
    // BUG TASK ID
    const newTask = { id: taskList[taskList.length - 1].id + 1, taskName, status: 'pending' };
    taskList.push(newTask);
    console.log('Task added successfully.');
    taskListConvert(taskList);
}

function deleteTask() {
    const id = readlineSync.questionInt('Enter the task id to delete: ');
    taskIdList = taskList.map(m => m.id);

    if (taskIdList.includes(id)) {
        taskList = taskList.filter(task => task.id !== id);
        console.clear();
        console.log('Task deleted successfully.');
        taskListConvert(taskList);
    } else {
        console.log('Task not found.');
    }
}

function editTask() {
    const id = readlineSync.questionInt('Enter the task id to edit: ');
    const task = taskList.find(task => task.id === id);
    if (task) {
        const taskName = readlineSync.question('Enter the new task name: ');
        task.taskName = taskName;
        console.clear();
        console.log('Task updated successfully.');
        taskListConvert(taskList);
    } else {
        console.log('Task not found.');
    }
}


function searchTask() {
    const searchInput = readlineSync.question('Enter the search key: ');
    const searchOutput = taskList.filter(task => Object.values(task).join(", ").toLowerCase().includes(searchInput.toLowerCase()));
    displayTasks(searchOutput);
}

while (true) {
    console.log("\n*****************************")
    console.log("*****************************")
    console.log('**     1. Display tasks    **');
    console.log('**     2. Add task         **');
    console.log('**     3. Delete task      **');
    console.log('**     4. Edit task        **');
    console.log('**     5. Search task      **');
    console.log('**     6. Exit             **');
    console.log("*****************************")
    console.log("*****************************")

    const option = readlineSync.questionInt('Choose an option: ');

    switch (option) {
        case 1:
            displayTasks(taskList);
            break;
        case 2:
            displayTasks(taskList)
            addTask();
            displayTasks(taskList)
            break;
        case 3:
            displayTasks(taskList)
            deleteTask();
            break;
        case 4:
            displayTasks(taskList)
            editTask();
            break;
        case 5:
            console.clear();
            searchTask();
            break;
        case 6:
            console.clear();
            process.exit(0);
        default:
            console.log('Invalid option. Please choose a valid option.');
    }
}