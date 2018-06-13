var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

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

var menu = mongoose.model('menu', menuSchema);

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
        db.close();
    });
});

app.listen(3000);
console.log('App Running on port 3000');