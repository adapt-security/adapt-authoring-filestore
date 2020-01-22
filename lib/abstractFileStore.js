class AbstractFileStore {
  /**
  * Data file functions
  */
  async readDataFile(location) {
    return this.readFile(path.join(this.getConfig('data_location'), location), data);
  }
  async writeDataFile(location, data) {
    return this.writeFile(path.join(this.getConfig('data_location'), location), data);
  }
  async removeData(location, data) {
    return this.remove(path.join(this.getConfig('data_location'), location), data);
  }
  /**
  * Temp file functions
  */
  async readTempFile(location) {
    return this.readFile(path.join(this.getConfig('temp_location'), location), data);
  }
  async writeTempFile(location, data) {
    return this.writeFile(path.join(this.getConfig('temp_location'), location), data);
  }
  async removeTemp(location) {
    return this.remove(path.join(this.getConfig('temp_location'), location), data);
  }
  /**
  * Generic functions
  */
  async writeFile(location, data) {
    throw new Error('Must be implemeted by subclass');
  }
  async readFile(location) {
    throw new Error('Must be implemeted by subclass');
  }
  async remove(location) {
    throw new Error('Must be implemeted by subclass');
  }
}

module.exports = AbstractFileStore;
