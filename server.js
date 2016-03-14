var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public/personalwebsite'));
app.use(express.static(__dirname + '/public'));

var multer        = require('multer');
var bodyParser    = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 5000;


app.get('/hello', function(req, res){
    res.send('hello world');
});

app.get('/', function(req, res){
    res.send('THIS PAGE IS UNDER CONSTRUCTION UPDATES ARE COMING SOON');
});

// for services

require("./public/assignment/server/app.js")(app);


app.listen(port, ipaddress, function(){
    console.log("The Force has awoken!!")
});
