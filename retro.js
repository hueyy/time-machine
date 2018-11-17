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
    'https://www.warnerbros.com/archive/spacejam/movie/cmp/behind/img/bg-behind.gif',
    'https://www.warnerbros.com/archive/spacejam/movie/cmp/lineup/img/bg-lineup.gif',
    'https://www.warnerbros.com/archive/spacejam/movie/cmp/souvenirs/img/bg-souvenirs.gif',
    'https://www.warnerbros.com/archive/spacejam/movie/cmp/jump/img/bg-jump.gif'
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
      border-top: #999 5px solid !important;
      border-left: #999 5px solid !important;
      border-right: #ddd 5px solid !important;
      border-bottom: #ddd 5px solid !important;
      background-color: #fff !important;
      color: #000 !important;
      border-radius: 0 !important;
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

const redrawScroll = () => {
  document.body.style.overflow = 'hidden'
  document.body.style.overflow = 'auto'
}

const resetNavigation = () => {
  const navLinks = document.querySelectorAll('nav>ul>li>a')
  const newNav = document.createElement('div')
  navLinks.forEach(navLink => {
    newNav.appendChild(navLink)
  })

  newNav.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    background-color: #fff;
    width: 200px;
    display: flex;
    flex-direction: column;
    overflow:scroll;
  `
  document.body.appendChild(newNav)
}

const replaceImages = () => {
  const images = document.querySelectorAll('img')
  images.forEach(image => {
    image.src = `https://retro.mntco.de/resample?url=${encodeURIComponent(image.src)}`
    image.removeAttribute('srcset')
  })

  const pictures = document.querySelectorAll('picture>source')
  pictures.forEach(pic => {
    pic.srcset = `https://retro.mntco.de/resample?url=${encodeURIComponent(pic.srcset.split(' ')[0])}`
  })
}

const addMarquees = () => {
  const h2s = document.querySelectorAll('h2')
  h2s.forEach(h2 => {
    if(Math.random() >= 0.5){
      const marquee = document.createElement('marquee')
      h2.parentNode.insertBefore(marquee, h2)
      marquee.appendChild(h2)
    }
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
        resetButtons()
        resetInputs()
        addHitCounter()
        resetNavigation()
        replaceImages()
        redrawScroll()
        addMarquees()
      } else {
        window.location.reload()
      }

      sendResponse({ done: true })
    }
  }
)
