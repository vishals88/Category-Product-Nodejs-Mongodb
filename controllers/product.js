const Product=require('../models/product');
const Category=require('../models/category');
const mongoose = require('mongoose');

exports.getProduct = (req,res)=>{
    res.redirect('/product/1');
};

exports.getAddProd = (req,res)=>{
    const data=req.params.id;
    res.render('add-product',{data});
};

exports.postAddProd = (req,res)=>{
    const id=req.params.id
    Category.findById(id,(err,category)=>{
            if(err){
                return res.status(400).json({
                    message:err.message
                })
            }
        else{
           const catid=category._id;
           const catname=category.name;
           const data={name:req.body.name,catid:catid,catname:catname}
            Product.create(data,(err,product)=>{
                if(err){
                    return res.status(400).json({
                        message:err.message
                    })
                }
                else{  
                    category.products.push(product);
                    product.category=category;
                    category.save();
                    console.log(data);
                    res.status(200).redirect('/category/s/'+id)
                }
            })
        }
    });
};

exports.getProdList = (req, res, next) => {
    const perPage = 10 ;
    const page = req.params.page || 1;
    Product
        .find({})
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec(function(err,result) {
            Product.count().exec(function(err, count) {
                if (err) 
                return next(err)
                res.render('product-list', {
                    result:result,
                    current: page,
                    pages: Math.ceil(count / perPage)
                })
            })
        });
};

exports.getEditProd = (req,res) =>{
    Product.findById({_id: new mongoose.Types.ObjectId(''+req.params.id)},(err,result)=>{
        if(err){
            return res.status(400).json({
                message:err.message
            })
        }
        else{
              res.status(200).render('edit-product',{result:result});
        }
    });
};
    
exports.postEditProd = (req,res)=>{
    data={name:req.body.name}
    Product.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(''+req.params.id)},
    {$set: req.body},(err,result)=>{
        if(err){
            return res.status(400).json({
                message:err.message
            })
        }
        else{
            res.status(200).redirect('/product');
        }
    });
};
    
exports.DeleteProd = (req,res)=>{
    Product.findByIdAndRemove({_id: new mongoose.Types.ObjectId(''+req.params.id)},(err,result)=>{
        if(err){
            return res.status(400).json({
                message:err.message
            })
        }
        else{
            res.status(200).redirect('/product');
        }
    });
}; 