const { Sequelize } = require('sequelize');

// Crear una nueva instancia de Sequelize y conectarse a PostgreSQL
const sequelize = new Sequelize('postgres://usuario:contraseña@localhost:5432/midatabase', {
  dialect: 'postgres',  // o 'mysql' si estás usando MySQL
});

module.exports = sequelize;
