const mongoose = require("mongoose");

let userSchema =  new  mongoose.Schema({
    email: { type: String, required: true, unique: true },
    cpf: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    cpf: { type: String, required: true },
    name : { type: String, required: true },
    phone: Number,
    password: { type: String, required: true }
  }, {collection: "userCollection"}
);

module.exports = mongoose.model.userCollection || mongoose.model('userCollection', userSchema);