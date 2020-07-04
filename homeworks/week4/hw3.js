const request = require('request');

const APIUrl = 'https://restcountries.eu/rest/v2';
const country = process.argv[2];

function getCountry(countryName) {
  request.get(
    `${APIUrl}/name/${countryName}`,
    (error, response, body) => {
      let data;
      try {
        data = JSON.parse(body);
        if (data.status === 404) {
          console.log('找不到國家資訊');
        }
      } catch (err) {
        console.log('API抓取錯誤', error);
      }
      for (let i = 0; i < data.length; i += 1) {
        console.log('============');
        console.log(`國家：${data[i].name}`);
        console.log(`首都：${data[i].capital}`);
        console.log(`貨幣：${data[i].currencies[0].code}`);
        console.log(`國碼：${data[i].callingCodes[0]}`);
      }
    },
  );
}

if (country) {
  getCountry(country);
} else {
  console.log('請輸入國家名稱');
}
