alert("Running external JS code!");

//Global variables
let randomNumber = Math.floor(Math.random() * 99) + 1;
let attempts = 0;
const MAX_ATTEMPTS = 7;
let wins = 0;
let losses = 0;

// Wait for DOM to load before running
document.addEventListener("DOMContentLoaded", function() {
    initializeGame();
    setupEventListeners();
});

function setupEventListeners() {
    document.querySelector("#guessBtn").addEventListener("click", checkGuess);
    document.querySelector("#resetBtn").addEventListener("click", function() {
        resetGame();
    });
    
    // Allow Enter key to submit guess
    document.querySelector("#playerGuess").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            checkGuess();
        }
    });
}

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 99) + 1;
    console.log("randomNumber: " + randomNumber);
    attempts = 0;
    
    // Show/hide buttons
    document.querySelector("#resetBtn").style.display = "none";
    document.querySelector("#guessBtn").style.display = "inline";
    document.querySelector("#guessBtn").disabled = false;
    
    // Reset input field
    let playerGuess = document.querySelector("#playerGuess");
    playerGuess.value = "";
    playerGuess.disabled = false;
    playerGuess.focus();
    
    // Clear feedback
    let feedback = document.querySelector("#feedback");
    feedback.textContent = "Enter a number between 1 and 99";
    feedback.style.color = "#ffffff";
    feedback.style.backgroundColor = "rgba(255, 255, 255, 0.05)";
    
    // Clear previous guesses
    document.querySelector("#guesses").textContent = "";
    
    // Update attempts display
    updateAttemptsDisplay();
}

function resetGame() {
    // This resets the game without changing win/loss statistics
    initializeGame();
    // Make sure win/loss stats are preserved
    updateScoreDisplay();
}

function checkGuess() {
    let playerGuess = document.querySelector("#playerGuess");
    let feedback = document.querySelector("#feedback");
    
    // Get and validate input
    let guess = parseInt(playerGuess.value);
    
    if (isNaN(guess) || guess < 1 || guess > 99) {
        feedback.textContent = "Please enter a valid number between 1 and 99!";
        feedback.style.color = "#FFD700";
        feedback.style.backgroundColor = "rgba(255, 215, 0, 0.1)";
        playerGuess.value = "";
        playerGuess.focus();
        return;
    }
    
    attempts++;
    console.log("Attempts: " + attempts);
    console.log("Guess: " + guess);
    
    if (guess == randomNumber) {
        feedback.textContent = "You guessed it!";
        feedback.style.color = "#4CAF50";
        feedback.style.backgroundColor = "rgba(76, 175, 80, 0.2)";
        wins++;
        updateScoreDisplay();
        gameOver(true);
    } else {
        document.querySelector("#guesses").textContent += guess + " ";
        
        if (attempts >= MAX_ATTEMPTS) {
            feedback.textContent = "Sorry, you lost! The number was " + randomNumber;
            feedback.style.color = "#ff6b6b";
            feedback.style.backgroundColor = "rgba(255, 107, 107, 0.2)";
            losses++;
            updateScoreDisplay();
            gameOver(false);
        } else if (guess > randomNumber) {
            feedback.textContent = "Guess was too high!";
            feedback.style.color = "#4FC3F7";
            feedback.style.backgroundColor = "rgba(79, 195, 247, 0.1)";
        } else {
            feedback.textContent = "Guess was too low!";
            feedback.style.color = "#4FC3F7";
            feedback.style.backgroundColor = "rgba(79, 195, 247, 0.1)";
        }
        
        updateAttemptsDisplay();
        playerGuess.value = "";
        playerGuess.focus();
    }
}

function gameOver(won) {
    let guessBtn = document.querySelector("#guessBtn");
    let resetBtn = document.querySelector("#resetBtn");
    let playerGuess = document.querySelector("#playerGuess");
    
    guessBtn.style.display = "none";
    guessBtn.disabled = true;
    resetBtn.style.display = "inline";
    playerGuess.disabled = true;
    
    // Show final status
    updateAttemptsDisplay();
}

function updateAttemptsDisplay() {
    let attemptsLeft = MAX_ATTEMPTS - attempts;
    let attemptsSpan = document.querySelector("#attemptsLeft");
    attemptsSpan.textContent = Math.max(0, attemptsLeft);
    
    // Change color based on remaining attempts
    if (attemptsLeft === 0) {
        attemptsSpan.style.color = "#ff6b6b";
    } else if (attemptsLeft <= 3) {
        attemptsSpan.style.color = "#FFD700";
    } else {
        attemptsSpan.style.color = "#4CAF50";
    }
}

function updateScoreDisplay() {
    document.querySelector("#wins").textContent = wins;
    document.querySelector("#losses").textContent = losses;
}

// Add keyboard shortcut for reset (press 'R' key)
document.addEventListener("keydown", function(e) {
    if (e.key === "r" || e.key === "R") {
        let resetBtn = document.querySelector("#resetBtn");
        if (resetBtn.style.display !== "none") {
            resetGame();
        }
    }
});