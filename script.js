const startBtn = document.getElementById('start-btn');
const display = document.getElementById('display');
const result = document.getElementById('result');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if (window.SpeechRecognition) {
    const recognition = new window.SpeechRecognition();
    recognition.lang = 'en-US';

    startBtn.onclick = () => {
        recognition.start();
    };

    recognition.onresult = function(event) {
        const transcript = event.results.transcript;
        display.textContent = "Expression: " + transcript;

        try {
            // Replace spoken operator words with JavaScript equivalents
            let expr = transcript
                .replace(/plus/gi, '+')
                .replace(/minus/gi, '-')
                .replace(/times/gi, '*')
                .replace(/multiplied by/gi, '*')
                .replace(/divided by/gi, '/')
                .replace(/over/gi, '/')
                .replace(/into/gi, '*');

            // Remove other non-numeric words/phrases if you want to handle only basic arithmetic
            expr = expr.replace(/[^\d+\-*/().]/g, "");

            const evalResult = eval(expr);
            result.textContent = "Result: " + evalResult;
        } catch (e) {
            result.textContent = "Invalid expression!";
        }
    };

    recognition.onerror = function(event) {
        result.textContent = "Error: " + event.error;
    };
} else {
    display.textContent = "Speech Recognition not supported in this browser.";
    }
