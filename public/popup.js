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

// FIXME: HERE
const getCustomFormat = async () => {
  let customFormat = await chrome.storage.local.get("format", (items) => {
    showToast("get " + items.format, 10000);
    return (customFormat = items.format ?? null);
  });
  showToast("get 2 " + customFormat, 10000);
  return customFormat;
};

// FIXME: ???
const saveCustomFormat = (text) => {
  chrome.storage.local.set({ format: text });
  showToast("save" + getCustomFormat(), 10000);
  return customFormat;
};

const setupCopyButton = () => {
  const copyButton = document.getElementById("copyButton");
  if (copyButton == null) {
    console.error("Could find the copy button element");
    return;
  }

  copyButton.addEventListener("click", copyButtonClickListener);

  // TODO: separate function
  // TODO: save to local storage
  // TODO: save to on update
  // TODO: use in copy button click listener
  let customFormat = null;
  const customFormatEl = document.getElementById("customFormat");
  customFormat = getCustomFormat();
  showToast(customFormat ?? "start", 10000);
  customFormatEl.value = customFormat;
  customFormatEl.addEventListener("input", () => {
    saveCustomFormat(customFormatEl.value);
    customFormat = customFormatEl.value;
    showToast(customFormat ?? "null", 10000);
    showToast(customFormat ?? "null", 10000);
  });
  setInterval(() => {
    showToast(customFormatEl.value ?? "null", 1000);
  }, 1000);
  console.log(customFormat);
};

document.addEventListener("DOMContentLoaded", setupCopyButton);
