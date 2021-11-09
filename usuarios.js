
var identificador = "";

var cargar = function () { //despues de aqui se pega el codigo de postman
    var data = "";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;


xhr.open("POST", "http://127.0.0.1:3002/API/Usuarios/Listar");

xhr.send(data);

xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      console.log(this.responseText); //podemos convertir la respuesta string en formato json para manejarlos mejor
      var convert = JSON.parse(this.responseText) // para convertir de json a string es JSON.stringify
      console.log(convert)

      var informacion = "";
      var misDatos = document.getElementById('misDatos');
      for (let i = 0; i <convert.length; i++) {
         informacion = informacion + "<tr>" +
         "<th scope='row'><button type='button' class='btn btn-success' data-toggle='modal' data-target='#editUserModal'  onclick = cargarId('"+ convert[i]._id +"')>Editar</button></th>" +
         /*esta manera genera error porque hay un espacio entre el nombre y el apellido y rompe la cadena '"+ convert[i]._id +"','"+convert[i].firstname +"','"+convert[i].email+"','"+convert[i].age+"' */
         /* al crear la variable cargar id se reemplaza "+ convert[i]._id +" por un boton.*/
         "<td>"+ convert[i].firstname +"</td>"+
         "<td>"+ convert[i].email +"</td>"+
         "<td>"+ convert[i].age +"</td>"+
          //Este convert id es el mismo de arriba
         "<td><button type='button' class='btn btn-danger' onclick = Eliminar('"+ convert[i]._id +"')>Eliminar</button></td>"+
          //este ultimo  campo fue agregado despues de poner el eliminar en el html
       "</tr>" 

       misDatos.innerHTML= informacion
      }


    }
  });

}

var guardar = function(){
  //aqui puedo colocar el codigo que me da postman en el api de guardar

  var nombre = document.getElementById('nombre').value;
  var email = document.getElementById('email').value;
  var edad = document.getElementById('edad').value;

  var data = "nombre="+ nombre +"&email="+ email +"&edad="+ edad + "";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

//el eventlistener lo paso para debajo del send
//siempre debo rectificar el xhr.open que tenga http:// (siempre llega sin eso desde mi postman)

xhr.open("POST", "http://127.0.0.1:3002/API/Usuarios/Guardar");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.send(data);

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
    cargar()
    //podemos dejar o quitar el alert
    alert('Usuario creado con exito')
  }
});
}
//si quiero que la informacion cargue apenas se cargue la pagina y sin usar el boton le pongo que se inicialice la funcion cargar


var Eliminar =function (id) {
//buscamos en internet un swwet alert de confirm.


  swal({
      title: "Seguro que desea eliminar el registro",//"Are you sure?",
      text: "",//"You will not be able to recover this imaginary file!"
      icon: "warning",
      buttons: [
        'No',
        'Eliminar'
      ],
      dangerMode: true,
    }).then(function(isConfirm) {
      if (isConfirm) {
        swal({
          title: 'Usuarios',//'Shortlisted!',
          text: 'Usuario eliminado', //'Candidates are successfully shortlisted!',
          icon: 'success'
        }).then(function() {

          //form.submit(); // <--- submit form programmatically (en caso de que acepte cancelar el registro se hace lo siguiente). Se pega el codigo de la eliminacion que traemos de postman.

          var data = "id="+id+"";

          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;



          xhr.open("POST", "http://127.0.0.1:3002/API/Usuarios/Eliminar");
          xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

         xhr.send(data);

          xhr.addEventListener("readystatechange", function() {
          if(this.readyState === 4) {
        console.log(this.responseText);
        cargar()
      }
    });


        });
      } //else {
        //swal("Cancelled", "Your imaginary file is safe :)", "error");
      //} quitamos todo este de cancelar.
    })
//}); esto que sale con el sweetalert se borra


//Buscamos en internet el metodo confirmar eliminar confirm javascript y copiamos una opcion del metodo, la pegamos a continuacion y le cambiamos el texto que viene por defecto de axuerdo a las necesidades

  var txt;
// var r = confirm("Seguro que quiere eliminar este registro"); 
// if (r == true)si usamos sweetalert ya no necesitamos estas dos lineas {

//Aqui pegamos todo el evento

  // Este id es el parametro de la funcion



  //txt = "You pressed OK!"; este se reemplaza por else
// } else {
//   //txt = "You pressed Cancel!"; este se reemplaza por console.log
//   console.log('No se elimino')
// } al usar sweetalert ya tampoco necesitaria este else
 }



var cargarId = function(id){
  console.log(id)
  //cuando se presiona el boton cargarId se llena con el identificador

  identificador=id

  var data = "id="+ id +"";

  var xhr = new XMLHttpRequest();
  xhr.withCredentials = true;

  xhr.open("POST", "http://127.0.0.1:3002/API/Usuarios/cargarId");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  xhr.send(data);

  xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
      var convert = JSON.parse(this.responseText) // para convertir de json a string es JSON.stringify
      console.log(convert)

      if (convert.length>0) /*mayor que 0 porque hay datos*/ {
        //la posicion 0 es la que dice la consola en inspeccionar y firstname y age tambien.
        document.getElementById('nombre2').value= convert[0].firstname;
        document.getElementById('edad2').value= convert[0].age;
        //si no lo igualamos al dato ya cargado es como si le dijeramos que tome un dato nuevo, pero queremos que llene con los datos existentes para modificarlos.


      }
    }
  });
}

var Modificar = function () {

  var nombre = document.getElementById('nombre2').value;
  //var email = document.getElementById('email').value;
  var edad = document.getElementById('edad2').value;


  //pego codigo de postman

   var data = "id="+ identificador +"&nombre="+ nombre +"&edad="+ edad +"";

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;


xhr.open("POST", "http://127.0.0.1:3002/API/Usuarios/Modificar");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

xhr.send(data);

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
    console.log(this.responseText);
    cargar()
  }
});
 }

var limpiarCampos = function () {
  identificador="";
  document.getElementById('nombre').value="";
  document.getElementById('email').value="";
  document.getElementById('edad').value="";


 }

cargar() 