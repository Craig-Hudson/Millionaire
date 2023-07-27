//to open and close modal on how to play button

const modal = document.querySelector('#my-modal');
const btnModal = document.querySelectorAll('.btn-modal');
const closeModal = document.querySelector('.close-modal');

for (let i; i <=btnModal.length; i ++) {

btnModal[i].addEventListener('click', function () {
    modal.classList.add('modal-open');
})

closeModal.addEventListener('click', function () {
  modal.classList.remove('modal-open');
} )}
 console.log(btnModal);