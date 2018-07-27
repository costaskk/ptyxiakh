import {db} from './initializeDB';

window.problemCheck = function() {
    //Get table names from database
    var text = document.getElementById("text").value;
    try {
        //var correct_query = "SELECT * FROM users";
        var correct = db.exec(document.getElementById("hidden").value);
        //Execute query and store into variable query_results
        var query_results = db.exec(text);
        console.log(document.getElementById("hidden").value);
        //Remove ; from end of user query, if it exists
        if (text.slice(-1)==';') {
            text=text.slice(0,-1);
        }

       //Store results into a table and display it
        if (_.isEqual(query_results,correct)) {
            //Remove text from textarea after submit
            document.getElementById('text').value='';
            if (text.trim().length>0) {
                //Helpful message
                $('#feedback').show();
                var table_string = 'Your query is correct, here is the result<br/><br/>'; 
                document.getElementById("feedback").innerHTML = table_string; 

                $('#exists').show();

                //Remove ; character from string
                var string = text.replace(';','');

                //Datatable Code
                var columns = [];
                var dataSet = [];

                var queryColumns = query_results[0].columns;
                var results = query_results[0].values;

                for (var index in queryColumns) {
                    var tableName = queryColumns[index];
                    columns.push({title: tableName});
                }
                
                for (var row_index in results) {
                    dataSet.push(results[row_index]);
                }

                var table;
                
                if ($.fn.DataTable.isDataTable('#result')) {
                    $('#result').DataTable().destroy();
                    $('#result').empty();
                };

                table = $('#result').DataTable( {
                    data: dataSet,
                    columns: columns,
                    destroy : true
                } );
            }
        }
        else {
            $('#exists').hide();
            $('#feedback').show();
            var table_string = 'Your query does not have the intended result'; 
            document.getElementById("feedback").innerHTML = table_string; 
        }
    }
    catch(e) {
        $('#exists').hide();
        $('#feedback').show();
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

export{problemCheck};