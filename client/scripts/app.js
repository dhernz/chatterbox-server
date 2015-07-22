// YOUR CODE HERE:
// https://api.parse.com/1/classes/chatterbox

var app = {

  init : function(){

    var that = this;
    this.roomNames = {};
    this.messages = [];
    this.currentRoom;

    $('a.username').click(function(){
      app.addFriend();
    });

    $('#send').submit(app.handleSubmit);
    
    $('#roomSelect').change(function(e){

      that.currentRoom = e.target.value
      var selectedRoom = "." + that.currentRoom;

      $('#chats div').show(selectedRoom);
      $('#chats div').not(selectedRoom).hide();

      that.fetch();
    });

    $('.spinner').hide();

    app.fetch(500);
    setInterval(app.fetch.bind(this), 5000);

    return true;

  },

  send : function(message){
    var that = this;
    $('.spinner').show(); 

    $.ajax({
      url: 'http://127.0.0.1:3000/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        $('#send #message').val('');
        $('.spinner').hide();
        that.fetch();

      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });

  },

  fetch : function(limit){ 

    limit = limit || 50;

    $('.spinner').show();
    var that = this;

    $.ajax({
      url: 'http://127.0.0.1:3000/classes/messages',
      type: 'GET',
      contentType: 'application/json',
      // data: { order: '-createdAt',
      //         limit: limit},
      success: function(data) {
        data = JSON.parse(data);
        console.log(data);
        //console.log(data.results.length);

        $('.spinner').hide();
        that.clearMessages();
        that.clearRooms();

        that.messages = that.messages.concat(data.results);
        that.messages = _.uniq(that.messages, function(item){
          return item.objectId;
        })
        console.log(that.messages.sort(function(a,b){return b.createdAt-a.createdAt}))
        // that.messages = (that.messages, function(item){
        //   return new Date(item.createdAt).getTime();
        // });

        var updateMessages;
        // filter on currentRoom;
        // if(that.currentRoom !== undefined){
        //   updateMessages = _.filter(that.messages, function(item){
        //     return item.roomname === that.currentRoom;
        //   });
        // }else{
          updateMessages = that.messages;
        // }

        for(var i = 0; i < updateMessages.length; i++){
          if(updateMessages[i].roomname===undefined){
            var roomname = "undefined";
          } else if (updateMessages[i].roomname===null){
            var roomname = "null";
          }else if (updateMessages[i].roomname==="" || updateMessages[i].roomname===" "){
            var roomname = "_";
          }else {
            var roomname = updateMessages[i].roomname;
          }
          that.roomNames[roomname] = roomname;
          that.addMessage(updateMessages[i]);
        }

        for(var key in that.roomNames){
          var addedRoom = that.roomNames[key];
          that.addRoom(addedRoom);
        }

        if(that.currentRoom !== undefined){
          $("#roomSelect").val(that.currentRoom);
        }
        },
        error: function(data) {
          console.error('chatterbox: Failed to fetch messages');
        }
    });
  },

  clearMessages : function(){$('#chats').html('');},

  addMessage : function(message){
    
    var messageText = _.escape(message.message);
    var roomName = _.escape(message.roomname);
    var userName = _.escape(message.username);
    
    var $message = $('<div></div>')
      .addClass("chat")
      .addClass(roomName);
    var $username = $('<a>' + userName + ': </a>')
      .addClass("username");
    var $messageText = $('<span>' + messageText + '</span><br />')
    var $createdAt = $('<span>'+ moment(message.createdAt).fromNow() + '</span>').addClass('date');

    $message.append($username);
    $message.append($messageText);
    $message.append($createdAt);
    $('#chats').append($message);

  },

  clearRooms : function(){$('#roomSelect').html('');},

  addRoom : function(roomname){

    roomname = _.escape(roomname);
    var $newRoom = $('<option class="room" value="'+roomname+'">'+roomname+'</option>');
    $('#roomSelect').append($newRoom);
  
  },

  addFriend : function(){},

  handleSubmit : function(e){
    
    e.preventDefault();
    var msg = {
      username: getQueryParameters().username,
      message: $('#send #message').val(),
      roomname: $('#roomSelect').val(),
      objectId: _.uniqueId(new Date().getTime()),
      createdAt: new Date().getTime()
    };
    console.log(msg);

    app.send(msg);
  }

};

$( document ).ready(function() {
  app.init();
});

window.getQueryParameters = function(str) {
  return (str || document.location.search).replace(/(^\?)/,'').split("&").map(function(n){return n=n.split("="),this[n[0]]=n[1],this;}.bind({}))[0];
};
