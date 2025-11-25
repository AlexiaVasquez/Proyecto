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

  // 2) Muestra el saldo
  mostrarSaldo();

  // ========== BOTÓN DE TRANSACCIÓN (DEPÓSITO / RETIRO / PAGOS) ==========
  // El mismo id="btnTransaccion" se usa en varias pantallas:
  // - Depósito
  // - Retiro
  // - Pago de agua
  // - Pago de energía
  // - Pago de internet
  // - Pago de telefonía
  // Según qué input exista en la página, decide qué función llamar.
  const btnTransaccion = document.getElementById("btnTransaccion");
  if (btnTransaccion) {
    btnTransaccion.addEventListener("click", function (event) {
      // Evita que el form recargue la página al hacer click.
      event.preventDefault();

      // Si existe el input de MontoDeposito, estamos en la pantalla de DEPÓSITO
      if (document.getElementById("MontoDeposito")) {
        TransaccionDeposito();
        return;
      }

      // Si existe el input de MontoRetiro, estamos en la pantalla de RETIRO
      if (document.getElementById("MontoRetiro")) {
        TransaccionRetiro();
        return;
      }

      // Si existe el input de MontoPago_Agua, estamos en PAGO DE AGUA
      if (document.getElementById("MontoPago_Agua")) {
        TransaccionPagoAgua();
        return;
      }

      // Si existe el input de MontoPago_Luz, estamos en PAGO DE ENERGÍA
      if (document.getElementById("MontoPago_Luz")) {
        TransaccionPagoEnergia();
        return;
      }

      // Estas dos condiciones usan el mismo id="Monto", dependiendo del formulario:
      // INTERNET y TELEFONÍA comparten id, pero cambias la lógica según la pantalla donde uses este archivo.
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

  // Si existe el formulario de consulta de saldo, conecta su submit con ConsultaSaldo()
  const formCon = document.getElementById("Formulario_ConsultaSaldo");
  if (formCon) {
    formCon.addEventListener("submit", ConsultaSaldo);
  }

  // Muestra el saldo disponible en la pagina: SALDO DISPONIBLE en el span de consulta (<span id="saldoDisponible">),
  // lo llenamos automáticamente al entrar en esa página.
  const spanSaldoConsulta = document.getElementById("saldoDisponible");
  if (spanSaldoConsulta) {
    // Se llama sin evento, solo para refrescar el texto con el saldo actual
    ConsultaSaldo();
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
  mostrarSaldo(); // Refresca el saldo en pantalla
}

// Lee el saldo actual y lo escribe dentro del <span id="saldo"> (si existe).
// Sirve para mostrar en pantalla el valor más reciente.
function mostrarSaldo() {
  const saldo = obtenerSaldo();
  const spanSaldo = document.getElementById("saldo");

  if (spanSaldo) {
    // Muestra siempre 2 decimales, estilo monto bancario
    spanSaldo.textContent = saldo.toFixed(2);
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

  // Tomamos el campo donde se escribió el monto a pagar
  const montoPago = document.getElementById("MontoPago_Agua");
  const valorMont
