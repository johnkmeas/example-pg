const settings = require("./settings");
const myArgs = process.argv[2];

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

//Query with input
knex.select().from("famous_people")
.where({
  last_name: myArgs
}).then(output).then(close);

//Close function to be called after query
function close(){
  setTimeout(function(){
     process.exit()}, 3000);
}

//Oupute function
function output(result){
  const res = result[0];
  const first = res.first_name;
  const last = res.last_name;
  const bday = res.birthdate.toString().slice(0,15);
  console.log(
    'Searching ...\n',
    'Found 1 person(s) by the name \''
    + last +'\':\n -1:',
    first, last + ', born', bday)
}
