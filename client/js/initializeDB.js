import sql from 'sql.js';

// // Create a database
var db = new sql.Database();

// // Execute some sql
var sqlstr = "CREATE TABLE users (name char, surname char, address char, telephone char);";
sqlstr += "INSERT INTO users VALUES ('George', 'Cash', 'Chinas Street 27-29', '00355');"
sqlstr += "INSERT INTO users VALUES ('Nick', 'Romney', 'St. Patricks Street 37', '0030');"
sqlstr += "INSERT INTO users VALUES ('John', 'Doe', 'Central Park 13', '0090');"
sqlstr += "INSERT INTO users VALUES ('Jimmy', 'Joe', 'Chirp Street 32', '0031-55555');"
sqlstr += "INSERT INTO users VALUES ('Jeffrey', 'Kline', 'Murray Av. 37', '0032-44444');"
sqlstr += "INSERT INTO users VALUES ('Matthew', 'Frei', 'Royal Parlor 59', '321-32131');"
sqlstr += "INSERT INTO users VALUES ('Andrew', 'Bottas', 'Potter Street 92', '213-32355');"
sqlstr += "INSERT INTO users VALUES ('Vince', 'Rouper', 'St. Johns Street 12', '0320-23133');"
sqlstr += "INSERT INTO users VALUES ('Robert', 'Crane', 'Curl Avenue 41', '0010-30103');"
sqlstr += "CREATE TABLE consumers (name char, surname char, address char, telephone char);";
sqlstr += "INSERT INTO consumers VALUES ('Johnny', 'Bee', 'St. Alberts Hall 67', '21355');"
sqlstr += "INSERT INTO consumers VALUES ('Jacky', 'Kennedy', 'Washington Avenue 55', '3230');"
sqlstr += "INSERT INTO consumers VALUES ('Al', 'Gore', 'Grand Street 23', '9316238-030');"
db.run(sqlstr); // Run the query without returning anything

export {db};