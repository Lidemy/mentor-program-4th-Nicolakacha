/* eslint-disable import/no-extraneous-dependencies */
import $ from 'jquery';

export function getComments(apiUrl, siteKey, cursor, cb) {
  let url = `${apiUrl}/api_comments.php?site_key=${siteKey}`;
  if (cursor) {
    url += `&cursor=${cursor}`;
  }
  $.ajax({ url })
    .done(data => cb(data))
    .fail(err => console.log(err));
}

export function addComment(apiUrl, siteKey, data, cb) {
  $.ajax({
    type: 'POST',
    url: `${apiUrl}/api_add_comments.php`,
    data,
  })
    .done((data2) => { cb(data2); })
    .fail(err => console.log(err));
}
