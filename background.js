// this runs in the background
chrome.runtime.onInstalled.addListener(function() {
  console.log('Extension running')
});