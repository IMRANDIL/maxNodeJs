const express = require('express');
const path = require('path');

require('dotenv').config();
const { router } = require('./routes/admin');
const shoprouter = require('./routes/shop');
const Err = require('./controllers/err');
const User = require('./modals/user');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const session = require('express-session');
const MongodbStore = require('connect-mongodb-session')(session);
const csrf = require('csurf')


const app = express();

const store = new MongodbStore({
    uri: process.env.URI,
    collection: 'sessions'

});


const csrfProtection = csrf()



app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: 'my secretone', resave: false, saveUninitialized: false, store: store }));



app.use(csrfProtection)





app.use((req, res, next) => {
    if (!req.session.user) {
        return next()
    }
    User.findById(req.session.user._id).then((user) => {
        req.user = user;
        next()
    }).catch((err) => console.log(err))
})



app.use('/', shoprouter)
app.use('/', router);

app.use(authRoute)




const port = process.env.PORT || 8000;


app.set('view engine', 'ejs');


app.set('views', 'views');














app.use(Err.err);



mongoose.connect(process.env.URI).then((result) => {
    app.listen(port);
    console.log(`server is listening on port: ${port}😃`);
}).catch((err) => console.log(err))
