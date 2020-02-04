const { AbstractModule } = require('adapt-authoring-core');
const AbstractFileStore = require('./abstractFileStore');
const LocalFileStore = require('./localFileStore');
/**
* Abstract module for the storage of files
* @extends {AbstractModule}
*/
class FileStoreModule extends AbstractModule {
  /** @override */
  constructor(...args) {
    super(...args);
    this.app.store = this;
    /**
    * Key/value store of AbstractFileStore implementations
    * @type {Object}
    */
    this.stores = {};
    /**
    * The type of AbstractFileStore to be used by default
    * @type {String}
    */
    this.defaultStoreType = 'local';
    this.registerStore(this.defaultStoreType, new LocalFileStore());
    this.setReady();
  }
  /**
  * Registers an AbstractFileStore instances for use by other modules
  * @param {String} storeName
  * @param {AbstractFileStore} storeInstance
  */
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
  /**
  * Returns an AbstractFileStore instance
  * @param {String} storeName
  * @return {AbstractFileStore} The AbstractFileStore instance
  */
  getStore(storeName) {
    if(!storeName) {
      storeName = this.defaultStoreType;
    }
    if(!this.stores[storeName]) {
      throw new Error(`no store registered with the name '${storeName}'`);
    }
    return this.stores[storeName];
  }
  /** @override */
  async readFile(location, storeName) {
    return this.getStore(storeName).readFile(location, data);
  }
  /** @override */
  async writeFile(location, data, storeName) {
    return this.getStore(storeName).writeFile(location, data);
  }
}

module.exports = FileStoreModule;
