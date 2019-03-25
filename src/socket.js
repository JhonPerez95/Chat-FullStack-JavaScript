module.exports = function (io) {
    let userNames = [];

    io.on('connection',  socket => {
        console.log('un nuevo user conectado');
            //io = Es todos los clientes conectados
            // Socket = a uno solo.
        socket.on('send message', function(data) { // Recibe los datos
            io.sockets.emit('new message', data); // devuelve a tods los clientes conectados
         });

        socket.on('new user', (data, cb)=>{
            if (userNames.indexOf(data) != -1) { // validamos que el usuario ya exista
                cb(false);
            }else{
                cb(true);
                socket.userName = data;
                userNames.push(socket.userName);
            }
        } );
    });
};