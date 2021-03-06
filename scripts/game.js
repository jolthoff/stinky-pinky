$(document).ready(function() {
  
  // globals
  var $billboard = $('.billboard');
  var $answer = $('.answer');
  var $animations = $('.animations');
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
  var $gamestart = $('.gamestart');
  var $gameover = $('.gameover');
  var gameover;
  var $message = $('.message');
  var $alarm = $('.alarm');
  var $ching = $('.ching')[0];
  var $cheer = $('.cheer')[0];
  var $grunt = $('.grunt')[0];
  var $tick = $('.tick')[0];
  var $ring = $('.ring')[0];
  var $swoosh = $('.swoosh')[0];
  var $womp = $('.womp')[0];
  console.log(localStorage.getItem("visitor.user"));

  
  // TODO
    /*
      * Add more riddles
      * Add better evaluation of riddle answer
      * Add try again prompt
      * Animate endgame prompt
      * Record highscore values
      * Add rules prompt
      * Add red and blue alarm
      * Modify alarm animation and display times
      ---
      LONG TERM TODO
        * Add multi user capability (all users see same screen)
        * Add team scoring and tagging

    */
    $billboard.fadeIn(500);
    $answer.fadeIn(500);
    $animations.fadeIn(500);

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
    $ring.volume = 0.6;
    $ring.load();
    $ring.play();
    setTimeout(function() {
      $ring.pause();
    }, 1000)
  }

  function swoosh() {
    $swoosh.volume = 0.5;
    $swoosh.load();
    $swoosh.play();
  }

  function womp() {
    $womp.volume = 0.5;
    $womp.load();
    $womp.play();
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

    if (points < 10) {

      setTimeout(function() {
        womp();
      }, 900)

      $message.text("Womp womp")

    } else {

      setTimeout(function() {
        cheer();
      }, 900)
    
      $message.text("Yaaaaaaay! You got " + points + " points!")

    }
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
    riddle = riddles.splice(random, 1)[0];

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

    $wrong.show().animate({'left': '23%'}, 50,
      function() {
      $(this).animate({'left': '31%'}, 50,
        function() {
      $(this).animate({'left': '24%'}, 50,
        function() {
      $(this).animate({'left': '30%'}, 50,
        function() {
      $(this).animate({'left': '25%'}, 50,
        function() {
      $(this).animate({'left': '29%'}, 50, 
        function() {
          $(this).hide();
          $(this).css('left', '27.2%');
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
    $skipped.show().animate({'font-size':'38rem', 'top': '-15%', 'left': '-13.5%'}, {queue: false, duration: 450});
    $skipped.animate({'opacity': '0'}, 450, 
      function() {
        $(this).hide();
        $(this).css('opacity', 1);
        $(this).css('font-size', '9rem');
        $(this).css('top', '3.9rem');
        $(this).css('left', '29%');
    });

  }

  // handles displaying points
  function counterAdj() {
    $counter.text('' + points);
    if (points > 100 || points < -9)
      $counter.css('left', '40.1%')
    else if (points > 9 || points < 0)
      $counter.css('left', '43.9%')
    else 
      $counter.css('left', '45.4%')
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
      $bling.css('color', 'rgba(142, 210, 255, 1)');
      $question.remove();
      $input.val('');
      points += time;

      animate();
      

    } else {

      $bling.text('-2');
      $bling.css('color', 'rgba(121, 36, 5, 1)');
      points -= 2;

      animate();
    }

    counterAdj();

  };

  // check if answer is correct and call appropriate animations
  function testAnswer() {

    if($input.val().toLowerCase() === riddle.a) {
      test = true;
      ching();
      blinger();
      resetTime();
      getRiddle();
      test = false;
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
      swoosh();

      setTimeout(function() {
        getRiddle(); 
      }, 80)

      resetTime();
    }
  })

  $(document).on({
    keydown: function(e) {
      if(e.keyCode === 13)
        testAnswer();
    },
    keyup: function(e) {
      if ($input.val().length > 0)
        $input.css('text-shadow', '0px 1px 0px rgba(127, 218, 255, 1)');
      if (!$input.val())
        $input.css('text-shadow', 'none');
      if (e.keyCode === 39)
        $skip.click();
    },
    click: function() {
      $input.focus();
    }
  });

});