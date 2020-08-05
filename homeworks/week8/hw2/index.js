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

function documentReady() {
  getTopGames((data) => {
    const firstGame = data.top[0].game.name;
    console.log(firstGame);
    getStreams(firstGame, (stream) => {
      console.log(stream);
    });
  });
}

document.addEventListener('DOMContentLoaded', documentReady);
