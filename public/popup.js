document.addEventListener("DOMContentLoaded", () => {
  const copyButton = document.getElementById("copyButton");
  copyButton.addEventListener("click", async () => {
    const tabs = await chrome.tabs.query({});
    let tabInfo = "";
    for (const tab of tabs) {
      if (tab.url != null) {
        tabInfo += "- " + tab.title + " | " + tab.url + "\n";
      }
    }
    await navigator.clipboard.writeText(tabInfo);
    alert("Tab info copied to clipboard!");
  });
});
