$(function () {

    const socket = io();

    // Obteniendo los elemento del DOM desde interfaz
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#idChat');

    // Capturar eventos
    $messageForm.submit(function (e) {
        e.preventDefault();  // Desactivar el evento de refrescar la pagina
        // $messageBox.val(); Obtenemos el valor el texto
        socket.emit('send message', $messageBox.val()); 
        $messageBox.val('');
    });

    socket.on('new message',function(data) { // Recibe datos del servidor y los muestra
        $chat.append(data + '<br/>');
    } );
});