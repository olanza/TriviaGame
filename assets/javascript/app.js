$(document).ready(function () {
    $("#start-button").on("click", gameTime.startTime);
});

var possibleQuestions =
    [
        {
            question: "Prior to Tom Holland taking the role, how many actors have played Spider-Man on the big screen in the U.S.?",
            answers: ["1", "2", "3"],
            correct: "2"
        },
        {
            question: "In Guardians of the Galaxy, what is the name of the dog in the Collector Taneleer Tivan's museum?",
            answers: ["Cosmo the Superdog", "Krypto the Superdog", "HotDog the Superdog"],
            correct: "Cosmo the Superdog"
        },
        {
            question: "How many versions of the Iron Man armor has Tony Stark made?",
            answers: ["10", "25", "50"],
            correct: "50"
        },
    ]


var trivia = {

    showTrivia: function () {
        var box = $("#questions");
        var answerGroup = $(".form-check");
        box.append('<h2>Answer the following questions:</h2>');

        for (var i = 0; i < possibleQuestions.length; i++) {

            box.append('<div id="question">' + possibleQuestions[i].question + '</div>');

            var answer1 = possibleQuestions[i].answers[0];
            var answer2 = possibleQuestions[i].answers[1];
            var answer3 = possibleQuestions[i].answers[2];

            box.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer1 + '</label></div>');
            box.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer2 + '</label></div>');
            box.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer3 + '</label></div>');
        }

        var submit = '<button class="btn btn-primary" id="done-button" type="submit">Submit</button>';
        box.append(submit);
        $("#done-button").on("click", gameTime.stopTimer);
    },


    checkResponse: function () {
        var noReponse = 0;
        var correct = 0;
        var incorrect = 0;
        var rightAnswer;
        var userInput;


        for (var i = 0; i < possibleQuestions.length; i++) {
            rightAnswer = possibleQuestions[i].correct;
            userInput = $('input[id=radio' + i + ']:checked + label').text();

            if (userInput === rightAnswer) {
                correct++;
            } else if (userInput === "") {
                noReponse++;
            } else if (userInput !== rightAnswer) {
                {
                    incorrect++;
                }
            }
        }

        gameTime.displayResult(correct, incorrect, noReponse);
    },
}


var gameTime = {
    timeLeft: 10,
    startTime: function () {
        $("#timer").text("Time remaining:" + " " + gameTime.timeLeft);
        setInterval(gameTime.countdown, 1000);
        $("#start-page").hide();
        trivia.showTrivia();
    },


    countdown: function () {
        gameTime.timeLeft--;
        $("#timer").text("Time left:" + " " + gameTime.timeLeft);
        if (gameTime.timeLeft === 0) {
            gameTime.stopTimer();
            $("#timer").empty();
        }
    },


    stopTimer: function () {
        clearInterval();
        trivia.checkResponse();
    },


    displayResult: function (correct, incorrect, noReponse) {
        $("#timer").empty();
        $("#timer").hide();
        $("#end-page").show();
        $("#questions").empty();
        $("#correct-answers").text("Right:" + " " + correct);
        $("#incorrect-answers").text("Wronh:" + " " + incorrect);
        $("#unanswered").text("Skipped:" + " " + noReponse);
    }
}



