const express = require('express');
const app = express();
const productController = require('../controllers/productController');
const router = express.Router();

// Rute untuk mendapatkan semua produk
router.get('/', productController.getAllProducts);

// Rute untuk mendapatkan produk berdasarkan ID
router.get('/:id', productController.getProductById);

// Rute untuk menambah produk baru
router.post('/', productController.createProduct);

// Rute untuk mengupdate produk
router.put('/:id', productController.updateProduct);

// Rute untuk menghapus produk
router.delete('/:id', productController.deleteProduct);

module.exports = router;