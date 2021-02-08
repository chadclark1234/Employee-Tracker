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
