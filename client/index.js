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
import {tableList} from './js/tableList';
import {execute} from './js/executeQuery';
import {createTable} from './js/selectTableFromList';
import {problemCheck} from './js/problemCheck';
var _ = require('lodash');

//Function to get parameters of urls
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

//Function to include menu.html in file
var html; 
$.get('menu.html', function(data) {
    html=data;
}).done(function(){
    var menu = document.getElementById("content");
    menu.insertAdjacentHTML("afterbegin", html);
});

//Function to fill menu with items from mongoDB retrieved in app.js
var json;
$.get('/menu_items', function(data) {
    json = data;
}).done(function(){
    var insert="";
    for (var i in json) {
        if (json[i].isParent === false) {
            insert += "<li><a href=categories=" + json[i].link + ">" + json[i].name + "</a></li>";
        } 
        else {
            insert += "<a href=\"" + json[i].link + "\" data-toggle=\"collapse\" aria-expanded=\"false\">" + json[i].name + "</a>";
            insert += "<ul class=\"collapse list-unstyled\" id=\"" + json[i].link.replace("#", "") + "\">";

            for (var j in json[i].subItems) {
                insert += "<li><a href=categories=" + json[i].subItems[j].link + ">" + json[i].subItems[j].name + "</a></li>";
            }

            insert += "</ul>";
        }
    }
    var add = document.getElementById("about");
    add.insertAdjacentHTML("afterbegin", insert);
});



//Get url parameter of categories
var category = GetURLParameter('categories');

//Initiate var contents to store html data
var contents;

//If url is either null or ends in / or /# then return contents in category=home (The home page)
if ((location.pathname == '/')||(location.pathname=='/#')||(location.pathname=='')) {
    $.get('/category=home', function(data) {
        contents = data;
    }).done(function(){
        var test="";
        for (var i in contents) {
            // If a header exists in mongoDB then add it to the top of the page
            if (contents[i].header) {
                test += "<h1 align='center'>"+contents[i].header+"<h1><hr style='width:40%;'><br/>";
            }
            test += "<h2>"+contents[i].title+"</h2><br/>"+contents[i].text+"<div class='line'></div>";
        }
        var elements = document.getElementById("content");
        elements.insertAdjacentHTML("beforeend", test);
    });
}
//Else return page with corresponding category value
else if (location.pathname == '/categories='+category) {
    $.get('/category='+category, function(data) {
        contents = data;
    }).done(function(){
        var test="";
        var queryProblemsHTML;
        $.get('query_problems.html', function (data) {
            queryProblemsHTML = data;

            for (var i in contents) {
                var chapterText = "";
                // If a header exists in mongoDB then add it to the top of the page
                if (contents[i].header) {
                    chapterText += "<h1 align='center'>"+contents[i].header+"<h1><hr style='width:40%;'><br/>";
                }
                //Fill the page with the contents from the collection in mongoDB
                chapterText += "<h2>" + contents[i].title + "</h2>" + contents[i].text + "<br/><br/>";
                
                var contentElement = document.getElementById("content");
                contentElement.insertAdjacentHTML("beforeend", chapterText);
                // var exec = document.getElementById("content");
                // exec.insertAdjacentHTML("beforeend", chapterText);
                

                if (contents[i].hasProblemQuery == 'true') {
                    var solution = contents[i].query;
                    console.log(solution);
                    var hiddenField = "hiddenField" + contents[i].order;
                    var execute = "execute" + contents[i].order;
                    var feedback = "feedback" + contents[i].order;
                    var text = "text" + contents[i].order;
                    var exists = "exists" + contents[i].order;
                    var result = "result" + contents[i].order;

                    contentElement.insertAdjacentHTML("beforeend", queryProblemsHTML);

                    var hiddenElement = document.getElementById("hiddenField");
                    hiddenElement.setAttribute("value", solution);
                    hiddenElement.setAttribute("id", hiddenField);

                    var hiddenElement = document.getElementById("execute");
                    hiddenElement.setAttribute("onclick", "problemCheck(" + contents[i].order + ");");
                    hiddenElement.setAttribute("id", execute);

                    var hiddenElement = document.getElementById("feedback");
                    hiddenElement.setAttribute("id",feedback);

                    var hiddenElement = document.getElementById("text");
                    hiddenElement.setAttribute("id",text);

                    var hiddenElement = document.getElementById("exists");
                    hiddenElement.setAttribute("id",exists);

                    var hiddenElement = document.getElementById("result");
                    hiddenElement.setAttribute("id",result);
                }
                //Check if execute query is used, if yes then include execute_query.html which includes the query run
                else if (contents[i].hasExecuteQuery == 'true') {    
                    
                    //Fill query input with a default query stored in mongoDB
                    var queryInsert = contents[i].query;

                    //Initiate query variable to store html data
                    var query;

                    //Include execute_query.html in our page
                    $.get('execute_query.html', function(data) {
                        query=data;
                    }).done(function(){
                        //Insert execute_query.html elements into page
                        var exec = document.getElementById("content");
                        exec.insertAdjacentHTML("beforeend", query);

                        //After execute_query.html elements have been inserted insert default query to input with id text
                        document.getElementById("text").value= queryInsert;

                        //When page which includes execute_query.html loads, run function tableList() to create a table with a list of tables in sqlite
                        tableList();
                    });
                }
                var line = "<div class='line'></div>";
                var lineElement = document.getElementById("content");
                lineElement.insertAdjacentHTML("beforeend", line);
            }
        });
    });
}