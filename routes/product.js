const express=require('express');
const router=express.Router();

const ProdController = require('../controllers/product');

router.get('/', ProdController.getProduct);

router.get('/:id/product/add',ProdController.getAddProd);

router.post('/:id/product',ProdController.postAddProd);

router.get('/:page', ProdController.getProdList);
    
router.get('/:id/edit', ProdController.getEditProd);
    
router.put('/:id', ProdController.postEditProd);

router.delete('/:id',ProdController.DeleteProd);

module.exports=router;