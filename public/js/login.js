$( document ).ready(function() {

  var $modalLogin = $('#modal-login');
  var $modalClose = $('span.close');
  var $buttonLogin = $('#button-login');
  var $loginForm = $('.login-form');
  var $signupForm = $('.signup-form');

  $buttonLogin.click(function() {
    $modalLogin.css('display', 'block');
  })

  $modalClose.click(function() {
    $modalLogin.css('display', 'none');
  });

  // If the user clicks outside the modal then close it
  $modalLogin.click(function(event) {
    if (event.target.id == 'modal-login') {
      $modalLogin.css('display', 'none');
    };
  });

  $('.message a').click(function(){
    $('.login-form').animate({height: "toggle", opacity: "toggle"}, "slow");
    $('.signup-form').animate({height: "toggle", opacity: "toggle"}, "slow");
  });

});
