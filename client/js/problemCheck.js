import {db} from './initializeDB';

window.problemCheck = function(order) {


    //Get table names from database
    var text = document.getElementById("text" + order).value;
    try {
        var firstWord = text.split(' ');
        if (firstWord[0].toUpperCase() == "SELECT") {
            var correct = db.exec(document.getElementById("hiddenField" + order).value);
            //Execute query and store into variable query_results
            var query_results = db.exec(text);
            //console.log(document.getElementById("hiddenField"+order).value);
            //Remove ; from end of user query, if it exists
            if (text.slice(-1)==';') {
                text=text.slice(0,-1);
            }

            var select_results = db.exec(text);
        }
        else {
            var correct = document.getElementById("hiddenField" + order).value;
            var query_results = text;

            if (query_results.slice(-1)==';') {
                query_results=query_results.slice(0,-1);
            }

            if (correct.slice(-1)==';') {
                correct=correct.slice(0,-1);
            }
            if (firstWord[0].toUpperCase() != "DROP") {
                db.exec(text);
            }
            //if ((firstWord[0].toUpperCase() != "CREATE")&&) {
                var select_results = db.exec("SELECT * FROM users");
            //}
        }

       //Store results into a table and display it
        if (_.isEqual(query_results,correct)) {
            //Remove text from textarea after submit
            document.getElementById('text'+order).value='';

            //Helpful message
            $('#feedback'+order).show();
            var table_string = 'Your query is correct!<br/><br/>'; 
            document.getElementById("feedback"+order).innerHTML = table_string; 

            $('#exists'+order).show();

            //Remove ; character from string
            var string = text.replace(';','');     
            
            //  //Datatable Code
            //  var dataSet = [];
            //  var queryColumns = [{title: 'Table Name'}, {title: 'Number of Entries'}];
            //  var results = select_results[0].values;

            //  for (var index in results) {
            //      var tableName = results[index][0];
            //      var numberOfEntries = db.exec("SELECT COUNT() FROM " + tableName + ";")[0].values;

            //      dataSet.push([tableName, numberOfEntries]);
            //  }
        
            if ((firstWord[0].toUpperCase() != "CREATE")&&(firstWord[0].toUpperCase() != "DROP")) { 
                var queryColumns = select_results[0].columns;
                var results = select_results[0].values;
                
                //Datatable Code
                var columns = [];
                var dataSet = [];;
                for (var index in queryColumns) {
                    var tableName = queryColumns[index];
                    columns.push({title: tableName});
                }
                
                for (var row_index in results) {
                    dataSet.push(results[row_index]);
                }

                var table;
            
                if ($.fn.DataTable.isDataTable('#result'+order)) {
                    $('#result'+order).DataTable().destroy();
                    $('#result'+order).empty();
                };

                table = $('#result'+order).DataTable( {
                    data: dataSet,
                    columns: columns,
                    destroy : true
                } );
            }
        }
        else {
            $('#exists'+order).hide();
            $('#feedback'+order).show();
            var table_string = 'Your query does not have the intended result'; 
            document.getElementById("feedback"+order).innerHTML = table_string; 
        }
    }
    catch(e) {
        $('#exists'+order).hide();
        $('#feedback'+order).show();
        //If table is empty error
        if (e.message == 'Cannot read property \'columns\' of undefined') {
            var table_string = 'Table '+word3+' is empty'; 
            document.getElementById("feedback"+order).innerHTML = table_string; 
        }
        //Other errors
        else {
            document.getElementById("feedback"+order).innerHTML = e.message;
        }
    }
}

export{problemCheck};