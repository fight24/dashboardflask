$(document).ready(function(){
let menu_state = false
let internet_state = false

  $("#btn-menu").click(function(){
    menu_state = !menu_state
    $(".rad-sidebar").toggleClass("rad-nav-min", menu_state)
  });
});

function checkInternetConnection(rej, res){
    var status = navigator.onLine;
    if (status) {
        console.log('Internet Available !!');
        internet_state = true
    } else {
        if (internet_state == true) {
            internet_state = false
            alert('No internet Available !!');
        }
    }
    setTimeout(function() {
        checkInternetConnection();
    }, 1000);
}

const pm = new Promise((rej, res) => checkInternetConnection())
