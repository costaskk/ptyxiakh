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
import LogRocket from 'logrocket';

LogRocket.init('lv7quk/ptyxiakh');

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