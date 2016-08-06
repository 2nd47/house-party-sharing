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

  var getFormData = function(dataForms) {
    values = {};
    $.each(dataForms.children().serializeArray(), function(index, field) {
      values[field.name] = field.value;
    });
    return values;
  }

  $buttonLogin.click(function() {
    $modalLogin.css('display', 'block');
  });

  $buttonLogout.click(function() {
    $.post(
      '/logout',
      'json'
    );
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

  $loginButton.click(function() {
    $.post(
      '/login',
      getFormData($loginData),
      'json'
    );
  });

  $signupButton.click(function() {
    $.post(
      '/signup',
      getFormData($signupData),
      'json'
    );
  });

});
