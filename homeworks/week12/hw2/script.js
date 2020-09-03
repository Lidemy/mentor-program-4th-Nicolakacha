/* eslint-disable prefer-destructuring */
/* eslint-disable no-alert */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
const APIUrl = 'http://localhost:80/nicolas_php_projects/week12_hw2';
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

function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

$(document).ready(() => {
  const userID = getUserID();
  $('.submit').click(() => {
    const value = encodeHTML($('.todo-input').val());
    const newTodo = template.replace(/xxxxx/gi, value);
    $('.todo-input').val('');
    if (value.trim() !== '') {
      $('.todo-list').prepend(newTodo);
    } else {
      alert('請輸入內容');
    }
  });
  $('.todo-list').on('click', '.delete.btn', (e) => {
    $(e.target).parent().parent().remove();
  });
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
  $('.main').on('click', '.all', () => {
    $('.todo').addClass('d-flex').show();
  });
  $('.main').on('click', '.filter-ongoing', () => {
    $('.todo.completed').removeClass('d-flex').hide();
    $('.todo.ongoing').addClass('d-flex').show();
  });
  $('.main').on('click', '.filter-completed', () => {
    $('.todo.ongoing').removeClass('d-flex').hide();
    $('.todo.completed').addClass('d-flex').show();
  });
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
          '您的資料已保存好囉，請記下您的 userID，下次登入時在網址列後面加上 ?userID={您的userID} 就可以找到儲存記錄了~',
        );
      })
      .fail(err => console.log(err));
  });
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
