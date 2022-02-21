const router = require('express').Router();

const { check, body } = require('express-validator/check');

const { getLogin, postLogin, postLogout, postSignup, getSignup, getReset, postReset, getNewPass, postNewPass } = require('../controllers/auth')

router.get('/login', getLogin)
router.post('/login', postLogin);
router.post('/logout', postLogout);
router.post('/signup', [check('email').isEmail().withMessage('Please Enter A Valid Email'), body('password', 'Please Enter a password with only numbers and text and atleast 5 characters.').isLength({ min: 5, max: 20 }).isAlphanumeric()], postSignup)
router.get('/signup', getSignup)
router.get('/reset', getReset);
router.post('/reset', postReset);
router.get('/reset/:token', getNewPass);
router.post('/new-password', postNewPass);



module.exports = router;