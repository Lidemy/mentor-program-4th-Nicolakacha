export const remindMsg = '<div class="alert alert-danger mt-5" role="alert">Please complete both nickname and content!</div>';

export function getForm(formClassName, commentsClassName, btnClassName) {
  return `
    <div>
      <form class="${formClassName} mt-4 mb-4">
        <div class="form-group">
          <label for="nickname">Nickname</label>
          <input class="form-control" name="nickname" aria-describedby="emailHelp">
        </div>
        <div class="form-group">
          <label for="content-textarea">Please leave your message here</label>
          <textarea name="content" class="form-control" aria-label="With textarea"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div class="${commentsClassName}"></div>
      <div class="${btnClassName} d-flex justify-content-center mb-2">
        <button type="button" class="load-more btn btn-primary">Read More</button>
      </div>
    </div>
  `;
}

export const css = `
  @import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@300;400&display=swap');
  @import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css");
  * {font-family: 'Ubuntu';}
  .card .content { margin-bottom: 0;}
  .card .time {color: rgb(112, 112, 112);}
  .card-top {justify-content: space-between;}
`;
