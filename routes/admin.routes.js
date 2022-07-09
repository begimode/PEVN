import express from "express";
import admin from '../controles/admin';

const router = express.Router();


// CRUD
router.post('/carta', admin.newItem);
router.get('/carta/:p_id', admin.readProduct);
router.put('/carta/:p_id', admin.updateProduct);
router.delete('/carta/:p_id', admin.deleteProduct);

router.get('/allmenu', admin.getMenu);


module.exports = router;