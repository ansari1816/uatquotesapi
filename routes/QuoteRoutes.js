const express = require('express');
const checkJwt = require('../middleware/checkJwt');
const { getQuotes, getQuote, AddQuote, updateQuote, deleteQuote, getQuoteByID, getQuotesPublic} 
= require('../controllers/QuoteController');
const checkAdmin = require('../middleware/checkAdmin');

const quoteRouter = express.Router();

quoteRouter.get("/public", getQuotesPublic);
quoteRouter.post("/", checkJwt, AddQuote);
quoteRouter.get("/all", checkJwt, checkAdmin, getQuotes);
quoteRouter.get("/", checkJwt, getQuote);
quoteRouter.get("/:id", checkJwt, getQuoteByID);
quoteRouter.put("/:id", checkJwt,updateQuote);
quoteRouter.delete("/:id", deleteQuote);

module.exports = quoteRouter;