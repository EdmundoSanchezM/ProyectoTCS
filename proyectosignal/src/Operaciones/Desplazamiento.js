let Desplaza = (x, cx, cns) => {
  var ans = [];
  var centro;
  if (cns >= 0) {
    //izq
    let diference = cx - cns;
    if (diference >= 0) {
      ans = x;
      centro = diference;
    } else {
      let numceros = cns - cx;
      ans = x;
      for (let i = 0; i < numceros; ++i) {
        ans.unshift(0);
      }
      centro = 0;
    }
  } else {
    //derecha
    let diference = x.length - (cx + 1) - 1;
    let cnsp = cns * -1;
    if (diference >= cnsp) {
      ans = x;
    } else {
      let numceros = cnsp + (cx + 1) - x.length;
      ans = x;
      for (let i = 0; i < numceros; ++i) {
        ans.push(0);
      }
    }
    centro = cnsp + cx;
  }
  return { arreglo: ans, centro: centro };
};

export { Desplaza };
