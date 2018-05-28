import sql from 'sql.js';

// // Create a database
var db = new sql.Database();
// // NOTE: You can also use new sql.Database(data) where
// // data is an Uint8Array representing an SQLite database file

// // Execute some sql
var sqlstr = "CREATE TABLE users (name char, surname char, address char, telephone char);";
sqlstr += "INSERT INTO users VALUES ('Mak-lee', 'Tahir-ee', 'Chinas street 420', '00355');"
sqlstr += "INSERT INTO users VALUES ('Cost-ee', 'Karampouzoukl-ee', 'Chinas street 420', '0030');"
sqlstr += "INSERT INTO users VALUES ('John', 'Doe', 'Doom 13', '0090');"
sqlstr += "CREATE TABLE consumers (name char, surname char, address char, telephone char);";
sqlstr += "INSERT INTO consumers VALUES ('Johnny', 'Bee', 'Crazy Dough', '21355');"
sqlstr += "INSERT INTO consumers VALUES ('Jacky', 'Kennedy', 'Washington Post', '3230');"
sqlstr += "INSERT INTO consumers VALUES ('Al', 'Gore', 'Miami Dolphins 2324', '9316238-030');"
db.run(sqlstr); // Run the query without returning anything

export {db};