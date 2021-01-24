const Sudoku = require('./lib/sudoku')


// 초급 7
const input = [
  [, 3, 5, 4, 6, 9, 2, 7, 8],
  [7, 8, 2, 1, , 5, 6, , 9],
  [, 6, , 2, 7, 8, 1, 3, 5],
  [3, 2, 1, , 4, 6, 8, 9, 7],
  [8, , 4, 9, 1, 3, 5, , 6],
  [5, 9, 6, 8, 2, , 4, 1, 3],
  [9, 1, 7, 6, 5, 2, , 8,],
  [6, , 3, 7, , 1, 9, 5, 2],
  [2, 5, 8, 3, 9, 4, 7, 6,]
]
const sudoku = new Sudoku(input)
// console.log(sudoku.solveCell({ x: 4, y: 4 }))
// console.log(sudoku.print())
console.time('s')
sudoku.solve()
sudoku.printDetail()
console.timeEnd('s')

// console.log(sudoku.cells[4][4])
// console.log(sudoku.cells)

