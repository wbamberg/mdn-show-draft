document.querySelector("#last-saved-heading").textContent = chrome.i18n.getMessage("lastSavedHeading");
document.querySelector("#cached-heading").textContent = chrome.i18n.getMessage("cachedHeading");
document.querySelector("#compare-heading").textContent = chrome.i18n.getMessage("compareHeading");

function compare(request, sender, sendResponse) {
  var current = request.current;
  var cached = request.cached;
  document.querySelector("#current").textContent = current;
  document.querySelector("#cached").textContent = cached;

  var dmp = new diff_match_patch();
  var d = dmp.diff_main(current, cached);
  var ms_end = (new Date()).getTime();
  dmp.diff_cleanupSemantic(d);
  document.querySelector("#output").innerHTML = dmp.diff_prettyHtml(d);  
}

chrome.runtime.onMessage.addListener(compare);
