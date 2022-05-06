const product = require('../models/Product')
exports.getAllProduct = async (req, res, next) => {
    try{
        let list = await product.findAll()

        res.status(200).json({list})


    }catch(err){
        console.log(err)
        res.status(500).send('internal server error')
        next(err)

    }
     
}
exports.createNewProduct = async (req, res, next) => {
    res.send('Create New Post Route')
    
}
exports.getProductbyId = async (req, res, next) => {
    let id = req.params.id
    try {
        let [list, _] = await product.findById(id)

        res.status(200).json({ list })


    } catch (err) {
        console.log(err)
        res.status(500).send('internal server error')
        next(err)

    }

}