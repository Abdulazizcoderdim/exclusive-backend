require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

const app = express();

// middleware
app.use(express.json());
app.use(express.static('static'));
app.use(fileUpload({}));

// routes
app.use('/api/product', require('./routes/product.route'));
app.use('/api/auth', require('./routes/auth.route'));

const PORT = process.env.PORT || 5000;

const bootstrap = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URL)
      .then(() => console.log('Connected with DB'));
    app.listen(PORT, () => {
      console.log(`App is running on port - http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(`Error connecting with DB - ${error}`);
  }
};
bootstrap();