const Category=require('../models/category');
const mongoose = require('mongoose');

exports.getAddCat = (req,res)=>{
    res.render('add-category');
};

exports.postAddCat= (req,res)=>{
    const data={name:req.body.name};
    Category.create(data,(err,data)=>{
        if(err){
            return res.status(400).json({
                message:err.message
            })
        }
        else{
            res.status(200).redirect('/category');
            console.log(data);
        }
    }) 
};

exports.getCategory = (req,res)=>{
    Category.find({},(err,result)=>{
        if(err){
            return res.status(400).json({
                message:err.message
            })
        }
        else{
            res.status(200).redirect('/category/1');
        }
    });
};   

exports.getView=(req,res)=>{
    Category.findById({_id: new mongoose.Types.ObjectId(''+req.params.id)},(err,result)=>{
        if(err) {
            return res.status(400).json({
            message:err.message
            })
        }
        else{
            res.status(200).render('category-data',{result:result})
        }
    }).populate('products');
};

exports.getCatList = (req, res, next) => {
        const perPage = 10
        const page = req.params.page || 1
        Category
            .find({})
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec(function(err, result) {
                Category.count().exec(function(err, count) {
                    if (err) return next(err)
                    res.render('category-list', {
                        result:result,
                        current: page,
                        pages: Math.ceil(count / perPage)
                    })
                })
            });
};

exports.getEditCat = (req,res)=>{
    Category.findById({_id: new mongoose.Types.ObjectId(''+req.params.id)}, 
    (err,result)=>{
        if(err){
            return res.status(400).json({
                message:err.message
            })
        }
        else{
          res.status(200).render('edit-category',{result:result})
        }
    });
};

exports.postEditCat= (req,res)=>{
const data = {name:req.body.name,catname:req.body.name }
    Category.findByIdAndUpdate({_id: new mongoose.Types.ObjectId(''+req.params.id)},data,
    (err,result)=>{
        if(err){
            return res.status(400).json({
                message:err.message
            })
        }
        else{
            res.status(200).redirect('/category');
        }
    });
};

exports.DeleteCat = (req,res)=>{
    Category.findByIdAndDelete({_id: new mongoose.Types.ObjectId(''+req.params.id)},(err,result)=>{
        if(err)
            return res.status(400).json({
                message:err.message
            })
        else{
            res.status(200).redirect('/category')
        }
    });
};