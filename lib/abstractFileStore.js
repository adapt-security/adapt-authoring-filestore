const path = require('path');
/**
* Abstract class to be extended by modules for storing files
*/
class AbstractFileStore {
  /**
  * Data file functions
  */
  /**
  * Reads a file from the 'data' location
  * @param {String} location
  * @return {Promise}
  */
  async readDataFile(location) {
    return this.readFile(path.join(this.getConfig('data_location'), location));
  }
  /**
  * Writes a file to the 'data' location
  * @param {String} location
  * @param {*} data Contents of file
  * @return {Promise}
  */
  async writeDataFile(location, data) {
    return this.writeFile(path.join(this.getConfig('data_location'), location), data);
  }
  /**
  * Removes file(s) from the 'data' location
  * @param {String} location
  * @return {Promise}
  */
  async removeData(location) {
    return this.remove(path.join(this.getConfig('data_location'), location));
  }
  /**
  * Temp file functions
  */
  /**
  * Reads a file from the 'temp' location
  * @param {String} location
  * @return {Promise}
  */
  async readTempFile(location) {
    return this.readFile(path.join(this.getConfig('temp_location'), location));
  }
  /**
  * Writes a file to the 'temp' location
  * @param {String} location
  * @param {*} data Contents of file
  * @return {Promise}
  */
  async writeTempFile(location, data) {
    return this.writeFile(path.join(this.getConfig('temp_location'), location), data);
  }
  /**
  * Removes file(s) from the 'temp' location
  * @param {String} location
  * @return {Promise}
  */
  async removeTemp(location) {
    return this.remove(path.join(this.getConfig('temp_location'), location));
  }
  /**
  * Generic functions
  */
  /**
  * Writes a file
  * @param {String} location
  * @param {*} data Contents of file
  * @return {Promise}
  */
  async writeFile(location, data) {
    throw new Error('Must be implemeted by subclass');
  }
  /**
  * Reads a file
  * @param {String} location
  * @return {Promise}
  */
  async readFile(location) {
    throw new Error('Must be implemeted by subclass');
  }
  /**
  * Removes file(s)
  * @param {String} location
  * @return {Promise}
  */
  async remove(location) {
    throw new Error('Must be implemeted by subclass');
  }
}

module.exports = AbstractFileStore;
