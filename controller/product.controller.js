const productService = require('../service/product.service');

class ProductController {
  async getAll(req, res) {
    try {
      const allProducts = await productService.getAll();
      res.status(200).json(allProducts);
    } catch (error) {
      res.status(200).json(error);
    }
  }
  async createProduct(req, res) {
    try {
      const newProduct = await productService.createProduct(req.body, req.files.picture);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(200).json(error);
    }
  }
  async getOne(req, res) {
    try {
      const product = await productService.getOne(req.params.id);
      res.status(200).json(product);
    } catch (error) {
      res.status(200).json(error);
    }
  }
  async deleteProduct(req, res) {
    try {
      const deletedProduct = await productService.deleteProduct(req.params.id);
      res.status(200).json(deletedProduct);
    } catch (error) {
      res.status(200).json(error);
    }
  }
  async editProduct(req, res) {
    try {
      const editProduct = await productService.editProduct(
        req.params.id,
        req.body
      );
      res.status(200).json(editProduct);
    } catch (error) {
      res.status(200).json(error);
    }
  }
}

module.exports = new ProductController();
