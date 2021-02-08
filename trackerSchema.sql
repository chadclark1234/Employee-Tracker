-- DROP DATABASE IF EXISTS employeeDB;

CREATE database employeeDB;

USE employeeDB;


CREATE TABLE department (
 id INT AUTO_INCREMENT,
 name VARCHAR(30),
 PRIMARY KEY (id)
);

CREATE TABLE employee_role (
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id),
   PRIMARY KEY (id)

  
);
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES employee_role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)

);


select * from employee_role;
select * from employee;
select * from department;
INSERT INTO employee (first_name, last_name)
VALUES ("John", "Peterson"),("Andy", "Holland"),("Tanner", "Clark"),("Janet", "Peters"),("Kelly", "Anderson");
INSERT INTO department (name)
VALUES ("Assembly"), ("Shipping"), ("Quality Control"), ("Human Resources"), ("Sales"), ("Customer Service");
INSERT INTO employee_role (title,salary,department_id)
VALUES ("CSR", 35000, 6),("Assembler", 55000, 1), ("QC Technician", 53000, 3), ("Dock Superviser", 60000, 2),("Salesman", 47000, 5), ("Office Manager", 62000, 4);