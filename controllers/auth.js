exports.getLogin = (req, res, next) => {


    res.render('auth/login', { path: req.url, title: 'Login_Page' })


}