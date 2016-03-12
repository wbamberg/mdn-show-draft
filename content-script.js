var draftKey = "draft/edit" + document.location.pathname.slice(0, -5);
var draftContent = window.localStorage[draftKey];

function showDraft(e) {
  if (!draftContent) {
    return;
  }
  chrome.runtime.sendMessage({draft: draftContent, url: document.location.href});
  e.preventDefault();
}

function pageHasCachedDraftNotice(notice) {
  var draftNoticeStart = chrome.i18n.getMessage("noticeStart");
  return (notice && (notice.textContent.indexOf(draftNoticeStart) == 0));
}

var notice = document.querySelector(".notice");

if (pageHasCachedDraftNotice(notice)) {  
  var showDraftLink = document.createElement("a");
  showDraftLink.textContent = chrome.i18n.getMessage("linkName");
  showDraftLink.addEventListener("click", showDraft);
  showDraftLink.setAttribute("href", "");
  notice.firstChild.appendChild(showDraftLink);
  
  var period = document.createTextNode(".");
  notice.firstChild.appendChild(period);
}
