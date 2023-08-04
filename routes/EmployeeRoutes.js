const express = require('express');
const checkJwt = require('../middleware/checkJwt');
const { getEmployees, getEmployee, EmployeeSignUp, EmployeeSignIn, updateEmployee, deleteEmployee, imageEmployee } = require('../controllers/EmployeeController');
const checkAdmin = require('../middleware/checkAdmin');

const employeeRouter = express.Router();

employeeRouter.post("/signup", EmployeeSignUp);
employeeRouter.post("/login", EmployeeSignIn);
employeeRouter.get("/",checkJwt, checkAdmin, getEmployees);
employeeRouter.get("/:id", checkJwt, checkAdmin, getEmployee);
employeeRouter.put("/:id",checkJwt, checkAdmin, updateEmployee);
employeeRouter.delete("/:id",checkJwt, checkAdmin, deleteEmployee);
employeeRouter.post("/image", checkJwt, checkAdmin, imageEmployee);

module.exports = employeeRouter;