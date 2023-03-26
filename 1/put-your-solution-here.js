const intersectionArray = (arrayA, arrayB) =>
  arrayA.filter((eA) => eA === [...arrayB].find((eB) => eB === eA)).sort();

console.log(intersectionArray([9, 8, 3, 4, 5], [2, 7, 4, 9, 1, 0]));
