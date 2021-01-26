let Amp = (x, cx, cns) => {
  var ans = [];
  for (var i = 0; i < x.length; ++i) {
    ans.push(x[i] * cns);
  }
  return { arreglo: ans, centro: cx };
};

let Ate = (x, cx, cns) => {
  var ans = [];
  for (var i = 0; i < x.length; ++i) {
    ans.push(x[i] / cns);
  }
  return { arreglo: ans, centro: cx };
};

export { Amp, Ate };
