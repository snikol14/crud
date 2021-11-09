
var express = require('express')
global.application = express()
var path = require ('path')
global.appRoot = path.resolve(__dirname)
//var port= 3002

global.config = require('./config.js').config 






const mongoose = require('mongoose');

//cabeceras que permiten comunicarse con los datos
application.all('*',function(req, res, next){

    var whitelist = req.headers.origin;
    console.log(whitelist)

    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');  
    res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");

next();
})

mongoose.connect('mongodb://127.0.0.1:27017/crudUsers',{useNewUrlParser:true,useUnifiedTopology:true},(error,res) => {

    if(error){
        console.log(error)
    }
    else{
        console.log('Conexion a Mongo Correcta')
    }

})





require('./routes/routes')


application.use('/',express.static(__dirname + './Pagina/index.html'))
//application.get('/*',function(request,response,next){
    //response.sendFile(path.resolve(__dirname + './Pagina/index.html'))

//})



application.listen(config.puerto, function(){
    console.log('servidor iniciado en el puerto' + ' ' + config.puerto)//ahora es config.puerto en vez de port
}) 