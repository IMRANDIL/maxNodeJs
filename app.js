const express = require('express');
const path = require('path')
const { router } = require('./routes/admin');
const shoprouter = require('./routes/shop');
// const expressHandle = require('express-handlebars')

// const bodyparser = require('body-parser')
const app = express();


app.use(express.urlencoded({ extended: true }));
// app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/', router)
app.use(shoprouter)
// app.engine('handlebars', expressHandle())

app.set('view engine', 'ejs');


// app.set('view engine', 'pug');
app.set('views', 'views')


app.use((req, res, next) => {
    res.status(404).render('404', { title: `404 Page`, path: req.url })
})

app.listen(5000, () => console.log('server is running on port: 5000'))