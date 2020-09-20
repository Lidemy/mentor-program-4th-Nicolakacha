/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-extraneous-dependencies */

import $ from 'jquery';
import { getComments, addComment } from './api';
import { appendCommentToDOM, getStyle } from './utils';
import { css, getForm, remindMsg } from './templates';

export function init(options) {
  let cursor = null;
  let commentsDOM = null;
  let containerElement = '';

  const { siteKey, apiUrl } = options;
  const commentsClassName = `${siteKey}-comments`;
  const commentSelector = `.${commentsClassName}`;
  const formClassName = `${siteKey}-add-comment-form`;
  const formSelector = `.${formClassName}`;
  const btnClassName = `${siteKey}-container`;
  const btnSelector = `.${btnClassName}`;

  containerElement = $(options.containerSelector);
  containerElement.append(getForm(formClassName, commentsClassName, btnClassName));
  commentsDOM = $(commentSelector);

  function getNewComments() {
    getComments(apiUrl, siteKey, cursor, (data) => {
      if (!data.ok) {
        return;
      }
      const comments = data.discussion;
      if (comments.length < 6) {
        for (let i = 0; i < comments.length; i += 1) {
          appendCommentToDOM(commentsDOM, comments[i]);
        }
        $(`${btnSelector} .load-more`).hide();
      } else {
        for (let i = 0; i < comments.length - 1; i += 1) {
          appendCommentToDOM(commentsDOM, comments[i]);
        }
        cursor = comments[comments.length - 2].id;
      }
    });
  }

  getStyle(css);
  getNewComments();

  $(`${btnSelector} .load-more`).click(() => {
    getNewComments();
  });
  $(formSelector).submit((e) => {
    e.preventDefault();
    const nickname = $(`${formSelector} input[name=nickname]`).val();
    const content = $(`${formSelector} textarea[name=content]`).val();
    if (nickname === '' || content === '') {
      $(`${formSelector} .alert`).remove();
      $(formSelector).prepend(remindMsg);
      return;
    }
    const newComment = {
      site_key: siteKey,
      nickname,
      content,
    };
    addComment(apiUrl, siteKey, newComment, (data) => {
      newComment.created_at = data.created_at;
      appendCommentToDOM(commentsDOM, newComment, true);
      $(`${formSelector} .form-control`).val('');
      $(`${formSelector} .alert`).remove();
    });
  });
}
