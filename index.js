'use strict';

console.log('#3890b9 + #f6ff00 =', mix_hex('#3890b9', '#f6ff00')); // #3890b9 + #f6ff00 = #8cc46f

function hex2dec(hex) {
  return hex.replace('#', '').match(/.{2}/g).map(n => parseInt(n, 16));
}

function rgb2hex(r, g, b) {
  r = Math.round(r);
  g = Math.round(g);
  b = Math.round(b);
  return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
}

function rgb2cmyk(r, g, b) {
  let c = 1 - (r / 255);
  let m = 1 - (g / 255);
  let y = 1 - (b / 255);
  let k = Math.min(c, m, y);
  c = (c - k) / (1 - k);
  m = (m - k) / (1 - k);
  y = (y - k) / (1 - k);
  return [c, m, y, k];
}

function cmyk2rgb(c, m, y, k) {
  let r = c * (1 - k) + k;
  let g = m * (1 - k) + k;
  let b = y * (1 - k) + k;
  r = (1 - r) * 255 + .5;
  g = (1 - g) * 255 + .5;
  b = (1 - b) * 255 + .5;
  return [r, g, b];
}

function mix_cmyk(cmyk1, cmyk2) {
  let c = (cmyk1[0] + cmyk2[0]) / 2;
  let m = (cmyk1[1] + cmyk2[1]) / 2;
  let y = (cmyk1[2] + cmyk2[2]) / 2;
  let k = (cmyk1[3] + cmyk2[3]) / 2;
  return [c, m, y, k];
}

function mix_hex(hex1, hex2) {
  let [rgb1, rgb2] = [hex2dec(hex1), hex2dec(hex2)];
  let [cmyk1, cmyk2] = [rgb2cmyk(...rgb1), rgb2cmyk(...rgb2)];
  let mixture_cmyk = mix_cmyk(cmyk1, cmyk2);
  let mixture_rgb = cmyk2rgb(...mixture_cmyk);
  let mixture_hex = rgb2hex(...mixture_rgb);
  return mixture_hex;
} 