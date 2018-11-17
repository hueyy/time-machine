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

let tabState = {}

chrome.pageAction.onClicked.addListener(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

    const tabId = tabs[0].id
    
    let activate = true
    if(tabState[tabId]){
      activate = false
    }
    tabState[tabId] = activate
    console.log(tabState)

    chrome.tabs.sendMessage(tabId, { activate }, (response) => {
      console.log(response)
    })
  })
})