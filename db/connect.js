module.exports = function() {
const { Client } = require('pg')

const client = new Client(process.env.DATABASE_URL ? {
  connectionString: process.env.DATABASE_URL
} : {
  user: 'postgres',
  host: 'localhost',
  database: 'group',
  password: '0945vinn',
  port: 5432,
});

client.connect();
return(client);
}
