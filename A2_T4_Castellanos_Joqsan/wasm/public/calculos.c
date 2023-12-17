//Gracias a WASM se puede ejecutar el codigo escrito en C en el navegador

#include <emscripten.h>

//Se definen las funciones para cada calculo
EMSCRIPTEN_KEEPALIVE //Se indica que las funciones deben mantenerse cargadas en WASM
float sumar(float x, float y) {
  return x + y;
}

EMSCRIPTEN_KEEPALIVE
float multiplicar(float x, float y) {
  return x * y;
}

EMSCRIPTEN_KEEPALIVE
float restar(float x, float y) {
  return x - y;
}

EMSCRIPTEN_KEEPALIVE
float dividir(float x, float y) {
  return x / y;
}