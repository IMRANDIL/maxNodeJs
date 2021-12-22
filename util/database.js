
const Sequelize = require('sequelize');

const sequelize = new Sequelize('NodeJs', 'admin', 'Dil@12345', { dialect: 'mysql', host: 'localhost' });

module.exports = sequelize;
































// const mysql = require('mysql2');


// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'admin',
//     database: 'NodeJs',
//     password: 'Dil@12345'
// })


// module.exports = pool.promise();