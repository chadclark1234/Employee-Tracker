const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");
const questions = require("./questions");
// const connection = require("./connection");
const { newEmployee } = require("./questions");
const connection = require("./connection");
// const newEmployee = require("./functions.js");

// var newEmployee = {
//   first_name: "Andy",
//   last_name: "Anderson",
// };
// connection.query(
//   "insert into employee set ?",
//   newEmployee,
//   function (err, result) {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     console.log("The inserted id was: ", result.insertId);
//     console.log(result);
//     connection.end();
//   }
// );

// newEmployee = () => {
//   var query = connection.query(
//     "INSERT INTO employee(first_name,last_name) values ('John','Anderson')",
//     function (err, res) {
//       if (err) throw err;
//     }
//   );
//   connection.end();
// };
// newEmployee();

// INITIAL PROMPT FROM MAIN MENU \\
inquirer.prompt(questions.mainMenu).then((answers) => {
  // console.log(answers);
  // console.log(answers.main_menu);
  switch (answers.main_menu) {
    case "Add/Remove Employee":
    case "Add/Remove Role":
    case "Add/Remove Department":
    case "Add/Remove Manager":
      addRemove(answers.main_menu);
      // console.log("Add/Remove");
      break;
    case "View All Employees":
    case "View All Roles":
    case "View All Departments":
      viewPeople(answers.main_menu);
      // console.log("View All");
      break;
    default:
      inquirer.prompt(questions.mainMenu);
  }
});

// FILTERS AND DIRECTS ADD/REMOVE FROM CHOICE \\
addRemove = (answer) => {
  console.log(answer);
  if (answer === "Add/Remove Employee") {
    inquirer.prompt(questions.addRemoveEmployee).then((answer) => {
      if (answer.add_remove_employee === "Add Employee") {
        console.log("add employee");
        addEmployee();
      } else {
        console.log("remove employee");
      }
    });
  }
  if (answer === "Add/Remove Manager") {
    inquirer.prompt(questions.addRemoveManager).then((answer) => {
      if (answer.add_remove_manager === "Add Manager") {
        console.log("add manager");
        addItem(queryURL);
      } else {
        console.log("remove manager");
      }
    });
  }
  if (answer === "Add/Remove Role") {
    inquirer.prompt(questions.addRemoveRole).then((answer) => {
      if (answer.add_remove_role === "Add Role") {
        console.log("add role");
        addItem(queryURL);
      } else {
        console.log("remove role");
      }
    });
  }
  if (answer === "Add/Remove Department") {
    inquirer.prompt(questions.addRemoveDepartment).then((answer) => {
      if (answer.add_remove_department === "Add Department") {
        console.log("add department");
        addItem(queryURL);
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
    queryURL = "SELECT id,first_name,last_name FROM employee";
    viewAll(queryURL);
  } // VIEW ALL ROLES \\
  if (answer === "View All Roles") {
    queryURL = "SELECT id,title,salary FROM employee_role";
    viewAll(queryURL);
  } // VIEW ALL DEPARTMENTS \\
  if (answer === "View All Departments") {
    queryURL = "SELECT id,name FROM department";
    viewAll(queryURL);
  }
};

// CALLED TO GRAB/DISPLAY INFO BASED ON SELECTION \\
viewAll = (queryURL) => {
  connection.query(queryURL, function (err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
};

addEmployee = () => {
  inquirer.prompt(questions.addNewEmployee).then((answer) => {
    console.log(answer);
    let employee = {
      first_name: answer.first_name,
      last_name: answer.last_name,
    };
    let role = {
      title: answer.title,
      salary: answer.salary,
    };
    let department = {
      department: answer.department,
    };
    console.log(employee);
    connection.query(
      "INSERT INTO employee set ?",
      employee,
      "INSERT INTO department set ?",
      department,
      function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        console.log("The inserted id was: ", result.insertId);
        console.log(result);
        connection.end();
      }
    );
  });
};
