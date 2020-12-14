export class ValueBitmaskMemory {
  public mask;

  private memory = {};
  private bitLength;

  /*
  Unfortunately, while JS supports up to 53-bit integers, bitwise operators "break" at 32 bits
  private orMask = 0;
  private andMask = parseInt("111111111111111111111111111111111111", 2);

  set mask(value) {
    this.orMask = parseInt(value.replace(/X/g, "0"), 2);
    this.andMask = parseInt(value.replace(/X/g, "1"), 2);
  }

  setAt(address, value) {
    const maskedValue = this.orMask | (this.andMask & value);
    this.memory[address] = maskedValue;
  }
  */

  constructor(bitLength) {
    this.bitLength = bitLength;
    this.mask = "X".repeat(bitLength);
  }

  setAt(address, value) {
    const binaryValue = value.toString(2).padStart(this.bitLength, "0");
    let maskedBits = binaryValue.split("");
    for (let i = 0; i < this.bitLength; i++) {
      const maskBit = this.mask.charAt(i);
      if (maskBit != "X") {
        maskedBits[i] = maskBit;
      }
    }
    const maskedValue = parseInt(maskedBits.join(""), 2);
    this.memory[address] = maskedValue;
  }

  getAt(address) {
    return this.memory[address];
  }

  get entries() {
    return Object.entries(this.memory);
  }
}

export class AddressBitmaskMemory {
  public mask;

  private memory = {};
  private bitLength;

  /*
  Unfortunately, while JS supports up to 53-bit integers, bitwise operators "break" at 32 bits
  private orMask = 0;
  private andMask = parseInt("111111111111111111111111111111111111", 2);

  set mask(value) {
    this.orMask = parseInt(value.replace(/X/g, "0"), 2);
    this.andMask = parseInt(value.replace(/X/g, "1"), 2);
  }

  setAt(address, value) {
    const maskedValue = this.orMask | (this.andMask & value);
    this.memory[address] = maskedValue;
  }
  */

  constructor(bitLength) {
    this.bitLength = bitLength;
    this.mask = "0".repeat(bitLength);
  }

  setAt(address, value) {
    const binaryAddress = parseInt(address, 10)
      .toString(2)
      .padStart(this.bitLength, "0");
    let maskedBits = binaryAddress.split("");
    for (let i = 0; i < this.bitLength; i++) {
      const maskBit = this.mask.charAt(i);
      if (maskBit !== "0") {
        maskedBits[i] = maskBit;
      }
    }
    let addresses = floatingAddresses(maskedBits.join(""));
    addresses.forEach((address) => (this.memory[address] = value));
  }

  getAt(address) {
    return this.memory[address];
  }

  get entries() {
    return Object.entries(this.memory);
  }
}

function floatingAddresses(address: string) {
  const xPos = address.indexOf("X");
  if (xPos === -1) {
    return [address];
  }
  return [
    floatingAddresses(address.replace("X", "0")),
    floatingAddresses(address.replace("X", "1")),
  ].flat();
}
