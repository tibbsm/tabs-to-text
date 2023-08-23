# Tabs to text

This Chrome extension allows you to quickly copy tab information to your clipboard.

Uses Chrome extension manifest v3.

The data from each tab will be listed on a new line using the format specified.

## Default copy format

The default copy format is:

```
- [${title}](${url})
```

## Customizable copy format

Define a custom format from the extension's popup window.

- Use `${title}` and `${url}` as placeholders in the custom format.
- Neither placeholders are required.

```
- ${title} - ${url}
```
