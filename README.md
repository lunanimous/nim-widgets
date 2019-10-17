# Nim Widgets

The Nim Widgets are a collection of helpful UI components to interact with the [Nimiq blockchain](https://nimiq.com). The goal is to provide the lowest barrier of entry for people to use Nimiq on their website.

## Roadmap

This is the list of components that are part of the nim-widgets. Feel free to suggest any new component in a Github issue.

- [x] nim-checkout: accept payment with nimiq
- [ ] nim-donate: accept donation with nimiq

## Usage

To start using nim-widgets, you need to include a script tag in the head of your HTML page.

```html
<head>
  <!-- ... -->
  <script src="//cdn.jsdelivr.net/npm/nim-widgets/dist/nim-widgets.js"></script>
  <!-- ... -->
</head>
```

Once you have that included, you are ready to use nim-widgets on your page, just include the corresponding tags.

For full usage check out [documentation](https://lunanimous.github.io/nim-widgets/index.html).

## Build

After cloning the repository, you need to install the dependencies and then you can run it.

```bash
npm install
npm start
```

This will open a server and you can preview the components.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
