const x = [
  [4, 5, 7],
  [3, 6, 9],
  [7, 8, 9],
  [2, 1, 0]
]
const y = [
  [5, 3, 4],
  [3, 5, 2],
  [4, 2, 5]
]
for(let i = 0;i < 3;i++){
  let p = 0
  for(let j = 0;j < 3;j++){
    p += (x[0][j] * y[i][j])
  }
  console.log(p);
}