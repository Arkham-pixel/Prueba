// models/Note.js

const { DataTypes } = require('sequelize');
const sequelize = require('../index');  // Asegúrate de importar la instancia de sequelize correctamente

const Note = sequelize.define('Note', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
});

module.exports = Note;
