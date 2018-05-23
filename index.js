//Import sql.js library
import sql from 'sql.js';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import 'datatables.net-bs4';
import 'datatables.net-autofill-bs4';
import 'datatables.net-buttons-bs4';
//import 'datatables.net-colreorder-bs4';

import dt from 'datatables.net';

//import 'datatables.net-autofill';

//Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// // or sql = window.SQL if you are in a browser

// // Create a database
 var db = new sql.Database();
// // NOTE: You can also use new sql.Database(data) where
// // data is an Uint8Array representing an SQLite database file

// // Execute some sql
var sqlstr = "CREATE TABLE users (name char, surname char, address char, telephone char);";
sqlstr += "INSERT INTO users VALUES ('Mak-lee', 'Tahir-ee', 'Chinas street 420', '00355');"
sqlstr += "INSERT INTO users VALUES ('Cost-ee', 'GrekoMontanaKaiKarampouzoukl-ee', 'Chinas street 420', '0030');"
sqlstr += "INSERT INTO users VALUES ('John', 'Doe', 'Doom 13', '0090');"
db.run(sqlstr); // Run the query without returning anything

//var res = db.exec("SELECT * FROM users");

// // Prepare an sql statement
// // var stmt = db.prepare("SELECT * FROM hello WHERE a=:aval AND b=:bval");

// // // Bind values to the parameters and fetch the results of the query
// // var result = stmt.getAsObject({':aval' : 1, ':bval' : 'world'});
// // console.log(result); // Will print {a:1, b:'world'}

// // // Bind other values
// // stmt.bind([0, 'hello']);
// // while (stmt.step()) console.log(stmt.get()); // Will print [0, 'hello']

// // // You can also use javascript functions inside your SQL code
// // // Create the js function you need
// // function add(a, b) {return a+b;}
// // // Specifies the SQL function's name, the number of it's arguments, and the js function to use
// // db.create_function("add_js", add);
// // // Run a query in which the function is used
// // db.run("INSERT INTO hello VALUES (add_js(7, 3), add_js('Hello ', 'world'));"); // Inserts 10 and 'Hello world'

// // // free the memory used by the statement
// // stmt.free();
// // // You can not use your statement anymore once it has been freed.
// // // But not freeing your statements causes memory leaks. You don't want that.

//Create global list of tables
var test = new Array();


function dataSet() {
    var dataSet = new Array();

    for (var i=0;i++;i<20) {
        dataSet.push(i);
    }

    console.log(dataSet[0]);
};

window.dataSet = dataSet;
window.onload = dataSet;
//Create array to store table names
var tblName = new Array();
var counter=0;
//Function to show list of tables in our database
function check() {
    var schema = "select name from sqlite_master where type='table';";

    db.run(schema);

    try {
        var schema_results = db.exec(schema);
        //counter=0;

        //var table = '<table id="example" class="display" style="width:100%">';
        var table = '<thead>';
        table += '<tr>';

    for (var index in schema_results[0].columns) {
        //table+= '<th>Counter</th>'
        table+= '<th>' + schema_results[0].columns[index] + '</th>';
        table+= '<th>Number of Entries</th>';
    } 
    table += '</tr>';
    table += '</thead>';
    table += '<tbody>';
    for (var row_index in schema_results[0].values) {
        table += '<tr>';
        //counter=0;
        for (var col_index in schema_results[0].values[row_index]) {
            //Name of each table
            var tablename = schema_results[0].values[row_index][col_index];
            
            //Query to count rows of each table
            var countRows = "SELECT COUNT() FROM " + tablename + ";";
            var rows = db.exec(countRows);
            
            //Add to the array of table names
            tblName.push(tablename);
       
            //table += '<td>' + counter + '</td>';
            //Name of each table as link to reveal corresponding table
            table += '<td onclick="createTable('+counter+');" style="cursor:pointer">' + tblName[counter] + '</td>';
            
            //Count and show the number of rows in each table
            for (var row_index in rows[0].values) {
                table += '<td>' + rows[0].values[row_index][col_index] + '</td>';
            }
            counter++;
        }
        
        table += '</tr>';
        
    }
    table += '</tbody>';
    table += '<tfoot>';
        table += '<tr>';

    for (var index in schema_results[0].columns) {
        //table+= '<th>Counter</th>'
        table+= '<th>' + schema_results[0].columns[index] + '</th>';
        table+= '<th>Number of Entries</th>';
    } 
    table += '</tr>';
    table += '</tfoot>';
    //table += '</table>';
    document.getElementById("check").innerHTML = table; 
    
    }
    catch(e) {
        document.getElementById("check").innerHTML = "No tables in database";  
    }
}

//Execute queries when the button is pressed
function execute()
{

    //console.log(test);
    //Get table names from database
    var text = document.getElementById("text").value;
    
     try {
         //Execute query and store into variable query_results
        var query_results = db.exec(text);
        //console.log(query_results);
        //Split Query into words
        var words = text.split(' ');

        //First three words of query
        var word0 = words[0];
        var word1 = words[1];
        var word2 = words[2];

       //Store results into a table and display it
        var table_string = '<div class="table-responsive">';
        if (query_results) {
            if (text.trim().length>0) {
            if (word0.toUpperCase() == 'SELECT') {
 
                //Remove ; character from string
                var string = text.replace(';','');
                 
                //console.log("String is: "+string);

                //Register index of the word FROM
                var n = string.toUpperCase().indexOf("FROM");

                //Get length of string
                var length = string.length;

                //Get new substring after the word FROM
                var newString = string.substring(n+5,length);

                //console.log("New String is "+newString);

                //console.log(n);

                //Split new substring into words
                var new_word = newString.split(' ');
                //Get first of the new string
                var word3 = new_word[0];

                //console.log(word3);

                table_string += '<table class="table">';
                table_string += '<tr>';

            for (var index in query_results[0].columns) {
                table_string += '<th>' + query_results[0].columns[index] + '</th>';
            } 
            table_string += '</tr>';
            for (var row_index in query_results[0].values) {
                table_string += '<tr>';
                for (var col_index in query_results[0].values[row_index]) {
                    table_string += '<td>' + query_results[0].values[row_index][col_index] + '</td>';
                }
                table_string += '</tr>';
            }
            table_string += '</table>';
            
            }
                else {
                    if (word0.toUpperCase() == 'CREATE') {
                        table_string += 'Table '+word2+' Successfully Created';
                    }
                    else if (word0.toUpperCase() == 'INSERT') {
                        table_string += 'New Entries Successfully inserted into table '+word2;
                    }
                    else if (word0.toUpperCase() == 'DELETE') {
                        table_string += 'Entry Successfully deleted';
                    }
                    else if (word0.toUpperCase() == 'DROP') {
                        table_string += 'Table '+word2+' Deleted';
                    }
                    else if (word0.toUpperCase() == 'UPDATE') {
                        table_string += 'Table '+word1+' Updated';
                    }
                    else {
                        table_string += 'Query Success';
                    }
                    
                }
            }
            else {
                table_string += "Empty Query";
            }
        
    
    }
       
        table_string += '</div>';
        //alert(table_string);
        document.getElementById("demo").innerHTML = table_string;   
    }
    //Catch errors
     catch(e) {
         //If table is empty error
        if (e.message == 'Cannot read property \'columns\' of undefined') {
            table_string += 'Table '+word3+' is empty'; 
            document.getElementById("demo").innerHTML = table_string; 
        }
        //Other errors
        else {
            document.getElementById("demo").innerHTML = e.message;
        }
     }
    //console.log(text);
}

//Function to select table when its name is selected from the name link
function createTable(name) {
    //document.getElementById("test").innerHTML = "Table Name is: " + tblName[1];
    var text = 'SELECT * FROM '+tblName[name]+';';
    console.log(name);
    var query_results = db.exec(text);

    var table_select = '<div class="table-responsive">';
    var table_select = '<table class="table table-striped table-dark">';
    table_select += '<tr>';

    for (var index in query_results[0].columns) {
        table_select += '<th>' + query_results[0].columns[index] + '</th>';
    } 
    table_select += '</tr>';
    for (var row_index in query_results[0].values) {
        table_select += '<tr>';
        for (var col_index in query_results[0].values[row_index]) {
            table_select += '<td>' + query_results[0].values[row_index][col_index] + '</td>';
        }
        table_select += '</tr>';
    }
    table_select += '</table>';
    table_select += '</div>';  
    document.getElementById("demo").innerHTML = table_select;   
}
//Make function global
window.check = check;

//Run function check on pageload
window.onload = check;

//Global function to execute queries
window.execute = execute;

//Make function global
window.createTable = createTable;

// // // Export the database to an Uint8Array containing the SQLite database file
var binaryArray = db.export();