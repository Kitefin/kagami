const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClusterSchema = new Schema({
  userAddress: {
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  }, 
  addresses: [
    { 
        type: String
    }
  ]
});

module.exports = mongoose.model('cluster', ClusterSchema);
