
function compare(request, sender, sendResponse) {
  var current = request.current;
  var cached = request.cached;

  document.querySelector("#current>.contents").textContent = current;
  document.querySelector("#cached>.contents").textContent = cached;

  var dmp = new diff_match_patch();
  var d = dmp.diff_main(current, cached);
  var ms_end = (new Date()).getTime();

  dmp.diff_cleanupSemantic(d);

  document.querySelector("#output>.contents").innerHTML = dmp.diff_prettyHtml(d);  
}

chrome.runtime.onMessage.addListener(compare);
