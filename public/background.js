chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.query({}, function (tabs) {
    var tabData = "";
    tabs.forEach(function (tab) {
      tabData += "- " + tab.title + " | " + tab.url + "\n";
    });
    copyToTheClipboard(tabData);
    // navigator.clipboard.writeText(tabData).then(() => {
    //   console.log(tabData);
    //   alert("Clicked!");
    // });
  });
});

async function copyToTheClipboard(textToCopy) {
  const el = document.createElement("textarea");
  el.value = textToCopy;
  el.setAttribute("readonly", "");
  el.style.position = "absolute";
  el.style.left = "-9999px";
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
