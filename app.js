const express = require('express');
const path = require('path')
const { router } = require('./routes/admin');
const shoprouter = require('./routes/shop');
// const { product } = require('./routes/admin')

// const bodyparser = require('body-parser')
const app = express();
// app.locals.basedir = path.join(__dirname, 'views');

app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', router)
app.use(shoprouter)

app.set('view engine', 'pug');
app.set('views', 'views')


app.use((req, res, next) => {
    res.status(404).render('404', { title: `404 Page` })
})

app.listen(5000, () => console.log('server is running on port: 5000'))