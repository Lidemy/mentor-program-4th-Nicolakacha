/* eslint-disable no-alert */
function getPrice() {
  const playGame = document.querySelector('.play__game');
  const reload = document.querySelector('.reload');

  playGame.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      if ((xhr.status >= 200) && (xhr.status < 400)) {
        const value = JSON.parse(xhr.responseText).prize;
        const games = document.querySelector('.games');
        const game = document.querySelector('.game');
        const prize = document.querySelector('.prize');
        const prizeName = document.querySelector('.prize__name');
        if (value === 'NONE') {
          games.style.background = 'black';
          game.classList.add('hide');
          prize.classList.remove('hide');
          prize.style.background = 'transparent';
          prizeName.innerHTML = '銘謝惠顧';
          prizeName.style.color = 'white';
        } else if (value === 'FIRST') {
          games.style.background = 'url("firstPrize.jpg") center / cover no-repeat';
          game.classList.add('hide');
          prize.classList.remove('hide');
          prizeName.innerHTML = '恭喜你中頭獎了！日本東京來回雙人遊！';
        } else if (value === 'SECOND') {
          games.style.background = 'url("SecondPrize.jpg") center / cover no-repeat';
          game.classList.add('hide');
          prize.classList.remove('hide');
          prizeName.innerHTML = '二獎！90 吋電視一台！';
        } else if (value === 'THIRD') {
          games.style.background = 'url("ThirdPrize.jpg") center / cover no-repeat';
          game.classList.add('hide');
          prize.classList.remove('hide');
          prizeName.innerHTML = '恭喜你抽中三獎：知名 YouTuber 簽名握手會入場券一張，bang！';
        } else {
          alert('系統不穩定，請再試一次');
        }
      } else {
        alert('系統不穩定，請再試一次');
        console.log('error');
      }
    };
    xhr.onerror = () => {
      alert('系統不穩定，請再試一次');
      console.log('error');
    };
    xhr.open(
      'GET',
      'https://dvwhnbka7d.execute-api.us-east-1.amazonaws.com/default/lottery',
      true,
    );
    xhr.send();
  });

  reload.addEventListener('click', () => {
    window.location.reload(true);
  });
}
document.addEventListener('DOMContentLoaded', getPrice);
