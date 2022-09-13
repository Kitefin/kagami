const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const bodyParser = require('body-parser'); 
const cors = require('cors');

const app = express();
app.use(cors()); 

app.use(
	bodyParser.urlencoded({
		extended: false
	})
);
app.use(bodyParser.json());

// Connect Database
connectDB();

// Init Middleware
// app.use(express.json());

// Define Routes 

app.use('/api/cluster', require('./routes/api/cluster'));
app.use('/api/alert', require('./routes/api/alert'));
app.use('/api/email', require('./routes/api/email'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
