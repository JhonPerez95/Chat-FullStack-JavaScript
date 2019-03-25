module.exports = function (io) {
    let userNames = ['Luis', 'Carlos', 'Juan'];

    io.on('connection',  socket => {
        console.log('un nuevo user conectado');
        socket.on('send message', function(data) { // Recibe los datos
            io.sockets.emit('new message',{ // devuelve a tods los clientes conectados
                msg: data,
                userName: socket.userName
            } ); 
         });

        socket.on('new user', (data, cb)=>{
            //console.log(data);
            if (userNames.indexOf(data) != -1) { // validamos que el usuario ya exista
                cb(false);
            }else{
                cb(true);
                socket.userName = data;
                userNames.push(socket.userName);
                updateUserName();
            }
        } );
        socket.on('disconnect', data=>{ // Eliminando el usuario que se deconecte
            if (!socket.userName) return;
            userNames.splice(userNames.indexOf(socket.userName), 1); 
            updateUserName();
        });

        function updateUserName() {
            io.sockets.emit('userNames', userNames);
        }
    });
};