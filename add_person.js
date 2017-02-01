// Implement an add_person.js script that takes
// in the first name, last name and date of a
// famous person as three command line arguments
// and uses Knex to perform an insert.
const settings = require("./settings");
const myArgs = process.argv.slice(2);

//Connect to database with credentials
const knex = require('knex')({
  client: 'pg',
  connection: {
    database : settings.database,
    user : settings.user,
    password : settings.password,
    ssl: settings.ssl,
    host: settings.hostname,
    port: settings.port
  }
});

const first = myArgs[0]
const last = myArgs[1]
const bday = myArgs[2]

//Inserts inputted data into table then calls a funciton to display table
knex.insert({
  first_name: first,
  last_name: last,
  birthdate: bday }).into("famous_people").then(search);

//Search function is invoked in the callback after data is inserted
function search(){
  knex.select().from("famous_people").then(output).then(close);
}

//Outputs query from the search functino
function output(searchOut){
  console.log(searchOut);
}

//Closes program after 2 seconds
function close(){
  setTimeout(function(){
     process.exit()}, 2000);
}