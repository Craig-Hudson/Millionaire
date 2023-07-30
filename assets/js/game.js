// api link for question 1-5
const easyQuestions = ('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple');
// api link for question 6-10
const mediumQuestions = ('https://opentdb.com/api.php?amount=5&category=9&difficulty=medium&type=multiple');
// apo link for question 11-15
const hardQuestions = ('https://opentdb.com/api.php?amount=5&category=9&difficulty=hard&type=multiple');

let questions;
let incorrectAnswers;
let correctAnswer;

async function callApi(urlApi) {
  const response = await fetch(urlApi);
  if (response.status >= 200 && response.status <= 299) {
    data = await response.json();
    getQuestion(data);
  } else 
    // This is where the error is handled - redirects to 500 page
   console.log('error')
  
}



function getQuestion(data) {
  console.log(data);
  console.log(data.results);
  for(let i = 0; i < data.results.length; i++) {
    questions = data.results[i].question;
    incorrectAnswers = data.results[i].incorrect_answers;
    correctAnswer = data.results[i].correct_answer;
    // console.log(questions);
    // console.log(incorrectAnswers);
    // console.log(correctAnswer);
  
}
  console.log(questions);
  console.log(incorrectAnswers);
  console.log(correctAnswer);
  document.getElementById('question').textContent = questions;
  document.getElementsByClassName('answer-button').textContent = `incorrectAnswers + correctAnswer`
  
}
callApi(easyQuestions);
