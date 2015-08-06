$(document).ready(function() {

  //globals
  var $gamestart = $('.gamestart');
  var visitor = {};
  var $prompt;

  function beginGame() {
    document.getElementById("link").click()
  }

  function welcome() {

    if (!visitor.user) {
      $gamestart.html('<p class="welcome">Let\'s play Stinky Pinky!</p><p class="rules">Just give us a rhyming word pair that relates to the clue and a thumbs up!</p><input class="prompt" type"text" placeholder="Let\'s start with your name"/>');
      $gamestart.fadeIn(800);
      $prompt = $('.prompt');
      $prompt.focus()
      
    } else {
      $gamestart.html('<p class="welcome">Welcome back ' + visitor.user + '!</p><p class="highscore">Try to beat ' + visitor.highscore + '</p>')
    }
  }
      


  $(document).on({
    keyup: function(){
      if ($prompt.val().length > 0) {
          $prompt.css('text-shadow', '0px 1px 0px rgba(127, 218, 255, 1)');
          $(document).on({
            keydown: function(e) {
              if(e.keyCode === 13) {
                visitor.user = $prompt.val() + Math.floor(Math.random() * 1000);
                visitor.highscore = 0;

                beginGame();
              }
            }
          })
      }
      if (!$prompt.val())
        $prompt.css('text-shadow', 'none');
    },
    click: function() {
      $prompt.focus();
    }
  })

  welcome();

});