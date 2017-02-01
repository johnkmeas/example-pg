// Update with your config settings.
const settings = require("./settings");

module.exports = {
  development: {
    client: 'pg',
    connection: {
      database : settings.database,
      user : settings.user,
      password : settings.password,
      ssl: settings.ssl,
      host: settings.hostname,
      port: settings.port
    }
  }
};
