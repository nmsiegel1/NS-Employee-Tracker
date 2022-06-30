const logo = require('asciiart-logo');
const consoleTable = require('console.table');
// const { prompt } = require('inquirer');
const DB = require('./db/index');

// function to initiate - display logo and call out function for main promts 
// funciton for main prompts - prompts (label what it is and make choices with name and values), .
// type - list, name - choice, message - choices(array of objets- view all employees then value is sql )
// last 2 objects - name and value are quit
// .then - method in which you apply the solution - response
// create a variable and whatever you call the data its a res.choice - conditiion for the switch 
//  then(res.choice) case is value. call out a statement - break.
// then make individual functions for prompts

// class = db in index.js in the db folder
function launchApp() {
    console.log(logo({
        name: 'Employee Tracker',
        borderColor: 'cyan',
        logoColor: 'bold-green'
    }).render());
}

// function viewEmployees() {
//     db.findAllEmployees()
//     .then(([rows]) => {
//         let employees = rows;
//         console.table(employees);
//     })
//     .then(( )=> mainPrompt())
// }

// employeeChoices = []


launchApp();