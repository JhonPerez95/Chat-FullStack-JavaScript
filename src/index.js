const http = require('http');
const path = require('path');

const express = require('express');
const socketio = require('socket.io'); // modulo que me permite hacer conexion tiempo real

const mongoose = require('mongoose');

app = express();
const server = http.createServer(app);
const io = socketio.listen(server);

require('./socket')(io);

// Conectado a la base de datos
mongoose.connect('mongodb://localhost/chat-database')
.then(db=>{console.log('Base de datos conectada')
.catch(error=>{console.log(error)});
});

// settings the server 
app.set('port', process.env.PORT || 3000); 
// process.env.PORT -> Si el SO da un puerto en su variable de entorno 
// tomalo sino toma el puerto 3000

//Enviando archivos estaticos
app.use(express.static(path.join(__dirname, 'public')));

// Inicializando servidor
server.listen(app.get('port'), function () {
    console.log('servidor inicializado');
    console.log('Servidor en el puerto', app.get('port'));

});
