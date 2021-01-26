import { D } from "./../rename/rename.js";
import { cFinita } from "./../convolucion/convolucionFinita.js";
import { cPeriodica } from "./../convolucion/convolucionPeriodica.js";
import { sumFinita, difFinita } from "./../Operaciones/SumaDiferencia.js";
import { Amp, Ate } from "./../Operaciones/AmplificarAtenuar.js";
import { Reflex } from "./../Operaciones/Reflexion.js";
import { Desplaza } from "./../Operaciones/Desplazamiento.js";
import {
  Diez,
  InterUnit,
  InterLineal,
  InterCero,
} from "./../Operaciones/DiezmacionInterpolacion.js";
import { calcularTransformadaDirecta } from "./../FFT/DFT.js";
import Chart from "chart.js";
import Swal from "sweetalert2";

let validateNumber = (e) => {
  if (e.match(/^-?\d+$/)) {
    return parseInt(e);
  }

  if (e.match(/^-?\d*\.\d+$/)) {
    return parseFloat(e);
  }

  if (e.match(/^-?\d+\/[1-9]\d*$/)) {
    let parts = e.split(/\//);
    let a = parseInt(parts[0]);
    let b = parseInt(parts[1]);
    console.log(a, b);
    return a / b;
  }

  return NaN;
};

let getData = (chosen) => {
  let complement = "s" + chosen;
  let data = D.getElementById(complement).value;

  data = data.replace(/ /g, "").split(/,/);

  data = data.map((e) => validateNumber(e)).filter((e) => e == e);

  return data;
};

let getCenter = (chosen) => {
  let complement = "cs" + chosen;
  let centro = D.getElementById(complement).value;

  return centro.match(/^\d+$/) ? parseInt(centro) : NaN;
};

let getDomain = (n, center) => {
  return new Array(n).fill().map((e, i) => i - center);
};

let esPeriodica = (chosen) => {
  let complement = "ps" + chosen;
  return D.getElementById(complement).checked;
};

let makePeriod = (data, center) => {
  let newData = new Array(3 * data.length).fill().map((e) => 0);
  let len = newData.length;
  let middle = ~~(len / 2);

  newData[middle] = data[center];

  var i = center - 1 < 0 ? data.length - 1 : center - 1;

  for (var j = middle - 1; j >= 0; --i, --j) {
    newData[j] = data[i];

    if (i - 1 < 0) {
      i = data.length;
    }
  }

  i = center + 1 == data.length ? 0 : center + 1;

  for (var j = middle + 1; j < newData.length; i++, j++) {
    newData[j] = data[i];

    if (i + 1 == data.length) {
      i = -1;
    }
  }

  console.log(newData);

  return { data: newData, center: middle };
};

let buildGraph = (data, domain, chosen) => {
  let complement = "graph" + chosen;
  if (chosen !== 3) {
    complement = "graph" + chosen.charAt(6);
  }
  let parent = D.getElementById(complement).parentNode;
  while (parent.lastChild) {
    parent.removeChild(parent.lastChild);
  }

  let canvas = D.createElement("canvas");
  canvas.setAttribute("id", complement);
  parent.appendChild(canvas);

  var ctx = canvas.getContext("2d");
  var chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: domain,
      datasets: [
        {
          data: data,
          backgroundColor: "rgba(255, 0, 0)",
        },
        {
          label: "My First dataset",
          type: "line",
          pointRadius: 3,
          pointHoverRadius: 4,
          backgroundColor: "rgba(255, 0, 0)",
          data: data,
          showLine: false,
          fill: false,
        },
      ],
    },
    options: {
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
      scales: {
        xAxes: [
          {
            barThickness: 1,
            gridLines: {
              color: "rgba(0, 0, 0, 0)",
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
      maintainAspectRatio: false,
    },
  });

  chart.canvas.parentNode.style.height = "200px";
};

function graph(e) {
  let chosen = e;
  let data = getData(chosen);
  let center = getCenter(chosen);

  if (!data.length) {
    throw "No se ingresaron datos";
  }
  if (center != center) {
    throw "El centro ingresado no es un entero positivo";
  }
  if (center >= data.length) {
    throw "El centro no es un índice válido";
  }

  var newCenter = center;
  var newData = data;

  if (esPeriodica(chosen)) {
    var newInfo = makePeriod(data, center);

    newCenter = newInfo.center;
    newData = [...newInfo.data];
  }

  var domain = getDomain(newData.length, newCenter);

  signals[chosen.charAt(6)].data = data;
  signals[chosen.charAt(6)].center = center;
  signals[chosen.charAt(6)].periodica = esPeriodica(chosen);

  if (esPeriodica(chosen)) {
    signals[chosen.charAt(6)].periodo = data.length;
  }

  buildGraph(newData, domain, chosen);
}

let signals = {
  1: {
    data: [],
    center: 0,
    periodica: false,
    periodo: 0,
  },

  2: {
    data: [],
    center: 0,
    periodica: false,
    periodo: 0,
  },

  3: {
    data: [],
    center: 0,
    periodica: false,
    periodo: 0,
  },
};

let convolucionar = (e) => {
  if (!signals[1].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 1",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 1";
  }

  if (!signals[2].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 2",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 2";
  }

  let x = signals[1];
  let y = signals[2];
  var puntos = "";

  if (!x.periodica && !y.periodica) {
    let ans = cFinita(x.data, y.data, x.center, y.center);

    signals[3].data = [...ans.arreglo];
    signals[3].center = ans.centro;
    signals[3].periodica = false;
    signals[3].periodo = 0;

    let domain = getDomain(ans.arreglo.length, ans.centro);
    buildGraph(ans.arreglo, domain, 3);
  } else if (x.periodica || y.periodica) {
    puntos = "...";

    let xp = x;

    if (!x.periodica || (y.periodica && y.periodo > x.periodo)) {
      xp = y;
      y = x;
    }

    let ans = cPeriodica(xp.data, y.data, xp.center, y.center);

    signals[3].data = [...ans.arreglo];
    signals[3].center = ans.centro;
    signals[3].periodica = true;
    signals[3].periodo = ans.arreglo.length;

    var newInfo = makePeriod(ans.arreglo, ans.centro);
    var centro = newInfo.center;
    var arreglo = [...newInfo.data];
    let domain = getDomain(arreglo.length, centro);
    buildGraph(arreglo, domain, 3);
  }
  D.getElementById("t3").innerHTML = "Convolucion";
  var final = signals[3].data.map((e, i) => {
    if (i == signals[3].center) {
      return (
        '<span class="center">' + Number.parseFloat(e).toFixed(2) + " </span>"
      );
    }
    return Number.parseFloat(e).toFixed(2) + " ";
  });

  D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

  var pPer = D.getElementById("ps3");

  pPer.innerHTML = signals[3].periodica ? "Periodo: " + signals[3].periodo : "";
};

let suma = (e) => {
  if (!signals[1].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 1",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 1";
  }

  if (!signals[2].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 2",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 2";
  }
  let x = signals[1];
  let y = signals[2];
  var puntos = "";

  if (!x.periodica && !y.periodica) {
    let ans = sumFinita(x.data, y.data, x.center, y.center);

    signals[3].data = [...ans.arreglo];
    signals[3].center = ans.centro;
    signals[3].periodica = false;
    signals[3].periodo = 0;

    let domain = getDomain(ans.arreglo.length, ans.centro);
    buildGraph(ans.arreglo, domain, 3);
  } else if (x.periodica || y.periodica) {
    Swal.fire({
      title: "Error!",
      text:
        "La suma fue hecha para señales finitas, favor de deselecionar Periodica y volver a graficar =)",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
  D.getElementById("t3").innerHTML = "Suma";
  var final = signals[3].data.map((e, i) => {
    if (i == signals[3].center) {
      return (
        '<span class="center">' + Number.parseFloat(e).toFixed(2) + " </span>"
      );
    }
    return Number.parseFloat(e).toFixed(2) + " ";
  });

  D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

  var pPer = D.getElementById("ps3");

  pPer.innerHTML = signals[3].periodica ? "Periodo: " + signals[3].periodo : "";
};

let resta = (e) => {
  if (!signals[1].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 1",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 1";
  }

  if (!signals[2].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 2",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 2";
  }
  let x = signals[1];
  let y = signals[2];
  var puntos = "";

  if (!x.periodica && !y.periodica) {
    let ans = difFinita(x.data, y.data, x.center, y.center);

    signals[3].data = [...ans.arreglo];
    signals[3].center = ans.centro;
    signals[3].periodica = false;
    signals[3].periodo = 0;

    let domain = getDomain(ans.arreglo.length, ans.centro);
    buildGraph(ans.arreglo, domain, 3);
  } else if (x.periodica || y.periodica) {
    Swal.fire({
      title: "Error!",
      text:
        "La resta fue hecha para señales finitas, favor de deselecionar Periodica y volver a graficar =)",
      icon: "error",
      confirmButtonText: "Ok",
    });
  }
  D.getElementById("t3").innerHTML = "Resta";
  var final = signals[3].data.map((e, i) => {
    if (i == signals[3].center) {
      return (
        '<span class="center">' + Number.parseFloat(e).toFixed(2) + " </span>"
      );
    }
    return Number.parseFloat(e).toFixed(2) + " ";
  });

  D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

  var pPer = D.getElementById("ps3");

  pPer.innerHTML = signals[3].periodica ? "Periodo: " + signals[3].periodo : "";
};

let Amplifi = (e) => {
  if (!signals[1].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 1",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 1";
  }

  if (!signals[2].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 2",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 2";
  }
  let x = signals[1];
  let y = signals[2];
  var puntos = "";
  let ans;
  let elccdata;
  let elccc;
  let elccp;
  const {} = Swal.fire({
    title: "Introduzca el numero de señal a utilizar (1 o 2) y la constante k",
    html:
      '<input id="swal-input1" placeholder="Señal a utilizar" class="swal2-input">' +
      '<input id="swal-input2" placeholder="Constante k" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      var elecc = parseInt(document.getElementById("swal-input1").value, 10);
      var k = parseInt(document.getElementById("swal-input2").value, 10);
      if (elecc === 1 || elecc == 2) {
        if (elecc === 1) {
          elccdata = x.data;
          elccc = x.center;
          elccp = x.periodica;
        } else {
          elccdata = y.data;
          elccc = y.center;
          elccp = y.periodica;
        }
        if (!elccp) {
          ans = Amp(elccdata, elccc, k);
          signals[3].data = [...ans.arreglo];
          signals[3].center = ans.centro;
          signals[3].periodica = false;
          signals[3].periodo = 0;

          let domain = getDomain(ans.arreglo.length, ans.centro);
          buildGraph(ans.arreglo, domain, 3);
          D.getElementById("t3").innerHTML = "Amplificacion";
          var final = signals[3].data.map((e, i) => {
            if (i == signals[3].center) {
              return (
                '<span class="center">' +
                Number.parseFloat(e).toFixed(2) +
                " </span>"
              );
            }
            return Number.parseFloat(e).toFixed(2) + " ";
          });

          D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

          var pPer = D.getElementById("ps3");

          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        } else {
          puntos = "...";
          ans = Amp(elccdata, elccc, k);
          signals[3].data = [...ans.arreglo];
          signals[3].center = ans.centro;
          signals[3].periodica = true;
          signals[3].periodo = ans.arreglo.length;

          var newInfo = makePeriod(ans.arreglo, ans.centro);
          var centro = newInfo.center;
          var arreglo = [...newInfo.data];
          let domain = getDomain(arreglo.length, centro);
          buildGraph(arreglo, domain, 3);
          D.getElementById("t3").innerHTML = "Amplificacion";
          var final = signals[3].data.map((e, i) => {
            if (i == signals[3].center) {
              return (
                '<span class="center">' +
                Number.parseFloat(e).toFixed(2) +
                " </span>"
              );
            }
            return Number.parseFloat(e).toFixed(2) + " ";
          });

          D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

          var pPer = D.getElementById("ps3");

          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        }
      } else {
        Swal.fire({
          title: "Error!",
          text:
            "Favor de introducir un 1 o un 2 para seleccionar la señal a amplificar",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
  });
};

let Atenua = (e) => {
  if (!signals[1].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 1",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 1";
  }

  if (!signals[2].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 2",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 2";
  }
  let x = signals[1];
  let y = signals[2];
  var puntos = "";
  let ans;
  let elccdata;
  let elccc;
  let elccp;
  const {} = Swal.fire({
    title: "Introduzca el numero de señal a utilizar (1 o 2) y la constante k",
    html:
      '<input id="swal-input1" placeholder="Señal a utilizar" class="swal2-input">' +
      '<input id="swal-input2" placeholder="Constante k" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      var elecc = parseInt(document.getElementById("swal-input1").value, 10);
      var k = parseInt(document.getElementById("swal-input2").value, 10);
      if (elecc === 1 || elecc == 2) {
        if (elecc === 1) {
          elccdata = x.data;
          elccc = x.center;
          elccp = x.periodica;
        } else {
          elccdata = y.data;
          elccc = y.center;
          elccp = y.periodica;
        }
        if (!elccp) {
          ans = Ate(elccdata, elccc, k);
          signals[3].data = [...ans.arreglo];
          signals[3].center = ans.centro;
          signals[3].periodica = false;
          signals[3].periodo = 0;

          let domain = getDomain(ans.arreglo.length, ans.centro);
          buildGraph(ans.arreglo, domain, 3);
          D.getElementById("t3").innerHTML = "Atenuacion";
          var final = signals[3].data.map((e, i) => {
            if (i == signals[3].center) {
              return (
                '<span class="center">' +
                Number.parseFloat(e).toFixed(2) +
                " </span>"
              );
            }
            return Number.parseFloat(e).toFixed(2) + " ";
          });

          D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

          var pPer = D.getElementById("ps3");

          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        } else {
          puntos = "...";
          ans = Ate(elccdata, elccc, k);
          signals[3].data = [...ans.arreglo];
          signals[3].center = ans.centro;
          signals[3].periodica = true;
          signals[3].periodo = ans.arreglo.length;

          var newInfo = makePeriod(ans.arreglo, ans.centro);
          var centro = newInfo.center;
          var arreglo = [...newInfo.data];
          let domain = getDomain(arreglo.length, centro);
          buildGraph(arreglo, domain, 3);
          D.getElementById("t3").innerHTML = "Atenuacion";
          var final = signals[3].data.map((e, i) => {
            if (i == signals[3].center) {
              return (
                '<span class="center">' +
                Number.parseFloat(e).toFixed(2) +
                " </span>"
              );
            }
            return Number.parseFloat(e).toFixed(2) + " ";
          });

          D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

          var pPer = D.getElementById("ps3");

          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        }
      } else {
        Swal.fire({
          title: "Error!",
          text:
            "Favor de introducir un 1 o un 2 para seleccionar la señal a atenuar",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
  });
};

let Relfexion = (e) => {
  if (!signals[1].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 1",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 1";
  }

  if (!signals[2].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 2",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 2";
  }
  let x = signals[1];
  let y = signals[2];
  var puntos = "";
  let ans;
  let elccdata;
  let elccc;
  let elccp;
  const {} = Swal.fire({
    title: "Introduzca el numero de señal a utilizar (1 o 2)",
    html:
      '<input id="swal-input1" placeholder="Señal a utilizar" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      var elecc = parseInt(document.getElementById("swal-input1").value, 10);
      if (elecc === 1 || elecc == 2) {
        if (elecc === 1) {
          elccdata = x.data;
          elccc = x.center;
          elccp = x.periodica;
        } else {
          elccdata = y.data;
          elccc = y.center;
          elccp = y.periodica;
        }
        if (!elccp) {
          ans = Reflex(elccdata, elccc);
          signals[3].data = [...ans.arreglo];
          signals[3].center = ans.centro;
          signals[3].periodica = false;
          signals[3].periodo = 0;

          let domain = getDomain(ans.arreglo.length, ans.centro);
          buildGraph(ans.arreglo, domain, 3);
          D.getElementById("t3").innerHTML = "Reflexion";
          var final = signals[3].data.map((e, i) => {
            if (i == signals[3].center) {
              return (
                '<span class="center">' +
                Number.parseFloat(e).toFixed(2) +
                " </span>"
              );
            }
            return Number.parseFloat(e).toFixed(2) + " ";
          });

          D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

          var pPer = D.getElementById("ps3");

          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        } else {
          puntos = "...";
          ans = Reflex(elccdata, elccc);
          signals[3].data = [...ans.arreglo];
          signals[3].center = ans.centro;
          signals[3].periodica = true;
          signals[3].periodo = ans.arreglo.length;

          var newInfo = makePeriod(ans.arreglo, ans.centro);
          var centro = newInfo.center;
          var arreglo = [...newInfo.data];
          let domain = getDomain(arreglo.length, centro);
          buildGraph(arreglo, domain, 3);
          D.getElementById("t3").innerHTML = "Reflexion";
          var final = signals[3].data.map((e, i) => {
            if (i == signals[3].center) {
              return (
                '<span class="center">' +
                Number.parseFloat(e).toFixed(2) +
                " </span>"
              );
            }
            return Number.parseFloat(e).toFixed(2) + " ";
          });

          D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

          var pPer = D.getElementById("ps3");

          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        }
      } else {
        Swal.fire({
          title: "Error!",
          text:
            "Favor de introducir un 1 o un 2 para seleccionar la señal a reflejar",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
  });
};

let Despla = (e) => {
  if (!signals[1].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 1",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 1";
  }

  if (!signals[2].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 2",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 2";
  }
  let x = signals[1];
  let y = signals[2];
  var puntos = "";
  let ans;
  let elccdata;
  let elccc;
  let elccp;
  const {} = Swal.fire({
    title:
      "Introduzca el numero de señal a utilizar (1 o 2) y el desplazamiento n0",
    html:
      '<input id="swal-input1" placeholder="Señal a utilizar" class="swal2-input">' +
      '<input id="swal-input2" placeholder="Desplazamiento n0" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      var elecc = parseInt(document.getElementById("swal-input1").value, 10);
      var k = parseInt(document.getElementById("swal-input2").value, 10);
      if (elecc === 1 || elecc == 2) {
        if (elecc === 1) {
          elccdata = x.data;
          elccc = x.center;
          elccp = x.periodica;
        } else {
          elccdata = y.data;
          elccc = y.center;
          elccp = y.periodica;
        }
        if (!elccp) {
          ans = Desplaza(elccdata, elccc, k);
          signals[3].data = [...ans.arreglo];
          signals[3].center = ans.centro;
          signals[3].periodica = false;
          signals[3].periodo = 0;

          let domain = getDomain(ans.arreglo.length, ans.centro);
          buildGraph(ans.arreglo, domain, 3);
          D.getElementById("t3").innerHTML = "Desplazamiento";
          var final = signals[3].data.map((e, i) => {
            if (i == signals[3].center) {
              return (
                '<span class="center">' +
                Number.parseFloat(e).toFixed(2) +
                " </span>"
              );
            }
            return Number.parseFloat(e).toFixed(2) + " ";
          });

          D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

          var pPer = D.getElementById("ps3");

          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        } else {
          puntos = "...";
          ans = Amp(elccdata, elccc, k);
          signals[3].data = [...ans.arreglo];
          signals[3].center = ans.centro;
          signals[3].periodica = true;
          signals[3].periodo = ans.arreglo.length;

          var newInfo = makePeriod(ans.arreglo, ans.centro);
          var centro = newInfo.center;
          var arreglo = [...newInfo.data];
          let domain = getDomain(arreglo.length, centro);
          buildGraph(arreglo, domain, 3);
          D.getElementById("t3").innerHTML = "Desplazamiento";
          var final = signals[3].data.map((e, i) => {
            if (i == signals[3].center) {
              return (
                '<span class="center">' +
                Number.parseFloat(e).toFixed(2) +
                " </span>"
              );
            }
            return Number.parseFloat(e).toFixed(2) + " ";
          });

          D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

          var pPer = D.getElementById("ps3");

          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        }
      } else {
        Swal.fire({
          title: "Error!",
          text:
            "Favor de introducir un 1 o un 2 para seleccionar la señal a Desplazar",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
  });
};

let Diezma = (e) => {
  if (!signals[1].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 1",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 1";
  }

  if (!signals[2].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 2",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 2";
  }
  let x = signals[1];
  let y = signals[2];
  var puntos = "";
  let ans;
  let elccdata;
  let elccc;
  let elccp;
  const {} = Swal.fire({
    title:
      "Introduzca el numero de señal a utilizar (1 o 2) y el Factor de diezmacion k",
    html:
      '<input id="swal-input1" placeholder="Señal a utilizar" class="swal2-input">' +
      '<input id="swal-input2" placeholder="Factor de diezmacion k" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      var elecc = parseInt(document.getElementById("swal-input1").value, 10);
      var k = parseInt(document.getElementById("swal-input2").value, 10);
      if (elecc === 1 || elecc == 2) {
        if (elecc === 1) {
          elccdata = x.data;
          elccc = x.center;
          elccp = x.periodica;
        } else {
          elccdata = y.data;
          elccc = y.center;
          elccp = y.periodica;
        }
        if (!elccp) {
          ans = Diez(elccdata, elccc, k);
          signals[3].data = [...ans.arreglo];
          signals[3].center = ans.centro;
          signals[3].periodica = false;
          signals[3].periodo = 0;

          let domain = getDomain(ans.arreglo.length, ans.centro);
          buildGraph(ans.arreglo, domain, 3);
          D.getElementById("t3").innerHTML = "Diezmacion";
          var final = signals[3].data.map((e, i) => {
            if (i == signals[3].center) {
              return (
                '<span class="center">' +
                Number.parseFloat(e).toFixed(2) +
                " </span>"
              );
            }
            return Number.parseFloat(e).toFixed(2) + " ";
          });

          D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

          var pPer = D.getElementById("ps3");

          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        } else {
          puntos = "...";
          ans = Diez(elccdata, elccc, k);
          signals[3].data = [...ans.arreglo];
          signals[3].center = ans.centro;
          signals[3].periodica = true;
          signals[3].periodo = ans.arreglo.length;

          var newInfo = makePeriod(ans.arreglo, ans.centro);
          var centro = newInfo.center;
          var arreglo = [...newInfo.data];
          let domain = getDomain(arreglo.length, centro);
          buildGraph(arreglo, domain, 3);
          D.getElementById("t3").innerHTML = "Desplazamiento";
          var final = signals[3].data.map((e, i) => {
            if (i == signals[3].center) {
              return (
                '<span class="center">' +
                Number.parseFloat(e).toFixed(2) +
                " </span>"
              );
            }
            return Number.parseFloat(e).toFixed(2) + " ";
          });

          D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

          var pPer = D.getElementById("ps3");

          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        }
      } else {
        Swal.fire({
          title: "Error!",
          text:
            "Favor de introducir un 1 o un 2 para seleccionar la señal a Diezmar",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
  });
};

let Interpola = (e) => {
  if (!signals[1].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 1",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 1";
  }

  if (!signals[2].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 2",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 2";
  }
  let x = signals[1];
  let y = signals[2];
  var puntos = "";
  let ans;
  let elccdata;
  let elccc;
  let elccp;
  const {} = Swal.fire({
    title:
      "Introduzca el numero de señal a utilizar (1 o 2), el Factor de interpolacion k y el tipo de interpolacion a usar (1 para a cero, 2 para a escalon, 3 para lineal)",
    html:
      '<input id="swal-input1" placeholder="Señal a utilizar" class="swal2-input">' +
      '<input id="swal-input2" placeholder="Factor de diezmacion k" class="swal2-input">' +
      '<input id="swal-input3" placeholder="Interpolacion a usar" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      var elecc = parseInt(document.getElementById("swal-input1").value, 10);
      var k = parseInt(document.getElementById("swal-input2").value, 10);
      var type = parseInt(document.getElementById("swal-input3").value, 10);
      if (elecc === 1 || elecc == 2) {
        if (elecc === 1) {
          elccdata = x.data;
          elccc = x.center;
          elccp = x.periodica;
        } else {
          elccdata = y.data;
          elccc = y.center;
          elccp = y.periodica;
        }
        if (!elccp) {
          if (type === 1) ans = InterCero(elccdata, elccc, k);
          else if (type === 2) ans = InterUnit(elccdata, elccc, k);
          else if (type === 3) ans = InterLineal(elccdata, elccc, k);
          else {
            Swal.fire({
              title: "Error!",
              text:
                "Favor de introducir un 1 o un 2 para seleccionar el tipo de interpolacion",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
          signals[3].data = [...ans.arreglo];
          signals[3].center = ans.centro;
          signals[3].periodica = false;
          signals[3].periodo = 0;

          let domain = getDomain(ans.arreglo.length, ans.centro);
          buildGraph(ans.arreglo, domain, 3);
          D.getElementById("t3").innerHTML = "Interpolacion";
          var final = signals[3].data.map((e, i) => {
            if (i == signals[3].center) {
              return (
                '<span class="center">' +
                Number.parseFloat(e).toFixed(3) +
                " </span>"
              );
            }
            return Number.parseFloat(e).toFixed(3) + " ";
          });

          D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

          var pPer = D.getElementById("ps3");

          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        } else {
          puntos = "...";
          if (type === 1) ans = InterCero(elccdata, elccc, k);
          else if (type === 2) ans = InterUnit(elccdata, elccc, k);
          else if (type === 3) ans = InterLineal(elccdata, elccc, k);
          signals[3].data = [...ans.arreglo];
          signals[3].center = ans.centro;
          signals[3].periodica = true;
          signals[3].periodo = ans.arreglo.length;

          var newInfo = makePeriod(ans.arreglo, ans.centro);
          var centro = newInfo.center;
          var arreglo = [...newInfo.data];
          let domain = getDomain(arreglo.length, centro);
          buildGraph(arreglo, domain, 3);
          D.getElementById("t3").innerHTML = "Desplazamiento";
          var final = signals[3].data.map((e, i) => {
            if (i == signals[3].center) {
              return (
                '<span class="center">' +
                Number.parseFloat(e).toFixed(3) +
                " </span>"
              );
            }
            return Number.parseFloat(e).toFixed(3) + " ";
          });

          D.getElementById("s3").innerHTML = puntos + final.toString() + puntos;

          var pPer = D.getElementById("ps3");

          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        }
      } else {
        Swal.fire({
          title: "Error!",
          text:
            "Favor de introducir un 1 o un 2 para seleccionar la señal a Interpolar",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
  });
};

function Magnitud(f) {
  let mag = [];
  for (let y = 0; y < f.length; y++) {
    var real = Number.parseFloat(f[y].real).toFixed(4);
    var imaginario = Number.parseFloat(f[y].imaginario).toFixed(4);
    mag.push(Math.sqrt(Math.pow(real, 2) + Math.pow(imaginario, 2)));
  }
  return mag;
}

function Fase(f) {
  let fas = [];
  for (let y = 0; y < f.length; y++) {
    var real = Number.parseFloat(f[y].real).toFixed(4);
    var imaginario = Number.parseFloat(f[y].imaginario).toFixed(4);
    fas.push(Math.atan(imaginario / real));
  }
  return fas;
}

let DFT = () => {
  if (!signals[1].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 1",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 1";
  }

  if (!signals[2].data.length) {
    Swal.fire({
      title: "Error!",
      text: "No hay información de la señal 2",
      icon: "error",
      confirmButtonText: "Ok",
    });
    throw "No hay información de la señal 2";
  }
  let x = signals[1];
  let y = signals[2];
  var puntos = "";
  let ans;
  let elccdata;
  let elccc;
  let elccp;
  const {} = Swal.fire({
    title:
      "Introduzca el numero de señal a utilizar (1 o 2) y el numero del tipo de grafica que se quiera (1 para magnitud y 2 para fase)",
    html:
      '<input id="swal-input1" placeholder="Señal a utilizar" class="swal2-input">' +
      '<input id="swal-input2" placeholder="Tipo de grafica" class="swal2-input">',
    focusConfirm: false,
    preConfirm: () => {
      var elecc = parseInt(document.getElementById("swal-input1").value, 10);
      var tp = parseInt(document.getElementById("swal-input2").value, 10);
      if (elecc === 1 || elecc == 2) {
        if (elecc === 1) {
          elccdata = x.data;
          elccc = x.center;
          elccp = x.periodica;
        } else {
          elccdata = y.data;
          elccc = y.center;
          elccp = y.periodica;
        }
        if (!elccp) {
          let agraficar = [];
          let comtxt;
          ans = calcularTransformadaDirecta(elccdata);
          if (tp === 1) {
            agraficar = Magnitud(ans);
            comtxt = "/ Grafica : Magnitud";
          } else if (tp === 2) {
            agraficar = Fase(ans);
            comtxt = "/ Grafica : Fase";
          } else {
            Swal.fire({
              title: "Error!",
              text:
                "Favor de introducir un 1 o un 2 para seleccionar el tipo de grafica",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
          signals[3].data = [...agraficar];
          signals[3].center = 0;
          signals[3].periodica = false;
          signals[3].periodo = 0;

          let domain = getDomain(agraficar.length, 0);
          buildGraph(agraficar, domain, 3);
          D.getElementById("t3").innerHTML = "DFT" + comtxt;
          var final = "";
          for (let y = 0; y < ans.length; ++y) {
            var real = Number.parseFloat(ans[y].real).toFixed(3);
            var imaginario = Number.parseFloat(ans[y].imaginario).toFixed(3);
            final = final + real.toString();
            if (imaginario >= 0) {
              final = final + "+" + imaginario.toString() + "i " + ", ";
            } else {
              final = final + imaginario.toString() + "i " + ", ";
            }
          }
          let finall = final.substring(0, final.length - 2);
          D.getElementById("s3").innerHTML =
            puntos + finall.toString() + puntos;

          var pPer = D.getElementById("ps3");

          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        } else {
          puntos = "...";
          let agraficar = [];
          let comtxt;
          ans = calcularTransformadaDirecta(elccdata);
          if (tp === 1) {
            agraficar = Magnitud(ans);
            comtxt = "/ Grafica : Magnitud";
          } else if (tp === 2) {
            agraficar = Fase(ans);
            comtxt = "/ Grafica : Fase";
          } else {
            Swal.fire({
              title: "Error!",
              text:
                "Favor de introducir un 1 o un 2 para seleccionar el tipo de grafica",
              icon: "error",
              confirmButtonText: "Ok",
            });
          }
          signals[3].data = [...agraficar];
          signals[3].center = 0;
          signals[3].periodica = true;
          signals[3].periodo = agraficar.length;

          var newInfo = makePeriod(agraficar, 0);
          var centro = newInfo.center;
          var arreglo = [...newInfo.data];

          let domain = getDomain(arreglo.length, centro);
          buildGraph(arreglo, domain, 3);
          D.getElementById("t3").innerHTML = "DFT" + comtxt;
          var final = "";
          for (let y = 0; y < ans.length; ++y) {
            var real = Number.parseFloat(ans[y].real).toFixed(3);
            var imaginario = Number.parseFloat(ans[y].imaginario).toFixed(3);
            final = final + real.toString();
            if (imaginario >= 0) {
              final = final + "+" + imaginario.toString() + "i " + ", ";
            } else {
              final = final + imaginario.toString() + "i " + ", ";
            }
          }
          let finall = final.substring(0, final.length - 2);
          D.getElementById("s3").innerHTML =
            puntos + finall.toString() + puntos;
          var pPer = D.getElementById("ps3");
          pPer.innerHTML = signals[3].periodica
            ? "Periodo: " + signals[3].periodo
            : "";
        }
      } else {
        Swal.fire({
          title: "Error!",
          text:
            "Favor de introducir un 1 o un 2 para seleccionar la señal a sacar la FFT",
          icon: "error",
          confirmButtonText: "Ok",
        });
      }
    },
  });
};
export {
  graph,
  convolucionar,
  suma,
  resta,
  Amplifi,
  Atenua,
  Relfexion,
  Despla,
  Diezma,
  Interpola,
  DFT,
};
