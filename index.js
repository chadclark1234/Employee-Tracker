const mysql = require("mysql");
const inquirer = require("inquirer");
const fs = require("fs");
const questions = require("./questions");
const connection = require("./connection");
const { newEmployee } = require("./questions");

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
  // console.log(answer);
  if (answer === "Add/Remove Employee") {
    inquirer.prompt(questions.addRemoveEmployee).then((answer) => {
      if (answer.add_remove_employee === "Add Employee") {
        // console.log("add employee");
        addEmployee();
      } else {
        removeEmployee();
        console.log("remove employee");
      }
    });
  }
  // if (answer === "Add/Remove Manager") {
  //   inquirer.prompt(questions.addRemoveManager).then((answer) => {
  //     if (answer.add_remove_manager === "Add Manager") {
  //       // console.log("add manager");
  //       addItem(queryURL);
  //     } else {
  //       console.log("remove manager");
  //     }
  //   });
  // }
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
        // console.log("add department");
        // addItem(queryURL);
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
  inquirer.prompt(questions.addNewEmployee).then((answer) => {
    // console.log(answer);
    // NEW EMPLOYEE OBJECTS \\
    let employee = {
      first_name: answer.first_name,
      last_name: answer.last_name,
    };

    // QUERY TO SEND TO DB \\
    connection.query(
      "INSERT INTO employee set ?",
      employee,

      function (err, result) {
        if (err) {
          console.log(err);
          return;
        }
        // console.log("The inserted id was: ", result.insertId);
        // console.log(result);
        addRole();
      }
    );
  });
};

// REMOVE EMPLOYEE FROM DB \\
removeEmployee = () => {
  console.log("remove employee function");
};

// ADD ROLE/DEPARTMENT \\
const addRole = () => {
  // CREATES LIST FOR DEPARTMENT QUESTIONS \\
  connection.query("SELECT id,name FROM department", function (err, res) {
    if (err) throw err;
    // console.log(res);
    const departmentChoices = [];
    for (let i = 0; i < res.length; i++) {
      departmentChoices.push({
        name: res[i].name,
        value: res[i].id,
      });
    }
    // console.log(departmentChoices);
    questions.addRole[2].choices = departmentChoices;
    // console.log(questions.addRole[2].choices);
    inquirer.prompt(questions.addRole).then((answers) => {
      // console.log(answers); //destructure line answers line 156
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
          // console.log("The inserted id was: ", result.insertId);
          // console.log(result);
          start();
        }
      );
    });
  });
};

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});
