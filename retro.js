// runs in active tab
var cursorStyle = document.createElement("link");
cursorStyle.setAttribute("rel", "stylesheet");
cursorStyle.setAttribute("type", "text/css");
var cursors = ["hollow", "pyramid", "sword", "triforce"];
var cursorURL = "cursor-" + cursors[Math.round(Math.random() * cursors.length) % cursors.length] + ".css";
cursorStyle.setAttribute("href", chrome.runtime.getURL(cursorURL));
document.head.appendChild(cursorStyle);

const randElement = arr => arr[Math.floor(Math.random() * arr.length)]

const activateUniversalStyles = () => {
  document.body.classList.add('retro-activated')
}

const downgradeBackground = () => {
  const tiledBackgrounds = [
    'https://i.imgur.com/lu5XT48.gif',
    'https://www.warnerbros.com/archive/spacejam/movie/img/bg_stars.gif',
    'https://www.warnerbros.com/archive/spacejam/movie/cmp/behind/img/bg-behind.gif'
  ]

  const body = document.querySelector('body')
  const background = randElement(tiledBackgrounds)

  body.setAttribute('style', `${body.style.cssText}background: url('${background}') !important;`)
}

const randomiseTextColor = () => {
  const allText = document.querySelectorAll('p,span,li')
  const possibleColors = [
    '#00ff40',
    '#ffff00',
    '#ff0000',
    '#ff00ff',
    '#ffffff'
  ]
  allText.forEach(text => {
    const color = randElement(possibleColors)
    text.setAttribute('style', `${text.style.cssText}color: ${color} !important;`)
  })
}

const styleHeaders = () => {
  const allHeaders = document.querySelectorAll('h1,h2,h3')
  const possibleClasses = [
    'rainbow-wordart',
    'blue-impact-wordart',
    'superhero-wordart'
  ]
  allHeaders.forEach(text => {
    const randomClass = randElement(possibleClasses)
    text.classList.add(randomClass)
    // text.innerHTML = text.textContent
  })
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if(!sender.tab || !sender.tab.url){
      // from background script

      console.log(request.activate)
      if(request.activate){
        activateUniversalStyles()
        downgradeBackground()
        randomiseTextColor()
        styleHeaders()
      } else {
        window.location.reload()
      }

      sendResponse({ done: true })
    }
  }
)
