const mongoose = require('mongoose');

const QuoteSchema = mongoose.Schema(
    {
        userId: { type: String, require: true },
        author: { type: String, require: true },
        quote: { type: String, require: true },
        category: { type: String, require: true },
        status: { type: String }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Quote", QuoteSchema);