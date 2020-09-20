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

function renderStreams(streams) {
  streams.streams.forEach((stream) => {
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

function getStreams(game) {
  return fetch(`${APIUrl}/streams?game=${encodeURIComponent(game)}&limit=20`, {
    method: 'GET',
    headers: new Headers({
      Accept: accept,
      'Client-ID': clientId,
    }),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

function renderGames(games) {
  games.top.forEach((top) => {
    const li = document.createElement('li');
    li.innerHTML = top.game.name;
    document.querySelector('.games').appendChild(li);
  });
  return games.top[0].game.name;
}

function getGames() {
  return fetch(`${APIUrl}/games/top?limit=5`, {
    method: 'GET',
    headers: new Headers({
      Accept: accept,
      'Client-ID': clientId,
    }),
  })
    .then(res => res.json())
    .catch(err => console.log(err));
}

async function init() {
  const gameList = await getGames();
  const game = renderGames(gameList);
  const streams = await getStreams(game);
  renderStreams(streams);
}

async function change(game) {
  document.querySelector('.streams').innerHTML = '';
  const streams = await getStreams(game.innerHTML);
  renderStreams(streams);
}

document.addEventListener('DOMContentLoaded', () => {
  init();
  document.querySelector('.games').addEventListener('click', (e) => {
    change(e.target);
  });
});
