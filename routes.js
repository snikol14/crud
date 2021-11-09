

var bodyParser = require('body-parser')

//const { application } = require('express')


application.use(bodyParser.json())
application.use(bodyParser.urlencoded({extended:true}))

var Usuarios = require(appRoot + '/api/controllers/userController.js').usuario

//HISTORIAS DE USUARIO
// un sistema que almacene, modifique elimine y liste usuarios = CRUD

application.post('/API/Usuarios/Guardar',function(request,response){
    Usuarios.Guardar(request,response)
})

application.post('/API/Usuarios/Modificar',function(request,response){
    Usuarios.Modificar(request,response)
})

application.post('/API/Usuarios/Eliminar',function(request,response){
    Usuarios.Eliminar(request,response)
})

application.post('/API/Usuarios/Listar',function(request,response){
    Usuarios.Listar(request,response)
})

application.post('/API/Usuarios/cargarId',function(request,response){
    Usuarios.cargarId(request,response)
})

