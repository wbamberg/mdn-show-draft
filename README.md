# mdn-show-draft

The MDN editor auto-saves drafts for you as you write. When you open a page, if you have an unsaved draft of that page (for example, because you closed the page without saving it, or because the browser crashed), then the editor tells you this, and gives you two options: "Restore the draft content" and "Discard the draft".

It would be helpful in this situation to be able to see what the draft content is. That's what this add-on does.
Alongside the existing options it adds a new option "Show the draft content". If you click this, it will show you:

* the last saved version of the page. Unless you have edited the page since reopening it, this will be the same content as you are looking at in the editor.
* the auto-saved revision of the page: this is what the page will look like if you choose "Restore the draft content".
* a diff of these two revisions.

This add-on is a [WebExtension](https://developer.mozilla.org/en-US/Add-ons/WebExtensions), and ought to install in Chrome and Opera as well as Firefox. To install in Firefox, see:
https://developer.mozilla.org/en-US/Add-ons/WebExtensions/Packaging_and_installation.
