const mongoose = require('mongoose');

const FeedbackSchema = mongoose.Schema(
    {
        type: { type: String, require: true },
        email: { type: String, require: true },
        feedback: { type: String, require: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Feedback", FeedbackSchema);