const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    findAllEmployees() {
        return this.connection.promise().query(`SELECT * FROM employee`);
    }

    createEmployee(employee) {
        return this.connection.promise().query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
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
        return this.connection.promise().query(`INSERT INTO department (department_name)
                                                VALUES (?)`);

    }

    createRole() {
        return this.connection.promise().query(`INSERT INTO role (title, salary, department_id)
                                                VALUES (?, ?, ?)`);

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