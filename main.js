import ora from "ora";
import chalk from "chalk";
import { todoApp } from "./todoapp.js";


const colors = [
    'red', 'green', 'yellow', 'blue', 'magenta', 'cyan'
]
let i = 0

function getNextColor() {
    const color = colors[i++]
    if (i === colors.length) {
        i = 0
    }
    return color
};


const dciWebDev = `
     ____   ____ ___  __        _______ ____    ____  _______     __
    |  _ \\ / ___|_ _| \\ \\      / / ____| __ )  |  _ \\| ____\\ \\   / /
    | | | | |    | |   \\ \\ /\\ / /|  _| |  _ \\  | | | |  _|  \\ \\ / / 
    | |_| | |___ | |    \\ V  V / | |___| |_) | | |_| | |___  \\ V /  
    |____/ \\____|___|    \\_/\\_/  |_____|____/  |____/|_____|  \\_/   


           _ ____    ____  ____   ___      _ _____ ____ _____ 
          | / ___|  |  _ \\|  _ \\ / _ \\    | | ____/ ___|_   _|
       _  | \\___ \\  | |_) | |_) | | | |_  | |  _|| |     | |  
      | |_| |___) | |  __/|  _ <| |_| | |_| | |__| |___  | |  
       \\___/|____/  |_|   |_| \\_\\\\___/ \\___/|_____\\____| |_|  
    
`;


const spinner = ora(`${dciWebDev}`).start()
setInterval(() => {
    const color = getNextColor()
    spinner.color = color
    spinner.text = `${chalk[color](dciWebDev)}`
}, 500)

setTimeout(() => {
    spinner.stop()
    todoApp()
}, 5000)
