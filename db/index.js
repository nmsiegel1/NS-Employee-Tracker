const connection = require("./connection");
const inquirer = require("inquirer");

// const { mainPrompt } = require('../app');

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  findAllEmployees() {
    return this.connection.promise().query(`SELECT * FROM employee`);
  }

  createEmployee() {
    this.connection.query(`SELECT id, title FROM role`, (err, rows) => {
      const companyRoles = rows.map((row) => {
        return { value: row.id, name: row.title };
      });

      this.connection.query(
        `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee WHERE employee.manager_id IS NULL`,
        (err, rows) => {
          const companyManagers = rows.map((row) => {
            return { value: row.id, name: row.name };
          });

          inquirer
            .prompt([
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
                message: "Who is this employee's manager?",
                choices: companyManagers
              }
            ])
            .then(({ firstName, lastName, role, manager }) => {
              const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
              const params = [firstName, lastName, role, manager];
              return this.connection.promise().query(sql, params);
            });
        }
      );
    });
  }

// TO DO: how do i add none to manager?
  updateEmployeeRole() {
    this.connection.query(`SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`, (err, rows) => {
        const employees  = rows.map((row) => {
          return { value: row.id, name: row.name };
        });

    this.connection.query(`SELECT id, title FROM role`, (err, rows) => {
        const companyRoles = rows.map((row) => {
          return { value: row.id, name: row.title };
        });

        // this.connection.query(
        //   `SELECT id, CONCAT(first_name, ' ', last_name) AS name FROM employee`,
        //   (err, rows) => {
        //     const companyManagers = rows.map((row) => {
        //       return { value: row.id, name: row.name };
        //     });

            inquirer
              .prompt([
                {
                  type: "list",
                  name: "employee",
                  message: "Which employee would you like to update?",
                  choices: employees
                },
                {
                  type: "list",
                  name: "role",
                  message: "What is this employee's updated role?",
                  choices: companyRoles
                },
                {
                  type: "list",
                  name: "manager",
                  message: "Who is this employee's updated manager?",
                  choices: employees
                }
              ])
              .then(({ employee, role, manager }) => {
                const sql = `UPDATE employee SET role_id = ?, manager_id = ?
                WHERE id = ?`;
                const params = [role, manager, employee];
                return this.connection.promise().query(sql, params);
              });
          });
        });
    //   });
  }

  findAllRoles() {
    return this.connection.promise().query(`SELECT * FROM role`);
  }

  findAllDepartments(department) {
    return this.connection.promise().query(`SELECT * FROM department`);
  }

  createDepartment() {
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
        const params = [name];
        return this.connection.promise().query(sql, params);
      });
    //   .then(mainPrompt);
  }

  createRole() {
    this.connection.query(
      `SELECT id, department_name FROM department`,
      (err, rows) => {
        const companyDepartments = rows.map((row) => {
          return { value: row.id, name: row.department_name };
        });
        inquirer
          .prompt([
            {
              type: "input",
              name: "title",
              message: "What is the name of the role?",
            },
            {
              type: "input",
              name: "salary",
              message: "What is the salary for this role?",
            },
            {
              type: "list",
              name: "department",
              message: "Which department does this role belong to?",
              choices: companyDepartments,
            },
          ])
          .then(({ title, salary, department }) => {
            const sql = `INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?)`;
            const params = [title, salary, department];
            return this.connection.promise().query(sql, params);
          });
      }
    );
  }
}

// removeEmployee(employeeId) {
//     return this.connection.promise().query(SQL)
// }
// viewBudjet()

// viewEmployeesByDepartment()

// viewEmployeesByManager()

// updateEmployeeManager()

// removeDepartment()

// removeRole()
module.exports = new DB(connection);
