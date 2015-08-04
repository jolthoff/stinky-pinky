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

  // TODO
  /*
  * Grab audio for animations
  * Add more riddles
  * Add lazier evaluation of riddle answer
  * Skip animation takes riddle.q text
  * timeUp() ends game
  * Add red alarm
  * Bumping alarm number animation
  * Add font-size changing function dependent on riddle.q.length
  */

  //timer functions
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

  // get riddle object
  function getRiddle() {
    var random = Math.floor(Math.random() * riddles.length);
    riddle = riddles.splice(random, random + 1)[0];

    quiz();

  };

  // add riddle object's text to DOM
  function quiz() {
    $question = $('<div class="question">' + riddle.q + '</div>');

    $question.prependTo($questions);

  };

  getRiddle();

  // incorrect answer animation
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
    timeCount();
  };

  // skip animation
  function skipper() {
    $question.remove();
    $input.val('');
    $skipped.text(riddle.q);
    $skipped.show().animate({'font-size':'18rem'}, {queue: false, duration: 400});
    $skipped.animate({'opacity': '0'}, 400, 
      function() {
        $(this).hide();
        $(this).css('opacity', 1);
        $(this).css('font-size', '9rem');
    });

    setTimeout(function() {
      getRiddle(); 
    }, 200)
 
    resetTime();

  }

  // animation and point evaluation
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

      $bling.text('+' + time);
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

  // check if answer is correct and call appropriate animations
  function testAnswer() {

    if($input.val().toLowerCase() === riddle.a) {
      test = true;
      blinger();
      resetTime();
    } else {
      wrongAnswer();
    }
  };


  // event handlers for DOM elements
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