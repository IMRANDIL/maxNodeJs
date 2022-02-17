const bcrypt = require('bcryptjs')
const User = require("../modals/user");

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }

    // console.log(req.session.isLoggedIn)
    // const isLoggedIn = req.get('Cookie').trim().split('=')[1] === 'true'
    res.render('auth/login', { path: req.url, title: 'Login_Page', errorMsg: message })


}


exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    // res.setHeader('Set-Cookie', 'loggedIn=true') //setting cookie...//session...server side...cookie...client side
    User.findOne({ email: email }).then((user) => {
        if (!user) {
            req.flash('error', 'Invalid email or password!')
            return res.redirect('/login')
        }
        bcrypt.compare(password, user.password).then((doMatch) => {
            if (doMatch) {
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save((err) => {
                    console.log(err);
                    res.redirect('/')
                })

            }
            req.flash('error', 'Invalid email or password!')
            res.redirect('/login')
        }).catch((err) => {
            console.log(err);
            return res.redirect('/login')
        });


    }).catch((err) => console.log(err))






}


exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/')
    })
}



exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    User.findOne({ email: email }).then((userDoc) => {
        if (userDoc) {
            req.flash('error', 'E-mail already exists!')
            return res.redirect('/signup');

        }

        return bcrypt.hash(password, 12).then((hashedPass) => {
            const user = new User({
                email: email,
                password: hashedPass,
                cart: { items: [] }
            });

            return user.save()
        }).then((result) => {
            return res.redirect('/login')
        })
            .catch((err) => console.log(err));
    })

}







exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }
    res.render('auth/signup', { path: req.url, title: 'SignUp', errorMsg: message })
}