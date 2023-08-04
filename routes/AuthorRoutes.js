const express = require('express');
const { AuthorAdd, AuthorGet, AuthorDelete, AuthorGetById, AuthorUpdate } = require('../controllers/AuthorController');
const checkJwt = require('../middleware/checkJwt');
const checkAdmin = require('../middleware/checkAdmin');

const AuthorRouter = express.Router();

AuthorRouter.get("/", AuthorGet);
AuthorRouter.post("/",checkJwt, checkAdmin, AuthorAdd);
AuthorRouter.get("/:id",checkJwt, checkAdmin, AuthorGetById);
AuthorRouter.delete("/:id",checkJwt, checkAdmin, AuthorDelete);
AuthorRouter.put("/:id",checkJwt, checkAdmin, AuthorUpdate);

module.exports = AuthorRouter;