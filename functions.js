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

// AUTO UPDATE EMPLOYEE NAME LIST \\
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

updateNameArr = (namesArr) => {
  connection.query(
    "SELECT id,first_name,last_name FROM employee",
    function (err, res) {
      if (err) throw err;
      console.log(res[0].first_name, res[0].last_name);
      namesArr = [];
      for (let i = 0; i < res.length; i++) {
        let fullName = `${res[i].first_name} ${res[i].last_name}`;
        namesArr.push(fullName);
      }
      // console.log(namesArr);

      connection.end();
    }
  );
};
