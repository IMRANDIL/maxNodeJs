const crypto = require('crypto')


const bcrypt = require('bcryptjs')
const User = require("../modals/user");

const nodemailer = require('nodemailer');
const user = require('../modals/user');

// const sendGridTransport = require('nodemailer-sendgrid-transport');


let smtpTransporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.HOST_PORT,
    secure: false,

    auth: {
        user: 'aliimranadil2@gmail.com',
        pass: process.env.SMTP_PASSWORD

    }
});


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
            res.redirect('/login')
            return smtpTransporter.sendMail({
                to: email,
                from: 'shop@node.com',
                subject: 'Signup Succeeded!',
                html: `<h1>You Successfully Signed up!</h1>`
            })

        })
            .catch((err) => console.log(err));
    }).catch((err) => {
        console.log(err);
    })

}

//sendgrid not working..........sucks....





exports.getSignup = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }
    res.render('auth/signup', { path: req.url, title: 'SignUp', errorMsg: message })
}




exports.getReset = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }
    res.render('auth/reset', { path: req.url, title: 'Reset Password', errorMsg: message })
}



exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset')
        }

        const token = buffer.toString('hex');



        User.findOne({ email: req.body.email }).then((user) => {
            if (!user) {
                req.flash('error', 'No Account found with this email.');
                return res.redirect('/reset');

            }

            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save()


        }).then((result) => {
            res.redirect('/')
            return smtpTransporter.sendMail({
                to: req.body.email,
                from: 'shop@node.com',
                subject: 'Password Reset!',
                html: `
                <p>You Requested a password reset!</p>
                <p>Click this <a href='http://localhost:5000/reset/${token}'>link</a> to set a new password!</p>


                `
            })
        })

            .catch((err) => console.log(err))
    })
}


exports.getNewPass = (req, res, next) => {

    const token = req.params.token;

    User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } }).then((user) => {
        let message = req.flash('error');
        if (message.length > 0) {
            message = message[0]
        } else {
            message = null;
        }
        res.render('auth/new-password', { path: req.url, title: 'Update Password', errorMsg: message, userId: user._id.toString() })
    }).catch(err => console.log(err))


}