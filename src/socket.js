module.exports = function (io) {
    io.on('connection',  socket => {
        console.log('un nuevo user conectado');
            //io = Es todos los clientes conectados
            // Socket = a uno solo.
         socket.on('send message', function(data) { // Recibe los datos
             io.sockets.emit('new message', data); // devuelve a tods los clientes conectados
         });
    });
};