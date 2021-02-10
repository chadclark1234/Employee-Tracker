const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");
const questions = require("./questions");
const connection = require("./connection");
const { newEmployee, addRemoveDepartment } = require("./questions");

// INITIAL PROMPT FROM MAIN MENU \\
const start = () => {
  inquirer.prompt(questions.mainMenu).then((answers) => {
    switch (answers.main_menu) {
      case "Add/Remove Employee":
      case "Add/Remove Role":
      case "Add/Remove Department":
        // case "Add/Remove Manager":
        addRemove(answers.main_menu);
        break;
      case "View All Employees":
      case "View All Roles":
      case "View All Departments":
        viewPeople(answers.main_menu);
        break;
      default:
        connection.end();
    }
  });
};

// FILTERS AND DIRECTS ADD/REMOVE FROM CHOICE \\
addRemove = (answer) => {
  if (answer === "Add/Remove Employee") {
    inquirer.prompt(questions.addRemoveEmployee).then((answer) => {
      if (answer.add_remove_employee === "Add Employee") {
        addEmployee();
      } else {
        removeEmployee();
        console.log("remove employee");
      }
    });
  }
  if (answer === "Add/Remove Role") {
    inquirer.prompt(questions.addRemoveRole).then((answer) => {
      if (answer.add_remove_role === "Add Role") {
        addRole();
      } else {
        console.log("remove role");
      }
    });
  }
  if (answer === "Add/Remove Department") {
    inquirer.prompt(questions.addRemoveDepartment).then((answer) => {
      if (answer.add_remove_department === "Add Department") {
        addDepartment();
      } else {
        console.log("remove department");
      }
    });
  }
};

// DISPLAY TABLE OF VIEW CHOICE \\
viewPeople = (answer) => {
  // View All Employees \\
  if (answer === "View All Employees") {
    queryURL =
      "SELECT employee.id,employee.first_name,employee.last_name,employee.role_id,employee_role.id,employee_role.title,employee_role.salary,employee_role.department_id FROM employee INNER JOIN employee_role ON employee_role.id = employee.role_id";
    viewAll(queryURL);
  } // VIEW ALL ROLES \\
  if (answer === "View All Roles") {
    queryURL =
      "SELECT employee_role.id,employee_role.title,employee_role.salary,employee_role.department_id,department.name FROM employee_role JOIN department ON employee_role.department_id = department.id";
    viewAll(queryURL);
  } // VIEW ALL DEPARTMENTS \\
  if (answer === "View All Departments") {
    queryURL = "SELECT id,name FROM department";
    viewAll(queryURL);
  }
};

// DISPLAYS TABLES BASED ON SELECTION \\
viewAll = (queryURL) => {
  connection.query(queryURL, function (err, res) {
    if (err) throw err;
    console.table(res);
    start();
  });
};

// ASKS NEW EMPLOYEE QUESTIONS AND SENDS TO DB \\
addEmployee = () => {
  connection.query("SELECT title,id FROM employee_role", function (err, res) {
    if (err) throw err;
    // CREATES TITLE CHOICES IN QUESTIONS \\
    const roleTitleChoices = [];
    for (let i = 0; i < res.length; i++) {
      roleTitleChoices.push({
        name: res[i].title,
        value: res[i].id,
      });
    }
    questions.addNewEmployee[2].choices = roleTitleChoices;
    // ASKS NEW EMPLOYEE QUESTIONS \\
    inquirer.prompt(questions.addNewEmployee).then((answer) => {
      // NEW EMPLOYEE OBJECTS \\
      let employee = {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.role_id,
      };

      // QUERY TO SEND NEW EMPLOYEE OBJECT TO DB \\
      connection.query(
        "INSERT INTO employee set ?",
        employee,

        function (err, result) {
          if (err) {
            console.log(err);
            return;
          }
          start();
        }
      );
    });
  });
};

// REMOVE EMPLOYEE FROM DB \\
removeEmployee = () => {
  console.log("remove employee function");
};

// ADD ROLE/DEPARTMENT \\
const addRole = () => {
  // CREATES LIST FOR DEPARTMENT QUESTIONS \\
  connection.query(
    "SELECT department.id,department.name FROM department",
    function (err, res) {
      if (err) throw err;
      const departmentChoices = [];
      for (let i = 0; i < res.length; i++) {
        departmentChoices.push({
          name: res[i].name,
          value: res[i].id,
        });
      }
      questions.addRole[2].choices = departmentChoices;
      inquirer.prompt(questions.addRole).then((answers) => {
        connection.query(
          "INSERT INTO employee_role set ?",
          {
            title: answers.title,
            salary: answers.salary,
            department_id: answers.department,
          },

          function (err, result) {
            if (err) {
              console.log(err);
              return;
            }
            start();
          }
        );
      });
    }
  );
};

const addDepartment = () => {
  inquirer.prompt(questions.addDepartment).then((answer) => {
    connection.query(
      "INSERT INTO department set ?",
      {
        name: answer.add_department,
      },

      function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        start();
      }
    );
  });
};

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});
