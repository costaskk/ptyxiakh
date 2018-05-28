import {db} from './initializeDB';

import {tblName} from './tableList';

import {execute} from './executeQuery';

//Function to select table when its name is selected from the name link
window.createTable = function(name) {

    var text = 'SELECT * FROM '+tblName[name]+';';
    
    var query_results = db.exec(text);

    //Datatable Code
    var columns = [];
    var dataSet = [];

    var queryColumns = query_results[0].columns;
    var queryResults = query_results[0].values;

    for (var index in queryColumns) {
        var tableName = queryColumns[index];
        columns.push({title: tableName});
    }
    
    for (var row_index in queryResults) {
        dataSet.push(queryResults[row_index]);
    }

    $(document).ready(function() {
        if ( $.fn.DataTable.isDataTable('#demo.display') ) {
            $('#demo.display').DataTable().destroy();
        }
        var table = $('#demo.display').DataTable( {
            data: dataSet,
            columns: columns,
            destroy : true
            //"bDestroy": true
        } );
    } );

    $('#check').click(function(){
        var table = $('#demo.display').DataTable( {
            data: dataSet,
            columns: columns,
            destroy : true
            //"bDestroy": true
        } );
    } );
}

export{createTable};