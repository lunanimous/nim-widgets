# Overview

The Nim Widgets are a collection of helpful UI components to interact with the [Nimiq blockchain](https://nimiq.com). The goal is to provide the lowest barrier of entry for people to use Nimiq on their website.

# Usage

To start using nim-widgets, you need to include a script tag in the head of your HTML page.

```html
<head>
  <!-- ... -->
  <script src="tbd"></script>
  <!-- ... -->
</head>
```

Once you have that included, you are ready to use nim-widgets on your page, just include the corresponding tags.

# nim-checkout

The `nim-checkout` component provides a simple one click pay button for Nimiq. This is inspired by the Paypal button. Once the user clicks the button, he will be taken to the Nimiq Hub to complete the transaction.

## Example

For example at the bottom of your checkout page, you could have the following code to display the `nim-checkout` button.

<div>
<nim-checkout
app="My shop"
recipient="NQ19 97P8 BRJY YY4X E5AM TG5J 45HM 7PX0 6H37"
value="1000"
network="test"
></nim-checkout>
</div>

```html
<nim-checkout
  app="My shop"
  recipient="NQ19 97P8 BRJY YY4X E5AM TG5J 45HM 7PX0 6H37"
  value="1000"
  network="test"
></nim-checkout>
```

To complete the order you need to listen to the success of the checkout and proceed with the order flow, for example sending a request to the backend.

```js
document.addEventListener('nimCheckoutSuccess', function(event) {
  console.log(event.detail);
});
```

If something goes wrong during the checkout or the user cancel, you can handle that error by listening to `nimCheckoutError`.

```js
document.addEventListener('nimCheckoutError', function(event) {
  console.log(event.detail);
});
```

## Properties

| Property    | Attribute   | Description                                                                                                     | Type                | Default     |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------- | ------------------- | ----------- |
| `app`       | `app`       | The name of your app, should be as short as possible.                                                           | `string`            | `undefined` |
| `data`      | `data`      | Extra data that should be sent with the transaction.                                                            | `string`            | `undefined` |
| `fee`       | `fee`       | Transaction fee in luna. Default: 0                                                                             | `number`            | `undefined` |
| `logoUrl`   | `logo-url`  | An image URL. Must be on the same origin as the request is sent from. Should be square and at least 146x146 px. | `string`            | `undefined` |
| `network`   | `network`   | The network you want to use. Can be 'main' or 'test'.                                                           | `"main" \| "test"`  | `'main'`    |
| `recipient` | `recipient` | The human-readable address of the recipient (your shop/app).                                                    | `string`            | `undefined` |
| `theme`     | `theme`     | The theme of the button. Use light when using against dark background.                                          | `"dark" \| "light"` | `'dark'`    |
| `value`     | `value`     | Value of the transaction, in Luna. 1 NIM = 100000 Luna.                                                         | `number`            | `undefined` |

## Events

| Event                | Description                                                      | Type               |
| -------------------- | ---------------------------------------------------------------- | ------------------ |
| `nimCheckoutError`   | Emitted when an error happened during checkout or it is canceled | `CustomEvent<any>` |
| `nimCheckoutSuccess` | Emitted when checkout is successful                              | `CustomEvent<any>` |