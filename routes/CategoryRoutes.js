const express = require('express');
const { CategoryAdd, CategoryGet, CategoryDelete, CategoryGetById, CategoryUpdate } = require('../controllers/CategoryController');
const checkJwt = require('../middleware/checkJwt');
const checkAdmin = require('../middleware/checkAdmin');

const categoryRouter = express.Router();

categoryRouter.get("/", CategoryGet);
categoryRouter.post("/", checkJwt, checkAdmin, CategoryAdd);
categoryRouter.delete("/:id",checkJwt, checkAdmin, CategoryDelete);
categoryRouter.get("/:id", checkJwt, checkAdmin, CategoryGetById);
categoryRouter.put("/:id",checkJwt, checkAdmin, CategoryUpdate);

module.exports = categoryRouter;