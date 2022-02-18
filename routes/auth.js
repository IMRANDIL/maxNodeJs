const router = require('express').Router();

const { getLogin, postLogin, postLogout, postSignup, getSignup, getReset } = require('../controllers/auth')

router.get('/login', getLogin)
router.post('/login', postLogin);
router.post('/logout', postLogout);
router.post('/signup', postSignup)
router.get('/signup', getSignup)
router.get('/reset', getReset)



module.exports = router;