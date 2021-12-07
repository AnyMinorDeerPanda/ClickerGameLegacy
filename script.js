const delay = ms => new Promise(res => setTimeout(res, ms));

var score = 0
var totalScore = 0
var clicks = 1
var clickers = 0
var shop = false

clicks = getLocal('clicks', clicks)
clickers = getLocal('clickers', clickers)
score = getLocal('score', score)
totalScore = getLocal('totalScore', totalScore)

document.getElementById('score').innerText = score
document.getElementById('totalScore').innerText = totalScore

function increment(number) {
  totalScore = parseInt(totalScore) + parseInt(number)
  score = parseInt(score) + parseInt(number)
  
  refreshValue('score', score)
  refreshValue('totalScore', totalScore)
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
  localStorage.clear()
  location.reload()
}

function getClick(clickNum) {
  if (!(score > clickNum * 10)) return;
  score = parseInt(score) - (parseInt(clickNum) * 10)
  
  clicks = parseInt(clicks) + parseInt(clickNum)
  localStorage.setItem('clicks', clicks)
  refreshValue('score', score)
}

function getClicker(clickerNum) {
  if (!(score > clickerNum * 100)) return;
  score = parseInt(score) - (parseInt(clickerNum) * 100)
  
  clickers = parseInt(clickers) + parseInt(clickerNum)
  localStorage.setItem('clickers', clickers)
  refreshValue('score', score)
}

function openShop() {
  document.getElementById('shop').style.top = 0 + "px"
}

function closeShop() {
  document.getElementById('shop').style.top = -75 + "px"
}

setInterval(function() {
  increment(clickers)
}, 1000)