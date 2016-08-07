$( document ).ready(function() {

  var $modalLogin = $('#modal-login')
    , $modalClose = $('span.close')
    , $buttonLogin = $('#button-login')
    , $buttonLogout = $('#button-logout')
    , $loginSignupSwap = $('.message a')
    , $loginForm = $('.login-form')
    , $loginData = $('.login-form .form-fillable')
    , $signupForm = $('.signup-form')
    , $signupData = $('.signup-form .form-fillable')
    , $loginButton = $('#submitLogin')
    , $signupButton = $('#submitSignup');

  $buttonLogout.click(function() {
    $('#logout-form').submit();
  });

  $buttonLogin.click(function() {
    $modalLogin.css('display', 'block');
  });

  $modalClose.click(function() {
    $modalLogin.css('display', 'none');
  });

  // If the user clicks outside the modal then close it
  $modalLogin.click(function(event) {
    if (event.target.id == 'modal-login') {
      $modalLogin.css('display', 'none');
    };
  });

  $loginSignupSwap.click(function(){
    $loginForm.animate({height: "toggle", opacity: "toggle"}, "slow");
    $signupForm.animate({height: "toggle", opacity: "toggle"}, "slow");
  });

});
