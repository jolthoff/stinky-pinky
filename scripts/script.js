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
  var $timer = $('.timer');
  var time = 15;
  var $gameover = $('.gameover');
  var gameover;
  var $alarm = $('.alarm');
  var $ching = $('.ching')[0];
  var $cheer = $('.cheer')[0];
  var $grunt = $('.grunt')[0];
  var $tick = $('.tick')[0];
  var $ring = $('.ring')[0];


  // TODO
    /*
      * Grab audio for animations
      * Add more riddles
      * Add lazier evaluation of riddle answer


      * Add red alarm
      * Bumping alarm number animation

    */

  // audio bits
  function ching() {
    $ching.volume = 0.6;
    $ching.load();
    $ching.play();
  }

  function cheer() {
    $cheer.volume = 0.6;
    $cheer.load();
    $cheer.play();
  }

  function tick() {
    $tick.volume = 0.3;
    $tick.load();
    $tick.play();
  }

  function ring() {
    $ring.volume = 0.2;
    $ring.load();
    $ring.play();
  }

  //timer functions
  function resetTime() {
    time = 15;
    $timer.text(time);
  }

  function timeUp() {
    gameover = true;
    alarmShake()
    setInterval(function() {
      alarmShake()
    }, 60);
    ring();
    skipper();
    ching();
    $gameover.text("Yaaaaaaay! You got " + points + " points!")
    $gameover.show().animate({'top': '15%'}, 200);
    $counter.hide();
    $submit.hide();
    $skip.hide();
    $input.hide();
  }

  // animate alarm image
  function alarmShake() {

      $alarm.css('transform', 'rotate(15deg)');
      setTimeout(function() {
        $alarm.css('transform', 'rotate(-30deg)')
      }, 25)
      setTimeout(function() {
        $alarm.css('transform', 'rotate(0deg)')
      }, 50)
    

  }

  // change time counter
  function timeCount() {
    
    if (gameover) {
      $timer.text(0);
      return;

    } else if (time <= 1) {
        timeUp();
    } else if (time <= 6) {
      alarmShake();
      setTimeout(function() {
        alarmShake();
      }, 900);
      tick();
      setTimeout(function() {
        tick();
      }, 900)
    }
    time -= 1;
    $timer.animate({'font-size': '5.95rem', 'margin-top': '0'}, 50, 
      function() {
        $(this).animate({'font-size': '4.55rem', 'margin-top': '.7rem'}, 50)
      })
    $timer.text(time);
    tick();
  }

  // set intervals for which to change time counter
  setInterval(function() {
    timeCount();
  }, 2000);

  // get riddle object
  function getRiddle() {

    var random = Math.floor(Math.random() * riddles.length);
    var stop = random + 1;
    riddle = riddles.splice(random, 1)[0];

    console.log("length is " + riddles.length);
    quiz();

  };

  // add riddle object's text to DOM
  function quiz() {
    $question = $('<div class="question">' + riddle.q + '</div>');
    if ($question.text().length > 30)
      $question.css('font-size', '5rem');
    else
      $question.css('font-size', '6rem');
    $question.prependTo($questions);

  };

  getRiddle();

  // incorrect answer animation
  function wrongAnswer() {

    $grunt.volume = 0.4;
    $grunt.load();
    $grunt.play();

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
      // change color of animated score to baby blue
      $bling.css('color', 'rgba(142, 210, 255, 1)');
      $question.remove();
      $input.val('');
      points += time;

      animate();
      

    } else {

      $bling.text('-2');
      // change color of animated score to reddish brown
      $bling.css('color', 'rgba(121, 36, 5, 1)');
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
      cheer();
      blinger();
      resetTime();
      getRiddle();
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

      setTimeout(function() {
        getRiddle(); 
      }, 200)

      resetTime();

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