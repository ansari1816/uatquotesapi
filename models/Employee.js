const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    },
    photo: {
        type: String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Employee", EmployeeSchema);