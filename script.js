const questions = [
    {
        question: "Which language is used to style web pages?",
        options: ["HTML", "CSS", "Java", "Python"],
        answer: 1
    },
    {
        question: "Which language makes web pages interactive?",
        options: ["CSS", "HTML", "JavaScript", "SQL"],
        answer: 2
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: ["<p>", "<a>", "<h1>", "<img>"],
        answer: 1
    },
    {
        question: "Which keyword declares a constant in JavaScript?",
        options: ["var", "let", "const", "static"],
        answer: 2
    },
    {
        question: "Which method adds an element to an array?",
        options: ["push()", "pop()", "shift()", "slice()"],
        answer: 0
    }
];

let currentQuestion = 0;
let userAnswers = new Array(questions.length).fill(null);

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");

function loadQuestion() {
    const q = questions[currentQuestion];

    questionElement.textContent =
        "Question " + (currentQuestion + 1) + ": " + q.question;

    optionsElement.innerHTML = "";

    q.options.forEach(function(option, index) {
        const button = document.createElement("button");

        button.textContent = option;
        button.className = "option";

        if (userAnswers[currentQuestion] === index) {
            button.classList.add("selected");
        }

        button.onclick = function() {
            userAnswers[currentQuestion] = index;
            loadQuestion();
        };

        optionsElement.appendChild(button);
    }

    document.getElementById("prevBtn").disabled =
        currentQuestion === 0;

    document.getElementById("nextBtn").disabled =
        currentQuestion === questions.length - 1;
}

document.getElementById("prevBtn").onclick = function() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
};

document.getElementById("nextBtn").onclick = function() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    }
};

document.getElementById("submitBtn").onclick = function() {
    let score = 0;

    questions.forEach(function(q, index) {
        if (userAnswers[index] === q.answer) {
            score++;
        }
    });

    quizElement.classList.add("hidden");
    resultElement.classList.remove("hidden");

    document.getElementById("score").textContent =
        "Your Score: " + score + " out of " + questions.length;
};

function restartQuiz() {
    currentQuestion = 0;
    userAnswers = new Array(questions.length).fill(null);

    resultElement.classList.add("hidden");
    quizElement.classList.remove("hidden");

    loadQuestion();
}

loadQuestion();
