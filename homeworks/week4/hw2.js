/* eslint-disable no-unused-vars */
const request = require('request');

const action = process.argv[2];
const parameter = process.argv[3];
const parameterTwo = process.argv[4];
const APIUrl = 'https://lidemy-book-store.herokuapp.com';

function listBook() {
  request.get(
    `${APIUrl}/books?_limit=20`,
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
}

function readBook(id) {
  request.get(
    `${APIUrl}/books/${id}`,
    (error, response, body) => {
      let data;
      try {
        data = JSON.parse(body);
      } catch (err) {
        console.log('API抓取錯誤', error);
        return;
      }
      console.log(`${data.id} ${data.name}`);
    },
  );
}

function deleteBook(id) {
  request.delete(
    `${APIUrl}/books/${id}`,
    (error, response, body) => {
      try {
        console.log('刪掉啦');
      } catch (err) {
        console.log('沒刪到', error);
      }
    },
  );
}

function createBook(name) {
  request.post({
    url: `${APIUrl}/books`,
    form: {
      name,
    },
  }, (error, response, body) => {
    try {
      console.log(`《${name}》新增成功`);
    } catch (err) {
      console.log('新增失敗', error);
    }
  });
}

function updateBook(id, name) {
  request.patch({
    url: `${APIUrl}/books/${id}`,
    form: {
      name,
    },
  }, (error, response, body) => {
    try {
      console.log(`${id} 已修改為 ${name}`);
    } catch (err) {
      console.log('修改失敗', error);
    }
  });
}

function manual() {
  console.log('list (列出前 20 本書的 id 及書名)');
  console.log('read x (輸出id為x的書)');
  console.log('delete x (刪除 id 為 x 的書)');
  console.log('create name (新增一本名為 name 的書)');
  console.log('update x n(更新 id 為 x 的書為 n)');
}

switch (action) {
  case 'list':
    listBook();
    break;
  case 'read':
    readBook(parameter);
    break;
  case 'delete':
    deleteBook(parameter);
    break;
  case 'create':
    createBook(parameter);
    break;
  case 'update':
    updateBook(parameter, parameterTwo);
    break;
  case 'manual':
    manual();
    break;
  default:
    console.log('可執行的指令: list, read, delete, create, update, manual');
    console.log('執行指令 node hw2.js manual 可查看各指令用法');
}
