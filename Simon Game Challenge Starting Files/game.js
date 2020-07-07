var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var numOfUserClicks = 0;

$("body").on("keydown", function() {
  nextSequence();
});

/* Input the next sequence */
function nextSequence() {
  $("h1").text("Level " + (level + 1));
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);
  var colorButtonId = "#" + randomChosenColour;
  $(colorButtonId).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  animatePress(randomChosenColour);
}

/* Listen to user button click */
$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  numOfUserClicks++;
  if (numOfUserClicks === (level + 1)) {
    var answer = checkAnswer(level);
    if (answer === true) {
      level++;
      userClickedPattern = [];
      numOfUserClicks = 0;
      setTimeout(function() {
        nextSequence();
      }, 5000);
    } else if (answer === false) {
      var gameOverAudio = new Audio("sounds\\wrong.mp3");
      gameOverAudio.play();
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);

      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }
  }
});

/* Start over the game */
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  numOfUserClicks = 0;
}

/* Check if user sequence is same as game sequence */
function checkAnswer(level) {
  //console.log(userClickedPattern);
  //console.log(gamePattern);
  for (var i = 0; i <= level; i++) {
    if (gamePattern[i] !== userClickedPattern[i]) {
      return false;
    }
  }
  return true;
}

/* Play Sound on button clicks or selection */
function playSound(name) {
  var audioFilePath = "sounds\\" + name + ".mp3";
  var audio = new Audio(audioFilePath);
  audio.play();
}

/* Animate button press */
function animatePress(currentColor) {
  var className = "." + currentColor;
  $(className).addClass("pressed");
  setTimeout(function() {
    $(className).removeClass("pressed")
  }, 100);
}
