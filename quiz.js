document.addEventListener('DOMContentLoaded', () => {
    const startQuizBtn = document.getElementById('startQuizBtn');
    const quizIntro = document.querySelector('.quiz-intro');
    const quizContainer = document.querySelector('.quiz-container');
    const questionContainer = document.getElementById('questionContainer');
    const nextQuestionBtn = document.getElementById('nextQuestionBtn');
    const progressBar = document.getElementById('progressBar');
    const quizComplete = document.querySelector('.quiz-complete');
    const finalScore = document.getElementById('finalScore');
    const feedbackForm = document.getElementById('feedbackForm');

    const questions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "London", "Berlin", "Madrid"],
            correct: "Paris"
        },
        {
            question: "Kto je najväčší šéf na svete?",
            choices: ["Adam", "Jožo", "Tóno", "Roman"],
            correct: "Adam"
        },
    ];

    let currentQuestionIndex = 0;
    let score = 0;

    function showQuestion() {
        questionContainer.style.opacity = '0';
        setTimeout(() => {
            questionContainer.innerHTML = '';
            const questionObj = questions[currentQuestionIndex];
            const questionElement = document.createElement('h2');
            questionElement.textContent = questionObj.question;
            questionContainer.appendChild(questionElement);

            questionObj.choices.forEach((choice, index) => {
                const choiceInput = document.createElement('input');
                choiceInput.type = 'radio';
                choiceInput.name = 'quizChoice';
                choiceInput.value = choice;
                choiceInput.id = `choice-${index}`;

                const choiceLabel = document.createElement('label');
                choiceLabel.classList.add('d-block', 'py-2');
                choiceLabel.setAttribute('for', `choice-${index}`);
                choiceLabel.textContent = choice;

                questionContainer.appendChild(choiceInput);
                questionContainer.appendChild(choiceLabel);
            });

            questionContainer.style.opacity = '1';
        }, 300);
        nextQuestionBtn.style.display = 'block';
    }

    function updateProgress() {
        const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
        progressBar.style.width = progressPercentage + '%';
        progressBar.setAttribute('aria-valuenow', progressPercentage);
    }

    startQuizBtn.addEventListener('click', () => {
        quizIntro.style.display = 'none';
        quizContainer.style.display = 'block';
        quizContainer.style.opacity = '0';
        setTimeout(() => {
            quizContainer.style.opacity = '1';
            showQuestion();
            updateProgress();
        }, 100);
    });

    nextQuestionBtn.addEventListener('click', () => {
        const selectedChoice = document.querySelector('input[name="quizChoice"]:checked');
        if (!selectedChoice) {
            alert('Please select an answer!');
            return;
        }

        if (selectedChoice.value === questions[currentQuestionIndex].correct) {
            score++;
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            showQuestion();
            updateProgress();
        } else {
            quizContainer.style.display = 'none';
            finalScore.innerHTML = `You scored ${score} out of ${questions.length}`;
            quizComplete.style.display = 'block';
        }
    });

    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userEmail = document.getElementById('userEmail').value;
        const userQuestion = document.getElementById('userQuestion').value;

        if (!userEmail || !userQuestion) {
            alert('Please fill in both fields!');
            return;
        }

        // Simulate sending email - replace with actual email sending mechanism
        alert(`Email sent to ${userEmail} with question: ${userQuestion}`);

        feedbackForm.reset();
    });
});
