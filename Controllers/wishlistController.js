const wishlists = require('../Models/wishlistSchema')

// Add to wishlist
exports.addWishlist = async (req, res) => {
    // get a product id
    const { id, title, price, image } = req.body
    // get a userId
    const userId = req.payload
    // add details of the product to the db
    try {
        const existingProduct = await wishlists.findOne({ id })
        if (existingProduct) {
            res.status(404).json("Product already exists.")
        } else {
            const newProduct = new wishlists({
                id,
                title,
                price,
                image,
                userId
            })
            await newProduct.save();
            res.status(200).json("Product Added Succesfully !")
        }
    } catch (err) {
        res.status(404).json(err)
    }

}

// get all wishlists
exports.getWishlists = async (req, res) => {
    try {
        const wishlistProduct = await wishlists.find()
        if (wishlistProduct) {
            res.status(200).json(wishlistProduct)
        } else {
            res.status(404).json("Product Not Found")
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

exports.deleteFromWishlist = async (req, res) => {
    const { id } = req.params;
    try {
        const deleteItem = await wishlists.deleteOne({ id });
        if (deleteItem) {
            const wishlistProduct = await wishlists.find();
            res.status(200).json(wishlistProduct)
        }
    } catch (err) {
        res.status(404).json("error", +err)
    }
}