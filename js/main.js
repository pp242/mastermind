document.addEventListener("DOMContentLoaded", function() {

  var col = 0;
  var nextSquare = [];
  var rows = 0;
  var answer = [];
  var score = ["false","false","false","false"];
  var colorChoice = [];
  var clickAudio = new Audio();
  var runGame = false; //variable so game can't begin till start button clicked

  //calling Functions
  setUpEventListeners();
  startGame();
  function setUpEventListeners() {
    //calling random generator
    $('#firstPage').click(compRand);

    //Calling colour click function
    $('.colour').click(colourResponse);

    //Undo Button
    $('#undo').click(function(){
      colourGridArray = $('.grid');
        if (col > 1){
          col--;
        }
      colourGridArray.eq(col).html('');
      colorChoice.pop(this.id);
    })

    //Reset Button
    $('#reset').click(function() {
      location.reload();
    })
  }

  function startGame() {
    //shuffle pins
    shuffle(score);
  }

  //Computer random colour generator
  function compRand() {
    playAudio();
    var colourOps = ["red", "yellow", "green", "blue", "grey", "pink", "black", "orange"];
    for (var i = 0; i < 4; i++) {
      var rand = colourOps[Math.floor(Math.random() * colourOps.length)];
      answer.push(rand);
      runGame=true;
    }
  }

  //making colours respond when clicked
  function colourResponse(event) {
    if (runGame) {
    colourGridArray = $('.grid');
      if (colorChoice.length < 4) {
        colourGridArray.eq(col).html('<div class="' + event.target.id + '"></div>');
        colorChoice.push(this.id);
        col++;
      }
    }
  }

  // Play Sound
  function playAudio(){
    var backgroundMusic = new Audio('Sounds/click.wav');
    backgroundMusic.play();
  }

  function setScoringEventListener(){
    // Scoring
    $('#score1').click(function (){
      getResult();

      //getting score pins to show
      pushOrPullPins();
      colorChoice = [];
      score = ["false","false","false","false"];
      rows = rows+4;
    })
  }

  setScoringEventListener();

  //Comparing arrays to return score
  function getResult() {
    console.log(answer)
    for (var i = 0; i < answer.length; i++) {
      for (var j = 0; j < answer.length; j++) {
        if ((colorChoice[i] === answer[j]) && (i === j) ) {
          if(score[i] === "white" || score[i] === "false"){
            score[i] = "red";
          }
        } 
      }  
    }
    for (var i = 0; i < answer.length; i++) {
      for (var j = 0; j < answer.length; j++) {    
        if ((colorChoice[i] === answer[j]) && (!(i === j)) && !(score[i] === "red")){
              
          if(score[j] === "false"){
            score[j] = "white";
            
            break;
          }
	      }
      }
    }
      
    if ((answer[0] === colorChoice[0]) && (answer[1] === colorChoice[1]) && (answer[2] === colorChoice[2]) &&  (answer[3] === colorChoice[3])) {
      $('h1').html("You Win!");
      $('.compGuess0').css({'color': answer[0] });
      $('.compGuess1').css({'color': answer[1] });
      $('.compGuess2').css({'color': answer[2] });
      $('.compGuess3').css({'color': answer[3] });
      runGame = false;
    }
    if (rows > 32) {
      $('h1').html("You lose!");
      $('.compGuess0').css({'color': answer[0] });
      $('.compGuess1').css({'color': answer[1] });
      $('.compGuess2').css({'color': answer[2] });
      $('.compGuess3').css({'color': answer[3] });
      runGame = false;
    }
  }

  //pushing pin colours into scores
  function pushOrPullPins() {
    for (var i = 0; i < score.length; i++) {
      var pinNumber = i+1+rows;
      if (score[i] === "white") {
        $('.pin' + pinNumber).html('&#x26AA;')
      }
      if (score[i] === "red") {
        $('.pin' + pinNumber).html('&#x1F534;')
      }
    }
  }

  //shuffles score pins into random order.
  function shuffle (array) {
    var i = 0;
    var j = 0;
    var temp = null;

    for (i = array.length - 1; i > 0; i -= 1) {
      j = Math.floor(Math.random() * (i + 1))
      temp = array[i]
      array[i] = array[j]
      array[j] = temp
    }
  }
})
