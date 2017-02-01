//var myArgs = process.argv.slice(2);
 var myArgs = process.argv[2];
//console.log('myArgs: ', myArgs)
const pg = require("pg");
const settings = require("./settings"); // settings.json
const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

function outputPerson(first, last, birthdate){
  console.log('Searching ...\n',
    'Found 1 person(s) by the name \''+
    last +'\':\n -1:',
    first, last + ', born',
    birthdate.toString().slice(0,15)
  );
}

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  client.query("SELECT * FROM famous_people WHERE last_name='" + myArgs+"'", (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    const person = result.rows[0];
    outputPerson(person.first_name, person.last_name, person.birthdate)
    client.end();
  });
});