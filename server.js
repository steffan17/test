
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const apiRouter = require('./routes/api')
const expressHandlebars = require('express-handlebars')

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',
  }))
  app.set('view engine', 'handlebars')

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/', apiRouter)

app.use(express.static('public'));

app.get('/db', (req, res) => {
    var scripts = [{ script: '/dbInterface/js/db.js' }];
    res.render('db', { title: 'DB', scripts: scripts })
})

app.get('/', (req,res)=>{
    res.render('home', {title: 'HOME'})
})

app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Błąd serwera')
})

app.listen(port, ()=>console.log(`It's working on port: ${port}`))

