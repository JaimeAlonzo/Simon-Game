var userClickedPattern = [];

var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;

var lastIndex = 0;

$(".btn").on("click", function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  lastIndex=userClickedPattern.length-1;
  checkAnswer(level);
});

$(document).on("keydown",function(){
  var title = $("#level-title").text();
  if(title=="Press A Key to Start"||title=="Game Over, Press Any Key to Restart"){
    newSequence();
    $("h1").text("Level "+level);
  }
  console.log(title);
});

function newSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
  level++;
  $("#level-title").text("Level "+level);
}

function checkAnswer(currentLevel){
  if(gamePattern[lastIndex]==userClickedPattern[lastIndex]){
    if(userClickedPattern.length==currentLevel){
      setTimeout(function () {
        newSequence();
        userClickedPattern=[];
      }, 1000);
    }
  }else{
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver(){
  level=0;
  gamePattern=[];
  userClickedPattern=[];
}
