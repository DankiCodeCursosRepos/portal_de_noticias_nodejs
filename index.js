const express = require('express');
var bodyParser = require('body-parser');

const path  = require('path');

const app = express();
const port = 3030

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use('/public', express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, '/pages'));

app.get('/', (req, res)=> {

  if(req.query.busca == null){
    res.render('home', {})

  } else {
    res.render('busca', {})
  }

});

app.get('/:slug', (req, res)=> {
  // res.send(req.params.slug);
  res.render('single',{})
});

app.listen(port, () => {
  console.log(`servidor no ar na porta ${port}`)
});
