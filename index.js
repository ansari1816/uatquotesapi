const express = require('express'), http = require('http');;
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");
const employeeRouter = require("./routes/EmployeeRoutes");
const quoteRouter = require("./routes/QuoteRoutes");
const categoryRouter = require("./routes/CategoryRoutes");
const authorRouter = require("./routes/AuthorRoutes");
const feedbackRouter = require("./routes/FeedbackRoutes");
const morgan = require('morgan');

const employeeModel = require('./models/Employee');
const quoteModel = require('./models/Quote');


const app = express();

app.use(morgan('dev'));

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "http://localhost:4200",
        "https://uatquotes.ansarimohammad.com/"
    ]
};
// const corsOptions = { origin: "*" };
// app.use(cors());
app.use(cors(corsOptions));

// app.use(express.static('uploads'));
app.use('/uploads', express.static('uploads'));
// app.use(express.static('controller/uploads'));

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.use("/employee", employeeRouter);
app.use("/quote", quoteRouter);
app.use("/category", categoryRouter);
app.use("/author", authorRouter);
app.use("/feedback", feedbackRouter);
// var server = http.createServer(app);
// const io = require('socket.io')(server);
var server  = require('http').createServer(app);
var io      = require('socket.io')(server);

const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.Mongo_URL)
    .then(() => {
        server.listen(PORT, () => {
            console.log(`DB connected  :) ${PORT}`);
            // getEmployee()
            // io.on('connection', (socket) => {
            //     console.log('A user connected');

            //     // Insert data into MongoDB on socket event
            //     socket.on('data', (data) => {
            //         // db.collection('mycollection').insertOne(data, (err, res) => {
            //             // if (err) throw err;
            //             socket.emit('data', 'Hi, How may I help you.');
            //             console.log('Data inserted : ' + data);
            //         // });
            //     });
            // });
        });
    })
    .catch((error) => {
        console.log(error);
    });
