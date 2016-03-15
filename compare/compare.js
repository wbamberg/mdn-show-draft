/*
Set text content for the headings, from locale files.
*/
document.querySelector("#last-saved-revision>h2").textContent = chrome.i18n.getMessage("lastSavedRevision");
document.querySelector("#cached-draft>h2").textContent = chrome.i18n.getMessage("cachedDraft");
document.querySelector("#comparison>h2").textContent = chrome.i18n.getMessage("comparison");

/*
Set text content for the button labels, from locale files.
*/
document.querySelector('label[for="last-saved-revision-button"]').textContent = chrome.i18n.getMessage("lastSavedRevision");
document.querySelector('label[for="cached-draft-button"]').textContent = chrome.i18n.getMessage("cachedDraft");
document.querySelector('label[for="comparison-button"]').textContent = chrome.i18n.getMessage("comparison");

/*
Listen for clicks on the buttons and show/hide sections.
*/
document.querySelector("#last-saved-revision-button").addEventListener("click", function(e) {
  document.querySelector("#last-saved-revision").classList.remove("hidden");
  document.querySelector("#cached-draft").classList.add("hidden");
  document.querySelector("#comparison").classList.add("hidden");
});

document.querySelector("#cached-draft-button").addEventListener("click", function(e) {
  document.querySelector("#cached-draft").classList.remove("hidden");
  document.querySelector("#last-saved-revision").classList.add("hidden");
  document.querySelector("#comparison").classList.add("hidden");
});

document.querySelector("#comparison-button").addEventListener("click", function(e) {
  document.querySelector("#comparison").classList.remove("hidden");
  document.querySelector("#last-saved-revision").classList.add("hidden");
  document.querySelector("#cached-draft").classList.add("hidden");
});

function compare(request, sender, sendResponse) {
  var current = request.current;
  var cached = request.cached;

  var dmp = new diff_match_patch();
  var d = dmp.diff_main(current, cached);
  dmp.diff_cleanupSemantic(d);

  document.querySelector("#last-saved-revision>pre").textContent = current;
  document.querySelector("#cached-draft>pre").textContent = cached;
  document.querySelector("#comparison>pre").innerHTML = dmp.diff_prettyHtml(d);  
}

chrome.runtime.onMessage.addListener(compare);
