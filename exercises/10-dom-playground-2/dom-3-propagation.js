const outer = document.querySelector('.outer');
const middle = document.querySelector('.middle');
const inner = document.querySelector('.inner');

outer.addEventListener('click', (e) => {
  // e.stopPropagation();
  console.log('outer bubble');
});

middle.addEventListener('click', (e) => {
  // e.stopPropagation();
  console.log('middle bubble');
});

inner.addEventListener('click', (e) => {
  // e.stopPropagation();
  console.log('inner bubble');
});

outer.addEventListener(
  'click',
  (e) => {
    // e.stopPropagation();
    console.log('outer capture');
  },
  true
);

middle.addEventListener(
  'click',
  (e) => {
    // e.stopPropagation();
    console.log('middle capture');
  },
  true
);

inner.addEventListener(
  'click',
  (e) => {
    // e.stopPropagation();
    console.log('inner capture');
  },
  true
);
