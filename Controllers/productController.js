const products = require('../Models/productSchema')

// get all products 
exports.getAllProducts = async (req, res) => {
    try {
        const AllProducts = await products.find();
        res.status(200).json(AllProducts)
    } catch (error) {
        res.status(404).json(error)
    }
}

// get a single product details
exports.getProduct = async (req, res) => {
    const { id } = req.params;
    // get a particular product
    try {
        const getAProduct = await products.findOne({ id })
        res.status(200).json(getAProduct)
    } catch (err) {
        res.status(404).json(err)
    }
}