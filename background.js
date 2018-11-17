// this runs in the background

const beginIconRotation = () => {
  const maxIcon = 85
  const minIcon = 1
  let current = minIcon

  const rotateIcon = () => {
    chrome.browserAction.setIcon({ path: `images/spinning-tardis/tardis (${current}).png` })
    if(current ++ > maxIcon){
      current = minIcon
    }
    window.setTimeout(rotateIcon, 50)
  }

  rotateIcon()
}

chrome.runtime.onInstalled.addListener(function() {
  beginIconRotation()
  /*
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher()
        ],
        actions: [ new chrome.declarativeContent.ShowPageAction() ]
      }
    ])
  })
  */
})

chrome.browserAction.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

    const tabId = tabs[0].id

    chrome.tabs.sendMessage(tabId, { toggle: true }, (response) => {
      console.log(response)
    })
  })
})
