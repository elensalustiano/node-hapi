const mongoose = require("mongoose");

class MongoDB {

  constructor(schema) {
    this._collection = schema;
  }

  static connect() {
    return mongoose.connect('mongodb+srv://projeto:projetoF@cluster0-wewpl.mongodb.net/projetof?retryWrites=true', {
      useNewUrlParser: true
    }, (error) => {
      if (!error) return;
      console.log('Falha na conexão!', error)
    });
  }

  async create(item) {
    return this._collection.create(item)
  }

  async find(item = {}) {
    return this._collection.find( item );
  }

  async update(condition, item) {
    return this._collection.updateOne(condition, { $set: item });
  }

  async delete(id) {
    return this._collection.deleteOne(id);
  }
}
module.exports = MongoDB;