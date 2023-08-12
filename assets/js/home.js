'use strict';
// window.onload = function () {
  localStorage.clear();
// }
const openBtnModals = document.querySelectorAll('.open-modal');
const modalContainer = document.querySelector('.modal-container');
const closeModals = document.querySelectorAll('.close-modal');
// localStorage.clear();
// iterate over the 3 modals to determine the data modal
openBtnModals.forEach((btn) => {
  btn.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    modalContainer.classList.add('active');
    modal.classList.add('active');
    if (modalId === 'high-scores') {
      console.log('highscores')
      updateHighScores();
    }
  });
});

// function to close individual modals and by remove active classes to container and individual meodal
function closeModal() {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.classList.remove('active');

  const modals = document.querySelectorAll('.modal.active');
  modals.forEach((modal) => {
    modal.classList.remove('active');
  });
}

// close modals when user clicks the x or close
closeModals.forEach((btn) => {
  btn.addEventListener('click', closeModal);
});

// close modals when user clicks anywhere on screen
modalContainer.addEventListener('click', function(event) {
  if (event.target === modalContainer) {
    closeModal();
  }
});

// close modals when user presses escape key
document.addEventListener('keydown', function(event) {
  const key = event.key;
  if (key === 'Escape') {
    closeModal();
  }
});

// To take user to quiz page
function newPageQuiz() {
  window.location.href = 'quiz.html';
}

const quizHtmlPage = document.querySelector('.start-quiz');
quizHtmlPage.addEventListener('click', function() {
  setTimeout(newPageQuiz, 500);
});

// https://www.youtube.com/watch?v=jfOv18lCMmw&list=PLDlWc9AfQBfZIkdVaOQXi1tizJeNJipEx&index=10
// tutorial link above to help implement and make my own adjustments
const highScoresList = document.getElementById('highscores-list');
// Get high scores from local storage
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

function updateHighScores() {
  highScoresList.innerHTML = '';
 // Display the sorted high scores in the HTML
  highScores.forEach(score => {
    const listItem = document.createElement('li');
    listItem.innerText = score.userName + ' - ' + '£' + score.score;
    highScoresList.appendChild(listItem);
  });
}
