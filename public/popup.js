function showToast(message, duration) {
  const toast = document.createElement("div");
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, duration);
}

document.addEventListener("DOMContentLoaded", () => {
  const copyButton = document.getElementById("copyButton");
  if (copyButton != null && chrome.tabs != null) {
    copyButton.addEventListener("click", async () => {
      const tabs = await chrome.tabs.query({});
      const tabInfo = tabs
        .filter((tab) => tab != null)
        .map((tab) => {
          tabInfo += "- " + tab.title + " | " + tab.url;
        });
      await navigator.clipboard.writeText(tabInfo.join("\n"));
      showToast("Copied", 1000);
    });
  }
});
