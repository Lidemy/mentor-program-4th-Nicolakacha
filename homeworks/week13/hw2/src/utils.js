export function encodeHTML(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
}

export function appendCommentToDOM(container, comment, isPrepend) {
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

export function getStyle(css) {
  const styleElement = document.createElement('style');
  styleElement.type = 'text/css';
  styleElement.appendChild(document.createTextNode(css));
  document.head.appendChild(styleElement);
}
