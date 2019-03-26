$(function () {

    const socket = io();

    // Obteniendo los elemento del DOM desde interfaz
    const $messageForm = $('#message-form');
    const $messageBox = $('#message');
    const $chat = $('#idChat');

    // Obteniendo datos del containerUser
    const $userForm = $('#userForm');
    const $userName = $('#userName');
    const $userError = $('#userError');
    
    // Obteniendo el Container Listar usuarios
    const $userNames = $('#userNames');
        
    // CAPTURANDO EVENTOS

    $messageForm.submit(function (e) {
        e.preventDefault();                     // Desactivar el evento de refrescar la pagina
        //$messageBox.val(); Obtenemos el valor el texto
        socket.emit('send message', $messageBox.val(),data=>{
            $chat.append(`<p class="error">${data}</p>`);
        }); 
        $messageBox.val('');
    });

    $userForm.submit(function (e) {
        e.preventDefault(); 
        socket.emit('new user', $userName.val(), data =>{
            if (data) {
                $('#userContainer').hide();     // Oculta el formulario de Usuario
                $('#containerApp').show();      // Muestra el Chat
            }else{
                $userError.html(`
                    <div class="alert alert-danger" role="alert">
                        Usuario ya existente !
                    </div>
                `);         
            }
        });
        userName.val('');      
    });


    // CAPTURANDO EVENTOS ENVIADOS DESDE EL SERVIDOR

    socket.on('userNames', data=>{                 // Listando usuarios 
        let html = '';
        for (let i = 0; i < data.length; i++) {
            html += ` <p> <i class="fas fa-user-ninja"> </i> ${data[i]}</p> `
        }
        $userNames.html(html);
    });

    socket.on('new message',data =>{                // Recibe datos del servidor y los muestra
        $chat.append('<strong>'+data.userName+': </strong>'+ data.msg +'<br/>');
    });
});