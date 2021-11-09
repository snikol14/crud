var mensajeria = function(mensaje,tipo){

    var contenedormensaje = document.getElementById('divmensajes')
    contenedormensaje.innerHTML = '<div class="alert alert-'
    + tipo +'" role="alert">' + mensaje + '</div>'

    setTimeout(function(){
        $('.alert').alert('close')
    },5000)
}



var Iniciarsesion = function(){
    var email = document.getElementById('inputEmail').value
    var password = document.getElementById('inputPassword').value

    console.log(email);
    console.log(password)

    document.getElementById('inputEmail').classList.remove('borderojo')
    document.getElementById('inputPassword').classList.remove('borderojo')

    if (email == null ||email == "" || email == undefined){
        //alert('email es obligatorio')
        mensajeria('email es obligatorio','danger')
        document.getElementById('inputEmail').classList.add('borderojo')
        document.getElementById('inputEmail').focus()
        return false;  
    }

    if (password == null || password == "" || password == undefined){
        //alert('contraseña es obligatoria')
        mensajeria('la contraseña es obligatoria','warning')
        document.getElementById('inputPassword').classList.add('borderojo')
        document.getElementById('inputPassword').focus()
        return false;
    }

    var emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

    if (emailRegex.test(email)){
        //alert ("correo válido")
        mensajeria('correo valido','success')
      } else {
        mensajeria('correo invalido','danger')
        return false
      }


      var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,15}[^'\s]/;

      if (passwordRegex.test(password)){
        mensajeria('inicio exitoso','success')
    } else {
      mensajeria('contraseña debe tener min 8 max 15 caracteres Al menos una letra mayúscula y una minuscula Al menos un dígito No espacios en blanco Al menos un caracter especial','danger')

      return false
    }








} 