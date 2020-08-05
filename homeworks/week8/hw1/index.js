/* eslint-disable no-alert */

function documentReady() {
  function error() {
    alert('系統不穩定，請再試一次');
    window.location.reload(true);
  }
  function render(data) {
    function hide() {
      document.querySelector('.game').classList.add('hide');
      document.querySelector('.prize').classList.remove('hide');
    }
    const value = data.prize;
    const games = document.querySelector('.games');
    const prize = document.querySelector('.prize__name');
    if (value === 'NONE') {
      games.style.background = 'black';
      hide();
      prize.parentNode.style.background = 'transparent';
      prize.innerHTML = '銘謝惠顧';
      prize.style.color = 'white';
    } else if (value === 'FIRST') {
      games.style.background = 'url("firstPrize.jpg") center / cover no-repeat';
      hide();
      prize.innerHTML = '恭喜你中頭獎了！日本東京來回雙人遊！';
    } else if (value === 'SECOND') {
      games.style.background = 'url("SecondPrize.jpg") center / cover no-repeat';
      hide();
      prize.innerHTML = '二獎！90 吋電視一台！';
    } else if (value === 'THIRD') {
      games.style.background = 'url("ThirdPrize.jpg") center / cover no-repeat';
      hide();
      prize.innerHTML = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
    } else {
      error();
    }
  }
  function getAPI() {
    const api = 'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery';
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if ((xhr.status >= 200) && (xhr.status < 400)) {
        try {
          const data = JSON.parse(xhr.responseText);
          render(data);
        } catch (err) {
          error();
        }
      } else {
        error();
      }
    };
    xhr.onerror = () => { error(); };
    xhr.open('GET', api, true);
    xhr.send();
  }
  function reload() {
    window.location.reload(true);
  }
  document.querySelector('.play__game').addEventListener('click', getAPI);
  document.querySelector('.reload').addEventListener('click', reload);
}
document.addEventListener('DOMContentLoaded', documentReady);
