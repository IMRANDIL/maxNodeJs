const router = require('express').Router();

const { check, body } = require('express-validator');
const User = require('../modals/user')

const { getLogin, postLogin, postLogout, postSignup, getSignup, getReset, postReset, getNewPass, postNewPass } = require('../controllers/auth')











router.get('/login', getLogin)
router.post('/login', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.').normalizeEmail(),
    body('password', 'Password has to be valid.')
        .isLength({ min: 5 })
        .isAlphanumeric().trim()
], postLogin);
router.post('/logout', postLogout);






router.post('/signup', [check('email').isEmail().withMessage('Please Enter A Valid Email').custom((value, { req }) => {

    return User.findOne({ email: value }).then((userDoc) => {
        if (userDoc) {
            return Promise.reject('E-mail already exists. Please pick a different one.')

        }

    })
}).normalizeEmail(), body('password', 'Please Enter a password with only numbers and text and atleast 5 characters.').isLength({ min: 5, max: 20 }).isAlphanumeric().trim(), body('confirmPassword').trim().custom((value, { req }) => {
    if (value !== req.body.password) {
        throw new Error("Password have to match")
    }
    return true;
})], postSignup)









router.get('/signup', getSignup)
router.get('/reset', getReset);
router.post('/reset', postReset);
router.get('/reset/:token', getNewPass);
router.post('/new-password', postNewPass);



module.exports = router;