const express = require('express');
const path = require('path');

const { router } = require('./routes/admin');
const shoprouter = require('./routes/shop');
const Err = require('./controllers/err');
const User = require('./modals/user');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth')


const app = express();

const userSpec = async (req, res, next) => {
    try {
        const Specuser = await User.findById("6204831089d7382e7e8e5bf3");

        req.Specuser = Specuser;

        next()


    } catch (error) {
        console.log(error);
    }


}

app.use(userSpec)



app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use('/', shoprouter)
app.use('/', router);

app.use(authRoute)



require('dotenv').config();

const port = process.env.PORT || 8000;


app.set('view engine', 'ejs');


app.set('views', 'views');














app.use(Err.err);



mongoose.connect(process.env.URI).then((result) => {
    User.findOne().then((user) => {
        if (!user) {
            const user = new User({
                name: 'Ali',
                email: 'aliimranadil2@gmail.com',
                cart: {
                    items: []
                }
            });

            user.save()
        }
    })

    app.listen(port);
    console.log(`server is listening on port: ${port}😃`);
}).catch((err) => console.log(err))
