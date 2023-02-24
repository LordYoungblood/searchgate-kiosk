const { Client } = require("pg");
const client = new Client({
  host: process.env.PGHOST || "vehicle-gate-kiosk.ca4lcabxs5eo.us-gov-west-1.rds.amazonaws.com",
  user: process.env.PGUSER || 'postgres',
  port: process.env.PGPORT || 5432,
  password: process.env.PGPASSWORD || 'password',
  database: process.env.PGDATABASE || 'gate-kiosk'
});

module.exports = client;
