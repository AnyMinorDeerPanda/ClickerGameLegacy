const experimental = {
  accountDisableSave: false
}

const leaderboard = document.getElementById('leaderboard').getElementsByTagName('li')

Object.keys(leaderboard).forEach((value, index) => {
  leaderboard[index].innerText = 'Xtract' + ' - ' + Math.floor(Math.random() * 9999999)
})

document.getElementById('account').innerText = account.charAt(0)

const delay = ms => new Promise(res => setTimeout(res, ms));

var r = document.querySelector(':root');
r.style.setProperty('--pos', -100 + '%')

const defaults = {
  totalScore: 0,
  score: 0,
  clickers: 0,
  clicks: 1
}

const stats = {...defaults}

var clickersEnabled = true
var shop = false

const stock = {
  'clickerEfficiency': {
    'price': 1000,
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
stats.score = getLocal('score', stats.score)
stats.totalScore = getLocal('totalScore', stats.totalScore)

refreshValue('score', stats.score)
refreshValue('totalScore', stats.totalScore)
document.getElementById('clickNum').innerText = '+'+ stats.clicks

updatePrice()
startUpdate()

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

async function refreshValue(id, value) {
  localStorage.setItem(id, value)
  let element = await document.getElementById(id)
  element.innerText = value
}

function reset() {
  clickersEnabled = false
  localStorage.clear()
  location.reload()
}

function updatePrice() {
  var amount = document.getElementById('amount').value
  var item = document.getElementById('item').value
  var price = +amount * (+stock[item].price + (+stats[item] + +amount))
    
  document.getElementById('price').innerText = '$'+ price
}

function purchase() {
  var amount = document.getElementById('amount').value
  var item = document.getElementById('item').value

  getItem(item, amount)
}

function getItem(item, num) {
  if (stock[item].max != 'inf')
    if (stats[item] >= stock[item].max) return;

  let price = +num * (+stock[item].price + (+stats[item] + +num))
  
  if (stats.score < price) return;
  stats.score -= price
  
  stats[item] = +stats[item] + +num
  localStorage.setItem(item, stats[item])
  refreshValue('score', stats.score)

  if (item === 'clicks')
    document.getElementById('clickNum').innerText = '+'+ stats.clicks
}

function openShop() {
  r.style.setProperty('--pos', 0 + '%')
}

function closeShop() {
  r.style.setProperty('--pos', -100 + '%')
}

function startUpdate() {
  setTimeout(function() {
    if (clickersEnabled)
      increment(stats.clickers)

    startUpdate()
  }, 1000)
}

function showGamePrompt(id) {
  let prompt = document.getElementById(id)
  prompt.style.display = 'inline'
  return prompt
}

function hideGamePrompt(id) {
  let prompt = document.getElementById(id)
  prompt.style.display = 'none'
}

// function importSave() {
//   var prompt = showGamePrompt('saveCode')
//   document.getElementById('saveInput').removeAttribute('READONLY')
// }

// function exportSave() {
//   var prompt = showGamePrompt('saveCode')
//   prompt.getElementsByTagName('saveInput')
// }

// BETA SAVE FORMAT: EFFICIENCY:TOTALSCORE:SCORE:CLICKERS:CLICKS
// EX. 1000:931597737:928485160:19811:13152

function importSave() {
  let save = document.getElementById('save')
  let variables = save.value.split(':')
  Object.keys(stats).forEach((value, index) => {
    if (variables[index])
      stats[value] = variables[index]
    else
      stats[value] = defaults[value]

    refreshValue(value, stats[value])
  })
}

function exportSave() {
  let variables = []
  Object.keys(stats).forEach((value, index) => {
    variables[index] = stats[value]
  })
  let save = variables.join(':')
  document.getElementById('save').value = save
  copyText('save')
}

function copyText(id) {
    let textbox = document.getElementById(id)
    textbox.select();
    textbox.setSelectionRange(0, 99999);
    document.execCommand("copy");
}

var ABC = {
  toAscii: function(bin) {
    return bin.replace(/\s*[01]{8}\s*/g, function(bin) {
      return String.fromCharCode(parseInt(bin, 2))
    })
  },
  toBinary: function(str, spaceSeparatedOctets) {
    return str.replace(/[\s\S]/g, function(str) {
      str = ABC.zeroPad(str.charCodeAt().toString(2));
      return !1 == spaceSeparatedOctets ? str : str + " "
    })
  },
  zeroPad: function(num) {
    return "00000000".slice(String(num).length) + num
  }
};