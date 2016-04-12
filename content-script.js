var draftKey = "draft/edit" + document.location.pathname.slice(0, -5);
var draftContent = window.localStorage[draftKey];

function showDraft(e) {
  if (!draftContent) {
    return;
  }
  chrome.runtime.sendMessage({draft: draftContent, url: document.location.href});
  e.preventDefault();
}

function pageHasCachedDraft(notice) {
  var draftNoticeStart = chrome.i18n.getMessage("noticeStart");
  return (notice && (notice.textContent.indexOf(draftNoticeStart) == 0));
}

var notice = document.querySelector(".draft-status");

if (pageHasCachedDraft(notice)) {  
  var showDraftLink = document.createElement("a");
  showDraftLink.textContent = chrome.i18n.getMessage("linkName");
  showDraftLink.addEventListener("click", showDraft);
  showDraftLink.setAttribute("href", "");
  notice.appendChild(showDraftLink);
  var period = document.createTextNode(".");
  notice.appendChild(period);
}
