import {db} from './initializeDB';

//import { selectTableFromList } from './selectTableFromList';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

var tblName = new Array();
var id = 0;
//Function to show list of tables in our database
window.check = function() {
    var schema = "select name from sqlite_master where type='table';";

    db.run(schema);

    try {
        var schema_results = db.exec(schema);
        //id=0;
        //Datatable Code
// var dataSet = [];
//         var columns = [{title: 'Table Name'}, {title: 'Number of Entries'}];
//         var schemaTables = schema_results[0].values;

//         for (var index in schemaTables) {
//             var tableName = schemaTables[index][0];
//             var numberOfEntries = db.exec("SELECT COUNT() FROM " + tableName + ";")[0].values;

//             dataSet.push([tableName, numberOfEntries]);
//         }
 
//         $(document).ready(function() {
//             if (!$.fn.DataTable.isDataTable('#check')) {
//                 var table = $('#check').DataTable( {
//                     data: dataSet,
//                     columns: columns
//                 } );

//                 $('#check tbody').on('click', 'tr', function () {          
//                     var data = table.row(this).data();
//                     createTable(data[0]);
//                 });
//             }
//         } ); 
        var table = '<thead>';
        table += '<tr>';

        for (var index in schema_results[0].columns) {
            table+= '<th class="text-capitalize">' + schema_results[0].columns[index] + '</th>';
            table+= '<th>Number of Entries</th>';
        }

        table += '</tr>';
        table += '</thead>';
        table += '<tbody>';
        for (var row_index in schema_results[0].values) {
            table += '<tr>';
            //id=0;
            for (var col_index in schema_results[0].values[row_index]) {
                //Name of each table
                var tablename = schema_results[0].values[row_index][col_index];
            
                //Query to count rows of each table
                var countRows = "SELECT COUNT() FROM " + tablename + ";";
                var rows = db.exec(countRows);
            
                //Add to the array of table names
                tblName.push(tablename);
       
                //table += '<td>' + id + '</td>';
                //Name of each table as link to reveal corresponding table
                table += '<td onclick="createTable('+id+');" style="cursor:pointer">' + tblName[id] + '</td>';
            
                //Count and show the number of rows in each table
                for (var row_index in rows[0].values) {
                    table += '<td>' + rows[0].values[row_index][col_index] + '</td>';
                }
                id++;
            }
        
            table += '</tr>';
        
        }
        table += '</tbody>';
        document.getElementById("check").innerHTML = table;   
    }
    catch(e) {
        document.getElementById("check").innerHTML = "No tables in database";  
    }
}

$( document ).ready( check );
//Run function check on pageload

export{tblName};
export{check};


