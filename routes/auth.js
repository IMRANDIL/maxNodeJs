const router = require('express').Router();

const { getLogin } = require('../controllers/auth')

router.get('/login', getLogin)





module.exports = router;