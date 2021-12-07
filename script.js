const delay = ms => new Promise(res => setTimeout(res, ms));

var r = document.querySelector(':root');
r.style.setProperty('--pos', -100 + '%')

const stats = {
  'clickerEfficiency': 0,
  'totalScore': 0,
  'score': 0,
  'clickers': 0,
  'clicks': 1
}

var clickersEnabled = true
var shop = false

const stock = {
  'clickerEfficiency': {
    'price': 10000,
    'max': 999
  },
  'clickers': {
    'price': 100,
    'max': 'inf'
  },
  'clicks': {
    'price': 10,
    'max': 'inf'
  }
}

stats.clicks = getLocal('clicks', stats.clicks)
stats.clickers = getLocal('clickers', stats.clickers)
stats.clickerEfficiency = getLocal('efficiency', stats.clickerEfficiency)
stats.score = getLocal('score', stats.score)
stats.totalScore = getLocal('totalScore', stats.totalScore)

document.getElementById('score').innerText = score
document.getElementById('totalScore').innerText = totalScore

fireClickers()

function increment(number) {
  stats.totalScore = parseInt(stats.totalScore) + parseInt(number)
  stats.score = parseInt(stats.score) + parseInt(number)
  
  refreshValue('score', stats.score)
  refreshValue('totalScore', stats.totalScore)
}


function getLocal(id, value) {
  if (!localStorage.getItem(id)) {
    localStorage.setItem(id, value)
    return value;
  } else {
    return localStorage.getItem(id);
  }
}

function refreshValue(id, value) {
  localStorage.setItem(id, value)
  document.getElementById(id).innerText = value
}

function reset() {
  clickersEnabled = false
  localStorage.clear()
  location.reload()
}

function getItem(item, num) {
  if (!(stock[item].max === 'inf') || stats[item] >= stock[item].max) return
  if (!(stats.score >= num * stock[item].price)) return;
  stats.score = parseInt(stats.score) - (parseInt(num) * stock[item].price)
  
  stats[item] = parseInt(stats[item]) + parseInt(num)
  localStorage.setItem(item, stats[item])
  refreshValue('score', stats.score)
}

function openShop() {
  r.style.setProperty('--pos', 0 + '%')
}

function closeShop() {
  r.style.setProperty('--pos', -100 + '%')
}

function fireClickers () {
  setTimeout(function() {
    if (clickersEnabled)
      increment(stats.clickers)

    fireClickers()
  }, 1000 - stats.clickerEfficiency)
}