/* eslint-disable no-alert */
function init() {
  function error(err) {
    alert('系統不穩定，請再試一次');
    console.log(err);
    window.location.reload(true);
  }

  function hide() {
    document.querySelector('.game').classList.add('hide');
    document.querySelector('.prize__game').classList.remove('hide');
  }
  function render(prize) {
    const games = document.querySelector('.games');
    const prizeName = document.querySelector('.name');
    const prizeContent = document.querySelector('.content');
    games.style.background = `url(${prize.url}) center / cover no-repeat`;
    hide();
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

  function reload() {
    window.location.reload(true);
  }
  document.querySelector('.play__game').addEventListener('click', getAPI);
  document.querySelector('.reload').addEventListener('click', reload);
}
document.addEventListener('DOMContentLoaded', () => {
  init();
});
