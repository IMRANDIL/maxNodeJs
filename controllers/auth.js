exports.getLogin = (req, res, next) => {

    const isLoggedIn = req.get('Cookie').trim().split('=')[1]
    res.render('auth/login', { path: req.url, title: 'Login_Page', isAuthenticated: isLoggedIn })


}


exports.postLogin = (req, res, next) => {

    res.setHeader('Set-Cookie', 'loggedIn=true')


    res.redirect('/')


}