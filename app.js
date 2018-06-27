var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.json());

//Connect to mongoDB
var dev_db_url = 'mongodb://costasgr:aa1234@ds151004.mlab.com:51004/productstutorial';
var mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

//Get menu items
app.get('/menu_items', function (req, res){
    db.collection("menu_items").find({}).sort({order: 1}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

//Get item by category
app.get('/category=:uid', function(req, res, next){
    db.collection("contents").find({category: req.params.uid}).sort({order: 1}).toArray(function(err, result) {
        if (err) throw err;
        res.json(result);
    });
});

//When url is categories=.. then return file index.html
app.get('/categories=:uid',function (req,res) { 
    res.sendFile(path.join(__dirname + '/client/index.html'));
});

//Start on port 3000
app.listen(3000);

//Output message on console when app is running
console.log('App Running on port 3000');