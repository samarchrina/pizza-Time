const express = require('express');
const{registerOrder}=require('../controllers/orderController');
const router=express.Router();
router.get('/',orderController.getAllOrders);
router.post('/register',orderController.registerOrder);
module.exports=router;
