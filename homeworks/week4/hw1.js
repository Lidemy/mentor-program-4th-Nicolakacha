const request = require('request');

request.get(
  'https://lidemy-book-store.herokuapp.com/books?_limit=10',
  (error, response, body) => {
    let data;
    try {
      data = JSON.parse(body);
    } catch (err) {
      console.log('API抓取錯誤', error);
      return;
    }
    for (let i = 0; i < data.length; i += 1) {
      console.log(`${data[i].id} ${data[i].name}`);
    }
  },
);
