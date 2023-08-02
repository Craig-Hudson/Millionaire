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
  console.log(question);
}

function getAnswers() {
  const correctAnswer = data.results[questionIndex].correct_answer;
  const incorrectAnswer = data.results[questionIndex].incorrect_answers;
  const answerButtons = document.querySelectorAll('.answer-button');
  const newAnswerArray = incorrectAnswer.concat(correctAnswer);
  shuffleAnswers(newAnswerArray);
  for (let i = 0; i < answerButtons.length; i++) {
    answerButtons[i].innerHTML = newAnswerArray[i];
    answerButtons[i].style.background = '';
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
  const sanitizedSelectedAnswer = sanitizeAnswer(selectedAnswer);
  const sanitizedCorrectAnswer = sanitizeAnswer(correctAnswer);

  if (sanitizedSelectedAnswer === sanitizedCorrectAnswer) {
    this.style.background = 'orange';
    const answerButtons = document.querySelectorAll('.answer-button');
    for (let j = 0; j < answerButtons.length; j++) {
      answerButtons[j].disabled = true;
    }
    incrementScore(score);
    setTimeout(nextQuestion, 1500);
  } else {
    this.style.background = 'red';

    // Display the background color of the correct answer
    const correctAnswerButtons = document.querySelectorAll('.answer-button');
    for (let j = 0; j < correctAnswerButtons.length; j++) {
      if (correctAnswerButtons[j].innerHTML === correctAnswer) {
        correctAnswerButtons[j].style.background = 'orange';
        break;
      }
    }
    const answerButtons = document.querySelectorAll('.answer-button');
    for (let j = 0; j < answerButtons.length; j++) {
      answerButtons[j].disabled = true;
    }
  }
}

// function to get the next question
function nextQuestion() {
  //increment question index when next question is called
  questionIndex++;
  if (questionIndex === 5) {
    // alert(`Quiz complete! Your score: ${score}/${data.results.length}`);
    callApi(mediumQuestions);
  } else if (questionIndex === 10) {
    callApi(hardQuestions);
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

// https://stackoverflow.com/questions/6555182/remove-all-special-characters-except-space-from-a-string-using-javascript
// code for some of this function was taken from the link above.
function sanitizeAnswer(answer) {
  // Replace HTML entities with their original characters
  const tempElement = document.createElement('div');
  tempElement.innerHTML = answer;
  const sanitizedAnswer = tempElement.textContent;
  
  // Remove any other special characters
  return sanitizedAnswer.replace(/[^\w\s]/gi, '');
}
// Call API for easy questions initially
callApi(easyQuestions);
