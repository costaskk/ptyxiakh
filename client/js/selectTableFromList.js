import {db} from './initializeDB';
import {execute} from './executeQuery';

//Function to select table when its name is selected from the name link
window.createTable = function(name) {
    $('#demo').show();
    var text = 'SELECT * FROM '+name+';';
    
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

    if ($.fn.DataTable.isDataTable('#demo')) {
        $('#demo').DataTable().destroy();
        $('#demo').empty();
    };

    $('#demo').DataTable({
        data: dataSet,
        columns: columns,
        destroy : true
    });
}

export{createTable};