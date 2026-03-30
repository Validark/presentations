const s = `200:3,203:2,203:2,205:2,207,208,209,210,211,212:4,212:4,212:4,216:2,218:2,220,221,223:2`;

console.log(s.split(',').map(e => { const parts = e.split(':'); return "" + (+parts[0] - 1) + (parts[1] && (":" + parts[1]) || "") }).join(','));