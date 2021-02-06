const connection = require("./connection");
// newEmployee = () => {
//   var query = con.query(
//     "INSERT INTO employee(first_name,last_name) values ('John','Anderson'",
//     function (err, res) {
//       if (err) throw err;
//     }
//   );
// };
// var newEmployee = {
//   first_name: "Andy",
//   last_name: "Anderson",
// };
newEmployee = () => {
  connection.query(
    "insert into employee set ?",
    newEmployee,
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
};

// module.exports = newEmployee;
