const showToast = (message, duration) => {
  const toastDiv = document.createElement("div");
  const removeToast = () => toastDiv.remove();
  toastDiv.innerText = message;
  document.body.appendChild(toastDiv);
  setTimeout(removeToast, duration);
};

const copyButtonClickListener = async () => {
  if (chrome.tabs != null) {
    const tabs = await chrome.tabs.query({});
    const tabInfo = tabs
      .filter(({ title, url }) => title != null && url != null)
      .map(({ title, url }) => "- " + title + " | " + url)
      .join("\n");
    await navigator.clipboard.writeText(tabInfo);
    showToast("Copied!", 1000);
  } else {
    console.error("Could not access chrome.tabs");
  }
};

const setupCopyButton = () => {
  const copyButton = document.getElementById("copyButton");
  if (copyButton != null) {
    copyButton.addEventListener("click", copyButtonClickListener);
  } else {
    console.error("Could find the copy button element");
  }
};

document.addEventListener("DOMContentLoaded", setupCopyButton);
