$(document).ready(function () {
    initialize();
    
    var count = 30;
    $("#counter").append(count)
    setInterval(function () {
        $("#counter").empty();
        $("#counter").append(count);
        count--;
        
        if (count === 0) {
            stopInterval()

        }
    }, 1000);


    

});
function initialize() {
    questions = [
        "In what year did Apollo 11 land on the moon?",
        "Who was the first human in space?",
        "Who has spent the most consecutive time in space?"
    ];
    correct_answers = 0;
    $("#question").append(questions[0])

}
function stopInterval() {
    console.log("Times Up!")
    clearInterval(timer);
}

// function counter() {
//     $("#time-remaining").append(time_remaining)
//     setTimeout(function, 1000);
// }