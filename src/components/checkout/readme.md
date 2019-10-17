# nim-checkout



<!-- Auto Generated Below -->


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


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
