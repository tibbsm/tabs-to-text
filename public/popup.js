function showToast(message, duration) {
  const toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, duration);
}

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
    // alert("Tab info copied to clipboard!");
    showToast("Copied", 1000);
  });
});
