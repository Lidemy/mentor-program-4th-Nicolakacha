/* eslint-disable quote-props */
const request = require('request');

const APIUrl = 'https://api.twitch.tv/kraken';

const options = {
  url: `${APIUrl}/games/top`,
  headers: {
    'Accept': 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'jbc71snm1c10on2ihcj2lnoka6egos',
  },
};

function callback(error, res, body) {
  let data;
  try {
    data = JSON.parse(body);
  } catch (err) {
    console.log('API抓取錯誤', error);
    return;
  }
  for (let i = 0; i < data.top.length; i += 1) {
    console.log(`${data.top[i].viewers} ${data.top[i].game.name}`);
  }
}

request(options, callback);
