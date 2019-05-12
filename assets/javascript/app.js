$(document).ready(function () {
    let correctCount = 0;
    let wrongCount = 0;
    let unanswerCount = 0;
    let timer = 20;
    let intervalId;
    let userGuess ="";
    let running = false;
    let qCount = questions.length;
    let pick;
    let index;
    let newArray = [];
    let holder = [];
    
    $("#reset").hide();

    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for(let i = 0; i < questions.length; i++) {
            holder.push(questions[i]);
        }
    })

    function runTimer(){
        if (!running) {
            intervalId = setInterval(decrement, 1000); 
            running = true;
        }
    }

    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer --;
    
        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hideanswer();
        }	
    }
    
    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    function displayQuestion() {

        index = Math.floor(Math.random()*questions.length);
        pick = questions[index];
    
            $("#questionblock").html("<h2>" + pick.question + "</h2>");
            for(let i = 0; i < pick.choice.length; i++) {
                let userChoice = $("<div>");
                userChoice.addClass("answerchoice");
                userChoice.html(pick.choice[i]);
            
                userChoice.attr("data-guessvalue", i);
                $("#answerblock").append(userChoice);
    }
    
    $(".answerchoice").on("click", function () {

        userGuess = parseInt($(this).attr("data-guessvalue"));
    
        if (userGuess === pick.answer) {
            stop();
            correctCount++;
            userGuess="";
            $("#answerblock").html("<p>Correct!</p>");
            hideanswer();
    
        } else {
            stop();
            wrongCount++;
            userGuess="";
            $("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
            hideanswer();
        }
    })
    }
    
    
    function hideanswer () {
        newArray.push(pick);
        questions.splice(index,1);
    
        let hidpic = setTimeout(function() {
            $("#answerblock").empty();
            timer= 20;
    
        if ((wrongCount + correctCount + unanswerCount) === qCount) {
            $("#questionblock").empty();
            $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
            $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
            $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
            $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
            $("#reset").show();
            correctCount = 0;
            wrongCount = 0;
            unanswerCount = 0;
    
        } else {
            runTimer();
            displayQuestion();
    
        }
        }, 3000);
    
    
    }
    
    $("#reset").on("click", function() {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for(let i = 0; i < holder.length; i++) {
            questions.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    
    })
    
    })