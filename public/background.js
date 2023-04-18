chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.query({}, function (tabs) {
    var tabData = "";
    tabs.forEach(function (tab) {
      tabData += "- " + tab.title + " | " + tab.url + "\n";
    });
    copyToTheClipboard(tabData);
  });
});

async function copyToTheClipboard(textToCopy) {
  const el = document.createElement("textarea");
  el.value = textToCopy;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
