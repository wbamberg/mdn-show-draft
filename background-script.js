var compareUrl = chrome.extension.getURL("compare/compare.html");
var compareData;

function sendToCompare(tabId, changeInfo, tab) {
  if (tab.url == compareUrl && compareData) {
    chrome.runtime.sendMessage(compareData);
    chrome.tabs.update(tabId, {active: true});
  }
}

chrome.tabs.onUpdated.addListener(sendToCompare);

chrome.runtime.onMessage.addListener(function(message) {
  if (!message.url) {
    return;
  }

  function onLoaded(e) {    
    compareData = {
      current: xhr.responseXML.body.innerHTML,
      cached: message.draft
    };

    chrome.tabs.create({
      "url": compareUrl
    });
  }

  function onError(e) {
    console.log(e);
  }

  var pageUrl = message.url.slice(0, -5) + "?raw" + "&" + (new Date()).getTime();

  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", onLoaded, false);
  xhr.addEventListener("error", onError, false);
  xhr.open("GET", pageUrl);
  xhr.responseType = "document";
  xhr.send();
});
