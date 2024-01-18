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


function displayTasks() {

    if (taskList.length === 0) {
        console.log('No tasks available.');
    } else {
        console.log('Here are your tasks:');
        taskList.forEach((task, index) => {
            console.log(`${index + 1}. ${task.taskName} - ${task.status} (id: ${task.id})`);
        });
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

// BUG TASK ID NOT FOUND
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
    if (searchOutput.length === 0) {
        console.log(`No tasks available with key "${searchInput}".`);
    } else {
        console.log('Here are your tasks:');
        searchOutput.forEach((task, index) => {
            console.log(`${index + 1}. ${task.taskName} - ${task.status} (id: ${task.id})`);
        });
    }
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
            console.clear();
            displayTasks();
            break;
        case 2:
            console.clear();
            displayTasks()
            addTask();
            break;
        case 3:
            console.clear();
            displayTasks()
            deleteTask();
            break;
        case 4:
            console.clear();
            displayTasks()
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