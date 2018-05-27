//Import sql.js library
import sql from 'sql.js';



import 'datatables.net-bs4';
import 'datatables.net-autofill-bs4';
import 'datatables.net-buttons-bs4';

//import 'datatables.net-colreorder-bs4';

import dt from 'datatables.net';

//import 'datatables.net-autofill';

//Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// // or sql = window.SQL if you are in a browser

// // Create a database


import {db} from './js/initializeDB';

import {tableList} from './js/tableList';

import {execute} from './js/executeQuery';

import {selectTableFromList} from './js/selectTableFromList';
//Create global list of tables
//var test = new Array();

//var tblName = new Array();

// // // Export the database to an Uint8Array containing the SQLite database file
var binaryArray = db.export();