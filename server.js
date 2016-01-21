var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public/personalwebsite'));

var ipaddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.get('/hello', function(req, res){
    res.send('hello world');
});

app.get('/', function(req, res){
    res.send('THIS PAGE IS UNDER CONSTRUCTION UPDATES ARE COMING SOON');
});

app.listen(port, ipaddress);