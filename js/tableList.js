import {db} from './initializeDB';

import { selectTableFromList } from './selectTableFromList';
import $ from 'jquery';
window.jQuery = $;
window.$ = $;

//Function to show list of tables in our database
function check() {
    var schema = "select name from sqlite_master where type='table';";

    db.run(schema);

    try {
        var schema_results = db.exec(schema);

        var dataSet = [];
        var columns = [{title: 'Table Name'}, {title: 'Number of Entries'}];
        var schemaTables = schema_results[0].values;

        for (var index in schemaTables) {
            var tableName = schemaTables[index][0];
            var numberOfEntries = db.exec("SELECT COUNT() FROM " + tableName + ";")[0].values;

            dataSet.push([tableName, numberOfEntries]);
        }
 
        $(document).ready(function() {
            if (!$.fn.DataTable.isDataTable('#check')) {
                var table = $('#check').DataTable( {
                    data: dataSet,
                    columns: columns
                } );

                $('#check tbody').on('click', 'tr', function () {          
                    var data = table.row(this).data();
                    selectTableFromList(data[0]);
                });
            }
        } ); 
    }
    catch(e) {
        document.getElementById("check").innerHTML = "No tables in database";  
    }
}

//Make function global
window.check = check;

//Run function check on pageload
window.onload = check;

export {check};