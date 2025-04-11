const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const WebSocket = require('ws');

const app = express();
const server = require('http').createServer(app);

app.use(express.json());
app.use(cors());

// Crea la instancia de Sequelize para conectarse a la base de datos
const sequelize = new Sequelize('postgres://mi_usuario:mi_contraseña@localhost:5432/mi_base_de_datos');

// Sincroniza las tablas con la base de datos
sequelize.sync({ force: true })
  .then(() => {
    console.log('Base de datos sincronizada');
  })
  .catch(err => {
    console.error('Error al sincronizar la base de datos:', err);
  });

// Configurar el servidor WebSocket
const wss = new WebSocket.Server({ server });  // Usa el servidor de Express para WebSocket
wss.on('connection', (ws) => {
  console.log('Cliente conectado');
  ws.on('message', (message) => {
    console.log('Mensaje recibido:', message);
  });
  ws.send('Hola desde el servidor WebSocket');
});

const PORT = 3001;  // Cambia el puerto a 3001
app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});


// Exporte la instancia de Sequelize
module.exports = sequelize;
