DROP DATABASE IF EXISTS employeeDB;

CREATE database employeeDB;

USE employeeDB;

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
  -- FOREIGN KEY (role_id) REFERENCES employee_role(id),
  -- FOREIGN KEY (manager_id) REFERENCES employee(id)
);

CREATE TABLE employee_role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  PRIMARY KEY (id)
  -- FOREIGN KEY (department_id) REFERENCES department(id)
  
);

CREATE TABLE department (
 id INT NOT NULL AUTO_INCREMENT,
 name VARCHAR(30),
 PRIMARY KEY (id)
);
select * from employee_role;
select * from employee;
INSERT INTO employee (first_name, last_name)
VALUES ("John", "Peterson");
INSERT INTO employee_role (title,salary,department_id)
VALUES ("Manager", "75000", "EE12");
