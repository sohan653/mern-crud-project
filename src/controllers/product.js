
const Product = require("../models/product")




// @@C=createObject
exports.createProducts=async(req,res)=>{
    
        try {
            const product=await Product.create(req.body)
            res.json({
                status:"success",
                data: product
            })
            
        } catch (error) {
            console.log(error.message)
        }
}


// @@R=readObject
exports.readProducts=async(req,res)=>{
    try {
        const products=await Product.find({})
        res.json({
            status:"success",
            data: products
        })

    } catch (error) {
        console.log(error.message)
    }
}

// @@readOneObject

exports.readOneProduct=async(req,res)=>{
        const id=req.params.id;
        try {
            const product=await Product.findById(id)
            res.json({
                status:"success",
                data: product
            })
            
        } catch (error) {
            console.log(error.message)
        }
}



// @@updateObject

exports.updateProduct=async(req,res)=>{
    const reqBody = req.body;
    const id=req.params.id
    try {
        const updated=await Product.findByIdAndUpdate(id,reqBody).exec()
        res.json({
            status:"success",
            data: updated
        })

    } catch (error) {
        
    }
}


// @@ deleteObject

exports.deleteProduct=async(req,res)=>{
    const id=req.params.id;
    try {
        const deleted=await Product.findByIdAndDelete(id);
        res.json({status:"successfully deleted",data:deleted})
    } catch (error) {
        console.log(error.message)
    }
}