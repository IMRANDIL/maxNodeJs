exports.getLogin = (req, res, next) => {


    res.render('auth/login', { path: req.url, title: 'Login_Page', isAuthenticated: req.isLoggedIn })


}


exports.postLogin = (req, res, next) => {

    req.isLoggedIn = true;


    res.redirect('/')


}