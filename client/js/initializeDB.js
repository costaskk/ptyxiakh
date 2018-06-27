import sql from 'sql.js';

// // Create a database
var db = new sql.Database();

// // Execute some sql
var sqlstr = "CREATE TABLE users (name char, surname char, address char, telephone char);";
sqlstr += "INSERT INTO users VALUES ('George', 'Cash', 'Chinas Street 27-29', '00355');"
sqlstr += "INSERT INTO users VALUES ('Nick', 'Romney', 'St. Patricks Street 37', '0030');"
sqlstr += "INSERT INTO users VALUES ('John', 'Doe', 'Central Park 13', '0090');"
sqlstr += "CREATE TABLE consumers (name char, surname char, address char, telephone char);";
sqlstr += "INSERT INTO consumers VALUES ('Johnny', 'Bee', 'St. Alberts Hall 67', '21355');"
sqlstr += "INSERT INTO consumers VALUES ('Jacky', 'Kennedy', 'Washington Avenue 55', '3230');"
sqlstr += "INSERT INTO consumers VALUES ('Al', 'Gore', 'Grand Street 23', '9316238-030');"
db.run(sqlstr); // Run the query without returning anything

export {db};