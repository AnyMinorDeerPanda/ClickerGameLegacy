const urlParams = new URLSearchParams(window.location.search);
var redirectURL = urlParams.get('href');

if (!redirectURL)
  redirectURL = window.location.href

function login() {
  let username = document.getElementById('username').value
  let password = document.getElementById('password').value

  var urlToGet = 'https://xtract-api.anyminordeerpanda.repl.co/'+ 'login/check?user=' + username + '&pass=' + password;

  fetch(urlToGet)
  .then(response => {
    return response.json();
  })
  .then(data => {
    if (data === "Success") {
      window.sessionStorage.setItem('account', username)
      window.location.replace('/beta')
    } else if (data === "403") {
      alert("403 Forbidden")
      return false;
    } else {
      alert("Invalid Username/Password");
      return false;
    }
  })
}

function register() {
  let username = document.getElementById('username').value
  let password = document.getElementById('password').value

  var urlToGet = 'https://xtract-api.anyminordeerpanda.repl.co/'+ 'login/add?user=' + username + '&pass=' + password;

  fetch(urlToGet)
  .then(response => {
    return response.json();
  })
  .then(data => {
    if (data === "Accepted") {
      return true;
    } else if (data === "403") {
      alert("403 Forbidden")
      return false;
    } else {
      alert("Account already exists!");
      return false;
    }
  })
}