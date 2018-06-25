//Import jquery
window.$ = window.jQuery = require('jquery');
require("jquery-mousewheel");
require('malihu-custom-scrollbar-plugin');
require('bootstrap/dist/css/bootstrap.css');
//Import bootstrap
import 'bootstrap';
//Import Datatables
import dt from 'datatables.net';
import 'datatables.net-dt/css/jquery.datatables.css';
//Import js files
import {db} from './js/initializeDB';
import {check} from './js/tableList';
import {execute} from './js/executeQuery';
import {createTable} from './js/selectTableFromList';



var html; 
$.get('menu.html', function(data) {
    html=data;
}).done(function(){
    var menu = document.getElementById("content");
    menu.insertAdjacentHTML("afterbegin", html);
});

var json;
$.get('/menu_items', function(data) {
    json = data;
}).done(function(){
    var insert="";
    for (var i in json) {
        insert += "<li><a href="+json[i].link+">"+json[i].name+"</a></li>"
    }
    var add = document.getElementById("about");
    add.insertAdjacentHTML("beforebegin", insert);
});

if ((location.pathname == '/')||(location.pathname == '/home')||(location.pathname == '/#')) {
    var contents;
    $.get('/texts', function(data) {
        contents = data;
    }).done(function(){
        var test="";
        for (var i in contents) {
            test += "<h2>"+contents[i].title+"</h2>"+contents[i].text+"<div class='line'></div>";
        }
        var elements = document.getElementById("content-text");
        elements.insertAdjacentHTML("beforeend", test);
    });
}
else if (location.pathname == '/overview') {
    var overview;
    $.get('/texts-overview', function(data) {
        overview = data;
    }).done(function(){
        var test="";
        for (var i in overview) {
            test += "<h2>"+overview[i].title+"</h2>"+overview[i].text+"<div class='line'></div>";
        }
        var elements = document.getElementById("content-text");
        elements.insertAdjacentHTML("beforeend", test);
    });
}
else if (location.pathname == '/commands') {
    var commands;
    $.get('/texts-commands', function(data) {
        commands = data;
    }).done(function(){
        var test="";
        for (var i in commands) {
            test += "<h2>"+commands[i].title+"</h2>"+commands[i].text+"<div class='line'></div>";
        }
        var elements = document.getElementById("content-text");
        elements.insertAdjacentHTML("beforeend", test);
    });
}
else if (location.pathname == '/use') {
    var commandsuse;
    $.get('/texts-commands-use', function(data) {
        commandsuse = data;
    }).done(function(){
        var test="";
        for (var i in commandsuse) {
            test += "<h2>"+commandsuse[i].title+"</h2>"+commandsuse[i].text+"<div class='line'></div>";
        }
        test += "<h3 align='center'>Test Some Commands Yourself!</h3><hr style='width:50%;'><div class='row align-items-start justify-content-center'><div class='col-4'><h2><label for='text'><b>SQL code:</b></label></h2></p><input type='text' id='text' class='form-control'></p><button type='button' id='execute' class='btn btn-success' onclick='execute(); check();'>Execute</button><br/><br/><p id='feedback'></p><table id='demo' class='display'></table></div><div class='col-4'><table id='check' class='display' style='cursor:pointer'></table></div></div>";
        var elements = document.getElementById("content-text");
        elements.insertAdjacentHTML("beforeend", test);
    });
}