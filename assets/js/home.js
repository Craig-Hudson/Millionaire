const openBtnModals = document.querySelectorAll('.open-modal');
const modalContainer = document.querySelector('.modal-container');
const closeModals = document.querySelectorAll('.close-modal');
const quizHtmlPage = document.querySelector('.start-quiz');
const highScoresList = document.getElementById('highscores-list');
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Function to open a modal
function openModal (modalId) {
  const modal = document.getElementById(modalId);
  modalContainer.classList.add('active');
  modal.classList.add('active');
  
  if (modalId === 'high-scores') {
    updateHighScoresDisplay();
  }
}

// Function to close individual modals and remove active classes
function closeModal() {
  const modalContainer = document.querySelector('.modal-container');
  modalContainer.classList.remove('active');

  const modals = document.querySelectorAll('.modal.active');
  modals.forEach((modal) => {
    modal.classList.remove('active');
  });
}

// Function to close modals when user clicks anywhere on screen
function closeModalsOnOutsideClick(event) {
  if (event.target === modalContainer) {
    closeModal();
  }
}

// Function to close modals when user presses the escape key
function closeModalsOnEscapeKey(event) {
  const key = event.key;
  if (key === 'Escape') {
    closeModal();
  }
}

// Function to navigate to the quiz page
function newPageQuiz() {
  window.location.href = 'quiz.html';
}

// Function to update high scores display
function updateHighScoresDisplay() {
  highScoresList.innerHTML = '';
  highScores.forEach(score => {
    const listItem = document.createElement('li');
    listItem.innerText = score.userName + ' - ' + '£' + score.score;
    highScoresList.appendChild(listItem);
  });
}

// Function to set up event listeners
function setupEventListeners() {
  openBtnModals.forEach((btn) => {
    btn.addEventListener('click', function() {
      const modalId = this.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  closeModals.forEach((btn) => {
    btn.addEventListener('click', closeModal);
  });

  modalContainer.addEventListener('click', closeModalsOnOutsideClick);

  document.addEventListener('keydown', closeModalsOnEscapeKey);

  quizHtmlPage.addEventListener('click', function() {
    setTimeout(newPageQuiz, 500);
  });
}
setupEventListeners();
updateHighScoresDisplay();