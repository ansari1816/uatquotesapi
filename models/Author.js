const mongoose = require('mongoose');

const AuthorSchema = mongoose.Schema(
    {
        name: { type: String, require: true }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Author", AuthorSchema);