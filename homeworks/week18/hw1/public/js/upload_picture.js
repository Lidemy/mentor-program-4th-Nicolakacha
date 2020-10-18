function init() {
  const urlDOM = document.querySelector('.image__url');
  const uploadDOM = document.querySelector('.image__upload');
  const imageDOM = document.getElementById('image');

  uploadDOM.addEventListener('change', (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    fetch('https://api.imgur.com/3/image', {
      method: 'POST',
      headers: {
        Authorization: 'Client-ID 4610c48a0c55b2a',
      },
      body: formData,
    })
      .then(data => data.json())
      .then((data) => {
        urlDOM.value = data.data.link;
        imageDOM.src = data.data.link;
      });
  });
}

document.addEventListener('DOMContentLoaded', init);
