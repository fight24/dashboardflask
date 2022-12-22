$(document).ready(function() {
  var socket = io('http://' + document.domain + ":"+ location.port );
  let value;

  $("#cs").text("Đứt kết nối rồi đại vương ơi :))");
  $(".abc").css("background-color", "red")

  socket.on("connect", function(data) {
      $("#cs").text("True");
      $(".abc").css("background-color", "green")
  })

  $('#publish').click(function(event) {
    var topic = $('#topic').val();
    var message = $('#message').val();
    var qos = $('#qos').val();
    var data = '{"topic": "' + topic + '", "message": "' + message + '", "qos": ' + qos + '}';
    socket.emit('publish', data=data);
  });

  $('#subscribe').click(function(event) {
    var topic = $('#subscribe_topic').val();
    var qos = $('#subscribe_qos').val();
    var data = '{"topic": "' + topic + '", "qos": ' + qos + '}';
    socket.emit('subscribe', data=data);
    $('#subscribe').hide();
    $('#unsubscribe').show();
    $('#subscribe_topic').prop('readonly', true);
  });

  socket.on('mqtt_message', (data) => {
      //console.log(typeof(data), data)
      var text = '(' + data['topic'] + ' qos: ' + data['qos'] + ') ' + data['payload'];
        var $textarea = $('#subscribe_messages');
         $textarea.val($textarea.val() + text + ' \n');
  })

  $('#unsubscribe').click(function(event) {
    socket.emit('unsubscribe_all');
    $('#subscribe').show();
    $('#unsubscribe').hide();
    $('subscribe_topic').prop('readonly', false);
  });

  window.feed = function(callback) {
      var tick = {};
      socket.on('abc', function(data) {
        //console.log(data);
        tick.plot0 = Math.floor(JSON.parse(data.payload)[0] * 100);
        callback(JSON.stringify(tick));

      })
  };

});
