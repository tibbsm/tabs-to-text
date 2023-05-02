const showToast = (message, duration) => {
  const toast = document.createElement("div");
  const removeToast = () => toast.remove();
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(removeToast, duration);
};

document.addEventListener("DOMContentLoaded", () => {
  const copyButton = document.getElementById("copyButton");
  if (copyButton != null && chrome.tabs != null) {
    copyButton.addEventListener("click", async () => {
      const tabs = await chrome.tabs.query({});
      const tabInfo = tabs
        .filter(({ title, url }) => title != null && url != null)
        .map(({ title, url }) => "- " + title + " | " + url)
        .join("\n");
      await navigator.clipboard.writeText(tabInfo);
      showToast("Copied!", 1000);
    });
  }
});
