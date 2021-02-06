const questions = {
  mainMenu: [
    {
      type: "list",
      name: "main_menu",
      message: "Select what you would like to do",
      choices: [
        "Add/Remove Employee",
        "Add/Remove Manager",
        "Add/Remove Role",
        "Add/Remove Department",
        "View All Employees",
        "View All Managers",
        "View All Roles",
        "View All Departments",
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
};

module.exports = questions;
