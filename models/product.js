const mongoose=require('mongoose');

const Schema = mongoose.Schema ;

const ProductSchema=new Schema({
    id:String,
    name:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'category'
    },
    catid:{
        type:String,
        required:true
    },
    catname:
    {
        type:String,
        required:true
    }
});

const Product =mongoose.model('product',ProductSchema);
module.exports = Product;