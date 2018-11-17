// runs in active tab

const randElement = arr => arr[Math.floor(Math.random() * arr.length)]

const downgradeBackground = () => {
  const tiledBackgrounds = [
    'https://i.imgur.com/lu5XT48.gif',
    'https://www.warnerbros.com/archive/spacejam/movie/img/bg_stars.gif',
    'https://www.warnerbros.com/archive/spacejam/movie/cmp/behind/img/bg-behind.gif'
  ]

  const body = document.querySelector('body')
  const background = randElement(tiledBackgrounds)
  console.log(background)

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

window.setTimeout(() => {
  downgradeBackground()
  randomiseTextColor()
}, 1000)
