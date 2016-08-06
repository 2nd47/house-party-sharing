$( document ).ready(function() {

  var $modalLogin = $('#modal-login');
  var $modalClose = $('span.close');
  var $buttonLogin = $('#button-login');

  $buttonLogin.click(function() {
    $modalLogin.css('display', 'block');
  })

  $modalClose.click(function() {
    $modalLogin.css('display', 'none');
  });

  // If the user clicks outside the modal then close it
  $(window).click(function(event) {
    console.log($modalLogin.css('display')[0] == 'block');
    console.log(event.target != $modalLogin);
    console.log(event.target);
    if ($modalLogin.css('display')[0] === 'block' && event.target == $modalLogin) {
      $modalLogin.css('display', 'none');
    };
  });
});
