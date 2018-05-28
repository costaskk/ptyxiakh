import {db} from './initializeDB';

import {tblName} from './tableList';
//Function to select table when its name is selected from the name link
window.createTable = function(name) {
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

export{createTable};