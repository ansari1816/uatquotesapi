const FeedbackModel = require('../models/Feedback')

const FeedbackAdd = async (req, res) => {
  const { type, email, feedback } = req.body

  const newFeedback = new FeedbackModel({
    type,
    email,
    feedback
  })

  try {
    await newFeedback.save()
    res.status(201).json(newFeedback)
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
}


const FeedbackGet = async (req, res) => {
    try {
        const feedback = await FeedbackModel.find();
        res.status(200).json(feedback);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};


module.exports = { FeedbackAdd, FeedbackGet }
