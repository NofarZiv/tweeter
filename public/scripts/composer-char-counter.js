

$(document).ready(function() {
  $("#tweet-text").keyup( function() {
    let typedChar = 140 - $(this).val().length;
    $(this).closest('form').find('.counter').text(typedChar);
    if (typedChar < 0) {
      $(this).closest('form').find('.counter').addClass("neg");
    } else {
      $(this).closest('form').find('.counter').removeClass("neg");
    }
  });
});







