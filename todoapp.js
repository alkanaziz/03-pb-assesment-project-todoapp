console.clear();
import readlineSync from 'readline-sync';
import fs from 'fs';
export { todoApp };

function todoApp() {

    var taskListJSON = fs.readFileSync('tasklist.json', 'utf8');
    let taskList = JSON.parse(taskListJSON);

    function taskListConvert(taskList) {
        taskListJSON = JSON.stringify(taskList);
        // Write JSON to a file
        fs.writeFileSync('tasklist.json', taskListJSON);
    }


    function displayTasks(taskArr) {

        console.clear();

        if (taskArr.length === 0) {
            console.log('No tasks available.');
        } else {
            let longestTaskStr = taskList.map(item => item.taskName.length).reduce((acc, currentValue) => Math.max(acc, currentValue), 0);
            // console.log(longestTaskStr)
            console.log(`${"-".repeat((longestTaskStr + 10) / 2)}Here are your tasks:${"-".repeat((longestTaskStr + 10) / 2)}`);

            let minusAdd;
            for (let i = 0; i < taskArr.length; i++) {
                let taskName = taskArr[i].taskName;
                taskName = taskName + " ".repeat(longestTaskStr - taskName.length);
                let spaceAfterTaskValue = taskArr[i].id >= 10 ? " " : "  ";
                let taskLoggedValue = `| ${i + 1}. | ${taskName} | ${taskArr[i].status} | (id: ${taskArr[i].id})${spaceAfterTaskValue}|`;
                minusAdd = "-".repeat(taskLoggedValue.length);
                console.log(minusAdd);
                console.log(taskLoggedValue);
            }
            console.log(minusAdd);
        }
    }

    function addTask() {
        const taskName = readlineSync.question('Enter the new task name: ');
        const newTaskId = taskList.length === 0 ? 1 : taskList[taskList.length - 1].id + 1;
        const newTask = { id: newTaskId, taskName, status: 'pending' };
        taskList.push(newTask);
        console.log('Task added successfully.');
        taskListConvert(taskList);
    }

    function deleteTask() {
        const id = readlineSync.questionInt('Enter the task id to delete: ');
        let taskIdList = taskList.map(m => m.id);

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
        let toDoAppMenu = `${"*".repeat(3)} _ _ _____     ____             _               _ _ ${"*".repeat(3)}
${"*".repeat(3)}( | )_   _|__ |  _ \\  ___      / \\   _ __  _ __( | )${"*".repeat(3)}
${"*".repeat(3)} V V  | |/ _ \\| | | |/ _ \\    / _ \\ | '_ \\| '_ \\V V ${"*".repeat(3)}
${"*".repeat(3)}      | | (_) | |_| | (_) |  / ___ \\| |_) | |_) |   ${"*".repeat(3)}
${"*".repeat(3)}      |_|\\___/|____/ \\___/  /_/   \\_\\ .__/| .__/    ${"*".repeat(3)}
${"*".repeat(3)}                                    |_|   |_|       ${"*".repeat(3)}
${"*".repeat(3)}                                                    ${"*".repeat(3)}`;

        console.log(`\n${"*".repeat(58)}`)
        console.log(`${"*".repeat(58)}`)
        console.log(toDoAppMenu)
        console.log(`${"*".repeat(58)}`)
        console.log(`${"*".repeat(58)}`)
        console.log(`${"*".repeat(15)}     1. Display tasks (D)    ${"*".repeat(14)}`);
        console.log(`${"*".repeat(15)}     2. Add task (A)         ${"*".repeat(14)}`);
        console.log(`${"*".repeat(15)}     3. Delete task (d)      ${"*".repeat(14)}`);
        console.log(`${"*".repeat(15)}     4. Edit task (E)        ${"*".repeat(14)}`);
        console.log(`${"*".repeat(15)}     5. Search task (S)      ${"*".repeat(14)}`);
        console.log(`${"*".repeat(15)}     6. Exit (e)             ${"*".repeat(14)}`);
        console.log(`${"*".repeat(58)}`);
        console.log(`${"*".repeat(58)}`);

        const option = readlineSync.question('Choose an option: ');

        switch (option) {
            case "1":
            case "D":
                displayTasks(taskList);
                break;
            case "2":
            case "A":
                displayTasks(taskList);
                addTask();
                displayTasks(taskList);
                break;
            case "3":
            case "d":
                displayTasks(taskList);
                deleteTask();
                break;
            case "4":
            case "E":
                displayTasks(taskList);
                editTask();
                displayTasks(taskList);
                break;
            case "5":
            case "S":
                console.clear();
                searchTask();
                break;
            case "6":
            case "e":
                console.clear();
                process.exit(0);
            default:
                console.log('Invalid option. Please choose a valid option.');
        }
    }
}