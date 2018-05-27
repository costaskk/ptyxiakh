import {db} from './initializeDB';

//Function to select table when its name is selected from the name link
function selectTableFromList(name) {
    //document.getElementById("test").innerHTML = "Table Name is: " + tblName[1];
    var text = 'SELECT * FROM '+name+';';
    //console.log(name);
    var query_results = db.exec(text);

    //var table_select = '<div class="table-responsive">';
    var table_select = '<table class="table table-striped table-dark table-hover">';
    table_select += '<tr>';

    for (var index in query_results[0].columns) {
        table_select += '<th class="text-capitalize">' + query_results[0].columns[index] + '</th>';
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
    //table_select += '</div>';  
    document.getElementById("tableView").innerHTML = table_select;   
    // var dataSet = [];
    //             var columns = [];
    //             var queryColumns = query_results[0].columns;
    //             var queryResults = query_results[0].values;

    //             for (var index in queryColumns) {
    //                 columns.push({title: [queryColumns[index]]});
    //                 console.log(columns);
    //             }
            
    //             for (var row_index in queryResults) {
    //                 for (var col_index in queryResults[row_index]) {
    //                     dataSet.push([queryResults[row_index][col_index]]);
    //                 }
    //             }
         
    //             $(document).ready(function() {
    //                 if (!$.fn.DataTable.isDataTable('#demo')) {
    //                     var table = $('#demo').DataTable( {
    //                         data: dataSet,
    //                         columns: columns
    //                     } );
    //                 }
    //             } ); 
}

//Make function global
window.selectTableFromList = selectTableFromList;

export{selectTableFromList};