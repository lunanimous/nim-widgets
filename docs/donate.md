# nim-donate

The `nim-donate` component provides a simple one click donate button for Nimiq. Once the user clicks the button, he will be asked to enter a donation amount and an optional message. After the user confirms, he will be taken to the Nimiq Checkout where he can finalize the transaction.

## Example

<div>
<nim-donate recipient="NQ54 EHLN L135 RBFU 305P 0GJT GTU0 S3G3 8MKJ"></nim-donate>
</div>

This example button could be used somewhere on your website, to display the `nim-donate` button you need to have the following code on your page.

```html
<nim-donate recipient="NQ54 EHLN L135 RBFU 305P 0GJT GTU0 S3G3 8MKJ"></nim-donate>
```

## Properties

| Property    | Attribute   | Description                                                                                                     | Type                                                                            | Default                         |
| ----------- | ----------- | --------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------------------------------- |
| `fee`       | `fee`       | Transaction fee in luna. Default: 0                                                                             | `number`                                                                        | `undefined`                     |
| `logoUrl`   | `logo-url`  | An image URL. Must be on the same origin as the request is sent from. Should be square and at least 146x146 px. | `string`                                                                        | `undefined`                     |
| `network`   | `network`   | The network you want to use. Can be 'main' or 'test'.                                                           | `"main" \| "test"`                                                              | `'main'`                        |
| `recipient` | `recipient` | The human-readable address of the recipient (your shop/app).                                                    | `string`                                                                        | `undefined`                     |
| `text`      | `text`      | The text to display on the button. Default: "Donate NIM"                                                        | `string`                                                                        | `'Donate NIM'`                  |
| `thankyou`  | `thankyou`  | The text to display once payment is done. Default: "Thank you for the donation!"                                | `string`                                                                        | `'Thank you for the donation!'` |
| `theme`     | `theme`     | The theme of the button. Use light when using against dark background.                                          | `"blue" \| "gold" \| "green" \| "light-blue" \| "neutral" \| "orange" \| "red"` | `'neutral'`                     |
