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

function GetURLParameter(sParam)
{
    var sPageURL = (location.pathname+location.search).substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}
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
        insert += "<li><a href=categories="+json[i].link+">"+json[i].name+"</a></li>"
    }
    var add = document.getElementById("about");
    add.insertAdjacentHTML("beforebegin", insert);
});

var contents;
var category = GetURLParameter('categories');

if ((location.pathname == '/')||(location.pathname=='/#')||(location.pathname=='')) {
    $.get('/category=home', function(data) {
        contents = data;
    }).done(function(){
        var test="";
        for (var i in contents) {
            test += "<h2>"+contents[i].title+"</h2>"+contents[i].text+"<div class='line'></div>";
        }
        var elements = document.getElementById("content");
        elements.insertAdjacentHTML("beforeend", test);
    });
}
else if (location.pathname == '/categories='+category) {
    $.get('/category='+category, function(data) {
        contents = data;
    }).always(function(){
        var test="";

        for (var i in contents) {
            test += "<h2>"+contents[i].title+"</h2>"+contents[i].text+"<div class='line'></div>";
        }

        var elements = document.getElementById("content");
        elements.insertAdjacentHTML("beforeend", test);

        if (contents[i].hasExecuteQuery == 'true') {    
            var query; 
            $.get('execute_query.html', function(data) {
                query=data;
            }).done(function(){
                var exec = document.getElementById("content");
                exec.insertAdjacentHTML("beforeend", query);
                check();
            });
        }      
    });
}