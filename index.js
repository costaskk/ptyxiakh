//Import sql.js library
import sql from 'sql.js';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import 'datatables.net-bs4';
import 'datatables.net-autofill-bs4';
import 'datatables.net-buttons-bs4';
import dt from 'datatables.net';

//Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import {db} from './js/initializeDB';
import {check} from './js/tableList';
import {execute} from './js/executeQuery';
import {createTable} from './js/selectTableFromList';


// // // Export the database to an Uint8Array containing the SQLite database file
var binaryArray = db.export();