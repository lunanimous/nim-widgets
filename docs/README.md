# Access the Nimiq blockchain using smart widgets

**Nim Widgets** is a collection of helpful UI components to interact with the [Nimiq blockchain](https://nimiq.com). The goal is to provide the lowest barrier of entry for people to use Nimiq on their website.

<Note type="warning" label="pre-release">

Do not use in production yet. This is still in pre-release status.

</Note>

## Try it for yourself

Click the buttons below to see the experience you get when using **Nim Widgets**.

<div>
<nim-donate recipient="NQ54 EHLN L135 RBFU 305P 0GJT GTU0 S3G3 8MKJ"></nim-donate>
<nim-checkout
  theme="blue"
  app="Nim Widgets"
  recipient="NQ54 EHLN L135 RBFU 305P 0GJT GTU0 S3G3 8MKJ"
  value="100000"
></nim-checkout>
</div>

## Installation

Before you can start using **Nim Widgets**, you need to add the widget code to your website.
Copy and paste this code into an HTML page and view it in your browser. You are now ready to use **Nim Widgets**.

```html
<head>
  <!-- ... -->
  <script type="module" src="https://cdn.jsdelivr.net/npm/nim-widgets@0/dist/nim-widgets/nim-widgets.esm.js"></script>
  <script nomodule="" src="https://cdn.jsdelivr.net/npm/nim-widgets@0/dist/nim-widgets/nim-widgets.js"></script>
  <!-- ... -->
</head>
```
