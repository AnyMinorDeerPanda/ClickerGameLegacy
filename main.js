// async function checkAccess(account) {
//   var access;
//   await fetch("https://clickergame.anyminordeerpanda.repl.co/whitelist.json")
//     .then(res => res.json())
//     .then(out => {
//       access = (account && out.includes(account))
//     })

//   return access
// }

async function checkAccess(account, callback) {
  var access;
  
  await $.getJSON('https://clickergame.anyminordeerpanda.repl.co/whitelist.json', data => {
    access = (account && data.includes(account))
  })

  callback(access)
}

if (window.location.href === "https://anyminordeerpanda.github.io/ClickerGame") window.loaction.replace('https://clickergame.anyminordeerpanda.repl.co')