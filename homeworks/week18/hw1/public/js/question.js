function init() {
  const questions = document.querySelector('.questions');
  questions.addEventListener('click', (e) => {
    if (e.target.classList.contains('question__text')) {
      e.target.parentNode.parentNode.querySelector('.answer').classList.toggle('hide');
    }
  });
}

document.addEventListener('DOMContentLoaded', init);
