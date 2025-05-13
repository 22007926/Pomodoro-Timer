// Get references to the HTML elements we need to manipulate
const timerLabel = document.getElementById('timer-label');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const progressBar = document.querySelector('.progress-bar');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');

// Define the work and break durations in minutes
const workDuration = 25;
const breakDuration = 5;
let currentDuration = workDuration * 60; // Convert to seconds
let isWorkTime = true; // Flag to track if it's work or break time
let timerInterval; // Variable to hold the interval for the timer
let isRunning = false; // Flag to check if the timer is currently running

// Function to update the timer display
function updateDisplay() {
    const minutes = Math.floor(currentDuration / 60); // Calculate remaining minutes
    const seconds = currentDuration % 60; // Calculate remaining seconds

    minutesDisplay.textContent = String(minutes).padStart(2, '0'); // Display minutes with leading zero if needed
    secondsDisplay.textContent = String(seconds).padStart(2, '0'); // Display seconds with leading zero if needed

    // Update the progress bar
    const totalDuration = isWorkTime ? workDuration * 60 : breakDuration * 60;
    const progress = ((totalDuration - currentDuration) / totalDuration) * 100;
    progressBar.style.width = `${progress}%`;
}

// Function to start the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        startButton.textContent = 'Pause'; // Change button text to "Pause"

        timerInterval = setInterval(() => {
            currentDuration--; // Decrement the timer

            if (currentDuration < 0) {
                // Timer has reached zero, switch between work and break
                clearInterval(timerInterval);
                isWorkTime = !isWorkTime;
                currentDuration = (isWorkTime ? workDuration : breakDuration) * 60;
                timerLabel.textContent = isWorkTime ? 'Work Time' : 'Break Time';
                updateDisplay(); // Update display for the new session
                startTimer(); // Automatically start the next session
            } else {
                updateDisplay(); // Update the display every second
            }
        }, 1000); // Run the update every 1000 milliseconds (1 second)
    } else {
        // Pause the timer
        clearInterval(timerInterval);
        isRunning = false;
        startButton.textContent = 'Start'; // Change button text back to "Start"
    }
}

// Function to reset the timer
function resetTimer() {
    clearInterval(timerInterval); // Clear any running interval
    isRunning = false; // Set the running state to false
    startButton.textContent = 'Start'; // Reset button text
    isWorkTime = true; // Reset to work time
    currentDuration = workDuration * 60; // Reset the duration
    timerLabel.textContent = 'Work Time'; // Reset the label
    updateDisplay(); // Update the display to the initial work time
    progressBar.style.width = '0%'; // Reset the progress bar
}

// Add event listeners to the buttons
startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

// Initial display update when the page loads
updateDisplay();