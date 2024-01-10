let currentQuestionIndex = 0;
let score = 0;
let timer;
let currentCategory;

const categories = {
    general: [
        {
            question: 'What is the capital of France?',
            options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
            correctAnswer: 'Paris'
        },
        {
            question: 'Who is the president of the United States?',
            options: ['Donald Trump', 'Barack Obama', 'George Washington', 'Joe Biden'],
            correctAnswer: 'Joe Biden'
        },
        {
            category: "generalKnowledge",
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: "Mars"
        },
        {
            category: "generalKnowledge",
            question: "Who wrote 'Romeo and Juliet'?",
            options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
            correctAnswer: "William Shakespeare"
        },
        {
            category: "generalKnowledge",
            question: "What is the largest mammal in the world?",
            options: ["Blue Whale","Elephant",  "Giraffe", "Hippopotamus"],
            correctAnswer: "Blue Whale"
        },
        // Add more general knowledge questions
    ],
    computer: [
        {
            question: 'What does HTML stand for?',
            options: ['Hyperlink and Text Markup Language', 'Hyper Text Markup Language', 'High Level Markup Language', 'Hyper Transfer Markup Language'],
            correctAnswer: 'Hyper Text Markup Language'
        },
        {
            question: 'What is the purpose of CSS?',
            options: ['To structure content', 'To control presentation', 'To manage database', 'To handle server-side logic'],
            correctAnswer: 'To control presentation'
          },
          {
            question: 'What programming language does Node.js use?',
            options: ['Java', 'JavaScript', 'Python', 'C++'],
            correctAnswer: 'JavaScript'
          },
          {
            question: 'Which data structure follows the Last In, First Out (LIFO) principle?',
            options: ['Queue', 'Stack', 'Linked List', 'Tree'],
            correctAnswer: 'Stack'
          },
        
        // Add more computer science questions
    ],
    biology :[
        {
            question: 'What is the powerhouse of the cell?',
            options: ['Nucleus', 'Mitochondria', 'Endoplasmic Reticulum', 'Golgi Apparatus'],
            correctAnswer: 'Mitochondria'
        },
        {
            question: 'What is the largest organ in the human body?',
            options: ['Heart', 'Brain', 'Skin', 'Liver'],
            correctAnswer: 'Skin'
        },
        {
            question: 'Which gas do plants absorb from the atmosphere during photosynthesis?',
            options: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Hydrogen'],
            correctAnswer: 'Carbon Dioxide'
        },
        {
            question: 'What is the function of red blood cells?',
            options: ['Transporting oxygen', 'Digesting food', 'Producing antibodies', 'Storing bile'],
            correctAnswer: 'Transporting oxygen'
        },
        {
            question: 'What is the primary function of the kidneys?',
            options: ['Digestion', 'Circulation', 'Excretion', 'Respiration'],
            correctAnswer: 'Excretion'
        },
    ],
};

function startQuiz(category) {
    currentCategory = category;
    const quizPage = document.getElementById('quiz-page');
    const homePage = document.getElementById('home-page');
    homePage.style.display = 'none';
    quizPage.style.display = 'block';

    const categoryQuestions = categories[category];
    startTimer(categoryQuestions.length);
    loadQuestion(categoryQuestions[currentQuestionIndex]);
}

function loadQuestion(question) {
    const quizPage = document.getElementById('quiz-page');
    optionsHTML = question.options.map((option, index) => `<input type="radio" name="answer" value="${option}" id="option${index}"><label for="option${index}">${option}</label><br>`).join('');


    quizPage.innerHTML = `
        <h2>${question.question}</h2>
        ${optionsHTML}
        <p>Timer: <span id="timer">10</span> seconds</p>
        <button onclick="submitAnswer()">Submit Answer</button>
    `;
}

function submitAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption  ) {
        alert('Please select an option');
        return;
    }

    const currentQuestion = categories[currentCategory][currentQuestionIndex];
    if (selectedOption.value === currentQuestion.correctAnswer) {
        score+=10;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < categories[currentCategory].length) {
        loadQuestion(categories[currentCategory][currentQuestionIndex]);
    } else {
        showResult();
    }
}

function startTimer(totalQuestions) {
    let timeRemaining = 10 * totalQuestions;
    timer = setInterval(function() {
        document.getElementById('timer').innerText = timeRemaining;
        timeRemaining--;

        if (timeRemaining < 0 ) {
            submitAnswer();
        }
    }, 1000);
}

function showResult() {
    const resultPage = document.getElementById('result-page');
    const quizPage = document.getElementById('quiz-page');

    quizPage.style.display = 'none';
    resultPage.style.display = 'block';

    resultPage.innerHTML = `<h2>Your Result:</h2><p>You scored ${score} out of ${categories[currentCategory].length*10}!</p>
    <button onclick="goToHome()">Home</button>`;
     ;
}

function goToHome() {
    const homePage = document.getElementById('home-page');
    const resultPage = document.getElementById('result-page');

    resultPage.style.display = 'none';
    homePage.style.display = 'block';

    currentQuestionIndex = 0;
    score = 0;
    clearInterval(timer); // Stop the timer
}