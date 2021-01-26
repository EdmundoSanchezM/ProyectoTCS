let Diez = (x, cx, cns) => {
  var ans = [];
  var centro;

  for (let i = cx; i >= 0; i = i - cns) {
    ans.unshift(x[i]);
  }
  centro = ans.length - 1;
  for (let i = cx + cns; i < x.length; i = i + cns) {
    ans.push(x[i]);
  }
  //Borrando 0's incesearios, caso que dercha
  for (let i = ans.length - 1; i >= 0; i--) {
    if (ans[i] === 0 && i !== centro) {
      ans.pop();
    }
    if (ans[i - 1] !== 0) break;
  }
  for (let i = 0; i < x.length; i++) {
    if (ans[i] === 0 && i !== centro) {
      ans.pop();
    }
    if (ans[i + 1] !== 0) break;
  }
  return { arreglo: ans, centro: centro };
};

let InterUnit = (x, cx, cns) => {
  var ans = [];
  var centro;
  for (let i = 0; i < cx; i++) {
    for (let j = 0; j < cns; j++) {
      ans.push(x[i]);
    }
  }
  centro = ans.length;
  for (let i = cx; i < x.length; i++) {
    for (let j = 0; j < cns; j++) {
      ans.push(x[i]);
    }
  }
  //Borrando 0's incesearios, caso que dercha
  for (let i = ans.length - 1; i >= 0; i--) {
    if (ans[i] === 0 && i !== centro) {
      ans.pop();
    }
    if (ans[i - 1] !== 0) break;
  }
  for (let i = 0; i < x.length; i++) {
    if (ans[i] === 0 && i !== centro) {
      ans.pop();
    }
    if (ans[i + 1] !== 0) break;
  }
  return { arreglo: ans, centro: centro };
};

let InterCero = (x, cx, cns) => {
  var ans = [];
  var centro;
  for (let i = 0; i < cx; i++) {
    ans.push(x[i]);
    for (let j = 1; j < cns; j++) {
      ans.push(0);
    }
  }
  centro = ans.length;
  for (let i = cx; i < x.length; i++) {
    ans.push(x[i]);
    for (let j = 1; j < cns; j++) {
      ans.push(0);
    }
  }
  //Borrando 0's incesearios, caso que dercha
  for (let i = ans.length - 1; i >= 0; i--) {
    if (ans[i] === 0 && i !== centro) {
      ans.pop();
    }
    if (ans[i - 1] !== 0) break;
  }
  for (let i = 0; i < x.length; i++) {
    if (ans[i] === 0 && i !== centro) {
      ans.pop();
    }
    if (ans[i + 1] !== 0) break;
  }
  return { arreglo: ans, centro: centro };
};

let InterLineal = (x, cx, cns) => {
  var ans = [];
  var centro;
  for (let i = 0; i < cx; i++) {
    ans.push(x[i]);
    let valorArreglo = x[i];
    for (let j = 1; j < cns; j++) {
      let ni = x[i];
      let nf = x[i + 1];
      let proporcion = Math.abs(nf - ni) / cns;
      if (ni < nf) {
        valorArreglo = valorArreglo + proporcion;
      } else if (ni > nf) {
        valorArreglo = valorArreglo - proporcion;
      }
      ans.push(valorArreglo);
    }
  }
  centro = ans.length;
  for (let i = cx; i < x.length; i++) {
    ans.push(x[i]);
    let valorArreglo = x[i];
    for (let j = 1; j < cns; j++) {
      let ni = x[i];
      let nf = x[i + 1];
      if (i + 1 === x.length) nf = 0;
      let proporcion = Math.abs(nf - ni) / cns;
      if (ni < nf) {
        valorArreglo += proporcion;
      } else if (ni > nf) {
        valorArreglo -= proporcion;
      }
      ans.push(valorArreglo);
    }
  }
  //Borrando 0's incesearios, caso que dercha
  for (let i = ans.length - 1; i >= 0; i--) {
    if (ans[i] === 0 && i !== centro) {
      ans.pop();
    }
    if (ans[i - 1] !== 0) break;
  }
  for (let i = 0; i < x.length; i++) {
    if (ans[i] === 0 && i !== centro) {
      ans.pop();
    }
    if (ans[i + 1] !== 0) break;
  }
  return { arreglo: ans, centro: centro };
};
export { Diez, InterUnit, InterLineal, InterCero };
