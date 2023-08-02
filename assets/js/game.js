// API link for question 1-5
const easyQuestions = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple';
// API link for question 6-10
const mediumQuestions = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple';
// API link for question 11-15
const hardQuestions = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=hard&type=multiple';
let data = {};
let score = 0;
let questionIndex = 0;

async function callApi(urlApi) {
  try {
    const response = await fetch(urlApi);
    if (response.status >= 200 && response.status <= 299) {
      data = await response.json();
      getQuestion();
      getAnswers();
       
    } else {
      console.log('error');
    }
  } catch (error) {
    console.error(error);
  }
  console.log(data.results);
}
function getQuestion() {
  const question = document.getElementById('question').innerHTML = data.results[questionIndex].question;
}
function getAnswers() {
  const correctAnswer = data.results[questionIndex].correct_answer;
  const incorrectAnswer = data.results[questionIndex].incorrect_answers;
  const answerButtons = document.querySelectorAll('.answer-button');
  const newAnswerArray = incorrectAnswer.concat(correctAnswer);
  shuffleAnswers(newAnswerArray);
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].innerHTML = newAnswerArray[i];
    answerButtons[i].style.backgroundColor = '';
    answerButtons[i].disabled = false;
    // Remove all previous event listeners to prevent duplicate event binding
    answerButtons[i].removeEventListener('click', checkAnswer);
    // Bind the event listener again for the new question
    answerButtons[i].addEventListener('click', checkAnswer);
  }
}
function shuffleAnswers(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function checkAnswer() {
  const selectedAnswer = this.innerHTML;
  const correctAnswer = data.results[questionIndex].correct_answer;
  if (selectedAnswer === correctAnswer) {
    this.style.backgroundColor = 'orange';
    const answerButtons = document.querySelectorAll('.answer-button');
    for (let j = 0; j < answerButtons.length; j++) {
      answerButtons[j].disabled = true;
    }
    incrementScore(score);
    setTimeout(nextQuestion, 1000);
    
    
  } else {
    this.style.backgroundColor = 'red';
    const answerButtons = document.querySelectorAll('.answer-button');
    for (let j = 0; j < answerButtons.length; j++) {
      answerButtons[j].disabled = true;
    }
  }
  
}
function nextQuestion() {
  questionIndex++;
  if (questionIndex >= data.results.length) {
    alert(`Quiz complete! Your score: ${score}/${data.results.length}`);
    return;
  }
  getQuestion();
  getAnswers();
  
}

function incrementScore() {
  // incrementScore
  score++;
  // get .score class
  let scoreList = document.querySelectorAll('.score');
  // to get current index
  let currentScoreIndex = scoreList.length - score;
  // iterate in reverse to start at last element in currentScore class
  for (let i = scoreList.length - 1; i >= 0; i--) {
    let scoreItem = scoreList[i];
    scoreItem.classList.remove('current-score');
    
    if (i === currentScoreIndex) {
      scoreItem.classList.add('current-score');
      break; // exit the loop once we find the current score
    }
  }
}

// Call API for easy questions initially
callApi(easyQuestions);