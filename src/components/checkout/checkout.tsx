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
   * The network you want to use. Can be 'main' or 'test'
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
   * Value of the transaction, in Luna. 1 NIM = 100000 Luna
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
  @Event() nimCheckout: EventEmitter;

  /**
   * Emitted when an error happened during checkout or it is canceled
   */
  @Event() nimError: EventEmitter;

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
      this.nimCheckout.emit(transaction);
      this.inProgress = false;
    } catch (error) {
      this.nimError.emit(error);
      this.inProgress = false;
    }
  }

  renderLogo(color = true) {
    if (color) {
      return (
        <svg class="nim-logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <defs>
            <radialGradient id="a" cx="12.02" cy="14.85" r="15.87" gradientUnits="userSpaceOnUse">
              <stop offset="0" stop-color="#ec991c" />
              <stop offset="1" stop-color="#e9b213" />
            </radialGradient>
          </defs>
          <path
            d="M15.82 7.34l-3.33-5.68A1.34 1.34 0 0 0 11.33 1H4.67a1.34 1.34 0 0 0-1.16.66L.18 7.34a1.3 1.3 0 0 0 0 1.32l3.33 5.68a1.34 1.34 0 0 0 1.16.66h6.66a1.34 1.34 0 0 0 1.16-.66l3.33-5.68a1.3 1.3 0 0 0 0-1.32z"
            fill="url(#a)"
          />
        </svg>
      );
    } else {
      return (
        <svg class="nim-logo" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <path
            d="M15.82 7.34l-3.33-5.68A1.34 1.34 0 0 0 11.33 1H4.67a1.34 1.34 0 0 0-1.16.66L.18 7.34a1.3 1.3 0 0 0 0 1.32l3.33 5.68a1.34 1.34 0 0 0 1.16.66h6.66a1.34 1.34 0 0 0 1.16-.66l3.33-5.68a1.3 1.3 0 0 0 0-1.32z"
            fill="#fff"
          />
        </svg>
      );
    }
  }

  render() {
    return (
      <button type="button" onClick={_ => this.checkout()}>
        {this.renderLogo(true)}
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
