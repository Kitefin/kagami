const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  address: {
    type: String
  },
  email: {
    type: String
  }
});

module.exports = mongoose.model('user', UserSchema);
