let sumFinita = (x, y, cx, cy) => {
  var ans = [];
  var centro;
  if (cx >= cy) {
    if (x.length >= y.length) {
      var i = 0;
      var j = 0;
      for (; i < cx - cy; ++i) {
        //ceros
        ans.push(x[i]);
      }
      for (; i < cx; ++i, ++j) {
        ans.push(x[i] + y[j]);
      }
      centro = ans.length;
      for (; j < y.length; ++i, ++j) {
        ans.push(x[i] + y[j]);
      }

      for (; i < x.length; ++i) {
        //ceros
        ans.push(x[i]);
      }
    } else {
      var i = 0;
      var j = 0;
      for (; i < cx - cy; ++i) {
        //ceros
        ans.push(x[i]);
      }
      for (; i < cx; ++i, ++j) {
        ans.push(x[i] + y[j]);
      }

      centro = ans.length;
      for (; i < x.length; ++i, ++j) {
        ans.push(x[i] + y[j]);
      }

      for (; j < y.length; ++j) {
        //ceros
        ans.push(y[j]);
      }
    }
  } else {
    if (x.length >= y.length) {
      var i = 0;
      var j = 0;
      for (; j < cy - cx; ++j) {
        //ceros
        ans.push(y[j]);
      }
      for (; j < cy; ++i, ++j) {
        ans.push(x[i] + y[j]);
      }
      centro = ans.length;
      for (; j < y.length; ++i, ++j) {
        ans.push(x[i] + y[j]);
      }

      for (; i < x.length; ++i) {
        //ceros
        ans.push(x[i]);
      }
    } else {
      var i = 0;
      var j = 0;
      for (; j < cy - cx; ++j) {
        //ceros
        ans.push(y[j]);
      }
      for (; j < cy; ++i, ++j) {
        ans.push(x[i] + y[j]);
      }

      centro = ans.length;
      for (; i < x.length; ++i, ++j) {
        ans.push(x[i] + y[j]);
      }

      for (; j < y.length; ++j) {
        //ceros
        ans.push(y[j]);
      }
    }
  }
  return { arreglo: ans, centro: centro };
};

let difFinita = (x, y, cx, cy) => {
  var ans = [];
  var temp = y;
  var centro;
  if (cx >= cy) {
    if (x.length >= temp.length) {
      var i = 0;
      var j = 0;
      for (; i < cx - cy; ++i) {
        //ceros
        ans.push(x[i]);
      }
      for (; i < cx; ++i, ++j) {
        ans.push(x[i] - temp[j]);
      }
      centro = ans.length;
      for (; j < temp.length; ++i, ++j) {
        ans.push(x[i] - temp[j]);
      }

      for (; i < x.length; ++i) {
        //ceros
        ans.push(x[i]);
      }
    } else {
      var i = 0;
      var j = 0;
      for (; i < cx - cy; ++i) {
        //ceros
        ans.push(x[i]);
      }
      for (; i < cx; ++i, ++j) {
        ans.push(x[i] - temp[j]);
      }

      centro = ans.length;
      for (; i < x.length; ++i, ++j) {
        ans.push(x[i] - temp[j]);
      }

      for (; j < temp.length; ++j) {
        //ceros
        ans.push(temp[j] * -1);
      }
    }
  } else {
    if (x.length >= temp.length) {
      var i = 0;
      var j = 0;
      for (; j < cy - cx; ++j) {
        //ceros
        ans.push(temp[j] * -1);
      }
      for (; j < cy; ++i, ++j) {
        ans.push(x[i] - temp[j]);
      }
      centro = ans.length;
      for (; j < temp.length; ++i, ++j) {
        ans.push(x[i] - temp[j]);
      }

      for (; i < x.length; ++i) {
        //ceros
        ans.push(x[i]);
      }
    } else {
      var i = 0;
      var j = 0;
      for (; j < cy - cx; ++j) {
        //ceros
        ans.push(temp[j] * -1);
      }
      for (; j < cy; ++i, ++j) {
        ans.push(x[i] - temp[j]);
      }

      centro = ans.length;
      for (; i < x.length; ++i, ++j) {
        ans.push(x[i] - temp[j]);
      }

      for (; j < temp.length; ++j) {
        //ceros
        ans.push(temp[j] * -1);
      }
    }
  }
  return { arreglo: ans, centro: centro };
};

export { sumFinita, difFinita };
