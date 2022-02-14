exports.getLogin = (req, res, next) => {
    console.log(req.session.isLoggedIn)
    // const isLoggedIn = req.get('Cookie').trim().split('=')[1] === 'true'
    res.render('auth/login', { path: req.url, title: 'Login_Page', isAuthenticated: req.session.isLoggedIn })


}


exports.postLogin = (req, res, next) => {

    // res.setHeader('Set-Cookie', 'loggedIn=true') //setting cookie...//session...server side...cookie...client side

    req.session.isLoggedIn = true;


    res.redirect('/')


}


exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/')
    })
}