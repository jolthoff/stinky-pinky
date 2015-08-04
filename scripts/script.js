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
  var $wrong = $('.wrong');
  var $skipped = $('.skipped');
  var $timer = $('.timer p');
  var time = 15;

  function resetTime() {
    time = 15;
    $timer.text(time);
  }

  function timeUp() {
    skipper();
    resetTime();
  }

  function timeCount() {
    if (time < 1)
        timeUp();
    time -= 1;
    $timer.text(time);
  }

  setInterval(function() {
    timeCount();
  }, 2000);

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

  function wrongAnswer() {
    $wrong.show().animate({'left': '19rem'}, 50,
      function() {
        $(this).animate({'left': '25rem'}, 50,
          function() {
            $(this).animate({'left': '20rem'}, 50,
              function() {
                $(this).animate({'left': '24rem'}, 50,
                  function() {
                    $(this).animate({'left': '21rem'}, 50,
                      function() {
                        $(this).animate({'left': '23rem'}, 50, 
                          function() {
                            $(this).hide();
                            $(this).css('left', '22.765rem');
                          })
                      })
                  })
              })
          })
      })
    $input.val('');
  };

  function skipper() {
    $question.remove();
    $input.val('');
    $skipped.show().animate({'font-size':'33rem'}, {queue: false, duration: 250});
    $skipped.animate({'opacity': '0'}, 250, 
      function() {
        $(this).hide();
        $(this).css('opacity', 1);
        $(this).css('font-size', '9rem');
    });

    getRiddle();  
    resetTime();

  }

  function blinger() {

    function animate() {
      $bling.show().animate({'opacity': '0', 'top': "19rem"}, 500,
          function() {
            $(this).hide();
            $bling.css('top', '25.125rem');
            $bling.css('opacity', '1');
          }
      )
    }

    if (test) {
      $bling.text('+2');
      $bling.css('color', 'green');
      $question.remove();
      $input.val('');
      points += time;

      animate();
      getRiddle();

    } else {
      $bling.text('-2');
      $bling.css('color', 'red');
      points -= 2;

      animate();
    }
    $counter.text('' + points);
    test = false;

  };


  function testAnswer() {

    if($input.val().toLowerCase() === riddle.a) {
      test = true;
      blinger();
      resetTime();
    } else {
      wrongAnswer();
    }
  };

  $submit.on({
    click: function() {
      testAnswer();
    }  
  });

  $skip.on({
    click: function() {
      blinger();
      skipper();
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