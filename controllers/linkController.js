//models
const Link = require('../models/Link');

const redirect = async (req, res)=>{

    let title = req.params.title;
    
    try{
    let doc = await Link.findOneAndUpdate({title}, {$inc:{click:1}});
    
     console.log(doc);
    
     res.redirect(doc.url);
    
    }
    catch(error){
        res.send(error)
    }

}

//Adicionando Links

const addLink = async (req,res)=>{
    let link = new Link(req.body)

    try{
        let doc = await link.save();
        // res.send("Link adicionado com Sucesso!");
        res.redirect('/');
    }
    catch(error){
        res.render('add',{error,body:req.body});
    }
}


//Busca no banco de dados;

const allLinks = async (req, res)=>{

    try{
        let docs = await Link.find();
        res.render('all', {links: docs});
    }
    catch(error){
        res.render(error);
    }

}

const deleteLink = async (req,res)=>{
    let id = req.params.id;

    if(!id){
        id = req.body.id;
    }

    try{
     await Link.findByIdAndDelete(id);
    //  res.send(id);
    res.redirect('/');
    }
    catch(error){
        res.status(404).send(error); //Tratando o erro
    }
}

const loadLink = async (req,res)=>{

    let id = req.params.id;

    try{
    let doc = await Link.findById(id);
    res.render('edit',{error: false, body: doc});
    }
    catch(error){
        res.status(404).send(error); //Tratando o erro
    }
}

const editLink = async (req, res)=>{

    let link = {};
    link.title = req.body.title;
    link.description = req.body.description;
    link.url = req.body.url;

    let id = req.params.id;

    if(!id){
        id = req.body.id;
    }

    try{
        let doc = await Link.UpdateOne({_id: id}, link);
        res.redirect('/');
    }
    catch(error){
        res.render('edit',{error, body: req.body});
    }
}


module.exports = {redirect , addLink, allLinks, deleteLink, loadLink, editLink};