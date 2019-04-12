'use strict';

export class User {
  constructor(name, rights, shifrKaf) {
    this.name = name;
    this.rights = rights;
    this.shifrKaf = shifrKaf;
  }

  getName() {
    return this.name;
  }

  getRights() {
    return this.rights;
  }

  getShifrKaf() {
    return this.shifrKaf;
  }
}
