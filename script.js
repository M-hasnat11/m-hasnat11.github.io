// --- 1. KONAMI CODE EASTER EGG ---
const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let cursor = 0;

document.addEventListener('keydown', (e) => {
    // Konami Logic
    if (e.key === code[cursor]) {
        cursor++;
        if (cursor === code.length) {
            activateEasterEgg();
            cursor = 0;
        }
    } else {
        cursor = 0;
    }

    // NEW: Close Terminal on 'Esc' key
    if (e.key === 'Escape' && isOpen) {
        toggleTerminal();
    }
});

function activateEasterEgg() {
    // Visual feedback: Shake effect
    document.body.classList.add('glitch-active');
    
    // Unlock secret message in terminal window
    const output = document.getElementById('term-output');
    const secretMsg = document.createElement('div');
    secretMsg.style.color = 'var(--hacker-alert)';
    secretMsg.innerHTML = ">>> SYSTEM OVERRIDE: ROOT ACCESS GRANTED <<<";
    output.appendChild(secretMsg);
    
    // Auto-scroll to bottom so user sees the message
    output.scrollTop = output.scrollHeight;
    
    // Remove shake effect after 0.5s
    setTimeout(() => {
        document.body.classList.remove('glitch-active');
    }, 500);
}


// --- 2. INTERACTIVE TERMINAL ---
const termToggle = document.getElementById('term-toggle');
const termWindow = document.getElementById('terminal-window');
const termInput = document.getElementById('term-input');
const termOutput = document.getElementById('term-output');
let isOpen = false;

// Function to open/close the terminal window
function toggleTerminal() {
    isOpen = !isOpen;
    termWindow.style.display = isOpen ? 'flex' : 'none';
    if(isOpen) {
        termInput.focus(); // Auto-focus cursor when opened
    }
}

// Click event on the floating icon
termToggle.addEventListener('click', toggleTerminal);

// Event listener for typing in the terminal
termInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const command = termInput.value.trim().toLowerCase();
        processCommand(command);
        termInput.value = ''; // Clear input after pressing Enter
    }
});

// Logic to handle commands
function processCommand(cmd) {
    // 1. Echo the command the user typed (gray color)
    appendOutput(`<span style="color:gray;">guest@hasnantest:~$ ${cmd}</span>`);

    // 2. Switch case to find matching command
    switch(cmd) {
        case 'help':
            appendOutput("Available commands: <br>- help: Show this list<br>- about: Who am I?<br>- projects: List projects<br>- skills: Show stack<br>- clear: Clear screen<br>- secret: ??");
            break;
        case 'about':
            appendOutput("I am a Software Engineer focused on scalable architectures, AI research, and intelligent systems.");
            break;
        case 'projects':
            appendOutput("1. AI-Powered Chatbot (RAG)<br>2. CNN Image Classifier");
            break;
        case 'skills':
            appendOutput("Python, FastAPI, Docker, PyTorch, LangChain, SQL, AWS...");
            break;
        case 'clear':
            termOutput.innerHTML = ''; // Wipes the terminal screen
            break;
        case 'secret':
            appendOutput("<span style='color:var(--hacker-alert)'>ERROR: PERMISSION DENIED.</span><br>Hint: Try a classic key sequence on your keyboard...");
            break;
        case '':
            break; // Do nothing if empty
        default:
            appendOutput(`<span style='color:var(--hacker-alert)'>Command not found: ${cmd}</span>`);
    }
    
    // Always scroll to bottom on new output
    termOutput.scrollTop = termOutput.scrollHeight;
}

// Helper function to append HTML to the terminal
function appendOutput(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    termOutput.appendChild(div);
}


// --- 3. LIVE CLOCK IN TERMINAL HEADER ---
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    const clockElement = document.getElementById('term-clock');
    if (clockElement) {
        clockElement.textContent = timeString;
    }
}

// Update clock every second
setInterval(updateClock, 1000); 
// Run immediately on load
updateClock();