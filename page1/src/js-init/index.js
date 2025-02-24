

 
    const toggleButtons = document.querySelectorAll('.toggleButton');

    toggleButtons.forEach(button => {
      button.addEventListener(`click`,()=> {
      const answer =button.parentElement.nextElementSibling;

      if(answer.style.display === 'block'){
        answer.style.display = 'none';
        button.textContent = '+';

      }else{
        answer.style.display = 'block';
        button.textContent = '-';
      }

      })
       
        })


        const menuButton = document.getElementById('menuButton');
const dropdownMenu = document.getElementById('dropdownMenu');

menuButton.addEventListener('click', () => {
    const isMenuOpen = dropdownMenu.style.display === 'block';
    dropdownMenu.style.display = isMenuOpen ? 'none' : 'block';
});


function toggleMenu() {
  const menu = document.querySelector('.marking');
  menu.classList.toggle('show');
}