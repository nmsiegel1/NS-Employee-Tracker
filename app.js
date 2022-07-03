const logo = require("asciiart-logo");
const consoleTable = require("console.table");
const inquirer = require("inquirer");
const connection = require("./db/connection");

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
          case "Update employee":
            updateEmployeeRole();
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
  }
// ----------Inquirer functions--------------
const newRoleQuestions = (companyDepartments) => {
    return [
      {
        type: "input",
        name: "title",
        message: "What is the name of this role?"
      },
      {
        type: "input",
        name: "salary",
        message: "What is the salary of this role?"
      },
      {
        type: "list",
        name: "department",
        message: "Which department does this role belong to?",
        choices: companyDepartments
      },
    ];
  };

const newEmployeeQuestions = (companyRoles, companyManagers) => {
    return [
      {
        type: "input",
        name: "firstName",
        message: "What is this employee's first name?"
      },
      {
        type: "input",
        name: "lastName",
        message: "What is this employee's last name?"
      },
      {
        type: "list",
        name: "role",
        message: "What is this employee's role?",
        choices: companyRoles
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employee's manager?",
        choices: companyManagers
      },
    ];
  };

  const updateEmployeeQuestions = (employees, companyRoles) => {
    return [
      {
        type: "list",
        name: "employeeId",
        message: "Which employee do you want to update?",
        choices: employees
      },
      {
        type: "list",
        name: "roleId",
        message: "What is this employee's updated role?",
        choices: companyRoles
      },
      {
        type: "list",
        name: "managerId",
        message: "Who is this employee's updated manager?",
        choices: employees
      },
    ];
  };


// ----------------------SQL generating functions------------

// ---department functions----
const viewDepartments = () => {
    var sql = `SELECT * FROM department`;
    connection.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.table(rows);
        mainPrompt();
    });
 };

const newDepartment = () => {
    inquirer
      .prompt([
        {
          type: "input",
          name: "name",
          message: "What is the name of the department?",
        },
      ])
      .then(({ name }) => {
        const sql = `INSERT INTO department (department_name)
      VALUES (?)`;
        connection.query(sql, name), (err, rows) => {
            if (err) {
                return;
            }
        };
        console.log(`${name} added to the database`);
        mainPrompt();
    });
 }

//  ------role functions---------
const viewRoles = () => {
    var sql = `SELECT role.id, role.title, role.salary, department.department_name 
                AS department FROM role
                LEFT JOIN department
                ON role.department_id = department.id`;
    connection.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.table(rows);
        mainPrompt();
    });
}

const newRole = () => {
    connection.query(`SELECT id, department_name FROM department`, (err, rows) => {
        const companyDepartments = rows.map((row) => {
          return { value: row.id, name: row.department_name };
        });
        const choices = newRoleQuestions(companyDepartments);
        inquirer.prompt(choices)
        .then(({ title, salary, department }) => {
            const sql = `INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?)`;
            const params = [title, salary, department];
            connection.query(sql, params, (err, rows) => {
                if (err) {
                    return;
                }
                console.log(`Successfully added ${title} to roles`);
                mainPrompt();
            });
        });
    });
}

// ---------employee functions--------
const viewEmployees = () => {
    var sql = `SELECT employee.id, CONCAT(employee.first_name, ' ', employee.last_name) AS name,
                role.title AS role, role.salary AS salary, department.department_name AS department, 
                CONCAT(e2.first_name, ' ', e2.last_name) AS manager 
                FROM employee
                LEFT JOIN role ON employee.role_id = role.id
                LEFT JOIN department ON role.department_id = department.id
                LEFT JOIN employee e2 ON employee.manager_id = e2.id`;
    connection.query(sql, (err, rows) => {
        if (err) {
            return;
        }
        console.table(rows);
        mainPrompt();
    });
}

const newEmployee = () => {
    connection.query(`SELECT id, title FROM role`, (err, rows) => {
        const companyRoles = rows.map((row) => {
          return { value: row.id, name: row.title };
        });

        connection.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee WHERE employee.manager_id IS NULL`,
          (err, rows) => {
            const companyManagers = rows.map((row) => {
              return { value: row.id, name: row.name };
            });

            const choices = newEmployeeQuestions(companyRoles, companyManagers);
            inquirer.prompt(choices)
            .then(({ firstName, lastName, role, manager }) => {
                const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
                const params = [firstName, lastName, role, manager];
                connection.query(sql, params, (err, rows) => {
                    if (err) {
                        return;
                    }
                    console.log(`Successfully added ${firstName} ${lastName} to employees`);
                    mainPrompt();
                });
              })
          });
      });
}

const updateEmployeeRole = () => {
    connection.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`, (err, rows) => {
        const employees  = rows.map((row) => {
          return { value: row.id, name: row.name };
        });

    connection.query(`SELECT id, title FROM role`, (err, rows) => {
        const companyRoles = rows.map((row) => {
          return { value: row.id, name: row.title };
        });

        const choices = updateEmployeeQuestions(employees, companyRoles);
        inquirer.prompt(choices)
        .then(({ roleId, managerId, employeeId }) => {
            const sql = `UPDATE employee SET role_id = ?, manager_id = ?
            WHERE id = ?`;
            const params = [roleId, managerId, employeeId];
            connection.query(sql, params, (err, rows) => {
                if (err) {
                    return;
                } console.log(`Employee successfully updated`)
                mainPrompt();
            });
          });

        });
    });
};


launchApp();