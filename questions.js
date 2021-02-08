const connection = require("./connection");

const questions = {
  mainMenu: [
    {
      type: "list",
      name: "main_menu",
      message: "Select what you would like to do",
      choices: [
        "Add/Remove Employee",
        "Add/Remove Role",
        "Add/Remove Department",
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Exit",
      ],
    },
  ],
  addRemoveEmployee: [
    {
      type: "list",
      name: "add_remove_employee",
      message: "Select",
      choices: ["Add Employee", "Remove Employee"],
    },
  ],
  addRemoveRole: [
    {
      type: "list",
      name: "add_remove_role",
      message: "Select",
      choices: ["Add Role", "Remove Role"],
    },
  ],
  addRemoveDepartment: [
    {
      type: "list",
      name: "add_remove_department",
      message: "Select",
      choices: ["Add Department", "Remove Department"],
    },
  ],
  addNewEmployee: [
    {
      type: "input",
      name: "first_name",
      message: "Enter employee's first name",
      default: "George",
    },
    {
      type: "input",
      name: "last_name",
      message: "Enter employee's last name",
      default: "Gustafson",
    },
  ],
  addRole: [
    {
      type: "input",
      name: "title",
      message: "Enter role title",
    },
    {
      type: "number",
      name: "salary",
      message: "Enter the role's salary",
      default: "55000",
    },
    {
      type: "list",
      name: "department",
      message: "Select the employee's department",
      choices: [],
    },
  ],
};

module.exports = questions;
