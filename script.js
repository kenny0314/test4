document.addEventListener('DOMContentLoaded', () => {
  const quizData = [
    {
      question: "Which profession is most susceptible to automation due to its repetitive and predictable tasks?",
      choices: [
        "Data Entry Clerk",
        "Creative Director",
        "Clinical Psychologist",
        "Emergency Room Physician"
      ],
      answer: 0
    },
    {
      question: "Which job is least likely to be replaced by AI due to the need for emotional intelligence and human interaction?",
      choices: [
        "Telemarketer",
        "Kindergarten Teacher",
        "Accountant",
        "Paralegal"
      ],
      answer: 1
    },
    {
      question: "Which profession is at high risk of automation due to advancements in AI-driven legal research tools?",
      choices: [
        "Judge",
        "Legal Secretary",
        "Trial Lawyer",
        "Legal Research Analyst"
      ],
      answer: 3
    },
    {
      question: "Which job is considered safe from AI replacement due to the necessity of nuanced human judgment and ethical decision-making?",
      choices: [
        "Radiologist",
        "Ethics Professor",
        "Financial Analyst",
        "Technical Support Specialist"
      ],
      answer: 1
    },
    {
      question: "Which profession is most at risk due to AI's capabilities in pattern recognition and data analysis?",
      choices: [
        "Graphic Designer",
        "Data Analyst",
        "Construction Worker",
        "Social Worker"
      ],
      answer: 1
    }
  ];

  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 15;

  const splash = document.getElementById('splash');
  const startBtn = document.getElementById('startBtn');
  const quizScreen = document.getElementById('quiz');
  const resultScreen = document.getElementById('result');
  const questionEl = document.getElementById('question');
  const choicesEl = document.getElementById('choices');
  const timerEl = document.getElementById('time');
  const nextBtn = document.getElementById('next');
  const restartBtn = document.getElementById('restart');
  const backBtn = document.getElementById('backToStart');
  const scoreText = document.getElementById('scoreText');

  startBtn.addEventListener('click', () => {
    splash.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
  });

  restartBtn.addEventListener('click', () => {
    resetQuiz();
    quizScreen.classList.remove('hidden');
  });

  backBtn.addEventListener('click', () => {
    resetQuiz();
    splash.classList.remove('hidden');
  });

  nextBtn.addEventListener('click', () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  });

  function resetQuiz() {
    clearInterval(timer);
    currentQuestion = 0;
    score = 0;
    quizScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    nextBtn.disabled = true;
  }

  function startTimer() {
    timeLeft = 15;
    timerEl.textContent = timeLeft;
    clearInterval(timer);
    timer = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
      if (timeLeft <= 0) {
        clearInterval(timer);
        selectAnswer(null);
      }
    }, 1000);
  }

  function loadQuestion() {
    nextBtn.disabled = true;
    choicesEl.innerHTML = '';
    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    current.choices.forEach((choice, index) => {
      const btn = document.createElement('button');
      btn.textContent = choice;
      btn.addEventListener('click', () => selectAnswer(index));
      choicesEl.appendChild(btn);
    });
    startTimer();
  }

  function selectAnswer(selectedIndex) {
    clearInterval(timer);
    const correctIndex = quizData[currentQuestion].answer;
    Array.from(choicesEl.children).forEach((btn, index) => {
      btn.disabled = true;
      if (index === correctIndex) {
        btn.style.backgroundColor = '#0f0';
      } else if (index === selectedIndex) {
        btn.style.backgroundColor = '#f00';
      }
    });
    if (selectedIndex === correctIndex) {
      score++;
    }
    nextBtn.disabled = false;
  }

  function showResult() {
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    scoreText.textContent = `${score} / ${quizData.length}`;
  }
});
