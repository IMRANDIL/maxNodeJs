exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn)
    // const isLoggedIn = req.get('Cookie').trim().split('=')[1] === 'true'
    res.render('auth/login', { path: req.url, title: 'Login_Page', isAuthenticated: false })


}


exports.postLogin = (req, res, next) => {

    // res.setHeader('Set-Cookie', 'loggedIn=true') //setting cookie...

    req.session.isLoggedIn = true;


    res.redirect('/')


}