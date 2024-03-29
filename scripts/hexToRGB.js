function hexToRGB(hex) {
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `${r} ${g} ${b}`;
}

const stuff = `.theme-red {
  --color-custom-50: #ffebee;
  --color-custom-100: #ffcdd2;
  --color-custom-200: #ef9a9a;
  --color-custom-300: #e57373;
  --color-custom-400: #ef5350;
  --color-custom-500: #f44336;
  --color-custom-600: #e53935;
  --color-custom-700: #d32f2f;
  --color-custom-800: #c62828;
  --color-custom-900: #b71c1c;
}

.theme-pink {
  --color-custom-50: #fce4ec;
  --color-custom-100: #f8bbd0;
  --color-custom-200: #f48fb1;
  --color-custom-300: #f06292;
  --color-custom-400: #ec407a;
  --color-custom-500: #e91e63;
  --color-custom-600: #d81b60;
  --color-custom-700: #c2185b;
  --color-custom-800: #ad1457;
  --color-custom-900: #880e4f;
}

.theme-purple {
  --color-custom-50: #f3e5f5;
  --color-custom-100: #e1bee7;
  --color-custom-200: #ce93d8;
  --color-custom-300: #ba68c8;
  --color-custom-400: #ab47bc;
  --color-custom-500: #9c27b0;
  --color-custom-600: #8e24aa;
  --color-custom-700: #7b1fa2;
  --color-custom-800: #6a1b9a;
  --color-custom-900: #4a148c;
}

.theme-deep-purple {
  --color-custom-50: #ede7f6;
  --color-custom-100: #d1c4e9;
  --color-custom-200: #b39ddb;
  --color-custom-300: #9575cd;
  --color-custom-400: #7e57c2;
  --color-custom-500: #673ab7;
  --color-custom-600: #5e35b1;
  --color-custom-700: #512da8;
  --color-custom-800: #4527a0;
  --color-custom-900: #311b92;
}

.theme-indigo {
  --color-custom-50: #e8eaf6;
  --color-custom-100: #c5cae9;
  --color-custom-200: #9fa8da;
  --color-custom-300: #7986cb;
  --color-custom-400: #5c6bc0;
  --color-custom-500: #3f51b5;
  --color-custom-600: #3949ab;
  --color-custom-700: #303f9f;
  --color-custom-800: #283593;
  --color-custom-900: #1a237e;
}

.theme-blue {
  --color-custom-50: #e3f2fd;
  --color-custom-100: #bbdefb;
  --color-custom-200: #90caf9;
  --color-custom-300: #64b5f6;
  --color-custom-400: #42a5f5;
  --color-custom-500: #2196f3;
  --color-custom-600: #1e88e5;
  --color-custom-700: #1976d2;
  --color-custom-800: #1565c0;
  --color-custom-900: #0d47a1;
}

.theme-light-blue {
  --color-custom-50: #e1f5fe;
  --color-custom-100: #b3e5fc;
  --color-custom-200: #81d4fa;
  --color-custom-300: #4fc3f7;
  --color-custom-400: #29b6f6;
  --color-custom-500: #03a9f4;
  --color-custom-600: #039be5;
  --color-custom-700: #0288d1;
  --color-custom-800: #0277bd;
  --color-custom-900: #01579b;
}

.theme-cyan {
  --color-custom-50: #e0f7fa;
  --color-custom-100: #b2ebf2;
  --color-custom-200: #80deea;
  --color-custom-300: #4dd0e1;
  --color-custom-400: #26c6da;
  --color-custom-500: #00bcd4;
  --color-custom-600: #00acc1;
  --color-custom-700: #0097a7;
  --color-custom-800: #00838f;
  --color-custom-900: #006064;
}

.theme-teal {
  --color-custom-50: #e0f2f1;
  --color-custom-100: #b2dfdb;
  --color-custom-200: #80cbc4;
  --color-custom-300: #4db6ac;
  --color-custom-400: #26a69a;
  --color-custom-500: #009688;
  --color-custom-600: #00897b;
  --color-custom-700: #00796b;
  --color-custom-800: #00695c;
  --color-custom-900: #004d40;
}

.theme-green {
  --color-custom-50: #e8f5e9;
  --color-custom-100: #c8e6c9;
  --color-custom-200: #a5d6a7;
  --color-custom-300: #81c784;
  --color-custom-400: #66bb6a;
  --color-custom-500: #4caf50;
  --color-custom-600: #43a047;
  --color-custom-700: #388e3c;
  --color-custom-800: #2e7d32;
  --color-custom-900: #1b5e20;
}

.theme-light-green {
  --color-custom-50: #f1f8e9;
  --color-custom-100: #dcedc8;
  --color-custom-200: #c5e1a5;
  --color-custom-300: #aed581;
  --color-custom-400: #9ccc65;
  --color-custom-500: #8bc34a;
  --color-custom-600: #7cb342;
  --color-custom-700: #689f38;
  --color-custom-800: #558b2f;
  --color-custom-900: #33691e;
}

.theme-lime {
  --color-custom-50: #f9fbe7;
  --color-custom-100: #f0f4c3;
  --color-custom-200: #e6ee9c;
  --color-custom-300: #dce775;
  --color-custom-400: #d4e157;
  --color-custom-500: #cddc39;
  --color-custom-600: #c0ca33;
  --color-custom-700: #afb42b;
  --color-custom-800: #9e9d24;
  --color-custom-900: #827717;
}

.theme-yellow {
  --color-custom-50: #fffde7;
  --color-custom-100: #fff9c4;
  --color-custom-200: #fff59d;
  --color-custom-300: #fff176;
  --color-custom-400: #ffee58;
  --color-custom-500: #ffeb3b;
  --color-custom-600: #fdd835;
  --color-custom-700: #fbc02d;
  --color-custom-800: #f9a825;
  --color-custom-900: #f57f17;
}

.theme-amber {
  --color-custom-50: #fff8e1;
  --color-custom-100: #ffecb3;
  --color-custom-200: #ffe082;
  --color-custom-300: #ffd54f;
  --color-custom-400: #ffca28;
  --color-custom-500: #ffc107;
  --color-custom-600: #ffb300;
  --color-custom-700: #ffa000;
  --color-custom-800: #ff8f00;
  --color-custom-900: #ff6f00;
}

.theme-orange {
  --color-custom-50: #fff3e0;
  --color-custom-100: #ffe0b2;
  --color-custom-200: #ffcc80;
  --color-custom-300: #ffb74d;
  --color-custom-400: #ffa726;
  --color-custom-500: #ff9800;
  --color-custom-600: #fb8c00;
  --color-custom-700: #f57c00;
  --color-custom-800: #ef6c00;
  --color-custom-900: #e65100;
}

.theme-deep-orange {
  --color-custom-50: #fbe9e7;
  --color-custom-100: #ffccbc;
  --color-custom-200: #ffab91;
  --color-custom-300: #ff8a65;
  --color-custom-400: #ff7043;
  --color-custom-500: #ff5722;
  --color-custom-600: #f4511e;
  --color-custom-700: #e64a19;
  --color-custom-800: #d84315;
  --color-custom-900: #bf360c;
}

.theme-brown {
  --color-custom-50: #efebe9;
  --color-custom-100: #d7ccc8;
  --color-custom-200: #bcaaa4;
  --color-custom-300: #a1887f;
  --color-custom-400: #8d6e63;
  --color-custom-500: #795548;
  --color-custom-600: #6d4c41;
  --color-custom-700: #5d4037;
  --color-custom-800: #4e342e;
  --color-custom-900: #3e2723;
}

.theme-grey {
  --color-custom-50: #fafafa;
  --color-custom-100: #f5f5f5;
  --color-custom-200: #eeeeee;
  --color-custom-300: #e0e0e0;
  --color-custom-400: #bdbdbd;
  --color-custom-500: #9e9e9e;
  --color-custom-600: #757575;
  --color-custom-700: #616161;
  --color-custom-800: #424242;
  --color-custom-900: #212121;
}`
  .split('}')
  .map((e) => e.trim())
  .filter((e) => e)
  .map((e) => e
    .split('{')
    .map((e) => e.trim()))
  .map(([name, colors]) => [
    name,
    colors.split(';')
      .map((e) => e.trim())
      .filter((e) => e)
      .map((e) => e.split(':').map((e) => e.trim()))
      .map(([key, value]) => [key, hexToRGB(value.slice(1))])
      .map((e) => e.join(': '))
      .join(';\n'),
  ])
  .map(([name, colors]) => `${name} {\n  ${colors}\n}`)
  .join('\n\n');

console.log(stuff);
