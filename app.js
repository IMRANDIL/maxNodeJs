const express = require('express');
const path = require('path');

const { router } = require('./routes/admin');
const shoprouter = require('./routes/shop');
const Err = require('./controllers/err');
const User = require('./modals/user');
const mongoose = require('mongoose')


const app = express();

// const userSpec = async (req, res, next) => {
//     try {
//         const Specuser = await User.findById("61ff8b7b000fabf9fff12360");

//         req.Specuser = new User(Specuser.name, Specuser.email, Specuser.cart, Specuser._id);

//         next()


//     } catch (error) {
//         console.log(error);
//     }


// }

// app.use(userSpec)



app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use('/', shoprouter)
app.use('/', router);





require('dotenv').config();

const port = process.env.PORT || 8000;


app.set('view engine', 'ejs');


app.set('views', 'views');














app.use(Err.err);



mongoose.connect(process.env.URI).then((result) => {
    app.listen(port);
    console.log(`server is listening on port: ${port}😃`);
}).catch((err) => console.log(err))
