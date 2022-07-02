const logo = require("asciiart-logo");
const consoleTable = require("console.table");
const inquirer = require("inquirer");
// const { listenerCount } = require('./db/connection');
// const { updateEmployeeRole } = require('./db/index');
// const { prompt } = require('inquirer');
const DB = require("./db/index");

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
  console.log(
    logo({
      name: "Employee Tracker",
      borderColor: "cyan",
      logoColor: "bold-green",
    }).render()
  );
  mainPrompt();
}

function mainPrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "mainPrompt",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add employee",
        "Update employee role",
        "Add role",
        "Add department",
        "Quit",
      ],
    })
    .then((answers) => {
      switch (answers.mainPrompt) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View all employees":
          viewEmployees();
          break;
        case "Add employee":
          newEmployee();
          break;
        case "Update employee role":
          employeeRole();
          break;
        case "Add role":
          newRole();
          break;
        case "Add department":
          newDepartment();
          break;
        case "Quit":
          process.exit();
        default:
          console.log("Please choose an option");
      }
    });
  // .catch((err) => console.log('Please choose an option'));
}

function viewDepartments() {
  DB.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.table(departments);
    })
    .then(() => mainPrompt());
}

function viewRoles() {
  DB.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.table(roles);
    })
    .then(() => mainPrompt());
}

function viewEmployees() {
  DB.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.table(employees);
    })
    .then(() => mainPrompt());
}

function newEmployee() {
  DB.createEmployee();
  // .then(([rows]) => {
  //     let employees = rows;
  //     console.table(employees);
  // })
  // .then(( )=> mainPrompt())
}

function employeeRole() {
  DB.updateEmployeeRole();
  // .then(([rows]) => {
  //     let employees = rows;
  //     console.table(employees);
  // })
  // .then(( )=> mainPrompt())
}

function newRole() {
  DB.createRole();
}

function newDepartment() {
  DB.createDepartment();

  // console.log("department created successfully");
  // mainPrompt()
  //  .then(([rows]) => {
  //         let employees =rows;
  //         console.log("Department successfully added");
  //     })
  // .then(( )=> mainPrompt())
}

// employeeChoices = []

launchApp();

module.exports = { mainPrompt };
