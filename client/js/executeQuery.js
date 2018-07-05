import {db} from './initializeDB';
import {createTable} from './selectTableFromList';
import {submitEnter} from './submitEnter';

//Execute queries when the button is pressed
window.execute = function()
{
    //Get table names from database
    var text = document.getElementById("text").value;
    
    try {
        //Execute query and store into variable query_results
        var query_results = db.exec(text);
        
        //Remove ; from end of user query, if it exists
        if (text.slice(-1)==';') {
            text=text.slice(0,-1);
        }

        //Split Query into words
        var words = text.split(' ');

        //First four words of query
        var word0 = words[0];
        var word1 = words[1];
        var word2 = words[2];
        var word4 = words[4];

       //Store results into a table and display it
        if (query_results) {
            //Remove text from textarea after submit
            document.getElementById('text').value='';
            if (text.trim().length>0) {
                if (word0.toUpperCase() == 'SELECT') {
                    $('#queryResult').show();
                    //Remove ; character from string
                    var string = text.replace(';','');
                    
                    //console.log("String is: "+string);

                    //Register index of the word FROM
                    var n = string.toUpperCase().indexOf("FROM");

                    //Get length of string
                    var length = string.length;

                    //Get new substring after the word FROM
                    var newString = string.substring(n+5,length);

                    //Split new substring into words
                    var new_word = newString.split(' ');
                    //Get first of the new string
                    var word3 = new_word[0];

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

                    var table;
                    
                    if ($.fn.DataTable.isDataTable('#queryResult')) {
                        $('#queryResult').DataTable().destroy();
                        $('#queryResult').empty();
                    };

                    table = $('#queryResult').DataTable( {
                        data: dataSet,
                        columns: columns,
                        destroy : true
                    } );
                }
                else {
                    var table_string = "<div align='center'>";
                    $('#queryResult').hide();
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
                        if (word2.toUpperCase() == 'IF') {
                            table_string += 'Table '+word4+' Deleted';
                        }
                        else {
                            table_string += 'Table '+word2+' Deleted';
                        }
                    }
                    else if (word0.toUpperCase() == 'UPDATE') {
                        table_string += 'Table '+word1+' Updated';
                    }
                    else {
                        table_string += 'Query Success';
                    }
                    table_string += "</div>";
                    document.getElementById("feedback").innerHTML = table_string;  
                }
            }
            else {
                $('#queryResult').hide();
                var table_string = "Empty Query";
                document.getElementById("feedback").innerHTML = table_string;
            }
        }
    }
    //Catch errors
    catch(e) {
        $('#queryResult').hide();
        //If table is empty error
        if (e.message == 'Cannot read property \'columns\' of undefined') {
            var table_string = 'Table '+word3+' is empty'; 
            document.getElementById("feedback").innerHTML = table_string; 
        }
        //Other errors
        else {
            document.getElementById("feedback").innerHTML = e.message;
        }
    }
}

export{execute};