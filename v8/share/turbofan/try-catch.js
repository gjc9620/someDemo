
function tryThis (run, caught) {
  
  try {
    return run();
  }
  catch (err) {
    return caught(err);
  }
}

function myFunc(nb) {
  return tryThis(() => nb + nb, (err) => err)
}

for (var i = 0; i < 2000; ++i) {
  myFunc(i);
}
