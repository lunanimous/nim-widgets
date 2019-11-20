export interface CheckoutOptions {
  appName: string;
  recipient: string;
  value: number;
  shopLogoUrl?: string;
  fee?: number;
  extraData?: Uint8Array | string;
}

export interface SignedTransaction {
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
