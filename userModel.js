
var modelUser ={}

var misUsuarios = []

//importamos la libreria
const mongoose = require('mongoose');
//definimos tipo de esquema
const Schema = mongoose.Schema;
// configuramos el esquema
var UserSchema = new Schema({
    firstname:String,
    email:String,
    age:Number
})

//usuarios es el nombre de la coleccion y esta asociado a la variable anterior
const Mymodel = mongoose.model('users',UserSchema)







modelUser.Guardar= function(post,callback){

    //instanciar el modelo
    const instace = new Mymodel

    //configuracion de la instancia
    instace.firstname = post.nombre;
    instace.email = post.email;
    instace.age = post.edad;

    //guardar informacion correspondiente. Aqui no se usa insertOne o Many sino save
    instace.save((error,userCreated) => {
        if(error){
            console.log(error);
        }
        else{
            console.log(userCreated);
            return callback(userCreated)
        }
    })



}

modelUser.Modificar = function(post,callback) {



    Mymodel.findByIdAndUpdate(post.id,
    {firstname:post.nombre,
    age:post.edad}
    ,(error,respuesta)=> {

    if(error){
        console.log(error)
        return callback (error)
    }
    else{
        console.log(respuesta);
        return callback({state:true,mensaje:'usuario actualizado'})
    }
})
}

modelUser.Listar = function (post,callback) {
    Mymodel.find({},(error,documentos) =>{
        if(error){
            console.log(error)
            return callback (error)
        }
        else{
            console.log(documentos);
            return callback(documentos)


        }
})
}

modelUser.cargarId = function (post,callback) {

    Mymodel.find({_id:post.id},(error,documentos) =>{
        if(error){
            console.log(error)
            return callback (error)
        }
        else{
            console.log(documentos);
            return callback(documentos)


        }
})
}



modelUser.Eliminar = function(post,callback) {


    Mymodel.findByIdAndDelete(post.id,(error,resultado)=> {

        if(error){
            console.log(error)
            return callback (error)
        }
        else{
            console.log(resultado);
            return callback({state:true,mensaje:'usuario eliminado'})
        }
    })
}

//la variable usuariob se conecta con el controlador al hacer el require del modelo
module.exports.usuariob = modelUser 