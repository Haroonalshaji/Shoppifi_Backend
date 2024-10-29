const carts = require('../Models/cartSchema');

// add to cart
exports.addToCart = async (req, res) => {
    // get details
    const { id, title, price, image, quantity } = req.body
    
    try {
        const cartItem = await carts.findOne({ id });
        if (cartItem) {
            // cartItem.quantity += 1;
            const unitPrice = cartItem.price / cartItem.quantity;
            cartItem.quantity++;
            // Calculate new total price
            cartItem.price = cartItem.quantity * unitPrice;
            await cartItem.save();
            res.status(200).json("Product Updated Succesfully")
        } else {
            const cartNewProduct = new carts({ id, title, price, image, quantity })
            await cartNewProduct.save();
            res.status(200).json("Product Added Succesfully")
        }
    } catch (err) {
        res.status(404).json(err)
    }
}

// decrement the product quantity
exports.decrementFromCart = async (req, res) => {
    const { id } = req.params; // Ensure you are capturing the ID from the URL params
    try {
        const cartItem = await carts.findOne({ id });
        if (cartItem) {
            if (cartItem.quantity > 1) {
                const unitPrice = cartItem.price / cartItem.quantity;
                // Decrement quantity
                cartItem.quantity--;
                // Calculate new total price
                cartItem.price = cartItem.quantity * unitPrice;
                await cartItem.save(); // Save the updated cart item to the database
                res.status(200).json("Product Quantity Decreased Successfully");
            } else {
                await carts.deleteOne({ id }); // Remove item from cart if quantity is 1
                res.status(200).json("Product Removed Successfully");
            }
        } else {
            res.status(404).json("Product not found in cart");
        }
    } catch (err) {
        res.status(404).json(err);
    }
}

// get to cart
exports.getToCart = async (req, res) => {
    try {
        const allCartProducts = await carts.find()
        res.status(200).json(allCartProducts)
    } catch (err) {
        res.status(404).json(err)
    }
}

exports.deletefromCart = async (req, res) => {
    const id = req.params.id;
    try {
        const deletionfromCart = await carts.deleteOne({ id })
        res.status(200).json(deletionfromCart)
    } catch (error) {
        res.status(404).json(error)
    }
}