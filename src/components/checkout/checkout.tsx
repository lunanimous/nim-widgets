import { Component, h, Prop, Event, EventEmitter, State } from '@stencil/core';
import HubApi from '@nimiq/hub-api';
import { Theme, Network, HubUrl, CheckoutOptions, SignedTransaction } from '../../utils/common';
import { Hexagon } from '../../utils/icons';

@Component({
  tag: 'nim-checkout',
  styleUrl: 'checkout.css',
  shadow: true,
})
export class Checkout {
  @State() inProgress: boolean = false;

  /**
   * The theme of the button. Use light when using against dark background.
   */
  @Prop() theme: Theme = 'neutral';

  /**
   * The network you want to use. Can be 'main' or 'test'.
   */
  @Prop() network: Network = 'main';

  /**
   * The name of your app, should be as short as possible.
   */
  @Prop() app: string;

  /**
   * The human-readable address of the recipient (your shop/app).
   */
  @Prop() recipient: string;

  /**
   * Value of the transaction, in Luna. 1 NIM = 100000 Luna.
   */
  @Prop() value: number;

  /**
   * An image URL. Must be on the same origin as the request is sent from. Should be square and at least 146x146 px.
   */
  @Prop() logoUrl: string;

  /**
   * Transaction fee in luna. Default: 0
   */
  @Prop() fee: number;

  /**
   * Extra data that should be sent with the transaction.
   */
  @Prop() data: string;

  /**
   * The text to display on the button. Default: "Pay with NIM"
   */
  @Prop() text: string = 'Pay with NIM';

  /**
   * Emitted when checkout is successful
   */
  @Event() nimCheckoutSuccess: EventEmitter<SignedTransaction>;

  /**
   * Emitted when an error happened during checkout or it is canceled
   */
  @Event() nimCheckoutError: EventEmitter<any>;

  async checkout() {
    this.inProgress = true;

    let options: CheckoutOptions = {
      appName: this.app,
      recipient: this.recipient,
      value: this.value,
    };

    if (this.logoUrl) {
      options.shopLogoUrl = this.logoUrl;
    }

    if (this.fee) {
      options.fee = this.fee;
    }

    if (this.data) {
      options.extraData = this.data;
    }

    const hubApi = new HubApi(HubUrl[this.network]);

    try {
      const transaction: SignedTransaction = await hubApi.checkout(options);
      this.nimCheckoutSuccess.emit(transaction);
      this.inProgress = false;
    } catch (error) {
      this.nimCheckoutError.emit(error);
      this.inProgress = false;
    }
  }

  render() {
    return (
      <button class={'nim-theme-' + this.theme} disabled={this.inProgress} type="button" onClick={_ => this.checkout()}>
        <Hexagon class="nim-icon nim-logo" />
        <div>{this.inProgress ? <span>In progress...</span> : <span>{this.text}</span>}</div>
      </button>
    );
  }
}
