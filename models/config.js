const mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config();

const PORTSQL =  process.env.PORTSQL;
const USERSQL = process.env.USERSQL;
const PASSWORDSQL = process.env.PASSWORDSQL;
const HOSTSQL = process.env.HOSTSQL;
const DATASQL = process.env.DATASQL;

const connection = mysql.createConnection({
    port: PORTSQL,
    host: HOSTSQL,
    user: USERSQL,
    password: PASSWORDSQL,
    database: DATASQL,
})

connection.connect((err) => {
    if (err) throw err;
    console.log(`Conexión exitosa a la base de datos: ${DATASQL}`);
});


module.exports = connection;