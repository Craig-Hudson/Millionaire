// Global variables
let data = {};
let score = 0;
let scoreMobile = 0;
let questionIndex = 0;
let moneyIndex = -1;
let questionNumber = 1;
let userName;
const answerButtons = document.querySelectorAll('.answer-button');
// API link for question 1-5
const easyQuestions = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple';
// API link for question 6-10
const mediumQuestions = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple';
// API link for question 11-15
const hardQuestions = 'https://opentdb.com/api.php?amount=5&category=9&difficulty=hard&type=multiple';
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
// LIFE LINE GLOBALS
let askTheAudience = document.querySelectorAll('.audience');
let PhoneAFriendUsed = false
let fiftyFiftyUsed = false;
let fiftyFifty = document.querySelectorAll('.fifty-fifty');
let phoneAFriendButton = document.querySelectorAll('.phone-a-friend');
let bank = document.querySelectorAll('.bank');


const returnHomeButton = document.querySelector('.return-home');

document.addEventListener('DOMContentLoaded', function () {
  let quizArea = document.getElementById('quiz');
  let user = document.getElementById('name-input');
  let inputNameArea = document.querySelector('.input-name-section');
  let submitButton = document.getElementById('submit-button');
  let sidePanel = document.querySelector('.side-panel');
  let inputNameSection = document.querySelector('.input-name-section');
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

 // Hide the side panel toggle when the user is in the input name section
  if (inputNameSection) {
    sidePanel.classList.add('hidden');
  }
  
});

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

// Function to grab the questions from the api
function getQuestion () {
  let question = document.getElementById('question');
  if (questionIndex < data.results.length) {
    question.innerHTML = data.results[questionIndex].question;
  }
  getQuestionNumber();
}

function getQuestionNumber () {
  let questionNumberId = document.getElementById('question-number');
  questionNumberId.innerText = questionNumber;
  questionNumber++;
}

// function to get the next question
function nextQuestion () {
  // increment question index when next question is called
  questionIndex++;
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

function getAnswers () {
  let correctAnswer = data.results[questionIndex].correct_answer;
  let incorrectAnswer = data.results[questionIndex].incorrect_answers;
  let newAnswerArray = incorrectAnswer.concat(correctAnswer);
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
  let selectedAnswer = this.innerHTML;
  let correctAnswer = data.results[questionIndex].correct_answer;
  let sanitizedSelectedAnswer = sanitizeAnswer(selectedAnswer);
  let sanitizedCorrectAnswer = sanitizeAnswer(correctAnswer);
  // Checks if the selected answer by the user is the same as the correct answer in the api
  if (sanitizedSelectedAnswer === sanitizedCorrectAnswer) {
    this.style.background = 'orange';
    for (let j = 0; j < answerButtons.length; j++) {
      answerButtons[j].disabled = true;
    }
    if (window.innerWidth <= 800) {
      incrementScoreMobile();
      setTimeout(openSidePanel, 1000);
      setTimeout(closeSidePanel, 3000);
    } else {
      incrementScore();
    }
    incrementMoneyIndex();
    setTimeout(nextQuestion, 1500);
  } else {
    this.style.background = 'red';

    // Display the background color of the correct answer when user selects wrong answer
    let correctAnswerButtons = document.querySelectorAll('.answer-button');
    for (let j = 0; j < correctAnswerButtons.length; j++) {
      if (correctAnswerButtons[j].innerHTML === correctAnswer) {
        correctAnswerButtons[j].style.background = 'orange';
        break;
      }
    }
    for (let j = 0; j < answerButtons.length; j++) {
      answerButtons[j].disabled = true;
    }
    console.log('score', score, 'score mobile', scoreMobile)
    console.log('moneyindex', moneyIndex)

    moneyIndex = determineMoneyIndex(score, scoreMobile); // 
    setTimeout(endQuiz, 1000);
  }
}

// https://stackoverflow.com/questions/6555182/remove-all-special-characters-except-space-from-a-string-using-javascript
// code for some of this function was taken from the link above.
function sanitizeAnswer (answer) {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = answer;
  return tempElement.textContent.replace(/[\u2018\u2019]/g, "'");
}

function incrementScore () {
  score++;
  // function to display users save haven / minimum amount of money won
  safeHaven();
  let scoreList = document.querySelectorAll('.score');
  // to get current index
  let currentScoreIndex = scoreList.length - score;
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
    scoreMobile++;
    // function to display users save haven / minimum amount of money won
    safeHaven();
    // get .score-mobile class in the mobile scores section
    let scoreListMobile = document.querySelectorAll('.quiz-scores-mobile .score-mobile');
    // to get current index
    let currentScoreIndex = scoreListMobile.length - scoreMobile;
    // iterate in reverse to start at the last element in the currentScore class
    for (let i = scoreListMobile.length - 1; i >= 0; i--) {
      const scoreItem = scoreListMobile[i];
      scoreItem.classList.remove('current-score');

      if (i === currentScoreIndex) {
        scoreItem.classList.add('current-score');
        break;
      }
    }
  }
}

// Function to highlight the safe haven to visualize for the user
function safeHaven() {
  let scoresDesktopReversed = Array.from(document.querySelectorAll('.score')).reverse();
  let scoreMobileReverse = Array.from(document.querySelectorAll('.score-mobile')).reverse();
//  arrow function to toggle the class to highlight save haven
  let updateSafeHaven = (index, add) => {
    scoresDesktopReversed[index].classList.toggle('green', add);
    scoreMobileReverse[index].classList.toggle('green', add);
  };
  // Logic to determine where the safe havens are.
  if ((score >= 5 && score < 10) || (scoreMobile >= 5 && scoreMobile < 10)) {
    updateSafeHaven(4, true);
    updateSafeHaven(9, false);
  } else if (score >= 10 || scoreMobile >= 10) {
    updateSafeHaven(4, false);
    updateSafeHaven(9, true);
  }
}

// LIFE LINE SECTION
function handleAskTheAudience () {
  let correctAnswer = data.results[questionIndex].correct_answer;
  let sanitizedCorrectAnswer = sanitizeAnswer(correctAnswer);
  let incorrectAnswers = data.results[questionIndex].incorrect_answers;
  let sanitizedIncorrectAnswers = sanitizeAnswer(getRandomIndex(incorrectAnswers));
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

function fiftyFiftyLifeLine() {
  if (!fiftyFiftyUsed) {
    const incorrectAnswers = data.results[questionIndex].incorrect_answers;
    // Slice the incorrect answers array so we only get two incorrect answers to hide for the 50/50 lifeline
    const sliceIncorrectAnswers = incorrectAnswers.slice(1, 3);
    answerButtons.forEach((button) => {
      if (sliceIncorrectAnswers.includes(button.textContent)) {
        button.style.visibility = 'hidden';
      }
    });
    console.log(sliceIncorrectAnswers);
    // Disables and hides the lifeline on mobile/tablet and desktop
    fiftyFifty.forEach(button => {
      fiftyFiftyUsed = true;
      button.disabled = true;
      button.classList.add('visibility');
    });
  }
}


function phoneAFriendLifeLine() {
  if (!PhoneAFriendUsed) {
    let correctAnswer = data.results[questionIndex].correct_answer;
    let incorrectAnswers = data.results[questionIndex].incorrect_answers;
    let sanitizedCorrectAnswer = sanitizeAnswer(correctAnswer);
    let sanitizedIncorrectAnswer = sanitizeAnswer(getRandomIndex(incorrectAnswers));
    let incorrectAnswerArray = [...incorrectAnswers];
    let correctAnswerArray = [correctAnswer];
    let concatAnswerArray = incorrectAnswerArray.concat(correctAnswerArray);
    let oneSanitizedConcatAnswer = sanitizeAnswer(getRandomIndex(concatAnswerArray));

    // toggleSidePanel();
   
    // Display the appropriate message in the modal
    switch (true) {
      case (questionIndex >= 0 && score < 5) || (questionIndex >= 0 && scoreMobile < 5):
        displayModalMessage(`Hi ${userName}, I am 100% sure the correct answer is ${sanitizedCorrectAnswer}.`);
        break;
      case (questionIndex >= 0 && score >= 5 && score < 10) || (questionIndex >= 0 && scoreMobile >= 5 && scoreMobile < 10):
        displayModalMessage(`Hi ${userName}, I am only 50% sure on this one. I think it's either ${sanitizedCorrectAnswer} or ${sanitizedIncorrectAnswer}.`);
        break;
      case (questionIndex >= 0 && score >= 10) || (questionIndex >= 0 && scoreMobile >= 10):
        displayModalMessage(`Hi ${userName}, I am really not sure on this one, if I'd have to choose one I'd choose ${oneSanitizedConcatAnswer}.`);
        break;
      default:
        // Handle other cases if needed
        break;
    }

    disablePhoneAFriendButton();
    PhoneAFriendUsed = true;
  }
}
function disablePhoneAFriendButton() {
  phoneAFriendButton.forEach(button => {
    button.classList.add('visibility');
    button.disabled = true;
  });
}


function bankMoney () {
  let moneyList = document.querySelectorAll('.money');
  let reverseMoneyList = [...moneyList].reverse();
  let sidePanel = document.querySelector('.side-panel');
  let scoreWrapperMobile = document.querySelector('.score-wrapper-mobile')
  if (moneyIndex >= 0 && moneyIndex < reverseMoneyList.length) {
    // Confirm the action with the user before proceeding
    if (confirmAction('Are You Sure You Want To Bank Your Money?')) {
      sidePanel.classList.add('hidden');
      scoreWrapperMobile.classList.add('hidden');
      // const money = reverseMoneyList[moneyIndex].innerHTML;
      setTimeout(endQuiz, 500);
    }
  }
}

function handleLifeLineEventListeners () {
  askTheAudience.forEach(element => {
    element.addEventListener('click', handleAskTheAudience);
  });
  fiftyFifty.forEach(Element => {
    Element.addEventListener('click', fiftyFiftyLifeLine);
  });
  phoneAFriendButton.forEach(button => {
    button.addEventListener('click', () => {
      closeSidePanel();
      phoneAFriendLifeLine();
    });
  });
  bank.forEach(Element => {
    Element.addEventListener('click', bankMoney);
  });
}
handleLifeLineEventListeners();

function displayModalMessage(message) {
  let modal = document.getElementById('life-lines-modal');
  let modalMessage = document.getElementById('modal-message');

  modalMessage.textContent = message;
  modal.style.display = 'flex';

  let closeModalButton = document.getElementById('close-modal');
  closeModalButton.addEventListener('click', function () {
    modal.style.display = 'none';
  })

  window.addEventListener('click', function(event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
}
// END OF LIFE LINE SECTION

function getRandomIndex (arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

function incrementMoneyIndex () {
  moneyIndex++;
}

function confirmAction(message) {
  const confirmation = confirm(message);
  return confirmation;
}

// https://www.youtube.com/watch?v=DFhmNLKwwGw&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=9
// tutorial video above and made my own adjustments to set highscores into local storage
function setHighScore (name, score) {
  const highScoreObject = {
    userName: name,
    score: score
  };
  console.log('setHighScore called')
  highScores.push(highScoreObject);

  // Sort the highScores array by score in descending order
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(50);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  console.log('highscores', highScores)
}

function endQuiz () {
  const hideQuiz = document.getElementById('quiz');
  const endGameArea = document.getElementById('end-game-area');
  const sidePanel = document.querySelector('.side-panel');
 
  if (hideQuiz && endGameArea) {
    sidePanel.classList.add('hidden');
    hideQuiz.classList.add('hidden');
    endGameArea.style.display = 'flex';
  }
  
  let nameInput = document.getElementById('name-input');
  let userName = nameInput.value;
  let moneyList = document.querySelectorAll('.money');
  let reverseMoneyList = [...moneyList].reverse();
  let highScore = '0'; // Default value
  
  if (moneyIndex >= 0 && moneyIndex < reverseMoneyList.length) {
    highScore = reverseMoneyList[moneyIndex].innerHTML;
  }
  
  console.log('highscore', highScore);
  // Display message when user scores zero in the end game section
  if (moneyIndex === -1) {
    displayQuizMessageNoMoney(userName);
  } else if (moneyIndex >= 0 && moneyIndex < reverseMoneyList.length) {
    // displays a message to users in end game section
    displayQuizMessage();
    // sets the high scores and sends to local storage.
    setHighScore(userName, highScore);
    console.log('highscore', highScore);
  }
}

function displayQuizMessageNoMoney(username) {
  let showUserMoney = document.getElementById('show-users-score');
  let getUserName = document.getElementById('users-name');
  getUserName.innerHTML = `Better luck next time, ${username}!`;
  showUserMoney.innerHTML = 'You walked away with Nothing';
}

// function to adjust the display of how much the user won, and username used.
function displayQuizMessage() {
  let getUserName = document.getElementById('users-name');
  let moneyList = document.querySelectorAll('.money');
  let showUserMoney = document.getElementById('show-users-score');
  let reverseMoneyList = [...moneyList].reverse();
  let displayMoneyWon = reverseMoneyList[moneyIndex].innerHTML;

  switch (true) {
    case (moneyIndex >= 0 && moneyIndex < 4):
      getUserName.innerHTML = `Nice effort ${userName}`;
      showUserMoney.innerHTML = `You won £${displayMoneyWon}`;
      break;
    case (moneyIndex >= 4 && moneyIndex < 9):
      getUserName.innerHTML = `Great Job ${userName}`;
      showUserMoney.innerHTML = `You walk away with £${displayMoneyWon}`;
      break;
    case (moneyIndex >= 9 && moneyIndex < 14):
      getUserName.innerHTML = `Smashing Job ${userName}`;
      showUserMoney.innerHTML = `You walk away with an impressive £${displayMoneyWon}`;
      break;
    case (moneyIndex === 14):
      showUserMoney.innerHTML = 'CONGRATULATIONS you won 1MILLION pounds!';
      getUserName.innerHTML = `Welcome to the millionaires club ${userName}`;
      break;
  }

  console.log('moneyIndex', moneyIndex);
}

document.addEventListener('click', function (event) {
  let playAgain = document.querySelector('.play-again');
  let returnHome = document.querySelector('.return-home-end');
  
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

// function to handle the home button click on the quiz page

returnHomeButton.addEventListener('click', function (e) {
  if (e.target === returnHomeButton) {
    if (confirmAction('Are you sure you want to return home? Your progress will be lost')) {
      window.location = 'index.html';
    }
  }
})

function toggleSidePanel () {
  let sidePanelToggle = document.getElementById('side-panel-toggle');
  let scoreWrapperMobile = document.querySelector('.score-wrapper-mobile');
  let contentMain = document.querySelector('.content.main');
  sidePanelToggle.addEventListener('click', function () {
    scoreWrapperMobile.classList.toggle('side-panel-open');
    scoreWrapperMobile.classList.toggle('side-panel-closed');
    contentMain.classList.toggle('hidden');
  });
}
toggleSidePanel();

function closeSidePanel() {
  let scoreWrapperMobile = document.querySelector('.score-wrapper-mobile');
  let contentMain = document.querySelector('.content.main');
  
  scoreWrapperMobile.classList.remove('side-panel-open');
  scoreWrapperMobile.classList.add('side-panel-closed');
  contentMain.classList.add('hidden');
}


function openSidePanel () {
  let scoreWrapperMobile = document.querySelector('.score-wrapper-mobile');
  let contentMain = document.querySelector('.content.main');
  
  scoreWrapperMobile.classList.remove('side-panel-closed');
  scoreWrapperMobile.classList.add('side-panel-open');
  contentMain.classList.remove('hidden');
}
// Call API for easy questions initially
callApi(easyQuestions);
