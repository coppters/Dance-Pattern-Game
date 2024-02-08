var buttonDirection = ["left", "right", "up", "down"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var bgMusic = new Audio("./sounds/track2.wav");
var words = ["Cheers! 🥂", "Fighting! 💪", "Great! 👍", "Bravo! 👏", "Amazing! 🌟", "Shine! ✨", "Smile! 😊", "Hope! 🌈", "Dream! 💭", "Love! ❤️", "Joy! 😄", "Wow! 😲", "Yes! ✅", "Go! 🏃", "Win! 🏆", "Sparkle! 🎇", "Thrive! 🌱", "Excel! 📈", "Believe! 🙏", "Triumph! 🎉"]

// Start the game with a key press
$(document).keypress(function() {
    if (!started) {
        $("#score").text(level);
        setTimeout(nextSequence, 100);
        started = true;
        playSong();
    }
});

$(document).on('touchstart', function() {
    if (!started) {
        $("#score").text(level);
        setTimeout(nextSequence, 100);
        started = true;
        playsong();
    }
    
});

// Start or interact with the game using arrow keys
$(document).keydown(function(event) {
    var keyMap = {
        "ArrowLeft": "left",
        "ArrowUp": "up",
        "ArrowRight": "right",
        "ArrowDown": "down"
    };
    if (!started && ["ArrowLeft", "ArrowUp", "ArrowRight", "ArrowDown"].includes(event.key)) {
        $("#score").text(level);
        setTimeout(nextSequence, 100);
        started = true;
    } else if (started) {
        var userChosenDirection = keyMap[event.key];
        if (userChosenDirection) {
            userClickedPattern.push(userChosenDirection);
            playSound(userChosenDirection);
            animatePress(userChosenDirection);
            changeGif(userChosenDirection);
            checkAnswer(userClickedPattern.length - 1);
        }
    }
});

// Handle button clicks
$(".arr").click(function() {
    var userChosenDirection = $(this).attr("id");
    userClickedPattern.push(userChosenDirection);
    playSound(userChosenDirection);
    animatePress(userChosenDirection);
    changeGif(userChosenDirection);
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    userClickedPattern = [];
    level++;

    var randomWords = Math.floor(Math.random() * words.length);
    var randomChosenWords = words[randomWords];

    $("#level-title").text(randomChosenWords);
    $("#score").text(level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenDirection = buttonDirection[randomNumber];
    gamePattern.push(randomChosenDirection);

    $("#" + randomChosenDirection).addClass("chosen");
    setTimeout(function() {
        $("#" + randomChosenDirection).removeClass("chosen");
    }, 100);
    playSound(randomChosenDirection);
    changeGif(randomChosenDirection);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("SUCCESS");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("WRONG");
        playSound("fail");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        changeGif("over");
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
    stopSong();
}

function playSong() {
        bgMusic.play();
}

function stopSong() {
    bgMusic.pause();
    bgMusic.currentTime = 0;
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentDirection) {
    $("#" + currentDirection).addClass("pressed");
    setTimeout(function() {
        $("#" + currentDirection).removeClass("pressed");
    }, 100);
}

function changeGif(gifName) {
    $("#danceGirl").attr("src","./images/" + gifName + ".gif");
}


