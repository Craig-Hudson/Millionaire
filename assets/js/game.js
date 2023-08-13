// Global variables
let data = {};
let score = 0;
let scoreMobile = 0;
let questionIndex = 0;
// money index to start at minus 1
let moneyIndex = -1;
let questionNumber = 1;
let userName; // declare the global userName variable

document.addEventListener('DOMContentLoaded', function () {
  const quizArea = document.getElementById('quiz');
  const user = document.getElementById('name-input');
  const inputNameArea = document.querySelector('.input-name-section');
  const submitButton = document.getElementById('submit-button');
  const sidePanel = document.querySelector('.side-panel');
  const sidePanelToggle = document.getElementById('side-panel-toggle');
  const scoreWrapperMobile = document.querySelector('.score-wrapper-mobile');
  const contentMain = document.querySelector('.content.main');
  const inputNameSection = document.querySelector('.input-name-section');
  submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    if (user.value !== '' && user.value.length >= 4 && user.value.length <= 12) {
      quizArea.classList.remove('hidden');
      inputNameArea.style.display = 'none';
      sidePanel.classList.remove('hidden');
      userName = user.value; // assign user input to the global userName variable

      console.log(userName);
    } else {
      alert('Please enter a name between 4-12 characters long.');
    }
  });

  sidePanelToggle.addEventListener('click', function () {
    scoreWrapperMobile.classList.toggle('side-panel-open');
    scoreWrapperMobile.classList.toggle('side-panel-closed');
    contentMain.classList.toggle('hidden');
  });

  // Hide the side panel toggle when the user is in the input name section
  if (inputNameSection) {
    sidePanel.classList.add('hidden');
  }
  
});
console.log(userName);
// API link for question 1-5
const easyQuestions = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple';
// API link for question 6-10
const mediumQuestions = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple';
// API link for question 11-15
const hardQuestions = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=hard&type=multiple';



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
  questionNumber++;
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
    // openScoresMobile();
    if (window.innerWidth <= 800) {
      incrementScoreMobile();
    } else {
      incrementScore();
    }
    incrementMoneyIndex();
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
    console.log('score', score, 'score mobile', scoreMobile)
    console.log('moneyindex', moneyIndex)

    moneyIndex = determineMoneyIndex(score, scoreMobile); // 
    // displayQuizMessageNoMoney()
    
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
  } else if ((questionIndex === data.results.length) && (score === 5 || scoreMobile === 5)) {
    //  Call medium question api when user reaches question 5
    callApi(mediumQuestions);
  } else if ((questionIndex === data.results.length) && (score === 10 || scoreMobile === 10)) {
  //  Call hard question api when use reaches question 10
    callApi(hardQuestions);
  } else if (score === 15 || scoreMobile === 15) {
    endQuiz();
  }
}

function incrementScore () {
  // incrementScore
  score++;
  // function to display users save haven / minimum amount of money won
  safeHaven();
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

function incrementScoreMobile () {
  if (window.innerWidth <= 800) {
    // incrementScore
    scoreMobile++;
    // function to display users save haven / minimum amount of money won
    safeHaven();
    // get .score-mobile class in the mobile scores section
    const scoreListMobile = document.querySelectorAll('.quiz-scores-mobile .score-mobile');
    // to get current index
    const currentScoreIndex = scoreListMobile.length - scoreMobile;
    // iterate in reverse to start at the last element in the currentScore class
    for (let i = scoreListMobile.length - 1; i >= 0; i--) {
      const scoreItem = scoreListMobile[i];
      scoreItem.classList.remove('current-score');

      if (i === currentScoreIndex) {
        scoreItem.classList.add('current-score');
        break; // exit the loop once we find the current score
      }
    }
  }
}

function safeHaven () {
  const scoresDesktopReversed = Array.from(document.querySelectorAll('.score')).reverse();
  const scoreMobileReverse = Array.from(document.querySelectorAll('.score-mobile')).reverse();
  console.log('Scores Desktop Reversed:', scoresDesktopReversed);
  console.log('Score:', score);
  console.log('Score Mobile:', scoreMobile);

  // Check if the user's score is 6 and there are at least 5 elements in the scoresDesktopReversed array
  if ((score >= 5 && score < 10 ) || (scoreMobile >= 5 && scoreMobile < 10)) {
    const targetElement5 = scoresDesktopReversed[4];
    const targetElementMobile5 = scoreMobileReverse[4];
    console.log('Target Element:', targetElementMobile5);
    console.log('mobile score', scoreMobile);
    targetElement5.classList.add('green');
    targetElementMobile5.classList.add('green');
  } else if (score >= 10 || scoreMobile >= 10) {
    const targetElement5 = scoresDesktopReversed[4];
    const targetElementMobile5 = scoreMobileReverse[4];
    targetElement5.classList.remove('green');
    targetElementMobile5.classList.remove('green');
    const targetElement10 = scoresDesktopReversed[9];
    const targetElementMobile10 = scoreMobileReverse[9];
    targetElement10.classList.add('green');
    targetElementMobile10.classList.add('green');
  }
}

// https://stackoverflow.com/questions/6555182/remove-all-special-characters-except-space-from-a-string-using-javascript
// code for some of this function was taken from the link above.
function sanitizeAnswer (answer) {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = answer;
  return tempElement.textContent.replace(/[\u2018\u2019]/g, "'");
}


const askTheAudience = document.querySelectorAll('.audience');
askTheAudience.forEach(element => {
  element.addEventListener('click', handleAskTheAudience);
});

function handleAskTheAudience () {
  const correctAnswer = data.results[questionIndex].correct_answer;
  const sanitizedCorrectAnswer = sanitizeAnswer(correctAnswer);
  const incorrectAnswers = data.results[questionIndex].incorrect_answers;
  const sanitizedIncorrectAnswers = sanitizeAnswer(getRandomIndex(incorrectAnswers));
  if (questionIndex >= 0 && score < 5) {
    alert(`The correct answer is ${sanitizedCorrectAnswer}`);
  } else if (questionIndex >= 0 && score >= 5) {
    alert(`The answer is either ${sanitizedCorrectAnswer} or ${sanitizedIncorrectAnswers}`);
  }

  askTheAudience.forEach(element => {
    element.disabled = true; // Disable all audience buttons
    element.removeEventListener('click', handleAskTheAudience); // Remove event listener from all audience buttons
    element.classList.add('visibility');
  });
}

function getRandomIndex (arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

let fiftyFiftyUsed = false;
const fiftyFifty = document.querySelectorAll('.fifty-fifty');
fiftyFifty.forEach(Element => {
  Element.addEventListener('click', fiftyFiftyLifeLine);
});
function fiftyFiftyLifeLine () {
  if (!fiftyFiftyUsed) {
    const answerButtons = document.querySelectorAll('.answer-button');
    const incorrectAnswers = data.results[questionIndex].incorrect_answers;
    const sliceIncorrectAnswers = incorrectAnswers.slice(0, 2);
    console.log(sliceIncorrectAnswers);
    answerButtons.forEach((button) => {
      if (sliceIncorrectAnswers.includes(button.textContent)) {
        button.style.visibility = 'hidden';
      }

      fiftyFifty.forEach(button => {
        fiftyFiftyUsed = true; // to indicate the 50/50 has been used
        button.disabled = true; // disable button from being used
        button.classList.add('visibility');
      })
    });
  }
}


let PhoneAFriendUsed = false
const phoneAFriendButton = document.querySelectorAll('.phone-a-friend');
phoneAFriendButton.forEach(button => {
  button.addEventListener('click', phoneAFriendLifeLine);
});

function phoneAFriendLifeLine () {
  if (!PhoneAFriendUsed) {
    const correctAnswer = data.results[questionIndex].correct_answer;
    const incorrectAnswers = data.results[questionIndex].incorrect_answers;
    const sanitizedCorrectAnswer = sanitizeAnswer(correctAnswer);
    const sanitizedIncorrectAnswer = sanitizeAnswer(getRandomIndex(incorrectAnswers));
    const incorrectAnswerArray = [...incorrectAnswers];
    const correctAnswerArray = [correctAnswer];
    const concatAnswerArray = incorrectAnswerArray.concat(correctAnswerArray);
    const oneSanitizedConcatAnswer = sanitizeAnswer(getRandomIndex(concatAnswerArray));

    if ((questionIndex >= 0 && score < 5) || (questionIndex >= 0 && scoreMobile < 5)) {
      alert(`Hi ${userName}, I am 100% sure the answer is ${sanitizedCorrectAnswer}`);
    } else if ((questionIndex >= 0 && score >= 5 && score < 10) || (questionIndex >= 0 && scoreMobile >= 5 && scoreMobile < 10)) {
      alert(`Hi Craig I am only 50% sure on this one. I think it's either ${sanitizedCorrectAnswer} or ${sanitizedIncorrectAnswer}`);
    } else if ((questionIndex >= 0 && score >= 10) || (questionIndex >= 0 && scoreMobile >= 10)) {
      alert(`Hi ${userName} I am really not sure on this one, if I'd have to choose one I'd choose ${oneSanitizedConcatAnswer}`);
    }

    PhoneAFriendUsed = true; // Mark the lifeline as used
    disablePhoneAFriendButton(); // Disable the button and hide its text
  }
}

function disablePhoneAFriendButton() {
  phoneAFriendButton.forEach(button => {
    button.classList.add('visibility'); // Hide the text
    button.disabled = true; // Disable the button
  });
}

function incrementMoneyIndex () {
  moneyIndex++;
}

const bank = document.querySelectorAll('.bank');
bank.forEach(Element => {
  Element.addEventListener('click', bankMoney);
});

function bankMoney () {
  const moneyList = document.querySelectorAll('.money');
  const reverseMoneyList = [...moneyList].reverse();
  const sidePanel = document.querySelector('.side-panel');
  const scoreWrapperMobile = document.querySelector('.score-wrapper-mobile')
  if (moneyIndex >= 0 && moneyIndex < reverseMoneyList.length) {
    // Confirm the action with the user before proceeding
    if (confirmAction()) {
      sidePanel.classList.add('hidden');
      scoreWrapperMobile.classList.add('hidden');
     
      // const money = reverseMoneyList[moneyIndex].innerHTML;
      setTimeout(endQuiz, 500);
    }
  } else {
    // bank.removeEventListener('click', bankMoney);
    // bank.disabled = true;
  }
}

function confirmAction () {
  const confirmation = confirm('Are you sure you want to proceed?');
  return confirmation;
}

// https://www.youtube.com/watch?v=DFhmNLKwwGw&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=9
// tutorial video above and made my own adjustments to set highscores into local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

function setHighScore (name, score) {
  const highScoreObject = {
    userName: name,
    score: score
  };
  console.log('setHighScore called')
  highScores.push(highScoreObject);

  // Sort the highScores array by score in descending order
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(5);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  console.log('highscores', highScores)
}

function endQuiz() {
  const hideQuiz = document.getElementById('quiz');
  const endGameArea = document.getElementById('end-game-area');
  const sidePanel = document.querySelector('.side-panel');
  console.log('end quiz called');
  
  if (hideQuiz && endGameArea) {
    sidePanel.classList.add('hidden');
    hideQuiz.classList.add('hidden');
    endGameArea.style.display = 'flex';
  }
  
  const nameInput = document.getElementById('name-input');
  const userName = nameInput.value;
  const moneyList = document.querySelectorAll('.money');
  const reverseMoneyList = [...moneyList].reverse();
  let highScore = "0"; // Default value
  
  if (moneyIndex >= 0 && moneyIndex < reverseMoneyList.length) {
    highScore = reverseMoneyList[moneyIndex].innerHTML;
  }
  
  console.log('highscore', highScore);
  
  if (moneyIndex === -1) {
    displayQuizMessageNoMoney(userName);
  } else if (moneyIndex >= 0 && moneyIndex < reverseMoneyList.length) {
    displayQuizMessage();
    setHighScore(userName, highScore);
    console.log('highscore', highScore);
  }
  
  console.log('userName:', userName);
  console.log('moneyIndex:', moneyIndex);
}

function displayQuizMessageNoMoney(username) {
  const showUserMoney = document.getElementById('show-users-score');
  const getUserName = document.getElementById('users-name');
  getUserName.innerHTML = `Better luck next time, ${username}!`;
  showUserMoney.innerHTML = 'You walked away with Nothing';
}

// function to adjust the display of how much the user won, and username used.
function displayQuizMessage() {
  const moneyList = document.querySelectorAll('.money');
  const reverseMoneyList = [...moneyList].reverse();
  const displayMoneyWon = reverseMoneyList[moneyIndex].innerHTML;
  const showUserMoney = document.getElementById('show-users-score');
  const getUserName = document.getElementById('users-name');

  if (moneyIndex >= 0 && moneyIndex < 4) {
    getUserName.innerHTML = `Nice effort ${userName}`;
    showUserMoney.innerHTML = `You won £${displayMoneyWon}`;
  } else if (moneyIndex >= 4 && moneyIndex < 9) {
    getUserName.innerHTML = `Great Job ${userName}`;
    showUserMoney.innerHTML = `You walk away with £${displayMoneyWon}`;
  } else if (moneyIndex >= 9 && moneyIndex < 14) {
    getUserName.innerHTML = `Smashing Job ${userName}`;
    showUserMoney.innerHTML = `You walk away with an impressive £${displayMoneyWon}`;
  } else if (moneyIndex === 14) {
    showUserMoney.innerHTML = 'CONGRATULATIONS you won 1MILLION pounds!';
    getUserName.innerHTML = `Welcome to the millionaires club ${userName}`;
  }

  console.log('moneyIndex', moneyIndex);
}

const playAgain = document.querySelector('.play-again');
const returnHome = document.querySelector('.return-home-end');
document.addEventListener('click', function (event) {
  if (event.target === playAgain) {
    window.location.href = 'quiz.html';
  } else if (event.target === returnHome) {
    window.location.href = 'index.html';
  }
});

/* This function is with regards to safe havens at score 5 and score 10
if the user gets an answer incorrect between score 1 and 5 then they win nothing
if the user gets an answer incorrect between score 5 and 10 then they score £1000
if the user gets an answer incorrect between score 10 and 15 then they score £32000
*/
function determineMoneyIndex (score, scoreMobile) {
  if ((score > 0 && score <= 4) || (scoreMobile > 0 && scoreMobile <= 4)) {
    return -1;
  } else if ((score >= 5 && score <= 9) || (scoreMobile >= 5 && scoreMobile <= 9)) {
    return 4;
  } else if ((score >= 10 && score < 15) || (scoreMobile >= 10 && scoreMobile < 15)) {
    return 9;
  } else {
    return moneyIndex; // Keep the existing moneyIndex if score is not in the specified ranges
  }
}

// Call API for easy questions initially
callApi(easyQuestions);
