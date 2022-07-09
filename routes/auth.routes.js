import express from 'express';
import auth from '../controles/auth';

const router = express.Router();


router.post('/signup', auth.signUp);
router.post('/signin', auth.signIn);

module.exports = router;