let Reflex = (x, cx) => {
  var ans = [];
  var centro;
  var i = x.length - 1;
  for (; i >= cx; --i) {
    ans.push(x[i]);
  }
  centro = ans.length - 1;
  for (; i >= 0; --i) {
    ans.push(x[i]);
  }
  return { arreglo: ans, centro: centro };
};

export { Reflex };
