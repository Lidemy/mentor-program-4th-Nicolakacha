/* eslint-disable no-undef */
const APIUrl = 'http://mentor-program.co/mtr04group1/Nicolakacha/week12/board';
let cursor = null;

function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

function appendCommentToDOM(container, comment, isPrepend) {
  const html = `
    <div class="card m-2">
      <div class="card-body">
        <div class="card-top d-flex">
          <h5 class="card-title"><i class="fa fa-user" aria-hidden="true"></i>&nbsp;&nbsp;${encodeHTML(comment.nickname)}</h5>
          <p class="card-text time">${comment.created_at}</p>
        </div>
        <p class="card-text content">${encodeHTML(comment.content)}</p>
        <input hidden value="${comment.id}"/>
      </div>
    </div>`;
  if (isPrepend) {
    container.prepend(html);
  } else {
    container.append(html);
  }
}

function getCommentsAPI(cursorDefault, cb) {
  let url = `${APIUrl}/api_comments.php?site_key=nicolas`;
  if (cursorDefault) {
    url += `&cursor=${cursor}`;
  }
  $.ajax({ url })
    .done(data => cb(data))
    .fail(err => console.log(err));
}

function getComments() {
  const commentsDOM = $('.comments');
  getCommentsAPI(cursor, (data) => {
    if (!data.ok) {
      console.log(data.message);
      return;
    }
    // Get 6 comments at first but don't render the last one. The last one is for checking purpose.
    const comments = data.discussion;
    // If comments < 6, there is no more to get
    // then render all comments and also hide the load more button.
    if (comments.length < 6) {
      for (let i = 0; i < comments.length; i += 1) {
        appendCommentToDOM(commentsDOM, comments[i]);
      }
      $('.load-more').hide();
      // if comments >= 6, we only render the first 5 of them.
    } else {
      for (let i = 0; i < comments.length - 1; i += 1) {
        appendCommentToDOM(commentsDOM, comments[i]);
      }
      // Set the 2nd last comment's id as cursor.
      cursor = comments[comments.length - 2].id;
      console.log(cursor);
    }
  });
}

$(document).ready(() => {
  const commentsDOM = $('.comments');
  getComments();
  // load more comments
  $('.load-more').click(() => {
    getComments();
  });
  // add new comments
  $('.add-comment-form').submit((e) => {
    e.preventDefault();
    const newComment = {
      site_key: 'nicolas',
      nickname: $('input[name=nickname]').val(),
      content: $('textarea[name=content]').val(),
    };
    $.ajax({
      type: 'POST',
      url: `${APIUrl}/api_add_comments.php`,
      data: newComment,
    })
      .done((data) => {
        console.log(data);
        newComment.created_at = data.created_at;
        appendCommentToDOM(commentsDOM, newComment, true);
        $('.form-control').val('');
      })
      .fail(err => console.log(err));
  });
});
