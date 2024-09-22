require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api/product', require('./routes/post.route'));

const PORT = process.env.PORT || 8080;

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
