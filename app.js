var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

var menuSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    link:{
        type: Date,
        required: true
    }
});

//Connect
var dev_db_url = 'mongodb://costasgr:aa1234@ds151004.mlab.com:51004/productstutorial';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

//Test to return menu items
app.get('/menu_items', function (req, res){
    db.collection("menu_items").find({}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

//Return Texts
app.get('/texts', function (req, res){
    db.collection("contents").find({category: "home"}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/texts-overview', function (req, res){
    db.collection("contents").find({category: "overview"}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/texts-commands', function (req, res){
    db.collection("contents").find({category: "commands"}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/texts-commands-use', function (req, res){
    db.collection("contents").find({category: "commands-use"}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/execute',function (req,res) { 
    res.sendFile(path.join(__dirname + '/client/execute_query.html'));
});

app.get('/home',function (req,res) { 
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.get('/overview',function (req,res) { 
    res.sendFile(path.join(__dirname + '/client/overview.html'));
});

app.get('/commands',function (req,res) { 
    res.sendFile(path.join(__dirname + '/client/commands.html'));
});

app.get('/use',function (req,res) { 
    res.sendFile(path.join(__dirname + '/client/commands-use.html'));
});

app.get('/',function (req,res) { 
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

app.listen(3000);
console.log('App Running on port 3000');