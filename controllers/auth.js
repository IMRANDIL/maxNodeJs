const user = require("../modals/user")

exports.getLogin = (req, res, next) => {
    // console.log(req.session.isLoggedIn)
    // const isLoggedIn = req.get('Cookie').trim().split('=')[1] === 'true'
    res.render('auth/login', { path: req.url, title: 'Login_Page', isAuthenticated: false })


}


exports.postLogin = (req, res, next) => {

    // res.setHeader('Set-Cookie', 'loggedIn=true') //setting cookie...//session...server side...cookie...client side
    user.findById('6204831089d7382e7e8e5bf3').then((user) => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        req.session.save((err) => {
            console.log(err);
            res.redirect('/')
        })

    }).catch((err) => console.log(err))






}


exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/')
    })
}



exports.postSignup = (req, res, next) => {

}



exports.getSignup = (req, res, next) => {
    res.render('auth/signup', { path: req.url, title: 'SignUp', isAuthenticated: false })
}