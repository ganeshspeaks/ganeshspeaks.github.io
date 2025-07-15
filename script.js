const terminalBody = document.getElementById('terminal-body');
const commandInput = document.getElementById('command-input');

function createParticles() {
    const particles = document.getElementById('particles');
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particles.appendChild(particle);
    }
}

let commandHistory = [];
let historyIndex = -1;

const commands = {
    help: () => {
        return `<span class="success">Available Commands:</span>
<span class="info">════════════════════════════════════════════════════════════</span>
<span class="warning">help</span>              - Show this help message
<span class="warning">whoami</span>            - Display user information
<span class="warning">now</span>               - Show current activities
<span class="warning">skills --list</span>     - List technical skills
<span class="warning">ls ~/projects/</span> - Show project directories
<span class="warning">philosophy.txt</span>    - Display development philosophy
<span class="warning">contact</span> - Show contact information
<span class="warning">clear</span>             - Clear terminal screen
<span class="warning">exit</span>              - Show exit message
<span class="info">════════════════════════════════════════════════════════════</span>`;
    },
    
    whoami: () => {
        return `<span class="success">Ganesh Kumar</span> — I build what I believe in.
Break what I must. Learn what I love. Repeat.`;
    },
    
    now: () => {
        return `<span class="info">Current Activities:</span>
<span class="warning">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span class="highlight">•</span> Learning system design — not from tutorials, but by breaking & rebuilding systems
<span class="highlight">•</span> Exploring cyber security — because true control starts at the root
<span class="highlight">•</span> Writing code & poetry — both demand rhythm, depth, and clarity`;
    },
    
    'skills --list': () => {
        return `<span class="success">Technical Skills:</span>
<span class="warning">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span class="info">Languages       :</span> Python, Kotlin, Rust, Dart, JavaScript, Bash
<span class="info">Platforms       :</span> Android (Jetpack Compose), Web (Next.js), Linux (Ubuntu, ParrotOS, Tails, Arch)
<span class="info">Frameworks      :</span> Flutter, Firebase, Node.js, Tailwind, Git
<span class="info">Security Tools  :</span> VPNs, DNS, Fingerprint Defense, Linux Internals
<span class="info">Other Powers    :</span> Markdown, Shell scripting, Blogging, SEO, AI APIs, Digital Marketing, Video Editing`;
    },
    
    'ls ~/projects/': () => {
        return `<span class="success">Project Directories:</span>
<span class="warning">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span class="folder">📁 StudyFriend</span>   # AI-powered study app (flashcards, mindmaps, homework solver)
<span class="folder">📁 Somix</span>         # Secure Android browser built with Kotlin + Rust
<span class="folder">📁 Tark</span>          # Hindi programming language, beginner-friendly, open-source
<span class="folder">📁 BitOS</span>         # A digital world — part system, part sanctuary`;
    },
    
    'philosophy.txt': () => {
        return `<span class="success">Development Philosophy:</span>
<span class="warning">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span class="highlight">✓</span> Build fast — but only what matters
<span class="highlight">✓</span> Keep it lean — every extra line is a liability
<span class="highlight">✓</span> Go deep — surface-level is for tourists
<span class="highlight">✓</span> Respect privacy — I don't build spyware. I build shields`;
    },
    
    'contact': () => {
        return `<span class="success">Contact Information:</span>
<span class="warning">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span class="info">📬</span> <span class="link">ganesh@bitcraftproduction.com</span>
<span class="info">✊</span> Want to build something weird, useful, rebellious? Let's talk.`;
    },
    
    clear: () => {
        terminalBody.innerHTML = `
            <div class="output">
<span class="success">Terminal cleared</span>
<span class="info">Type 'help' to see available commands</span>
            </div>
            <div class="input-line">
                <span class="prompt">ganesh@bitcraft:~$</span>
                <input type="text" class="command-input" id="command-input" autocomplete="off" spellcheck="false">
                <span class="cursor"></span>
            </div>
        `;

        const newInput = document.getElementById('command-input');
        attachInputListeners(newInput);
        newInput.focus();
        return '';
    },
    
    exit: () => {
        return `<span class="success">Goodbye!</span>
<span class="warning">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
I'm not a developer who copies.
I'm a builder who remembers why we started.
And I'm just getting started...

<span class="info">Press F5 to restart terminal</span>`;
    }
};

function processCommand(command) {
    const cmd = command.trim().toLowerCase();
    
    if (commands[cmd]) {
        return commands[cmd]();
    } else if (cmd === '') {
        return '';
    } else {
        return `<span class="error">Command not found: ${command}</span>
<span class="info">Type 'help' to see available commands</span>`;
    }
}

function addOutput(text) {
    if (text === '') return;
    
    const output = document.createElement('div');
    output.className = 'output';
    output.innerHTML = text;
    
    const inputLine = document.querySelector('.input-line');
    terminalBody.insertBefore(output, inputLine);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function attachInputListeners(input) {
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = input.value;

            if (command.trim() !== '') {
                commandHistory.unshift(command);
                if (commandHistory.length > 50) {
                    commandHistory.pop();
                }
            }
            historyIndex = -1;
            
            addOutput(`<span class="prompt">ganesh@bitcraftproduction:~$</span> ${command}`);

            const result = processCommand(command);
            if (result !== '') {
                addOutput(result);
            }

            input.value = '';
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                input.value = commandHistory[historyIndex];
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                input.value = commandHistory[historyIndex];
            } else if (historyIndex === 0) {
                historyIndex = -1;
                input.value = '';
            }
        } else if (e.key === 'Tab') {
            e.preventDefault();
            const currentInput = input.value.toLowerCase();
            const availableCommands = Object.keys(commands);
            const matches = availableCommands.filter(cmd => cmd.startsWith(currentInput));
            
            if (matches.length === 1) {
                input.value = matches[0];
            } else if (matches.length > 1) {
                addOutput(`<span class="info">Available completions:</span> ${matches.join(', ')}`);
            }
        }
    });

    input.addEventListener('blur', () => {
        setTimeout(() => input.focus(), 0);
    });
}

attachInputListeners(commandInput);

createParticles();
commandInput.focus();

document.addEventListener('click', () => {
    const currentInput = document.getElementById('command-input');
    if (currentInput) {
        currentInput.focus();
    }
});

setTimeout(() => {
    addOutput(`<span class="success">System initialized successfully!</span>
<span class="info">All systems operational. Ready for input...</span>`);
}, 1000);