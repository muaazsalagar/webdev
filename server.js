var express = require('express');
var app = express();
var multer = require('multer');
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var uuid = require('node-uuid');
var session = require('express-session');
var passport      = require('passport');

var connectionString = 'mongodb://127.0.0.1:27017/FormApp';

if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {

    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var db = mongoose.connect(connectionString);


app.use(express.static(__dirname + '/public/personalwebsite'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());


app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.PASSPORT_SECRET
}));

app.use(passport.initialize());

app.use(passport.session());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

//require("./public/assignment/server/app.js")(app,db,mongoose, uuid);
require("./public/platform9Assignment/server/app.js")(app, uuid);
require("./public/project/server/app.js")(app,db,mongoose, uuid);


app.get('/hello', function(req, res){
    res.send('hello world');
});

app.get('/', function(req, res){
    res.send('THIS PAGE IS UNDER CONSTRUCTION UPDATES ARE COMING SOON');
});

// for services



app.listen(port, ipaddress, function(){
    console.log("The Force has awoken!!");
    console.log("Server listening at: " + ipaddress + ":" + port);
});
