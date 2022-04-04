
// var myModal = document.getElementById('myModal')
// var myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {

// })

 // Functions to open and close a modal
 function OpenModal() {
  var oModal = document.getElementById('openModal');
  oModal.classList.add('is-active');
}

function closeModal() {
  var oModal = document.getElementById('openModal');
  oModal.classList.remove('is-active');
}