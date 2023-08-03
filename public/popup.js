const showToast = (msg, durationMs) => {
  const toastDiv = document.createElement("div");
  toastDiv.innerText = msg;
  document.body.appendChild(toastDiv);
  setTimeout(() => toastDiv.remove(), durationMs);
};

const getCustomFormat = async () => {
  const { format } = await chrome.storage.local.get("format");
  return format ?? '';
};

const saveCustomFormat = (format) => {
  chrome.storage.local.set({ format });
};

const copyButtonClickListener = async () => {
  if (chrome?.tabs == null) {
    console.error("Could not access chrome.tabs");
    return;
  }
  const customFormat = await getCustomFormat();
  const tabs = await chrome.tabs.query({});
  const tabsAsText = tabs
    .filter(({ url }) => url != null)
    .map(({ title, url }) => {
      if (customFormat != null && customFormat !== "") {
        return customFormat.replace("${title}", title).replace("${url}", url);
      }
      return `- [${title}](${url})`;
    })
    .join("\n");

  await navigator.clipboard.writeText(tabsAsText);
  showToast("Copied to clipboard", 1000);
};

const setupCustomFormatInput = async () => {
  const customFormatEl = document.getElementById("customFormat");
  if (customFormatEl == null) {
    console.error("Could find the custom format input element");
    return;
  }
  
  customFormatEl.value = await getCustomFormat();
  customFormatEl.addEventListener("input", () => {
    saveCustomFormat(customFormatEl.value);
  });
};

const setupCopyButton = async () => {
  const copyButton = document.getElementById("copyButton");
  if (copyButton == null) {
    console.error("Could not find the copy button element");
    return;
  }
  
  copyButton.addEventListener("click", copyButtonClickListener);
};

const setupPopup = () => {
  setupCopyButton();
  setupCustomFormatInput();
};

document.addEventListener("DOMContentLoaded", setupPopup);
