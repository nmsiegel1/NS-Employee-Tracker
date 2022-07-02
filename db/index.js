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

  createEmployee(employee) {
    return this.connection.promise()
      .query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                                                VALUES (?, ?, ?, ?)`);
  }

  updateEmployeeRole() {
    return this.connection.promise().query(`UPDATE employee SET role_id = ?
                                            WHERE id = ?`);
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
        }
      ])
      .then(({ name }) => {
        const sql = `INSERT INTO department (department_name)
      VALUES (?)`;
        const params = [name];
        return this.connection.promise().query(sql, params);
      })
    //   .then(mainPrompt);
  };

  createRole() {
    this.connection.query('SELECT id, department_name FROM department', (err, rows) => {
        const companyDepartments = rows.map((row) => {
            return { value: row.id, name: row.department_name};
        });
        // const choices = roleQuestions(companyDepartments);
        inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What is the salary for this role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does this role belong to?',
                choices: companyDepartments
            }
        ])
        .then(({ title, salary, department }) => {
            const sql = `INSERT INTO role (title, salary, department_id)
            VALUES (?, ?, ?)`;
            const params = [title, salary, department];
            return this.connection.promise().query(sql, params);
        });
    });
};
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
