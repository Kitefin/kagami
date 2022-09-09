const mongoose = require('mongoose');
// const config = require('config');
// const db = config.get('mongoURI');
// const db = "mongodb://localhost:27017/my_work";
const db = "mongodb+srv://chrlschwb:95K9IPPeDLIWRDf8@hotpad.akg9h51.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });

    console.log('MongoDB Connected: ' + db);
  } catch (err) {
    console.error('err: ' + err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
