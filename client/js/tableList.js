import {db} from './initializeDB';
import {createTable} from './selectTableFromList';
import {executeTable} from './executeQuery';

//Function to show list of tables in our database
window.tableList = function() {
    var schema = "select name from sqlite_master where type='table';";

    db.run(schema);

    try {
        var schema_results = db.exec(schema);
        
        //Datatable Code
        var dataSet = [];
        var columns = [{title: 'Table Name'}, {title: 'Number of Entries'}];
        var schemaTables = schema_results[0].values;

        for (var index in schemaTables) {
            var tableName = schemaTables[index][0];
            var numberOfEntries = db.exec("SELECT COUNT() FROM " + tableName + ";")[0].values;

            dataSet.push([tableName, numberOfEntries]);
        }
        
        var table;

        if ($.fn.DataTable.isDataTable('#tableList')) {
            $('#tableList').DataTable().destroy();
            $('#tableList').empty();
        };
        table = $('#tableList').DataTable({
            data: dataSet,
            columns: columns,
            searching: false,
            paging: false
        });

        $('#tableList tbody').on('click', 'tr', function () {          
            var data = table.row(this).data();
            createTable(data[0]);
        });
    }
    catch(e) {
        document.getElementById("tableList").innerHTML = "No tables in database";  
    }
}

export{tableList};


