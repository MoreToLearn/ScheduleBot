class Manager {
  constructor(handles, holds) {
    this._handles = handles;
    this._holds = holds; 
    this._model = require(`../models/${holds}`);
  }
  get model() {
    return this._model;
  }
  async create(_id, properties) {
    let temp = new this.model({_id, ...properties});
    return temp.save();
  }
  async get(id) {
    return this.model.findById(id);
  }
  async delete(id) {
    return this.model.findByIdAndDelete(id);
  }
}

module.exports = Manager;