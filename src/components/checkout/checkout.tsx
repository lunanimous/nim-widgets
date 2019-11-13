import { Component, h, Prop, Event, EventEmitter, State } from '@stencil/core';
import HubApi from '@nimiq/hub-api';

interface CheckoutOptions {
  appName: string;
  recipient: string;
  value: number;
  shopLogoUrl?: string;
  fee?: number;
  extraData?: Uint8Array | string;
}

interface SignedTransaction {
  serializedTx: string; // HEX signed and serialized transaction
  hash: string; // HEX transaction hash

  raw: {
    signerPublicKey: Uint8Array; // Serialized public key of the signer
    signature: Uint8Array; // Serialized signature of the signer
    sender: string; // Human-readable address of sender
    recipient: string; // Human-readable address of recipient
    value: number;
    fee: number;
    networkId: number;
  };
}

const HubUrl = {
  main: 'https://hub.nimiq.com',
  test: 'https://hub.nimiq-testnet.com',
};

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
  @Prop() theme: 'neutral' | 'blue' | 'gold' | 'light-blue' | 'green' | 'orange' | 'red' = 'neutral';

  /**
   * The network you want to use. Can be 'main' or 'test'.
   */
  @Prop() network: 'main' | 'test' = 'main';

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
   * Emitted when checkout is successful
   */
  @Event() nimCheckoutSuccess: EventEmitter;

  /**
   * Emitted when an error happened during checkout or it is canceled
   */
  @Event() nimCheckoutError: EventEmitter;

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
        <nim-icon class="nim-logo" name="hexagon"></nim-icon>
        <div>
          {this.inProgress ? (
            <span>In progress...</span>
          ) : (
            <span>
              <strong>Nimiq</strong> Checkout
            </span>
          )}
        </div>
      </button>
    );
  }
}
