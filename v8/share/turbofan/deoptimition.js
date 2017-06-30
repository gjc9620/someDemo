function myFunc(nb) {
  return nb + nb;
}

for (let i = 0; i < 2000; ++i) {
  myFunc(i);
}

for (let i = 0; i < 2000; ++i) {
  myFunc(i + '');
}

//
