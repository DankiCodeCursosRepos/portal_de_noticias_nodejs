const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const path  = require('path');

const app = express();
const port = 3030;


mongoose.connect('mongodb+srv://root:Artur17118901@cluster0.izmls72.mongodb.net/?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(function(){
  console.log('Banco Mongodb Atlas conectado com sucesso!')
}).catch(function(err){
  console.log(err.message)
});

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
