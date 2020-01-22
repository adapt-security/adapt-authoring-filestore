const { AbstractModule } = require('adapt-authoring-core');
const AbstractFileStore = require('./abstractFileStore');
const LocalFileStore = require('./localFileStore');
/**
* Abstract module for storing files
* @extends {AbstractModule}
*/
class FileStoreModule extends AbstractModule {
  /** @override */
  constructor(...args) {
    super(...args);
    this.stores = {};
    this.registerStore('local', new LocalFileStore());
    this.setReady();
  }
  registerStore(storeName, storeInstance) {
    if(this.stores[storeName]) {
      this.log('warn', `store already registered with the name '${storeName}'`);
      return;
    }
    if(!(storeInstance instanceof AbstractFileStore)) {
      this.log('warn', `store '${storeName}' must extend AbstractFileStore`);
      return;
    }
    this.stores[storeName] = storeInstance;
    this.log('debug', `'${storeName}' store registered`);
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
  async readFile(location, storeName) {
    return this.getStore(storeName).readFile(location, data);
  }
  async writeFile(location, data, storeName) {
    return this.getStore(storeName).writeFile(location, data);
  }
}

module.exports = FileStoreModule;
