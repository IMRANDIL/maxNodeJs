const router = require('express').Router();

const { getLogin, postLogin, postLogout, postSignup, getSignup, getReset, postReset, getNewPass, postNewPass } = require('../controllers/auth')

router.get('/login', getLogin)
router.post('/login', postLogin);
router.post('/logout', postLogout);
router.post('/signup', postSignup)
router.get('/signup', getSignup)
router.get('/reset', getReset);
router.post('/reset', postReset);
router.get('/reset/:token', getNewPass);
router.post('/new-password', postNewPass);



module.exports = router;