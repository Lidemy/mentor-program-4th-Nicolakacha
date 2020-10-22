/* eslint-disable no-alert */
function init() {
  const games = document.querySelector('.games');
  const prizeName = document.querySelector('.name');
  const prizeContent = document.querySelector('.content');
  const game = document.querySelector('.game');
  const playPage = document.querySelector('.prize__game');

  function reload() {
    window.location.reload(true);
  }

  function error(err) {
    alert('系統不穩定，請再試一次');
    console.log(err);
    reload();
  }

  function render(prize) {
    games.style.background = `url(${prize.url}) center / cover no-repeat`;
    game.classList.add('hide');
    playPage.classList.remove('hide');
    prizeName.innerHTML = prize.title;
    prizeContent.innerHTML = prize.content;
  }

  function getAPI() {
    return fetch('/getPrize', {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => render(data))
      .catch(err => error(err));
  }

  document.querySelector('.play__game').addEventListener('click', getAPI);
  document.querySelector('.reload').addEventListener('click', reload);
}
document.addEventListener('DOMContentLoaded', () => {
  init();
});
