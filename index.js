//Import jquery
window.$ = window.jQuery = require('jquery');
require("jquery-mousewheel");
require('malihu-custom-scrollbar-plugin');
require('bootstrap/dist/css/bootstrap.css');
//Import font awesome
import 'font-awesome/css/font-awesome.css';
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