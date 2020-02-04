const AbstractFileStore = require('./abstractFileStore');
const fs = require('fs-extra');
/**
* Local file storage
*/
class LocalFileStore extends AbstractFileStore {
  /** @override */
  async writeFile(location, data) {
    return fs.readFile(location, data);
  }
  /** @override */
  async readFile(location) {
    return fs.readFile(location);
  }
  /** @override */
  async remove(location) {
    return fs.remove(location);
  }
}

module.exports = LocalFileStore;
