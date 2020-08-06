const APIUrl = 'https://api.twitch.tv/kraken';
const accept = 'application/vnd.twitchtv.v5+json';
const clientId = 'jbc71snm1c10on2ihcj2lnoka6egos';
function getTopGames(cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${APIUrl}/games/top?limit=5`, true);
  xhr.setRequestHeader('Accept', accept);
  xhr.setRequestHeader('Client-ID', clientId);
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 400) {
      cb(JSON.parse(xhr.response));
    }
  };
  xhr.onerror = () => {
    console.log('error');
  };
  xhr.send();
}
function getStreams(game, cb) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', `${APIUrl}/streams?game=${encodeURIComponent(game)}`, true);
  xhr.setRequestHeader('Accept', accept);
  xhr.setRequestHeader('Client-ID', clientId);
  xhr.onload = () => {
    if (xhr.status >= 200 && xhr.status < 400) {
      cb(JSON.parse(xhr.response));
    }
  };
  xhr.onerror = () => {
    console.log('error');
  };
  xhr.send();
}
function renderStreams(streams) {
  streams.streams.forEach((stream) => {
    console.log(stream);
    const preview = stream.preview.large;
    const picture = stream.channel.logo;
    const title = stream.channel.status;
    const channel = stream.channel.name;
    const link = stream.channel.url;
    const { game } = stream;
    const template = `
    <a target="_blank" href="${link}">
      <div class="preview">
        <img src="${preview}" alt="stream" />
      </div>
      <div class="info">
        <div class="photo">
          <img src="${picture}" alt="photo" />
        </div>
        <div class="txt">
          <div class="title">${title}</div>
          <div class="channel">${channel}</div>
        </div>
      </div>
    </a>
    `;
    const element = document.createElement('div');
    element.classList.add('stream');
    element.innerHTML = template;
    document.querySelector('.streams').appendChild(element);
    document.querySelector('.intro h1').innerHTML = game;
  });
}

function documentReady() {
  getTopGames((data) => {
    const games = document.querySelectorAll('li');
    for (let i = 0; i < games.length; i += 1) {
      games[i].innerHTML = data.top[i].game.name;
    }
    document.querySelector('.intro h1').innerHTML = data.top[0].game.name;
    getStreams(data.top[0].game.name, renderStreams);
    document.querySelector('.games').addEventListener('click', (e) => {
      document.querySelector('.streams').innerHTML = '';
      getStreams(e.target.innerHTML, renderStreams);
    });
  });
}
document.addEventListener('DOMContentLoaded', documentReady);
