const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/capstone_2310_db');

module.exports = client