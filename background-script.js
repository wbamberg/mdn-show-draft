var compareUrl = chrome.extension.getURL("compare/compare.html");

function compare(currentContent, cachedContent) {

  chrome.tabs.create({
    "url": compareUrl
  });
  
  function sendToCompare(tabId, changeInfo, tab) {
    if (tab.url == compareUrl) {
      chrome.runtime.sendMessage({current: currentContent, cached: cachedContent});
      chrome.tabs.update(tabId, {active: true});
    }
  }

  chrome.tabs.onUpdated.addListener(sendToCompare);
}

chrome.runtime.onMessage.addListener(function(message) {
  if (!message.url) {
    return;
  }

  function onLoaded(e) {    
    var currentContent = xhr.responseXML.body.innerHTML;
    var cachedContent = message.draft;
    compare(currentContent, cachedContent);
  }

  function onError(e) {
    console.log(e);
  }

  var pageUrl = message.url.slice(0, -5) + "?raw";

  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onLoaded, false);
  xhr.addEventListener("error", onError, false);
  xhr.open("GET", pageUrl);
  xhr.responseType = "document";
  xhr.send();
});
