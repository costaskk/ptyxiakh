//Import sql.js library
import sql from 'sql.js';

import $ from 'jquery';
window.jQuery = $;
window.$ = $;

import 'datatables.net-bs4';
import 'datatables.net-autofill-bs4';
import 'datatables.net-buttons-bs4';

//import 'datatables.net-colreorder-bs4';

import dt from 'datatables.net';

//import 'datatables.net-autofill';

//Import bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

import {db} from './js/initializeDB';

import {check} from './js/tableList';

import {execute} from './js/executeQuery';

import {createTable} from './js/selectTableFromList';

//Enable enter to work as button click
window.onload = function() {
    // Get the input field
    var input = document.getElementById("text");

    // Execute a function when the user releases a key on the keyboard
    input.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
        if (event.keyCode === 13) {
            // Trigger the button element with a click
            document.getElementById("execute").click();
        }
    });
}


// // // Export the database to an Uint8Array containing the SQLite database file
var binaryArray = db.export();