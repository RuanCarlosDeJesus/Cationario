document.addEventListener("DOMContentLoaded", function() {
  const glitchText = document.querySelector('.glitch-text');

  
  function restartAnimation() {
    glitchText.classList.remove('animate');
    void glitchText.offsetWidth; 
    glitchText.classList.add('animate');
  }

 
  restartAnimation();


  setInterval(restartAnimation, 4000); 
});
