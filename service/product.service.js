const productModel = require('../models/product.model');
const fileService = require('./file.service');

class ProductService {
  async getAll() {
    const products = await productModel.find();
    return products;
  }

  async createProduct(product, picture) {
    const fileName = fileService.save(picture);
    const newProduct = await productModel.create({
      ...product,
      imageUrl: fileName,
    });
    return newProduct;
  }
  async getOne(id) {
    if (!id) {
      throw new Error('id is required');
    }
    const product = await productModel.findById(id);
    return product;
  }
  async deleteProduct(id) {
    if (!id) {
      throw new Error('id is required');
    }
    const deletedProduct = await productModel.findByIdAndDelete(id);
    return deletedProduct;
  }
  async editProduct(id, product) {
    if (!id) {
      throw new Error('id is required');
    }
    const editProduct = await productModel.findByIdAndUpdate(id, product, {
      new: true,
    });
    return editProduct;
  }
}

module.exports = new ProductService();
