/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

const APIUrl = 'http://mentor-program.co/mtr04group1/Nicolakacha/week12/board';
const template = `
  <li class="className todo list-group-item d-flex justify-content-between align-items-center">
    <div class="todo-content">
      <span class="content">xxxxx</span>
      <input type="text" class="d-none">
    </div>
    <div class="functional-btn">
      <button class="check btn btn-primary">已完成</button>
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
  if (currentUrl.indexOf('?') !== -1) {
    const arr = currentUrl.split('?')[1].split('&');
    for (let i = 0; i <= arr.length - 1; i += 1) {
      if (arr[i].split('=')[0] === 'userID') {
        const userID = arr[i].split('=')[1];
        return userID;
      }
    }
  }
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
    const newTodo = template.replace(/xxxxx/gi, value).replace(/className/gi, 'ongoing');
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
  $('.todo-list').on('click', '.check.btn', (e) => {
    const btn = $(e.target);
    const todoForCheck = $(e.target).parent().parent();
    // 變成沒完成
    if (btn.hasClass('completed')) {
      todoForCheck.removeClass('completed');
      todoForCheck.find('.content').removeClass('completed-item');
      btn.removeClass('completed');
      btn.removeClass('btn-secondary').addClass('btn-primary');
      btn.text('已完成');
      btn.parent().find('.edit').show();
    // 變成已完成
    } else {
      todoForCheck.addClass('completed');
      todoForCheck.find('.content').addClass('completed-item');
      btn.addClass('completed');
      btn.removeClass('btn-primary').addClass('btn-secondary');
      btn.text('未完成');
      btn.parent().find('.edit').hide();
    }
  });

  // filter to do
  $('.main').on('click', '.all', () => {
    $('.todo').addClass('d-flex').show();
  });

  // filter to do
  $('.main').on('click', '.filter-ongoing', () => {
    $('.todo.completed').removeClass('d-flex').hide();
    $('.todo:not(.completed)').addClass('d-flex').show();
  });

  // filter to do
  $('.main').on('click', '.filter-completed', () => {
    $('.todo').removeClass('d-flex').hide();
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
    const clientTodoList = [];
    const oldTodos = document.querySelectorAll('.todo');
    oldTodos.forEach((todo) => {
      const clientTodo = {};
      if (todo.classList.contains('completed')) {
        clientTodo.state = 1;
      } else {
        clientTodo.state = 2;
      }
      clientTodo.content = todo.querySelector('.content').textContent;
      clientTodoList.push(clientTodo);
    });
    const x = JSON.stringify(clientTodoList);
    const newTodos = { userID, todos: x };
    console.log(newTodos);
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
        const getTodosFromDatabase = JSON.parse(data.todos[0].todos);
        getTodosFromDatabase.forEach((storedTodo) => {
          let li;
          if (storedTodo.state === 1) {
            li = template.replace(/xxxxx/gi, storedTodo.content).replace(/className/gi, 'completed');
          } else {
            li = template.replace(/xxxxx/gi, storedTodo.content).replace(/className/gi, '');
          }
          $('.todo-list').append(li);
        });

        document.querySelectorAll('.todo').forEach((todo) => {
          if (todo.classList.contains('completed')) {
            todo.querySelector('.content').classList.add('completed-item');
            todo.querySelector('.check.btn').classList.add('completed');
            todo.querySelector('.check.btn').classList.add('btn-secondary');
            todo.querySelector('.check.btn').textContent = '未完成';
            todo.querySelector('.edit').style.display = 'none';
          }
        });
      })
      .fail(err => console.log(err));
  }
});
