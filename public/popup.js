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
  const customFormat = await getCustomFormat();
  const tabs = await chrome.tabs.query({});
  const tabInfo = tabs
    .filter(({ url }) => url != null)
    .map(({ title, url }) => {
      if (customFormat != null && customFormat != "") {
        return customFormat.replace("${title}", title).replace("${url}", url);
      } else {
        return `- ${title} | ${url}`;
      }
    })
    .join("\n");

  await navigator.clipboard.writeText(tabInfo);
  showToast("Copied to clipboard!", 1000);
};

const getCustomFormat = async () => {
  const customFormat = await chrome.storage.local.get("format");
  return customFormat.format;
};

const saveCustomFormat = (text) => {
  chrome.storage.local.set({ format: text });
};

const setupCopyButton = async () => {
  const copyButton = document.getElementById("copyButton");
  if (copyButton == null) {
    console.error("Could find the copy button element");
    return;
  }

  copyButton.addEventListener("click", copyButtonClickListener);

  // TODO: separate function
  let customFormat = null;
  const customFormatEl = document.getElementById("customFormat");
  customFormat = await getCustomFormat();
  customFormatEl.value = customFormat;
  customFormatEl.addEventListener("input", () => {
    saveCustomFormat(customFormatEl.value);
    customFormat = customFormatEl.value;
  });
};

document.addEventListener("DOMContentLoaded", setupCopyButton);
