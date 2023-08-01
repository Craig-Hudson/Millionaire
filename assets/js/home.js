'use strict';

//to open and close modal on how to play, highscores, and contact us buttons

const openBtnModals = document.querySelectorAll('.open-modal');
const modalContainer = document.querySelector('.modal-container');
const modals = document.querySelectorAll('.modals')
const closeModals = document.querySelectorAll('.close-modal')
// iterate over the 3 modals to determine the data modal

 openBtnModals.forEach((btn) => {
  btn.addEventListener('click', function() {
    const modalId = this.getAttribute('data-modal');
    const modal = document.getElementById(modalId);
    modalContainer.classList.add('active');
    modal.classList.add('active');
  });
});

// function to close modals

function closeModal() {
  modalContainer.classList.remove('active');
  modals.forEach((modals) => {
    modals.classList.remove('active');
  });
}

// to close modals when user clicks close / x

closeModals.forEach((btn) => {
  btn.addEventListener('click', closeModal)
})

// when user clicks anywhere on the page the modal will close

modalContainer.addEventListener('click', function(event) {
  if(event.target === modalContainer) {
    closeModal();
  }
})

//When user presses escape key the modal will close

document.addEventListener('keydown', function(event) {
  const key = event.key;
  if(key === "Escape") {
    closeModal();
  }
})

// When user clicks start quiz, take them to quiz page
function newPageQuiz () {
  window.location.href = "quiz.html";
}

const quizHtmlPage = document.querySelector('.start-quiz')
quizHtmlPage.addEventListener('click', newPageQuiz);