/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

const APIUrl = 'http://mentor-program.co/mtr04group1/Nicolakacha/week12/todo';
const template = `
  <li class="ongoing todo list-group-item d-flex justify-content-between align-items-center">
    <div class="todo-content">
      <span class="content">xxxxx</span>
      <input type="text" class="d-none">
    </div>
    <div class="functional-btn">
      <button class="completed btn btn-primary">已完成</button>
      <button class="edit btn btn-success" data-toggle="modal" data-target="#edit-content">編輯</button>
      <button class="delete btn btn-danger">刪除</button>  
    </div>
  </li>`;

const reminder = `
  <div class="reminder alert alert-danger text-center" role="alert">
    請輸入資料哦！
  </div>`;

// get the userID from query parameter
function getUserID() {
  const currentUrl = location.href;
  let userID = '';
  if (currentUrl.indexOf('?') !== -1) {
    const arr = currentUrl.split('?')[1].split('&');
    for (let i = 0; i <= arr.length - 1; i += 1) {
      if (arr[i].split('=')[0] === 'userID') {
        userID = arr[i].split('=')[1];
      }
    }
  }
  return userID;
}

// enocde input to avoid xss attack
function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

$(document).ready(() => {
  const userID = getUserID();
  // add new todo
  $('.submit').click(() => {
    const value = encodeHTML($('.todo-input').val());
    const newTodo = template.replace(/xxxxx/gi, value);
    $('.todo-input').val('');
    if (value.trim() !== '') {
      $('.reminder').remove();
      $('.todo-list').prepend(newTodo);
    } else {
      $('.main').prepend(reminder);
    }
  });
  // delete todo
  $('.todo-list').on('click', '.delete.btn', (e) => {
    $(e.target).parent().parent().remove();
  });
  // complete todo
  $('.todo-list').on('click', '.completed.btn', (e) => {
    $(e.target)
      .parent()
      .parent()
      .find('.content')
      .toggleClass('completed-item');
    $(e.target).parent().parent().toggleClass('completed');
    $(e.target).parent().parent().toggleClass('ongoing');
    if ($(e.target).text() === '已完成') {
      $(e.target).text('未完成');
      $(e.target).removeClass('btn-primary').addClass('btn-secondary');
      $(e.target).parent().find('.edit').hide();
    } else {
      $(e.target).text('已完成');
      $(e.target).addClass('btn-primary').removeClass('btn-secondary');
      $(e.target).parent().find('.edit').show();
    }
  });
  // filter to do
  $('.main').on('click', '.all', () => {
    $('.todo').addClass('d-flex').show();
  });
  // filter to do
  $('.main').on('click', '.filter-ongoing', () => {
    $('.todo.completed').removeClass('d-flex').hide();
    $('.todo.ongoing').addClass('d-flex').show();
  });
  // filter to do
  $('.main').on('click', '.filter-completed', () => {
    $('.todo.ongoing').removeClass('d-flex').hide();
    $('.todo.completed').addClass('d-flex').show();
  });
  // edit to do
  $('.main').on('click', '.edit', (e) => {
    const originTodo = $(e.target).parent().parent().find('.content')
      .text();
    $('.edit-todo-input').val(originTodo);
    $('.main').on('click', '.confirm', () => {
      const newTodo = $('.edit-todo-input').val();
      $(e.target).parent().parent().find('.content')
        .text(newTodo);
    });
  });

  // Save todo to database
  $(document).on('click', '.save', () => {
    const todos = $('.todo-list').html();
    const newTodos = { userID, todos };
    $.ajax({
      type: 'POST',
      url: `${APIUrl}/api_add_todos.php`,
      data: newTodos,
    })
      .done((data) => {
        const userIDNumber = data.userID;
        $('.save-title').text(`您好，您的 userID 是 ${userIDNumber} `);
        $('.userID').text(
          '保存好囉，請記下您的 userID，在網址列後面加上 ?userID={您的userID} 即可訪問個人的 Todo List~',
        );
      })
      .fail(err => console.log(err));
  });

  // read todo by userID
  if (userID !== '') {
    $.ajax({
      type: 'GET',
      url: `${APIUrl}/api_todos.php?userID=${userID}`,
    })
      .done((data) => {
        const savedTodo = data.todos[0].todos;
        $('.todo-list').append(savedTodo);
      })
      .fail(err => console.log(err));
  }
});
