
async function add(x, y) {
  return x + y;
}

add(3, 6).then(console.log); // 9


function mult(a, b) {
  return new Promise((resolve) => {
    resolve(a * b);
  });
}

mult(3, 5).then(console.log); // 15
