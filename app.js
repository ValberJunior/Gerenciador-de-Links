const express = require('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const path = require('path');


//Routes
const linkRoute = require('./routes/linkRoute')

mongoose.connect('mongodb://localhost/newlinks',{useNewURLParser:true, useUnifiedTopology:true});

let db= mongoose.connection;

db.on("error",()=>{console.log("houve um Erro")});

db.once("open",()=>{console.log("Banco de Dados Carregado")});


//Setando o diretório Público  !Importante  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
app.use(express.static('public'))

//Setando o EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'templates'));


app.use('/', linkRoute);

app.listen(port,()=>{
    console.log("Server Running on Port "+ port );
})