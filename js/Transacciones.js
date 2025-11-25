// =======================================================
//  CONFIGURACIÓN GENERAL
// =======================================================

// Clave de localStorage donde se guarda el saldo.
// Es el "nombre del cajón" donde se guarda el saldo en el navegador.
const saldoInicial = "saldoInicial";   // *** Nombre exacto como tú lo pediste ***


// =======================================================
//  CUANDO EL HTML YA CARGÓ
// =======================================================
document.addEventListener("DOMContentLoaded", function () {

  // 1) Si no existe un saldo guardado, lo inicializa en 500.
  inicializarSaldo();

  // 2) Muestra el saldo en el <span id="saldo"> si existe en la página.
  mostrarSaldo();

  // ========== BOTÓN DE TRANSACCIÓN (DEPÓSITO o RETIRO) ==========
  // El mismo id="btnTransaccion" se usa tanto en la pantalla de Depósito
  // como en la de Retiro. Según qué campo exista, decide qué hacer.
  const btnTransaccion = document.getElementById("btnTransaccion");
  if (btnTransaccion) {
    btnTransaccion.addEventListener("click", function (event) {
      // Evita que el form recargue la página al hacer click.
      event.preventDefault();

      // Si existe el input de MontoDeposito, estamos en la página de depósito
      if (document.getElementById("MontoDeposito")) {
        TransaccionDeposito();
        return;
      }

      // Si existe el input de MontoRetiro, estamos en la página de retiro
      if (document.getElementById("MontoRetiro")) {
        TransaccionRetiro();
        return;
      }

      if (document.getElementById("MontoPago_Agua")) {
        TransaccionPagoAgua();
        return;
      }

      if (document.getElementById("MontoPago_Luz")) {
        TransaccionPagoEnergia();
        return;
      }

      if (document.getElementById("Monto")) {
        TransaccionPagoInternet();
        return;
      }

      if (document.getElementById("Monto")) {
        TransaccionPagoTelefonia();
        return;
      }

    });
  }

  // ========== CONSULTA DE SALDO ==========
  // Si existe el formulario de consulta, se conecta su submit a ConsultaSaldo().
  const formCon = document.getElementById("Formulario_ConsultaSaldo");
  if (formCon) {
    formCon.addEventListener("submit", ConsultaSaldo);
  }

  // Si existe el span de consulta (<span id="saldoDisponible">),
  // lo llenamos automáticamente al entrar en esa página.
  const spanSaldoConsulta = document.getElementById("saldoDisponible");
  if (spanSaldoConsulta) {
    ConsultaSaldo(); // se llama sin evento para solo actualizar el texto
  }
});


// =======================================================
//  FUNCIONES DE MANEJO DEL SALDO (localStorage + pantalla)
// =======================================================

// Solo pone 500 si NO existe aún la clave "saldoInicial" en localStorage.
// Es decir, se ejecuta solo la primera vez que se usa la "banca".
function inicializarSaldo() {
  if (localStorage.getItem(saldoInicial) === null) {
    localStorage.setItem(saldoInicial, "500");
  }
}

// Obtiene el saldo actual como número desde localStorage.
// Si no hay nada o es inválido, devuelve 0.
function obtenerSaldo() {
  return parseFloat(localStorage.getItem(saldoInicial)) || 0;
}

// Guarda el nuevo saldo en localStorage y actualiza el span general "saldo".
function actualizarSaldo(nuevoSaldo) {
  localStorage.setItem(saldoInicial, nuevoSaldo.toString());
  mostrarSaldo();
}

// Lee el saldo actual y lo escribe dentro del <span id="saldo"> (si existe).
// Sirve para mostrar en pantalla el valor más reciente.
function mostrarSaldo() {
  const saldo = obtenerSaldo();
  const spanSaldo = document.getElementById("saldo");

  if (spanSaldo) {
    spanSaldo.textContent = saldo.toFixed(2); // siempre 2 decimales
  }
}


// =======================================================
//  TRANSACCIÓN DE DEPÓSITO
//  (se llama desde el CLICK del botón btnTransaccion en la página de depósito)
// =======================================================
function TransaccionDeposito() {

  // Tomamos el campo donde el usuario escribió el monto a depositar
  const valorMonto = document.getElementById("MontoDeposito");
  const montoDeposito = parseFloat(valorMonto.value);

  // Validación básica: que sea número y mayor que 0
  if (isNaN(montoDeposito) || montoDeposito <= 0) {
    Swal.fire({
      icon: "error",
      title: "Monto a depositar inválido",
      text: "Ingrese un monto de depósito válido mayor que $0.00."
    });
    return;
  }

  // Leemos el saldo actual
  const saldoActual = obtenerSaldo();
  console.log("Saldo actual antes del depósito:", saldoActual);

  // Calculamos nuevo saldo sumando el depósito
  const nuevoSaldo = saldoActual + montoDeposito;
  console.log("Nuevo saldo después del depósito:", nuevoSaldo);

  // Guardamos el nuevo saldo y actualizamos lo visual
  actualizarSaldo(nuevoSaldo);

  // Mostramos alerta de éxito
  Swal.fire({
    icon: "success",
    title: "Depósito realizado con éxito",
    html: `
      Se depositaron:<b>$ ${montoDeposito.toFixed(2)}</b> correctamente.<br>
      Nuevo saldo: <b>$ ${nuevoSaldo.toFixed(2)}</b>.`
  });

  // (Opcional) podrías limpiar el campo así:
  // valorMonto.value = "";
}


// =======================================================
//  TRANSACCIÓN DE RETIRO
//  (se llama desde el mismo botón btnTransaccion en la página de retiro)
// =======================================================
function TransaccionRetiro() {


  // Tomamos el campo donde se escribió el monto a retirar
  const montoRetiro = document.getElementById("MontoRetiro");
  const valorMontoR = parseFloat(montoRetiro.value);

  // Validación básica: número y mayor que 0
  if (isNaN(valorMontoR) || valorMontoR <= 0) {
    Swal.fire({
      icon: "error",
      title: "Monto inválido",
      text: "Ingrese un monto de retiro válido mayor que 0."
    });
    return;
  }

  const saldoActual = obtenerSaldo();

  // Validamos que el saldo sea suficiente para el retiro
  if (valorMontoR > saldoActual) {
    Swal.fire({
      icon: "error",
      title: "Saldo insuficiente",
      html: `
        El monto que intentas retirar es: <b>$ ${valorMontoR.toFixed(2)}</b><br>
        pero tu saldo disponible es: <b>$ ${saldoActual.toFixed(2)}</b>.`
    });
    return;
  }

  // Si hay saldo suficiente, calculamos nuevo saldo
  const nuevoSaldo = saldoActual - valorMontoR;

  // Guardamos el nuevo saldo y actualizamos pantalla
  actualizarSaldo(nuevoSaldo);

  // Alerta de éxito
  Swal.fire({
    icon: "success",
    title: "Retiro realizado",
    html: `
      Se retiraro:<b>$ ${valorMontoR.toFixed(2)}</b> correctamente.<br>
      Nuevo saldo: <b>$ ${nuevoSaldo.toFixed(2)}</b>.`
  });

}


// =======================================================
//  TRANSACCIÓN PAGO AGUA
// =======================================================
function TransaccionPagoAgua() {

  // Tomamos el campo donde se escribió el monto a retirar
  const montoPago = document.getElementById("MontoPago_Agua");
  const valorMontoP = parseFloat(montoPago.value);

  // Validación básica: número y mayor que 0
  if (isNaN(valorMontoP) || valorMontoP <= 0) {
    Swal.fire({
      icon: "error",
      title: "Monto inválido",
      text: "Ingrese un monto de pago válido mayor que 0."
    });
    return;
  }

  const saldoActual = obtenerSaldo();

  // Validamos que el saldo sea suficiente para el retiro
  if (valorMontoP > saldoActual) {
    Swal.fire({
      icon: "error",
      title: "Saldo insuficiente",
      html: `
        El monto del pago es: <b>$ ${valorMontoP.toFixed(2)}</b><br>
        pero tu saldo disponible es: <b>$ ${saldoActual.toFixed(2)}</b>.`
    });
    return;
  }

  // Si hay saldo suficiente, calculamos nuevo saldo
  const nuevoSaldo = saldoActual - valorMontoP;

  // Guardamos el nuevo saldo y actualizamos pantalla
  actualizarSaldo(nuevoSaldo);

  // Alerta de éxito
  Swal.fire({
    icon: "success",
    title: "Pago realizado",
    html: `
      Se pagaron:<b>$ ${valorMontoP.toFixed(2)}</b> correctamente.<br>
      Nuevo saldo: <b>$ ${nuevoSaldo.toFixed(2)}</b>.`
  });

}//Termina TransaccionPagoAgua

// =======================================================
//  PAGO ENERGÍA ELÉCTRICA
// =======================================================
function TransaccionPagoEnergia() {


  const montoPago = document.getElementById("MontoPago_Luz");
  const valorMontoP = parseFloat(montoPago.value);

  if (isNaN(valorMontoP) || valorMontoP <= 0) {
    Swal.fire({
      icon: "error",
      title: "Monto inválido",
      text: "Ingrese un monto de pago válido mayor que 0."
    });
    return;
  }

  const saldoActual = obtenerSaldo();

  // ⚠️ Mismo error aquí: se debe comparar contra valorMontoP
  if (valorMontoP > saldoActual) {
    Swal.fire({
      icon: "error",
      title: "Saldo insuficiente",
      html: `
        El monto del pago es: <b>$ ${valorMontoP.toFixed(2)}</b><br>
        pero tu saldo disponible es: <b>$ ${saldoActual.toFixed(2)}</b>.`
    });
    return;
  }

  const nuevoSaldo = saldoActual - valorMontoP;

  actualizarSaldo(nuevoSaldo);

  Swal.fire({
    icon: "success",
    title: "Pago realizado",
    html: `
      Se pagaron:<b>$ ${valorMontoP.toFixed(2)}</b> correctamente.<br>
      Nuevo saldo: <b>$ ${nuevoSaldo.toFixed(2)}</b>.`
  });
}//Termina transaccionPagoEnergia


// =======================================================
//  PAGO INTERNET
// =======================================================
function TransaccionPagoInternet() {

  const montoPago = document.getElementById("Monto");
  const valorMontoP = parseFloat(montoPago.value);

  if (isNaN(valorMontoP) || valorMontoP <= 0) {
    Swal.fire({
      icon: "error",
      title: "Monto inválido",
      text: "Ingrese un monto de pago válido mayor que 0."
    });
    return;
  }

  const saldoActual = obtenerSaldo();

  // ⚠️ Mismo error aquí: se debe comparar contra valorMontoP
  if (valorMontoP > saldoActual) {
    Swal.fire({
      icon: "error",
      title: "Saldo insuficiente",
      html: `
        El monto del pago es: <b>$ ${valorMontoP.toFixed(2)}</b><br>
        pero tu saldo disponible es: <b>$ ${saldoActual.toFixed(2)}</b>.`
    });
    return;
  }

  const nuevoSaldo = saldoActual - valorMontoP;

  actualizarSaldo(nuevoSaldo);

  Swal.fire({
    icon: "success",
    title: "Pago realizado",
    html: `
      Se pagaron:<b>$ ${valorMontoP.toFixed(2)}</b> correctamente.<br>
      Nuevo saldo: <b>$ ${nuevoSaldo.toFixed(2)}</b>.`
  });
}//Termina TransaccionPagoInternet

// =======================================================
//  PAGO TELEFONIA
// =======================================================
function TransaccionPagoTelefonia() {

  const montoPago = document.getElementById("Monto");
  const valorMontoP = parseFloat(montoPago.value);

  if (isNaN(valorMontoP) || valorMontoP <= 0) {
    Swal.fire({
      icon: "error",
      title: "Monto inválido",
      text: "Ingrese un monto de pago válido mayor que 0."
    });
    return;
  }

  const saldoActual = obtenerSaldo();

  // ⚠️ Mismo error aquí: se debe comparar contra valorMontoP
  if (valorMontoP > saldoActual) {
    Swal.fire({
      icon: "error",
      title: "Saldo insuficiente",
      html: `
        El monto del pago es: <b>$ ${valorMontoP.toFixed(2)}</b><br>
        pero tu saldo disponible es: <b>$ ${saldoActual.toFixed(2)}</b>.`
    });
    return;
  }

  const nuevoSaldo = saldoActual - valorMontoP;

  actualizarSaldo(nuevoSaldo);

  Swal.fire({
    icon: "success",
    title: "Pago realizado",
    html: `
      Se pagaron:<b>$ ${valorMontoP.toFixed(2)}</b> correctamente.<br>
      Nuevo saldo: <b>$ ${nuevoSaldo.toFixed(2)}</b>.`
  });
}//Termina TransaccionPagoInternet


// =======================================================
//   CONSULTA DE SALDO
//   (para pantallas donde hay un formulario de consulta)
// =======================================================
function ConsultaSaldo(event) {
  // Si viene desde un submit, paramos el comportamiento por defecto
  if (event) {
    event.preventDefault();
  }

  const saldo = obtenerSaldo();

  // Actualizamos el span general, si existe
  mostrarSaldo();

  // Y también un span específico de consulta, si existe en esa página
  const spanSaldoConsulta = document.getElementById("saldoDisponible");
  if (spanSaldoConsulta) {
    spanSaldoConsulta.textContent = saldo.toFixed(2);
  }
}
