const express=require('express');
const router=express.Router();

const CatController = require('../controllers/category');

router.get('/add',CatController.getAddCat);

router.post('/',CatController.postAddCat);

router.get('/', CatController.getCategory);

router.get('/s/:id', CatController.getView);

router.get('/:page',CatController.getCatList);

router.get('/:id/edit',CatController.getEditCat);

router.put('/:id',CatController.postEditCat);

router.delete('/:id',CatController.DeleteCat);

module.exports=router;