# Tabs to text

This Chrome extension allows you to quickly copy tab information from all open tabs in your browser to your clipboard.

Uses Chrome extension manifest v3.

## Default copy format

Each tab will be listed on a new line.

```
- [${title}](${url})
```

## Customizable copy format

Define your own custom format from the popup window.

Use `${title}` and `${url}` as placeholders in the custom format that you specify. Neither placeholders are required.

```
- ${title} - ${url}
```
