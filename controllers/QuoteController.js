const categoryModel = require('../models/Category');
const quoteModel = require('../models/Quote');
const employeeModel = require('../models/Employee');


var formidable = require('formidable');
var fs = require('fs');
const { mongo } = require('mongoose');

//HomePage
const getQuotesPublic = async (req, res) => {
  try {
    await quoteModel.aggregate(
      [
        { "$addFields": { "searchCId": { "$toObjectId": "$category" } } },
        { "$addFields": { "searchUId": { "$toObjectId": "$userId" } } },
        { "$addFields": { "searchAId": { "$toObjectId": "$author" } } },
        { $match: { "status": "Public" } },
        {
          "$lookup": {
            "from": "categories",
            "localField": "searchCId",
            "foreignField": "_id",
            "as": "resultCat"
          }
        },
        {
          "$lookup": {
            "from": "employees",
            "localField": "searchUId",
            "foreignField": "_id",
            "as": "resultUser"
          },
        },
        {
          "$lookup": {
            "from": "authors",
            "localField": "searchAId",
            "foreignField": "_id",
            "as": "resultAuthor"
          }
        },
        {
          $match: {
            "resultUser.status": "Enable"
          }
        },
        // { $unwind: "$resultUser" },
        {
          $project: {
            _id: 1,
            author: 1,
            createdAt: 1,
            quote: 1,
            category: 1,
            status: 1,
            resultCat: { name: 1 },
            resultUser: { name: 1, status: 1, photo:1 },
            resultAuthor: { name: 1 },
          }
        },
      ])
      .then((resp) => {
        console.log(resp, 'HomePage');
        res.status(200).json(resp);

      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
}

//AllQuotes
const getQuotes = async (req, res) => {
  try {

    await quoteModel.aggregate(
      [
        { "$addFields": { "searchCId": { "$toObjectId": "$category" } } },
        { "$addFields": { "searchUId": { "$toObjectId": "$userId" } } },
        { "$addFields": { "searchAId": { "$toObjectId": "$author" } } },
        {
          "$lookup": {
            "from": "categories",
            "localField": "searchCId",
            "foreignField": "_id",
            "as": "resultCat"
          }
        },
        {
          "$lookup": {
            "from": "employees",
            "localField": "searchUId",
            "foreignField": "_id",
            "as": "resultUser"
          }
        },
        {
          "$lookup": {
            "from": "authors",
            "localField": "searchAId",
            "foreignField": "_id",
            "as": "resultAuthor"
          }
        },
        {
          $project: {
            _id: 1,
            author: 1,
            createdAt: 1,
            quote: 1,
            category: 1,
            status: 1,
            resultCat: { name: 1 },
            resultUser: { name: 1 },
            resultAuthor: { name: 1 },
          }
        }
      ])
      .then((resp) => {
        console.log(resp, 'AllQuotes');
        res.status(200).json(resp);

      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
  }
};

const getQuoteByID = async (req, res) => {
  try {
    const quotes = await quoteModel.findOne({ _id: req.params.id });
    res.status(200).json(quotes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

//MyQuotes
const getQuote = async (req, res) => {
  try {
    // console.log(req.decoded.role);
    // const quotes = await quoteModel.find({ userId: req.decoded.id });
     const reqUserId = req.decoded.id;
    // res.status(200).json(quotes);
    await quoteModel.aggregate(
      [
        { "$addFields": { "searchCId": { "$toObjectId": "$category" } } },
        { "$addFields": { "searchUId": { "$toObjectId": "$userId" } } },
        { "$addFields": { "searchAId": { "$toObjectId": "$author" } } },
        { $match: { $nor: [{ "status": "Block" }] } },
        { $match: {  "userId": reqUserId  } }, 
        {
          "$lookup": {
            "from": "categories",
            "localField": "searchCId",
            "foreignField": "_id",
            "as": "resultCat"
          }
        },
        {
          "$lookup": {
            "from": "employees",
            "localField": "searchUId",
            "foreignField": "_id",
            "as": "resultUser"
          }
        },
        {
          "$lookup": {
            "from": "authors",
            "localField": "searchAId",
            "foreignField": "_id",
            "as": "resultAuthor"
          }
        },
        {
          $project: {
            _id: 1,
            author: 1,
            createdAt: 1,
            quote: 1,
            category: 1,
            status: 1,
            resultCat: { name: 1 },
            resultUser: { name: 1 },
            resultAuthor: { name: 1 },
          }
        }
      ])
      .then((resp) => {
        console.log(resp, 'MyQuotes');
        res.status(200).json(resp);

      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const AddQuote = async (req, res) => {
  const { userId, author, quote, category, status } = req.body;

  const newQuote = new quoteModel({
    userId: req.decoded.id,
    author,
    quote,
    category,
    status
  });

  try {
    await newQuote.save();
    res.status(201).json(newQuote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const updateQuote = async (req, res) => {
  const id = req.params.id;
  const { userId, author, quote, category, status } = req.body;

  const updateQuote = {
    userId,
    author,
    quote,
    category,
    status
  };
  try {
    await quoteModel.findByIdAndUpdate(id, updateQuote, { new: true });
    res.status(200).json(updateQuote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

const deleteQuote = async (req, res) => {
  try {
    const quote = await quoteModel.findByIdAndRemove(req.params.id);
    res.status(202).json(quote);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


module.exports = { getQuotes, getQuote, AddQuote, updateQuote, deleteQuote, getQuoteByID, getQuotesPublic };