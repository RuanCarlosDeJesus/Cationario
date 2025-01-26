

 
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


