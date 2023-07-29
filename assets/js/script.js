//to open and close modal on how to play button and highscore button

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

//When user presses the escape key to close modal windows
document.addEventListener('keypress', function(event){
    escapeModal(event.key);
    // alert('key pressed')
})

function escapeModal(key) {
  if(key === Escape) {
    closeModal();
  }
}
 