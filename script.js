var score = 0
var totalScore = 0
var clicks = 1
var shop = false

if (!localStorage.getItem('clicks')) 
  localStorage.setItem('clicks', clicks)
else
  clicks = localStorage.getItem('clicks')

if (!localStorage.getItem('score') || !localStorage.getItem('totalScore')) {
  localStorage.setItem('score', score)
  localStorage.setItem('totalScore', totalScore)
} else {
  score = localStorage.getItem('score')
  totalScore = localStorage.getItem('totalScore')
}

document.getElementById('score').innerText = score
document.getElementById('totalScore').innerText = totalScore

function increment() {
  totalScore = parseInt(totalScore) + parseInt(clicks)
  score = parseInt(score) + parseInt(clicks)
  
  refreshValue('score', score)
  refreshValue('totalScore', totalScore)
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
  console.log(clickNum)
  if (!(score > clickNum * 10)) return;
  score = parseInt(score) - (parseInt(clickNum) * 10)
  
  clicks = parseInt(clicks) + parseInt(clickNum)
  localStorage.setItem('clicks', clicks)
  refreshValue('score', score)
}

function openShop() {
  document.getElementById('shop').style.top = 0 + "px"
}

function closeShop() {
  document.getElementById('shop').style.top = -75 + "px"
}