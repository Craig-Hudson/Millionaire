'use strict';
let userName; // declare the global userName variable

window.onload = function () {
  const quizArea = document.getElementById('quiz');
  const user = document.getElementById('name-input');
  const inputNameArea = document.querySelector('.input-name-section');
  const submitButton = document.getElementById('submit-button');
  submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    if (user.value !== '' && user.value.length >= 4 && user.value.length <= 12) {
      quizArea.classList.remove('hidden');
      inputNameArea.style.display = 'none'
      userName = user.value; // assign user input to the global userName variable

      console.log(userName);
    } else {
      alert('Please enter a name between 4-12 characters long.')
    }
  });
};

console.log(userName);
// API link for question 1-5
const easyQuestions = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple';
// API link for question 6-10
const mediumQuestions = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple';
// API link for question 11-15
const hardQuestions = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=hard&type=multiple';

// Global variables
// const mostRecentHighScores = JSON.parse(localStorage.getItem('highScores')) || [];
let data = {};
let score = 0;
let questionIndex = 0;
// money index to start at minus 1
let moneyIndex = -1;
let questionNumber = 1

async function callApi (urlApi) {
  try {
    const response = await fetch(urlApi);
    if (response.status >= 200 && response.status <= 299) {
      data = await response.json();
      if (data.results && data.results.length > 0) {
        questionIndex = 0; // Reset question index to 0 when new data is fetched
        getQuestion(); // call get question function to display new questions
        getAnswers(); // call get answers function to grab new answers
      } // else {
      //   console.log('No questions found in the API response.');
      // }
    } else {
      console.log('Error fetching data from the API.');
    }
  } catch (error) {
    console.error(error);
  }
}

function getQuestion () {
  const question = document.getElementById('question');
  if (questionIndex < data.results.length) {
    question.innerHTML = data.results[questionIndex].question;
  }
  getQuestionNumber();
}

function getQuestionNumber () {
  const questionNumberId = document.getElementById('question-number');
  questionNumberId.innerText = questionNumber;
  questionNumber++
}

function getAnswers () {
  const correctAnswer = data.results[questionIndex].correct_answer;
  console.log(correctAnswer);
  console.log(data.results);
  // console.log(questionIndex);
  console.log(score);
  console.log(moneyIndex);
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

function shuffleAnswers (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function checkAnswer () {
  const selectedAnswer = this.innerHTML;
  const correctAnswer = data.results[questionIndex].correct_answer;
  const sanitizedSelectedAnswer = sanitizeAnswer(selectedAnswer);
  const sanitizedCorrectAnswer = sanitizeAnswer(correctAnswer);
  // Checks if the selected answer by the user is the same as the correct answer in the api
  if (sanitizedSelectedAnswer === sanitizedCorrectAnswer) {
    this.style.background = 'orange';
    const answerButtons = document.querySelectorAll('.answer-button');
    // disable buttons so user can not click anymore
    for (let j = 0; j < answerButtons.length; j++) {
      answerButtons[j].disabled = true;
    }
    incrementMoneyIndex(moneyIndex);
    incrementScore(score);
    setTimeout(nextQuestion, 1500);
  } else {
    this.style.background = 'red';

    // Display the background color of the correct answer when user selects wrong answer
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
    setTimeout(endQuiz, 1000);
  }
}

// function to get the next question
function nextQuestion () {
  // increment question index when next question is called
  questionIndex++;
  const answerButtons = document.querySelectorAll('.answer-button');
  answerButtons.forEach((button) => {
    button.style.visibility = 'visible'; // Set visibility back to 'visible' for all answer buttons
  });
  if (questionIndex < data.results.length) {
    // Continue to the next question if available
    getQuestion();
    getAnswers();
  } else if (questionIndex === data.results.length && score === 5) {
    //  Call medium question api when user reaches question 5
    callApi(mediumQuestions);
  } else if (questionIndex === data.results.length && score === 10) {
  //  Call hard question api when use reaches question 10
    callApi(hardQuestions)
  } else if (score === 15) {
    alert('Congratulation you won £1,000,000');
  }
}

function incrementScore () {
  // incrementScore
  score++;
  // get .score class
  const scoreList = document.querySelectorAll('.score');
  // to get current index
  const currentScoreIndex = scoreList.length - score;
  // iterate in reverse to start at last element in currentScore class
  for (let i = scoreList.length - 1; i >= 0; i--) {
    const scoreItem = scoreList[i];
    scoreItem.classList.remove('current-score');

    if (i === currentScoreIndex) {
      scoreItem.classList.add('current-score');
      break; // exit the loop once we find the current score
    }
  }
}

// https://stackoverflow.com/questions/6555182/remove-all-special-characters-except-space-from-a-string-using-javascript
// code for some of this function was taken from the link above.
function sanitizeAnswer (answer) {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = answer;
  return tempElement.textContent.replace(/[\u2018\u2019]/g, "'");
}

// grab
const askTheAudience = document.getElementById('ask-the-audience');
askTheAudience.addEventListener('click', handleAskTheAudience);

function handleAskTheAudience (event) {
  const correctAnswer = data.results[questionIndex].correct_answer;
  const sanitizedCorrectAnswer = sanitizeAnswer(correctAnswer);
  const incorrectAnswers = data.results[questionIndex].incorrect_answers;
  const sanitizedIncorrectAnswers = sanitizeAnswer(getRandomIndex(incorrectAnswers));
  if (questionIndex >= 0 && score < 5) {
    alert(`The correct answer is ${sanitizedCorrectAnswer}`);
  } else if (questionIndex >= 0 && score >= 5) {
    alert(`The answer is either ${sanitizedCorrectAnswer}/ or ${sanitizedIncorrectAnswers}`)
  }

  askTheAudience.disabled = true; // Disable the button
  askTheAudience.removeEventListener('click', handleAskTheAudience); // Remove the event listener
}

function getRandomIndex (arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

let fiftyFiftyUsed = false;
const fiftyFifty = document.getElementById('fifty-fifty');
fiftyFifty.addEventListener('click', function () {
  if (!fiftyFiftyUsed) {
    const answerButtons = document.querySelectorAll('.answer-button');
    const incorrectAnswers = data.results[questionIndex].incorrect_answers;
    const sliceIncorrectAnswers = incorrectAnswers.slice(0, 2);
    console.log(sliceIncorrectAnswers);
    answerButtons.forEach((button) => {
      if (sliceIncorrectAnswers.includes(button.textContent)) {
        button.style.visibility = 'hidden';
      }
      fiftyFiftyUsed = true; // to indicate the 50/50 has been used
      fiftyFifty.disabled = true; // disable 50/50 from being used after the user has used it once.
    });
  }
});

let PhoneAFriendUsed = false;
const PhoneAFriend = document.getElementById('phone-a-friend');
PhoneAFriend.addEventListener('click', function () {
  if (!PhoneAFriendUsed) {
    const correctAnswer = data.results[questionIndex].correct_answer;
    const incorrectAnswers = data.results[questionIndex].incorrect_answers;
    const sanitizedCorrectAnswer = sanitizeAnswer(correctAnswer);
    const sanitizedIncorrectAnswer = sanitizeAnswer(getRandomIndex(incorrectAnswers));
    const incorrectAnswerArray = [...incorrectAnswers];
    const correctAnswerArray = [correctAnswer];
    const concatAnswerArray = incorrectAnswerArray.concat(correctAnswerArray);
    const oneSanitizedConcatAnswer = sanitizeAnswer(getRandomIndex(concatAnswerArray));
    if (questionIndex >= 0 && score < 5) {
      alert(`Hi ${userName}, I am 100% sure the answer is ${sanitizedCorrectAnswer}`);
    } else if (questionIndex >= 0 && score >= 5 && score < 10) {
      alert(`Hi Craig I am only 50% sure on this one. I think it's either ${sanitizedCorrectAnswer} or ${sanitizedIncorrectAnswer}`);
    } else if (questionIndex >= 0 && score >= 10) {
      alert(`Hi ${userName} I am really not sure on this one, if I'd have to choose one I'd choose ${oneSanitizedConcatAnswer}`);
    }
  }
  PhoneAFriendUsed = true; // disables the use of the phone a friend lifeline once the user has used it once.
})

function incrementMoneyIndex () {
  moneyIndex++
}

const bank = document.getElementById('bank')
bank.addEventListener('click', bankMoney);

function bankMoney () {
  const moneyList = document.querySelectorAll('.money');
  const reverseMoneyList = [...moneyList].reverse();
  if (moneyIndex >= 0 && moneyIndex < reverseMoneyList.length) {
    // Confirm the action with the user before proceeding
    if (confirmAction()) {
      // const money = reverseMoneyList[moneyIndex].innerHTML;
      setTimeout(endQuiz, 1500)
    }
  } else {
    // bank.removeEventListener('click', bankMoney);
    bank.disabled = true;
  }
}

function confirmAction () {
  const confirmation = confirm('Are you sure you want to proceed?')
  return confirmation;
}

// https://www.youtube.com/watch?v=DFhmNLKwwGw&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=9
// tutorial video above and made my own adjustments
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
function setHighScore (name, score) {
  const highScoreObject = {
    userName: name,
    score
  };

  highScores.push(highScoreObject);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  console.log(highScores);
}

function endQuiz () {
  const hideQuiz = document.getElementById('quiz');
  const endGameArea = document.getElementById('end-game-area');

  if (hideQuiz && endGameArea) {
    hideQuiz.classList.add('hidden');
    endGameArea.style.display = 'flex';
  }
  const nameInput = document.getElementById('name-input');
  const userName = nameInput.value;
  const moneyList = document.querySelectorAll('.money');
  const reverseMoneyList = [...moneyList].reverse();
  const highScore = reverseMoneyList[moneyIndex].innerHTML;
  console.log(highScore, userName);
  setHighScore(userName, highScore);
  displayQuizMessage();
  
}

// function to adjust the display of how much the user won, and username used.
function displayQuizMessage () {
  const moneyList = document.querySelectorAll('.money');
  const reverseMoneyList = [...moneyList].reverse();
  const displayMoneyWon = reverseMoneyList[moneyIndex].innerHTML;
  const showUserMoney = document.getElementById('show-users-score')
  const getUserName = document.getElementById('users-name');
  getUserName.innerHTML = `${userName}`
  showUserMoney.innerHTML = `${displayMoneyWon}`;
}


const playAgain = document.querySelector('.play-again');
const returnHome = document.querySelector('.return-home')
document.addEventListener('click', function (event) {
  if (event.target === playAgain) {
    window.location.href = '/quiz.html';
  } else if (event.target === returnHome) {
    window.location.href = '/index.html'
  }
})
// Call endQuiz() when the quiz is over

// Call API for easy questions initially
callApi(easyQuestions);
