const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public'))); //this tells the program to find vanilla js files in a directory called public
app.set('view engine', 'ejs')


app.get('/', function(req, res){
    fs.readdir(`./files`, function(err, files){
        res.render('index', {files: files});
    })
})

app.get('/file/:fileName', function(req, res){
    fs.readFile(`./files/${req.params.fileName}`, 'utf-8', function(err, filedata){
        res.render('show', {fileName: req.params.fileName, filedata: filedata});
    })})

app.get('/edit/:fileName', function(req, res){
   res.render('edit', {fileName:req.params.fileName});
    })
    
app.post('/edit', function(req, res){
    fs.rename(`./files/${req.body.Previous}`, `./files/${req.body.New}.txt`, function(err){
        res.redirect('/');
    });
        })
    

app.post('/create', function(req, res){
    fs.writeFile(`./files/${req.body.title.split(' ').join('_')}.txt`, req.body.details, function(err){
    res.redirect('/') //redirects to / page after completion of code
    })
})

app.listen(3000)