const express = require('express');
const { FeedbackAdd, FeedbackGet } = require('../controllers/FeedbackController');


const FeedbackRouter = express.Router();

FeedbackRouter.post("/", FeedbackAdd);
FeedbackRouter.get("/", FeedbackGet);

module.exports = FeedbackRouter;