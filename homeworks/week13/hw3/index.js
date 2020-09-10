const APIUrl = 'https://api.twitch.tv/kraken';
const accept = 'application/vnd.twitchtv.v5+json';
const clientId = 'jbc71snm1c10on2ihcj2lnoka6egos';
const template = `
    <a target="_blank" href="$url">
      <div class="preview">
        <img src="$large" alt="stream" />
      </div>
      <div class="info">
        <div class="photo">
          <img src="$logo" alt="photo" />
        </div>
        <div class="txt">
          <div class="title">$status</div>
          <div class="channel">$name</div>
        </div>
      </div>
    </a>
  `;
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
  xhr.open('GET', `${APIUrl}/streams?game=${encodeURIComponent(game)}&limit=20`, true);
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
  streams.forEach((stream) => {
    const {
      game,
      preview: { large },
      channel: {
        logo, status, name, url,
      },
    } = stream;
    const el = document.createElement('div');
    el.classList.add('stream');
    el.innerHTML = template
      .replace('$url', url)
      .replace('$large', large)
      .replace('$logo', logo)
      .replace('$status', status)
      .replace('$name', name);
    document.querySelector('.streams').appendChild(el);
    document.querySelector('.intro h1').innerHTML = game;
  });
}
function changeGame(game) {
  document.querySelector('.streams').innerHTML = '';
  getStreams(game.innerHTML, (data) => {
    renderStreams(data.streams);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  getTopGames((games) => {
    games.top.forEach((top) => {
      const li = document.createElement('li');
      li.innerHTML = top.game.name;
      document.querySelector('.games').appendChild(li);
    });
    getStreams(games.top[0].game.name, (data) => {
      renderStreams(data.streams);
    });
    document.querySelector('.games').addEventListener('click', (e) => {
      changeGame(e.target);
    });
  });
});
