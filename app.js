// ==========================================
// 1. QUICK NOTES AUTOSAVE LOGIC
// ==========================================
const scratchpad = document.getElementById('scratchpad');

// Load saved notes when page opens
scratchpad.value = localStorage.getItem('focusflow_notes') || '';

// Save text every time the user types a key
scratchpad.addEventListener('input', () => {
    localStorage.setItem('focusflow_notes', scratchpad.value);
});


// ==========================================
// 2. POMODORO TIMER LOGIC
// ==========================================
let timeLeft = 25 * 60; // 25 minutes in seconds
let timerId = null;

const timerDisplay = document.getElementById('timer');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    // padStart ensures "05" instead of "5"
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

startBtn.addEventListener('click', () => {
    if (timerId !== null) return; // Already running
    
    timerId = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            clearInterval(timerId);
            alert("Time's up! Take a quick break.");
            timeLeft = 25 * 60;
            updateDisplay();
        }
    }, 1000);
});

pauseBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60;
    updateDisplay();
});


// ==========================================
// 3. TO-DO LIST LOGIC
// ==========================================
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

addTaskBtn.addEventListener('click', () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    // Create list item element
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
        <span>${taskText}</span>
        <button class="btn danger" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">X</button>
    `;

    // Make the delete button work
    li.querySelector('button').addEventListener('click', () => {
        li.remove();
    });

    taskList.appendChild(li);
    taskInput.value = ''; // clear input
});
