const account = window.sessionStorage.getItem('account')

$.getJSON('https://clickergame.anyminordeerpanda.repl.co/changelog.json', data => {
  loadChangelog(data)
})

checkAccess(account, access => {
  if (account) {
    if (access) {
      document.getElementById('login').hidden = true
      document.getElementById('start').removeAttribute('disabled')
    } else {
      document.getElementById('prompt').innerText = "This account does not have access to the beta. "
    }
  }
})

function start() {
  window.location.replace('/')
}

function loadChangelog(changelog) {
  var element = document.getElementById('changelog')
  Object.keys(changelog).forEach((value, index) => {
    var list = document.createElement('ul')
    let log = document.createElement('div')
    let ver = document.createElement('h2')
    ver.innerText = value
    
    log.append(ver)
    log.append(list)
    element.append(log)

    changelog[value].forEach((value, index) => {
      let item = document.createElement('li')
      item.innerText = value
      
      list.append(item)
    })
  })
}