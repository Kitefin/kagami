const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlertSchema = new Schema({
  type: {
    type: String
  },
  description: {
    id: {type: Number},
    minMax: {type: String},
    amount: {type: Number},
    per: {type: String},
    addresses: [ { type: String } ]
  },
  clusterName: {type: String},
  recipients: [
    { 
        type: String
    }
  ]
});

module.exports = mongoose.model('alert', AlertSchema);
