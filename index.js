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
    case "Add/Remove Manager":
    case "Add/Remove Role":
    case "Add/Remove Department":
      addRemove(answers.main_menu);
      // console.log("Add/Remove");
      break;
    case "View All Employees":
    case "View All Managers":
    case "View All Roles":
    case "View All Departments":
      viewPeople(answers.main_menu);
      // console.log("View All");
      break;
    default:
      console.log("No response");
  }
});

addRemove = (answer) => {
  // inquirer.prompt(questions.addRemoveEmployee).then((answers) => {
  console.log(answer);
  // });
};

viewPeople = (answer) => {
  console.log(answer); //View All Employees
  if (answer === "View All Employees") {
    queryURL = "SELECT id,first_name,last_name FROM employee";
    viewAll(queryURL);
  }
};

viewAll = (queryURL) => {
  connection.query(queryURL, function (err, res) {
    if (err) throw err;
    console.table(res);
    connection.end();
  });
};
//   var query = connection.query(
//     "INSERT INTO employee(first_name,last_name) values ('John','Anderson')",
//     function (err, res) {
//       if (err) throw err;
//     }
//   );
//   connection.end();
// };
