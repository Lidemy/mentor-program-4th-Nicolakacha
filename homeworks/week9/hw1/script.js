
function changeTheme() {
  const toggleSwitch = document.querySelector('input[type="checkbox"]');
  const toggleIcon = document.querySelector('.toggle-icon');

  function changeToDark() {
    toggleIcon.classList.replace('fa-sun-o', 'fa-moon-o');
  }
  function changeToLight() {
    toggleIcon.classList.replace('fa-moon-o', 'fa-sun-o');
  }

  function switchTheme(e) {
    if (e.target.checked) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      changeToDark();
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      changeToLight();
    }
  }

  toggleSwitch.addEventListener('change', switchTheme);
  const currentTheme = localStorage.getItem('theme');
  if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
      toggleSwitch.checked = true;
      changeToDark();
    }
  }
}

changeTheme();
