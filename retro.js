// runs in active tab

const randElement = arr => arr[Math.floor(Math.random() * arr.length)]

const activateUniversalStyles = () => {
  document.body.classList.add('retro-activated')
}

const injectCursor = () => {
  const cursorStyle = document.createElement("link");
  cursorStyle.setAttribute("rel", "stylesheet");
  cursorStyle.setAttribute("type", "text/css");
  const cursors = ["hollow", "pyramid", "sword", "triforce"];
  const cursorURL = "cursor-" + cursors[Math.round(Math.random() * cursors.length) % cursors.length] + ".css";
  cursorStyle.setAttribute("href", chrome.runtime.getURL(cursorURL));
  document.head.appendChild(cursorStyle);
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

const resetButtons = () => {
  const allButtons = document.querySelectorAll('button,input[type="submit"]')
  allButtons.forEach(button => {
    button.setAttribute('style', `
      border-top: #ddd 5px solid !important;
      border-left: #ddd 5px solid !important;
      border-right: #999 5px solid !important;
      border-bottom: #999 5px solid !important;
      box-sizing: content-box;
      background: lightgrey !important;
      padding: 3px !important;
      color: black !important;
      text-decoration: none !important;
    `)
  })
}

const resetInputs = () => {
  const allInputs = document.querySelectorAll('input[type="text"],textarea')
  allInputs.forEach(input => {
    input.setAttribute('style', `
      border-top: #999 5px solid;
      border-left: #999 5px solid;
      border-right: #ddd 5px solid;
      border-bottom: #ddd 5px solid;
    `)
  })
}

const addHitCounter = () => {
  // const numberOfHits = Math.floor(Math.random() * 99999998) + 1
  const hitImages = [
    'https://i.imgur.com/FpPGzPs.png',
    'https://i.imgur.com/4YJbNJy.png'
  ]
  const hitCounterUrl = randElement(hitImages) //`https://counter.websiteout.net/example.php?C=${24}&D=8&N=${numberOfHits}`
  const image = document.createElement('img')
  image.src = hitCounterUrl
  image.setAttribute('referrerpolicy', 'no-referrer')
  image.style.cssText = `
    display: block;
    margin: 0 auto;
    margin-bottom: 50px;
  `
  document.body.appendChild(image)
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
        resetButtons()
        resetInputs()
        addHitCounter()
      } else {
        window.location.reload()
      }

      sendResponse({ done: true })
    }
  }
)
