const express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    passport = require('passport'),
    path = require('path'),
    app = express();

// app middleware use
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize()); //passport initialization
require('./config/passport')(passport); // passport config

//Port for environment
const port = process.env.PORT || 5000;
app.listen(port, async () => await console.log(`Server started on the port :: ${port}`));

// Mongodb connection 
const db = require('./config/keys').mongoURI;
mongoose
    .connect(db, { useNewUrlParser: true, useFindAndModify: false })
    .then(async () => await console.log('Connected to the database'))
    .catch(async (err) => await console.log('Not Connected to the database :: ', err))

// importing router
const router = require('./router');

app.use('/', router);

// applying static assests
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    const ouput = fs.readdirSync(path.resolve(__dirname, 'client', 'build'))
    console.log(output)
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}
