//=========================Global Variables ==================================//
var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;

// if we click on start/reset button ===========================================//
document.getElementById("startreset").onclick = function() {
    // if we are playing
    if(playing == true) {
        location.reload(); 
    }else{ // if we are not playing
        playing = true; 
        score = 0; 
        document.getElementById("scorevalue").innerHTML = score;
        show("timeremaining"); // show countdown box
        timeremaining = 120; // setting start time from which timeremaining decreases; original game used 60
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        hide("gameover"); // hide Game Over box
        document.getElementById("startreset").innerHTML = "Reset Game"; // change button text to 'reset'
        startCountdown(); 
        generateQA(); // generate question and multiple answers
    }

}

//  if we click on an answer box =================================================//
for (i=1;i<=4;i++) {
    document.getElementById("box"+i).onclick = function() {
        //check if we are playing
        if (playing == true){ // yes
            if (this.innerHTML == correctAnswer){ 
            // correct answer
                // increase score
                score++;
                document.getElementById("scorevalue").innerHTML = score;  
                // show "correct" box and hide "wrong" box
                hide("wrong");
                show("correct");
                setTimeout(function() {
                    hide("correct");
                }, 3000); // function to execute, time im milliseconds
                // generate new question
                generateQA(); 
            }else{
                // wrong answer
                hide("correct");
                show("wrong");
                setTimeout(function() {
                    hide("wrong");
                }, 3000); 
            }
        }
    } 
}


// ===================== functions  ===============================================//

function startCountdown() {
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining; // updates the display
        if (timeremaining == 0) { // game over
            stopCountdown();
            show("gameover"); // brings up Game Over div
            document.getElementById("gameover").innerHTML = "<p>Game over!</p> <p>Your score is " + score + ".</>";
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000); 

}

//stop counter
function stopCountdown() {
    clearInterval(action);
}

// hide element
function hide (Id) {
    document.getElementById(Id).style.display = "none";
}
//show an element
function show (Id) {
    document.getElementById(Id).style.display = "block";
}
// generate a question and multiple answers
function generateQA() {
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());

    correctAnswer = x*y;
    document.getElementById("question").innerHTML = x + " * " + y;
    
    var correctPosition = 1 + Math.round(3*Math.random()); // random choice of four options

    document.getElementById("box"+correctPosition).innerHTML = correctAnswer; // fill one box with the correct answer

    // fill other boxes with wrong answers:
    var answers = [correctAnswer];
    for (i=1; i<=4; i++){
        if (i !== correctPosition) {
            var wrongAnswer;

            do {
                wrongAnswer = (1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random()));
            } while (answers.indexOf(wrongAnswer) > -1)
            
            document.getElementById("box"+ i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}