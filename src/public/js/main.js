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


    // Obteniendo datos del containerUser
    const $userForm = $('#userForm');
    const $userName = $('#userName');
    const $userError = $('#userError');

    const $userNames = $('#userNames');
        
        // Capturando Eventos
        $userForm.submit(function (e) {
            e.preventDefault(); 
            socket.emit('new user', $userName.val(), function (data) {
                if (data) {
                    $('#userContainer').hide(); // Oculta el formulario de Usuario
                    $('#containerApp').show(); // Muestra el Chat
                }else{
                    $userError.html(`
                        <div class="alert alert-danger" role="alert">
                            Usuario ya existente !
                        </div>
                    `);               
                }
                $userName.val('');
            });
        });



    socket.on('new message',function(data) { // Recibe datos del servidor y los muestra
        $chat.append(data + '<br/>');
    } );
});