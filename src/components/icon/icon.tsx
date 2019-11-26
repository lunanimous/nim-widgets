import { Component, h, getAssetPath, Prop } from '@stencil/core';

@Component({
  tag: 'nim-icon',
  styleUrl: 'icon.css',
  assetsDir: 'icons',
  shadow: true,
})
export class Icon {
  @Prop() name: string = 'hexagon';

  get xlinkHref() {
    return getAssetPath('./icons/nimiq-style.icons.svg') + `#nq-${this.name}`;
  }

  render() {
    return (
      <svg class="nim-icon">
        <use xlinkHref={this.xlinkHref} />
      </svg>
    );
  }
}
