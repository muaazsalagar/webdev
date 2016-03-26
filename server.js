var express = require('express');
var multer        = require('multer');
var bodyParser    = require('body-parser');
var uuid = require('node-uuid');


var app = express();

app.use(express.static(__dirname + '/public/personalwebsite'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());


var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

require("./public/assignment/server/app.js")(app, uuid);
require("./public/platform9Assignment/server/app.js")(app, uuid);
require("./public/project/server/app.js")(app, uuid);




app.get('/hello', function(req, res){
    res.send('hello world');
});

app.get('/', function(req, res){
    res.send('THIS PAGE IS UNDER CONSTRUCTION UPDATES ARE COMING SOON');
});

// for services



app.listen(port, ipaddress, function(){
    console.log("The Force has awoken!!")
});
