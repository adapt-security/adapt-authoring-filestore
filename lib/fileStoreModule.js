const { AbstractModule } = require('adapt-authoring-core');
/**
* Abstract module for storing files
* @extends {AbstractModule}
*/
class AbstractFileStore extends AbstractModule {
  /** @override */
  constructor(...args) {
    super(...args);
    this.stores = {};
  }
  async readFile(location, storeName) {
    return this.getStore(storeName).readFile(location, data);
  }
  async writeFile(location, data, storeName) {
    return this.getStore(storeName).writeFile(location, data);
  }
  registerStore(storeName, storeInstance) {
    if(this.stores[storeName]) {
      this.log('warn', `store already registered with the name '${storeName}'`);
      return;
    }
    if(!(this.stores[storeName] instanceof AbstractFileStore)) {
      this.log('warn', `store must extend AbstractFileStore`);
      return;
    }
    this.stores[storeName] = storeInstance;
  }
  getStore(storeName) {
    if(!storeName) {
      storeName = this.getConfig('defaultStore');
    }
    if(!this.stores[storeName]) {
      throw new Error(`no store registered with the name '${storeName}'`);
    }
    return this.stores[storeName];
  }
}

module.exports = AbstractFileStore;
