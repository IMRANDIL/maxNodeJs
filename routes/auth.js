const router = require('express').Router();

const { getLogin, postLogin, postLogout, postSignup, getSignup } = require('../controllers/auth')

router.get('/login', getLogin)
router.post('/login', postLogin);
router.post('/logout', postLogout);
router.post('/signup', postSignup)
router.get('/signup', getSignup)




module.exports = router;