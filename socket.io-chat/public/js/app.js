var socket = io.connect('http://localhost:4000');

function addMessage (data) {
    $('#messages').prepend('<li class="list-group-item">' +
        '<h4 class="list-group-item-heading">' + data.name +' (@'+data.nickname+')'+ '</h4>' +
        '<p class="list-group-item-text">' + data.message + '</p>' +
    '</li>'+'<hr>');
};
function addUsername(data){
    $('#userlist').prepend('<li class="list-group-item">' +
    '<h4 class="list-group-item-heading">' + data.name+' (@'+data.nickname+')'+'</h4>');
};

socket.on('users-available', function (data) {
    for (var i = 0; i < data.length; i++) {
        addUsername(data[i]);
    }
});

socket.on('messages-available', function (data) {
    for (var i = 0; i < data.length; i++) {
        addMessage(data[i]);
    }
});
$( "#userlogin" ).submit(function(e) {

e.preventDefault();
    socket.emit('add-user',{
        name: $('input[name="name"]').val(),
        nickname: $('input[name="nickname"]').val()
    })

    $( "#userlogin" ).hide( "slow", function() {
        alert( "Username Saved" );
      });
  });

socket.on('message-added',addMessage);
 socket.on('user-added',addUsername);

$("#message").keyup(function (e)  {
 if (e.keyCode == 13)  {
  socket.emit('send', {nickname: "nick" , msg: $("#message").val()});
      $('#message').val('');  }
 else{
  socket.emit('is typing',  {nickname: "nick"});
     }
});

$('#create-message').submit(function (e) {
    e.preventDefault();

    socket.emit('add-message', {
        name: $('input[name="name"]').val(),
        nickname:$('input[name="nickname"]').val(),
        message: $('textarea[name="message"]').val()
    });


      const addChatTyping = (data) => {
        data.typing = true;
        data.message = 'is typing';
        addMessage(data);
      }
      const removeChatTyping = (data) => {
        getTypingMessages(data).fadeOut(() => {
          $(this).remove();
        });
      }
    $('textarea[name="message"]').val('');

});