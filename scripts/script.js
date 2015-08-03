$(document).ready(function(){

  // globals
  var test;
  var points = 0;
  var riddle;
  var $question;
  var $questions = $('.questions');
  var $submit = $('.submit');
  var $skip = $('.skip');
  var $input = $('.field');
  var $counter = $('.counter');
  var $bling = $('.bling');

  $bling.hide();


  function getRiddle() {
    var random = Math.floor(Math.random() * riddles.length);
    riddle = riddles.splice(random, random + 1)[0];

    quiz();

  };

  function quiz() {
    $question = $('<div class="question">' + riddle.q + '</div>');

    $question.prependTo($questions);

  };

  getRiddle();


  function blinger() {

    function animate() {
      $bling.show().animate({'top': "19rem"}, 200,
          function() {
            $(this).fadeOut(200);
            setTimeout(function() {
              $bling.css('top', '25.125rem');
            }, 200);
            
          }
      );
    }

    if (test) {
      $bling.text('+2');
      $bling.css('color', 'green');
      animate();
    } else {
      $bling.text('-2');
      $bling.css('color', 'red');
      animate();
    }
  };

  function testAnswer() {

    if($input.val().toLowerCase() === riddle.a) {
      test = true;

      $question.remove();
      $input.val('');
      points += 2;

      blinger();
      $counter.text('+' + points);
      getRiddle();

    } else {
      
      $input.val('');

    }
  };

  $submit.on({
    click: function() {
      testAnswer();
    }  
  });

  $skip.on({
    click: function() {
      test = false;
      blinger();
    }
  })

  $(document).on({
    keyup: function(e) {
      if(e.keyCode === 13) {
        testAnswer();
      }
    }
  });

});