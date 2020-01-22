const fs = require('fs-extra');

class LocalFileStore {
  async writeFile(location, data) {
    return fs.readFile(location, data);
  }
  async readFile(location) {
    return fs.readFile(location);
  }
  async remove(location) {
    return fs.remove(location);
  }
}

module.exports = LocalFileStore;
