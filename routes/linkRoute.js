const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

const linkController = require('../controllers/linkController');


//Rotas

router.use(methodOverride('_method')); //Method Override como Middleware

//Todos os links
router.get('/', linkController.allLinks);


//Add
router.get('/add', (req, res)=>{
    res.render('add',{ error: false, body: {} });
  }) 

//ler documentos após o usuário fazer uma requisição
router.get('/:title', linkController.redirect )

//Edit
router.get('/edit/:id', linkController.loadLink);
router.post('/edit:id',express.urlencoded({extended:true}), linkController.editLink)
 

router.post('/', express.urlencoded({extended:true}), linkController.addLink);

//Rota para deletar documentos

router.delete('/:id', linkController.deleteLink);

router.delete('/', express.urlencoded({extended:true}), linkController.deleteLink);

module.exports = router;