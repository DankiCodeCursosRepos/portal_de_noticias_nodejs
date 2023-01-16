const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

const path  = require('path');

const app = express();
const port = 3030;

const Posts = require('./Posts');
const { findOneAndUpdate } = require('./Posts');


mongoose.connect('mongodb+srv://root:Artur17118901@cluster0.izmls72.mongodb.net/DankiCode?retryWrites=true&w=majority',{
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

    Posts.find({}).sort({'_id': -1}).exec(function(err, posts){
      // console.log(posts[0]);
      posts = posts.map(function(val){
        return {
          titulo: val.titulo,
          conteudo: val.conteudo,
          descricaoCurta: val.conteudo.substring(0,100),
          imagem: val.imagem,
          slug:val.slug,
          categoria: val.categoria,
        }
      });
    });

    Posts.find({}).sort({'views': -1}).limit(3).exec(function(err,postsTop){
      postsTop = postsTop.map(function(val){

        return {
          titulo: val.titulo,
          conteudo: val.conteudo,
          descricaoCurta: val.conteudo.substring(0,100),
          imagem: val.imagem,
          slug: val.slug,
          categoria: val.categoria,
          views: val.views
        }
      })
    })


    res.render('home',{posts:Posts,postsTop:postsTop});
  } else {
    res.render('busca', {})
  }

});

app.get('/:slug', (req, res)=> {
  // res.send(req.params.slug);

  Posts.findOneAndUpdate(
    {slug: req.params.slug},
    {$inc : {views: 1}},
    {new: true},
    function (err, resposta){
      // console.log(resposta)
      res.render('single',{noticia: resposta})
    }
  )
});

app.listen(port, () => {
  console.log(`servidor no ar na porta ${port}`)
});
