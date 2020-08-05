const fs = require("fs");

class Manager {
  constructor(handles, holds) {
    this._handles = handles;
    this._holds = holds; 
    this._dir = `${__dirname}/../../../data/${handles}`;
    this._model = require(`../models/${holds}`);
  }
  get dir() {
    return this._dir;
  }
  get model() {
    return this._model;
  }
  create(id, properties) {
    let temp = new this.model({ "id": id, ...properties }, this._dir);
    fs.writeFileSync(`${this.dir}/${id}.json`, temp.toString());
    return temp;
  }
  get(id) {
    return fs.existsSync(`${this.dir}/${id}.json`) ? new this.model(JSON.parse(fs.readFileSync(`${this.dir}/${id}.json`))) : null;
  }
  has(id) {
    return fs.existsSync(`${this.dir}/${id}.json`);
  }
  delete(id) {
    return fs.existsSync(`${this.dir}/${id}.json`) ? fs.unlinkSync(`${this.dir}/${id}.json`) : null;
  }
  edit(id, options) {
    if (!this.has(id)) return;
    let retrieve = this.get(id);
    for(let option in options) {
      retrieve[option] = options[option];
    }

    return fs.writeFileSync(`${this.dir}/${id}.json`, retrieve.toString());
  }
}

module.exports = Manager;