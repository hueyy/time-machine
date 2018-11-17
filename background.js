// this runs in the background
chrome.runtime.onInstalled.addListener(function() {
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
})

chrome.pageAction.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

    const tabId = tabs[0].id

    chrome.tabs.sendMessage(tabId, { toggle: true }, (response) => {
      console.log(response)
    })
  })
})