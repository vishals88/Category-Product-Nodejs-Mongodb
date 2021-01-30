const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema= new Schema({
    id:String,
    name:{
        type:String,
        required:true
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product'
    }]
});

const Category = mongoose.model('category',CategorySchema);
module.exports = Category ;