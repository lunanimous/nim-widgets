import { Component, h, getAssetPath, Prop } from '@stencil/core';

@Component({
  tag: 'nim-icon',
  styleUrl: 'icon.css',
  assetsDir: 'assets',
  shadow: true,
})
export class Icon {
  @Prop() name: string = 'hexagon';

  get xlinkHref() {
    return getAssetPath('./assets/nimiq-style.icons.svg') + `#nq-${this.name}`;
  }

  render() {
    return (
      <svg class="nim-icon">
        <use xlinkHref={this.xlinkHref} />
      </svg>
    );
  }
}
