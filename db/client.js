// Connect to DB
const { Client } = require('pg');

// change the DB_NAME string to whatever your group decides on
const DB_NAME = 'paddy_site_9o18';

const DB_URL =
  process.env.DATABASE_URL || `postgresql://paddy_site_9o18_user:qwFs58P1vctGB1vtTgzkVtBExvJY1OFo@dpg-cr1v4fjqf0us739jfq20-a.ohio-postgres.render.com/${DB_NAME}?ssl=true`;

let client;

// github actions client config
if (process.env.CI) {
  client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'postgres',
  });
} else {
  // local / heroku client config
  client = new Client(DB_URL);
}

module.exports = client;
