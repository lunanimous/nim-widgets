import { Component, h, State, Prop, getAssetPath, Watch } from '@stencil/core';
import { Theme, Network, HubUrl, CheckoutOptions } from '../../utils/common';
import Iqons from '@nimiq/iqons/dist/iqons.min.js';
import HubApi from '@nimiq/hub-api';
import { Hexagon, Close } from '../../utils/icons';

enum Status {
  Idle = 0,
  Progress = 1,
  Success = 2,
  Error = 3,
}

@Component({
  tag: 'nim-donate',
  styleUrl: 'donate.css',
  assetsDir: 'identicons',
  shadow: true,
})
export class Donate {
  @State() status: Status = Status.Idle;
  @State() isOpen: boolean = false;
  @State() addressChunks: string[] = [];
  @State() identicon: string;
  /**
   * Amount of NIM to donate, bound to input field.
   */
  @State() amount: number;
  /**
   * Message to be attached to transaction, bound to input field.
   */
  @State() message: string;

  /**
   * The theme of the button. Use light when using against dark background.
   */
  @Prop() theme: Theme = 'neutral';

  /**
   * The network you want to use. Can be 'main' or 'test'.
   */
  @Prop() network: Network = 'main';

  /**
   * The human-readable address of the recipient (your shop/app).
   */
  @Prop() recipient: string;
  @Watch('recipient')
  onRecipientChanged() {
    this.breakAddressIntoChunks();
    this.generateIdenticon();
  }

  /**
   * An image URL. Must be on the same origin as the request is sent from.
   * Should be square and at least 146x146 px.
   */
  @Prop() logoUrl: string;

  /**
   * Transaction fee in luna. Default: 0
   */
  @Prop() fee: number;

  /**
   * The text to display on the button. Default: "Donate NIM"
   */
  @Prop() text: string = 'Donate NIM';

  /**
   * The text to display once payment is done. Default: "Thank you for the donation!"
   */
  @Prop() thankyou: string = 'Thank you for the donation!';

  componentWillLoad() {
    Iqons.svgPath = getAssetPath('./identicons/iqons.min.svg');

    this.breakAddressIntoChunks();
    this.generateIdenticon();
  }

  breakAddressIntoChunks() {
    const addressWithoutSpaces = this.recipient.replace(/\s/g, '');

    this.addressChunks = addressWithoutSpaces.match(/.{1,4}/g);
  }

  generateIdenticon() {
    Iqons.toDataUrl(this.recipient).then(identicon => {
      this.identicon = identicon;
    });
  }

  open() {
    this.isOpen = true;
  }

  close() {
    this.isOpen = false;
  }

  async donate(event) {
    event.preventDefault();

    this.status = Status.Progress;

    let options: CheckoutOptions = {
      appName: this.text,
      recipient: this.recipient,
      value: this.amount * 100000,
    };

    if (this.logoUrl) {
      options.shopLogoUrl = this.logoUrl;
    }

    if (this.fee) {
      options.fee = this.fee;
    }

    if (this.message) {
      options.extraData = this.message.trim();
    }

    const hubApi = new HubApi(HubUrl[this.network]);

    try {
      await hubApi.checkout(options);
      this.status = Status.Success;
      setTimeout(() => {
        this.status = Status.Idle;
        this.close();
      }, 2000);
    } catch (error) {
      this.status = Status.Error;
      setTimeout(() => {
        this.status = Status.Idle;
      }, 2000);
    }
  }

  updateAmount(event) {
    this.amount = parseFloat(event.target.value);
  }

  updateMessage(event) {
    this.message = event.target.value;
  }

  canConfirm() {
    return this.amount > 0;
  }

  render() {
    return (
      <div class="donate">
        <button
          class={'nim-button nim-theme-' + this.theme}
          disabled={this.status === Status.Progress}
          type="button"
          onClick={_ => this.open()}
        >
          <Hexagon class="nim-icon nim-logo" />
          <div>
            <span>{this.text}</span>
          </div>
        </button>
        <div class={{ overlay: true, 'is-open': this.isOpen }}>
          <div class="dialog">
            <button onClick={_ => this.close()} type="button" class="close">
              <Close class="nim-icon" />
            </button>

            <form onSubmit={e => this.donate(e)}>
              <h2>Donate</h2>

              <div class="recipient">
                <div class="identicon">
                  <img src={this.identicon} />
                </div>
                <div class="address">
                  {this.addressChunks.map(chunk => (
                    <span class="chunk">{chunk}</span>
                  ))}
                </div>
              </div>

              <div class="amount">
                <input onInput={e => this.updateAmount(e)} type="text" placeholder="0.00"></input>
                <span class="ticker">NIM</span>
              </div>

              <div class="message">
                <input
                  onInput={e => this.updateMessage(e)}
                  type="text"
                  maxLength={64}
                  placeholder="Add a message..."
                ></input>
              </div>

              <div class="confirm">
                <button disabled={!this.canConfirm()} class="nim-button nim-theme-light-blue" type="submit">
                  Confirm
                </button>
              </div>
            </form>
            <div
              class={{
                flash: true,
                show: this.status !== Status.Idle,
              }}
            >
              <p>Transaction in progress...</p>
            </div>
            <div
              class={{
                'flash success': true,
                show: this.status === Status.Success,
              }}
            >
              <p>{this.thankyou}</p>
            </div>
            <div
              class={{
                'flash error': true,
                show: this.status === Status.Error,
              }}
            >
              <p>Transaction failed. Please try again.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
