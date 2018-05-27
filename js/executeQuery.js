import {db} from './initializeDB';

//Execute queries when the button is pressed
function execute()
{

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

                    var table_string = '<table class="table table-striped table-dark table-hover">';
                    table_string += '<tr>';

                for (var index in query_results[0].columns) {
                    table_string += '<th class="text-capitalize">' + query_results[0].columns[index] + '</th>';
                } 
                table_string += '</tr>';
                for (var row_index in query_results[0].values) {
                    table_string += '<tr>';
                    for (var col_index in query_results[0].values[row_index]) {
                        table_string += '<td>' + query_results[0].values[row_index][col_index] + '</td>';
                    }
                    table_string += '</tr>';
                }
                //table_string += '</table>';
                // var dataSet2 = [];
                // var columns = [];
                // var queryColumns = query_results[0].columns;
                // var queryResults = query_results[0].values;
                
                // var countColumns=0;
                // for (var index2 in queryColumns) {
                //     columns.push({title: [queryColumns[index2]]});
                //     countColumns++;
                // }

                // console.log(countColumns);

                // for (var col_index in queryResults[row_index]) {   
                //     for (var row_index in queryResults) {
                //         dataSet2.push([queryResults[col_index][0]],[queryResults[col_index][1]],[queryResults[col_index][2]],[queryResults[col_index][3]]);
                //     }
                // }

         
                // $(document).ready(function() {
                //     if (!$.fn.DataTable.isDataTable('#demo')) {
                //         var table = $('#demo').DataTable( {
                //             data: dataSet2,
                //             columns: columns
                //         } );
                //     }
                // } ); 
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
        table_string += "</div>";
        //alert(table_string);
        document.getElementById("tableView").innerHTML = table_string; 
    }
    //Catch errors
    catch(e) {
        //If table is empty error
        if (e.message == 'Cannot read property \'columns\' of undefined') {
            var table_string = 'Table '+word3+' is empty'; 
            document.getElementById("tableView").innerHTML = table_string; 
        }
        //Other errors
        else {
            document.getElementById("tableView").innerHTML = e.message;
        }
    }
    
}

//Global function to execute queries
window.execute = execute;

export {execute};