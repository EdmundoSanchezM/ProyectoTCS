class Complejo {
  constructor(real, imaginario) {
    this.real = real;
    this.imaginario = imaginario;
  }
  getReal() {
    return this.real;
  }
  getImaginario() {
    return this.imaginario;
  }
}

function CompletarArreglo(DatosOnda) {
  if((DatosOnda.length != 0) && ((DatosOnda.length & (DatosOnda.length - 1)) == 0)){//Potencia de 2
      return DatosOnda;
  }
  var n = 1;
  while (n <= DatosOnda.length) {
      n *= 2;
  }
  var DatosFaltantes = n - DatosOnda.length;
  var MitadDatosFaltantes = Math.round(DatosFaltantes / 2) ;
  var ArregloCompleto = [];
  //Inicio Bits parte 1
  for (var i = 0; i < MitadDatosFaltantes; i++) {
      ArregloCompleto[i] = 0;
  }
  //Bits Audio
  for (var i = 0; i < DatosOnda.length; i++) {
      ArregloCompleto[i + MitadDatosFaltantes] = DatosOnda[i];
  }
  //Inicio Bits parte 2
  for (var i = 0; i < MitadDatosFaltantes; i++) {
      ArregloCompleto[i + MitadDatosFaltantes + DatosOnda.length] = 0;
  }
  return ArregloCompleto;
}
function calcularTransformadaDirecta(f) {
  var N = f.length;
  var dft = [];
  var sumatoria = new Complejo();
  var e;
  let fcomplejo = [];
  f = CompletarArreglo(f);
  f.forEach((f) => fcomplejo.push(new Complejo(f,0)));
  for (var k = 0; k < N; k++) {
    sumatoria = new Complejo(0.0, 0.0);
    // DEBUG
    //System.out.println( sumatoria );
    for (var n = 0; n < N; n++) {
      var x = (2.0 * Math.PI * k * n) / N;
      e = new Complejo(Math.cos(x), -1.0 * Math.sin(x));
      var multiplica = new Complejo(
        fcomplejo[n].getReal() * e.getReal() - fcomplejo[n].getImaginario() * e.getImaginario(),
        fcomplejo[n].getReal() * e.getImaginario() + fcomplejo[n].getImaginario() * e.getReal()
      );
      sumatoria = new Complejo(
        sumatoria.getReal() + multiplica.getReal(),
        sumatoria.getImaginario() + multiplica.getImaginario()
      );
    }
    // DEBUG
    //System.out.println( sumatoria );
    var real = sumatoria.getReal();
    var imag = sumatoria.getImaginario();
    if (Math.abs(real) < 1.25e-10) {
      real = 0.0;
    }
    if (Math.abs(imag) < 1.25e-10) {
      imag = 0.0;
    }
    dft[k] = new Complejo(real, imag);
  }
  return dft;
}
export { calcularTransformadaDirecta};
