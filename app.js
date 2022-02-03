const express = require('express');
const path = require('path');
const { mongoConnect } = require('./util/database')
const { router } = require('./routes/admin');
const shoprouter = require('./routes/shop');
const Err = require('./controllers/err');


const app = express();

const userSpec = async (req, res, next) => {
    // try {
    //     const Specuser = await User.findByPk(1);

    //     req.Specuser = Specuser;

    //     next()


    // } catch (error) {
    //     console.log(error);
    // }


}

// app.use(userSpec)



app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())


// app.use('/', shoprouter)
app.use('/', router);





require('dotenv').config();

const port = process.env.PORT || 8000;


app.set('view engine', 'ejs');


app.set('views', 'views');














app.use(Err.err);

mongoConnect(() => {
    // console.log(client);

    app.listen(port);
    console.log(`server is running on port: ${port}`);
})

