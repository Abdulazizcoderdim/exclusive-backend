const { Schema, model } = require('mongoose');

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      currentPrice: {
        type: Number,
        required: true,
      },
      originalPrice: {
        type: Number,
        required: true,
      },
    },
    ratings: {
      value: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
      count: {
        type: Number,
        required: true,
      },
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    model: {
      type: String,
      required: true,
    },
    colors: {
      type: [String], // Masalan: ['qora', 'oq']
      required: true,
    },
    sizes: {
      type: [String], // Masalan: ['XS', 'S', 'M', 'L', 'XL']
      required: true,
    },
    // quantity: {
    //   type: Number,
    //   required: true,
    // },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    // isFavorite: {
    //   type: Boolean,
    //   default: false,
    // },
    // isViewed: {
    //   type: Boolean,
    //   default: false,
    // },
  },
  { timestamps: true }
);

module.exports = model('Product', productSchema);
