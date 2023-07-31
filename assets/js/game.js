// api link for question 1-5
const easyQuestions = ('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple');
// api link for question 6-10
const mediumQuestions = ('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple');
// api link for question 11-15
const hardQuestions = ('https://opentdb.com/api.php?amount=5&category=9&difficulty=hard&type=multiple');

let data = {};
let score = 0;
// let questionIndex = 1;
console.log(data);

async function callApi(urlApi) {
  const response = await fetch(urlApi);
  if (response.status >= 200 && response.status <= 299) {
    data = await response.json();
    
    getQuestion(data);
    getAnswers(data);
  } else 
    // This is where the error is handled - redirects to 500 page
   console.log('error')
}

function getQuestion(data) {
  console.log(data);
  console.log(data.results);
  const question = document.getElementById('question').innerHTML = data.results[0].question;
  
}
//get incorrect and correct answers, and store them randomly so the correct answer is not at the same index for every question
function getAnswers(data) {
    const correctAnswer = data.results[0].correct_answer;
    const incorrectAnswer = data.results[0].incorrect_answers;
    const answerButtons = document.querySelectorAll('.answer-button');
    const newAnswerArray = incorrectAnswer.concat(correctAnswer);
    //call shuffle answers function so correct answer appears at different indexes for every question
    shuffleAnswers(newAnswerArray);

    for(let i = 0; i < newAnswerArray.length; i++) {
      answerButtons[i].innerHTML = newAnswerArray[i];
      // event listener to determine the correct answer
      answerButtons[i].addEventListener('click', function () {
        
        
        if(this.innerHTML === correctAnswer) {
          // alert('correct Answer')
          this.style.backgroundColor = 'orange';
          for(let j = 0; j < answerButtons.length; j++) {
            answerButtons[j].disabled = true;
          }
          // nextQuestion();
          } else {
          // alert('incorrect Answer');
          this.style.backgroundColor = 'red';
          for(let j = 0; j < answerButtons.length; j++) {
            answerButtons[j].disabled = true;
          }
        }
      })
    }
    console.log(correctAnswer);
    console.log(newAnswerArray);
    // shuffleAnswers(newAnswerArray);
    // console.log(correctAnswer, incorrectAnswer)
    // console.log(answers);
    // document.querySelectorAll('.answer-button').innerHTML = answers;
  }

function shuffleAnswers(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

console.log('working')

let nextButton = document.getElementById('next-button').addEventListener('click',nextQuestion)


// Function to handle the next button click event
// function nextQuestion() {
//   score += 1; // Increase the score
//   let questionIndex = questionIndex+= 1; // Increment the question index

//   // Check if there are more questions based on the current question index
//   if (questionIndex > data.results.length) {
//     // Display the final score or redirect to a different page
//     // You can modify this section based on your requirements
//     alert(`Quiz complete! Your score: ${score}/${data.results.length}`);
//     return;
//   }

//   // Get the new question and answers
//   const question = data.results[questionIndex - 1].question;
//   const correctAnswer = data.results[questionIndex - 1].correct_answer;
//   const incorrectAnswer = data.results[questionIndex - 1].incorrect_answers;
//   const answerButtons = document.querySelectorAll('.answer-button');
//   const newAnswerArray = incorrectAnswer.concat(correctAnswer);
//   shuffleAnswers(newAnswerArray);

//   // Update the question display and answer buttons
//   document.getElementById('question').innerHTML = question;
//   for (let i = 0; i < newAnswerArray.length; i++) {
//     answerButtons[i].innerHTML = newAnswerArray[i];
//     answerButtons[i].style.backgroundColor = ''; // Reset button color
//     answerButtons[i].disabled = false; // Enable answer buttons
//   }
// }

callApi(easyQuestions);
// getQuestion(data);



