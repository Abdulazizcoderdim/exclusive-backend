const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    isGoogleAccount: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    favoriteProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    viewedProducts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    orders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Order',
      },
    ],
    isActivated: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  { timestamps: true }
);

module.exports = model('User', userSchema);
