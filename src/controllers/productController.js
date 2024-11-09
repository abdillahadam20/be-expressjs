const { connectMongo } = require('../config/mongodb')
const product = require('../models/productModels')

// Connnect DB
let db;
(async () => {
    db = await connectMongo();
})();

// Get All Products
exports.getAllProducts = async (req, res) => {
    try {
        const products = await db.collection('products').find().toArray();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Get All Products by Id
exports.getProductById =async (req, res) => {
    try {
        const product = await db.collection('products').findOne({
            _id: new require('mongodb').ObjectId(req.params.id)
        });

        if(product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.createProduct = async (req, res) => {
    try {
        const { title, description } = req.body;
        const newProduct = {
            title,
            description,
            createdAt: new Date() // Anda dapat menambahkan timestamp jika diperlukan
        };

        const result = await db.collection('products').insertOne(newProduct);

        res.status(201).json({ message: 'Product created', productId: result.insertedId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.updateProduct = async (req, res) => {
    try {
        const { title, description } = req.body;
        const updatedProduct = {
            title,
            description
        };

        const result = await db.collection('products').updateOne(
            { _id: new require('mongodb').ObjectId(req.params.id) },
            { $set: updatedProduct }
        );

        if (result.matchedCount > 0) {
            res.json({ message: 'Product updated' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


exports.deleteProduct = async (req, res) => {
    try {
        const result = await db.collection('products').deleteOne({
            _id: new require('mongodb').ObjectId(req.params.id)
        })

        if(result.deletedCount > 0) {
            res.json({ message: 'Product deleted' });
        } else {
            res.status(404).json({ message: 'Product not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

