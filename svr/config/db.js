const mongoose = require('mongoose');
// const config = require('config');
// const db = config.get('mongoURI');
const db = "mongodb://localhost:27017/my_work";

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error('err: ' + err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
