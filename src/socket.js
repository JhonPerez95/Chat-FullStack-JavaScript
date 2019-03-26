const chat = require('./models/chat');
module.exports = function (io) {
    
    let userNames = {};

    io.on('connection',  async socket => {
        console.log('un nuevo user conectado');

        let message = await chat.find({}).limit(8);     // Mostrar mensajes almacenados
        socket.emit('load old msg', message);

        socket.on('send message',async (data, cb)=>{     // Recibe los datos del cliente
            var msg = data.trim();

            if (msg.substr(0,3)=== '/p ') {              // Se valida si es un mensaje privado
                msg = msg.substr(3);
                var index = msg.indexOf(' ');
                if (index !== -1) {                      // Se valida que haya un mensaje para enviar privado
                    var name = msg.substring(0, index);
                    var msg = msg.substring(index +1 );
                    if (name in userNames) {              // Se valida que el usuario exista
                        userNames[name].emit('wisper', {
                            msg: msg,
                            userName: socket.userName
                        });
                    }else{
                        cb('Error! Usuario no existe');
                    }
                }else{
                    cb('Error! Por favor ingresa un mensaje');
                }
            }else{
                var newMessage = new chat({
                    msg: msg,
                    userName: socket.userName
                });
                await newMessage.save();
                io.sockets.emit('new message',{               // devuelve a tods los clientes conectados
                    msg: msg,
                    userName: socket.userName
                } ); 
            }
        });
        // REGISTRO DE NUEVO USUARIO:
        socket.on('new user', (data, cb)=>{
            //console.log(data);
            if (data in userNames) {                            // validamos que el usuario ya exista
                cb(false);
            }else{
                cb(true);
                socket.userName = data;
                userNames[socket.userName]= socket;
                updateUserName();
            }
        } );

        // VALIDACION Y ELIMINACION DE USUARIO QUE SE DECONECTE:
        socket.on('disconnect', data=>{                            // Eliminando el usuario que se deconecte
            if (!socket.userName) return;
            delete userNames[socket.userName]; 
            updateUserName();
        });

        function updateUserName() {                                 // Funcion para act listado de clientes
            io.sockets.emit('userNames', Object.keys(userNames));
        }
    });
};