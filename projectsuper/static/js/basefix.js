

const cookieObj = new URLSearchParams(document.cookie.replaceAll("&", "%26").replaceAll("; ","&"));
jQuery(document).ready(function (e) {
    function t(t) {
        e(t).bind("click", function (t) {
            t.preventDefault();
            e(this).parent().fadeOut()
        })
    }
    e(".dropdown-toggle").click(function () {
        var t = e(this).parents(".button-dropdown").children(".dropdown-menu").is(":hidden");
        e(".button-dropdown .dropdown-menu").hide();
        e(".button-dropdown .dropdown-toggle").removeClass("active");
        if (t) {
            e(this).parents(".button-dropdown").children(".dropdown-menu").toggle().parents(".button-dropdown").children(".dropdown-toggle").addClass("active")
        }
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-menu").hide();
    });
    e(document).bind("click", function (t) {
        var n = e(t.target);
        if (!n.parents().hasClass("button-dropdown")) e(".button-dropdown .dropdown-toggle").removeClass("active");
    })


    var socket = io('http://' + document.domain + ":"+ location.port );
    let value;
  var INDEX = 0;
  var exp = new Date();
  var time = exp.getTime();
  time += 5 * 60 * 1000;
  exp.setTime(time); 
    $('#subscribe').click(function(event) {
      var topic = $('#subscribe_topic').val();
      var qos = $('#subscribe_qos').val();
      var data = '{"topic": "' + topic + '", "qos": ' + qos + '}';
      function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
      }
      setCookie("topic",topic,1);
      
     
      socket.emit('subscribe', data=data);
      document.cookie = "button=false;"+'; expires=' + exp.toUTCString() + '; path=/';
      $('#subscribe').hide();
      $('#unsubscribe').show();
      $('#subscribe_topic').prop('readonly', false);
    });
   
    socket.on('mqtt_message', (data) => {
      
        document.getElementById('title-topic').innerHTML = data['topic'];
         console.log(typeof(data.payload), data.payload)
         try {
          m_value = JSON.parse(data.payload); 
           var msg = 'Lux:'+ m_value[0].toFixed(2) + ' - Ax:' +  m_value[1].toFixed(2) + ' - Ay:'+  m_value[2].toFixed(2) + '- Az:'+  m_value[3].toFixed(2) +
            ' - Gx:'+  m_value[4].toFixed(2)  +' - Gy:'+  m_value[5].toFixed(2)  +' - Gz:'+  m_value[6].toFixed(2)  +' - T:'+  m_value[7].toFixed(2);
     
        }
        catch(err) {
          var msg = data.payload;
        }
        
          generate_message(msg, 'user');  
    })
    
    $('#unsubscribe').click(function(event) {
      socket.emit('unsubscribe_all');
      document.cookie = "button=true;"+'; expires=' + exp.toUTCString() + '; path=/';
      $('#subscribe').show();
      $('#unsubscribe').hide();
      $('subscribe_topic').prop('readonly', false);
    });

    if (cookieObj.get("button") === "true"){
      $('#subscribe').show();
      $('#unsubscribe').hide();
    }
    else if (cookieObj.get("button") === "false"){
      $('#subscribe').hide();
      $('#unsubscribe').show();
    }
    else{
      $('#subscribe').show();
      $('#unsubscribe').hide();
    }
    window.feed = function(callback) {
        var tick = {};
        socket.on('abc', function(data) {
          //console.log(data);
          tick.plot0 = Math.floor(JSON.parse(data.payload)[0] * 100);
          callback(JSON.stringify(tick));
  
        })
    };

    function generate_message(msg, type) {
      INDEX++;
      var str="";
      str += "<div id='cm-msg-"+INDEX+"' class=\"chat-msg "+type+"\">";
      str += "          <span class=\"msg-avatar\">";
      str += "            <img src=\"https://kynguyenlamdep.com/wp-content/uploads/2022/08/avatar-anime-nu-ngau.jpg\">";
      str += "          <div class=\"cm-msg-text\">";
      str += msg;
      str += "          <\/div>";
      str += "        <\/div>";
      $(".chat-logs").append(str);
      $("#cm-msg-"+INDEX).hide().fadeIn(300);
 
      $(".chat-logs").stop().animate({ scrollTop: $(".chat-logs")[0].scrollHeight}, 1000);
    }  
       
        $("#chat-circle").click(function() {    
          $("#chat-circle").toggle('scale');
          $(".chat-box").toggle('scale');
        })
        
        $(".chat-box-toggle").click(function() {
          $("#chat-circle").toggle('scale');
          $(".chat-box").toggle('scale');
        })
        
     });
      //---------------------------------------------
      window.onload = function() {
        var tooltip = document.querySelector(".tooltip");
    
        // Tooltip function that adds the is-visible class and sets a cookie
        function showTooltip() {
            tooltip.classList.add("is-visible");
            document.cookie =
                "hasSeenTooltip=true; expires=Thu, 31 Dec 2030 12:00:00 UTC";
    
            clearTimeout();
            setTimeout(closeTooltip, 3000);
        }
        // Show tooltip after 1 second
        setTimeout(showTooltip, 1000);

        // Close the tooltip after 5 seconds
        function closeTooltip() {
            tooltip.style.opacity = 0;
            clearTimeout();
            setTimeout(setDisplayNone, 500)
        }
    
        // Set display none after the opacity has been set to zero for nice transition
        function setDisplayNone() {
            tooltip.style.display = "none";
            tooltip.classList.remove("is-visible");
        } 
    };
    /*--------------------------------------*/
 
    
document.getElementById('subscribe_topic').value = cookieObj.get("topic");

  
