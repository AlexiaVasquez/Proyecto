//----------VALIDACION FORMULARIO TRANSACCION DEPOSITO-------------
/*
Este evento (DOMContentLoaded) sucede cuando todas las etiquetas del HTML ya están listas para usarse.
*/
document.addEventListener("DOMContentLoaded", 
    function()
 {
  document.getElementById("Formulario_TDeposito").addEventListener('submit', validarFormularioTDeposito); 
  /*
  addEventListener('submit', validarFormularioCrearCuenta):se activa cada vez que alguien intenta
   enviar el formulario.
  */
});

function validarFormularioTDeposito(evento)
{
  evento.preventDefault();

  var FechaDeposito = document.getElementById('FechaDeposito').value;

  if(FechaDeposito.length == 0)
     {
    alert('No has escrito la fecha');
    return;
     }

  var NumeroCuentaDeposito = document.getElementById('NumeroCuentaDeposito').value;

  if(NumeroCuentaDeposito.length == 0)
     {
    alert('No has escrito el numero de cuenta');
    return;
     }

     var ConceptoDeposito = document.getElementById('ConceptoDeposito').value;

     if(ConceptoDeposito.length==0)
     {
        alert('No has escrito un concepto');
        return;
     }

     var MontoDeposito = document.getElementById('MontoDeposito').value;
    
     if(MontoDeposito.length==0)
     {
        alert ('No has escrito el monto del deposito');
        return;
     }
     if(MontoDeposito <= 0.00)
     {  
    alert('El monto debe ser mayor a 0');
    return;
     } 


     var NumeroTarjeta = document.getElementById('NumeroTarjeta').value;

     if(NumeroTarjeta.length==0)
     {
        alert ('No has escrito el numero de tarjeta');
        return;
     }

     var FechaVencimiento = document.getElementById('FechaVencimiento').value;

     if(FechaVencimiento.length==0)
     {
        alert ('No has escrito la fecha de vencimiento');
        return;
     }

     var CVV_Deposito = document.getElementById('CVV_Deposito').value;

     if(CVV_Deposito.length==0)
     {
        alert ('No has escrito el CVV');
        return;
     }

     this.submit();
}

/*
VALIDACION PARA CAMPO MONTO SOLO DIGITAR NUMERO
*/ 

document.addEventListener("DOMContentLoaded", function () {

    // 1. Cuando envían el formulario, se llama a la función de validación
    document
        .getElementById("Formulario_TDeposito")
        .addEventListener("submit", validarFormularioTDeposito);

    // 2. Restricción del campo monto: solo números 0–9 y punto "."
    var  montoDigitar= document.getElementById("MontoDeposito");

    if (montoDigitar)
         {

        montoDigitar.addEventListener("keypress", function (e) {
            var char = e.key; // tecla que se presionó

            // Permitimos las teclas especiales: backspace, delete, flechas, tab, etc.
            // Para mantenerlo simple, solo bloqueamos lo que no sea número ni guion.
            if (!/[0-9.]/.test(char)) {
                e.preventDefault(); // bloquea la tecla
            }
        });
    }
});

/*
VALIDACION PARA CAMPO NUMERO TARJETA AL DIGITAR UNA TECLA
*/ 

document.addEventListener("DOMContentLoaded", function () {

    // 1. Cuando envían el formulario, se llama a la función de validación
    document
        .getElementById("Formulario_TDeposito")
        .addEventListener("submit", validarFormularioTDeposito);

    // 2. Restricción del campo NUMERO TARJETA: solo números 0–9
    var  NumeroTarjetaDig= document.getElementById("NumeroTarjeta");

    if (NumeroTarjetaDig)
         {
        NumeroTarjetaDig.addEventListener("keypress", function (e) {
            var char = e.key; // tecla que se presionó

            // Permitimos las teclas especiales: backspace, delete, flechas, tab, etc.
            // Para mantenerlo simple, solo bloqueamos lo que no sea número ni guion.
            if (!/[0-9]/.test(char)) {
                e.preventDefault(); // bloquea la tecla
            }
        });
    }
});

/*
VALIDACION PARA CAMPO CVV AL DIGITAR UNA TECLA
*/ 

document.addEventListener("DOMContentLoaded", function () {

    // 1. Cuando envían el formulario, se llama a la función de validación
    document
        .getElementById("Formulario_TDeposito")
        .addEventListener("submit", validarFormularioTDeposito);

    // 2. Restricción del campo CVV: solo números 0–9
    var  CVV_DepositoDig= document.getElementById("CVV_Deposito");

    if (CVV_DepositoDig)
         {
        CVV_DepositoDig.addEventListener("keypress", function (e) {
            var char = e.key; // tecla que se presionó

            // Permitimos las teclas especiales: backspace, delete, flechas, tab, etc.
            // Para mantenerlo simple, solo bloqueamos lo que no sea número ni guion.
            if (!/[0-9]/.test(char)) {
                e.preventDefault(); // bloquea la tecla
            }
        });
    }
});