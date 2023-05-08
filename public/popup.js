const showToast = (message, duration) => {
  const toastDiv = document.createElement("div");
  const removeToast = () => toastDiv.remove();
  toastDiv.innerText = message;
  document.body.appendChild(toastDiv);
  setTimeout(removeToast, duration);
};

const foo = () => {
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
};

document.addEventListener("DOMContentLoaded", foo);
