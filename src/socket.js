module.exports = function (io) {
    io.on('connection',  socket => {
        console.log('un nuevo user conectado');
    });
};