const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");

// create express app
const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS block
app.use(function(err, req, res, next) {
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});

// Configuring the database
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect('mongodb+srv://dani:dan@cluster0-8uqu6.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use(express.static('public'));

// imports des routes
require('./routes/users.route.js')(app);
require('./routes/tickets.route.js')(app);

// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
