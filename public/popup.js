// TODO: allow for custom formatting
const showToast = (message, duration) => {
  const toastDiv = document.createElement("div");
  toastDiv.innerText = message;
  document.body.appendChild(toastDiv);
  setTimeout(() => toastDiv.remove(), duration);
};

const copyButtonClickListener = async () => {
  if (chrome.tabs == null) {
    console.error("Could not access chrome.tabs");
    return;
  }

  const tabs = await chrome.tabs.query({});
  const tabInfo = tabs
    .filter(({ url }) => url != null)
    .map(({ title, url }) => `- ${title} | ${url}`)
    .join("\n");
  await navigator.clipboard.writeText(tabInfo);
  showToast("Copied to clipboard!", 1000);
};

const setupCopyButton = () => {
  const copyButton = document.getElementById("copyButton");

  if (copyButton == null) {
    console.error("Could find the copy button element");
    return;
  }

  copyButton.addEventListener("click", copyButtonClickListener);
};

document.addEventListener("DOMContentLoaded", setupCopyButton);
