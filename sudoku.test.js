
const Sudoku = require('./lib/sudoku')

describe('초급', () => {
  it('초급 1', () => {
    const input = [
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [1, 2, 3, 4, , 6, 7, 8, 9],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    expect(sudoku.cells[4][4].value).toBe(5)
  })
  it('초급 2', () => {
    const input = [
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , 1, 3, 7, , ,],
      [, , , 6, , 5, , ,],
      [, , , 9, 2, 8, , ,],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    expect(sudoku.cells[4][4].value).toBe(4)
  })
  it('초급 3', () => {
    const input = [
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , 1, , ,],
      [, , 1, , , , , ,],
      [, , , , , , , ,],
      [, , , , , , 1, ,],
      [, , , 1, , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    expect(sudoku.cells[4][4].value).toBe(1)
  })
  it('초급 4', () => {
    const input = [
      [, , , , , , , ,],
      [, , , 6, , , , ,],
      [, , , , , , , ,],
      [, , , , 4, 8, , ,],
      [, , , , , 1, , ,],
      [, , , , , , , , 6],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , , , , , ,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    expect(sudoku.cells[4][4].value).toBe(6)
  })
  it('초급 5', () => {
    const input = [
      [, 8, , , , , , ,],
      [, , , , 5, , , ,],
      [, , , , , , 8, ,],
      [, , , , 2, , , ,],
      [, , , , , , , ,],
      [, , , , , , , , 8],
      [, , , , , , , ,],
      [, , , 8, , , , ,],
      [, , , , , , , ,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    expect(sudoku.cells[4][4].value).toBe(8)
  })

  it('초급 6', () => {
    const input = [
      [, , , 1, 4, 5, , ,],
      [, , , 7, 2, , , ,],
      [, , , 6, 9, 8, , ,],
      [, , 3, , , , , ,],
      [, , , , , , , ,],
      [, , , , , , 3, ,],
      [, , , , , , , ,],
      [, , , , , , , ,],
      [, , , 3, , , , ,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    expect(sudoku.cells[4][4].value).toBe(3)
  })

  it('초급 7', () => {
    const input = [
      [, 8, , , , , , ,],
      [, , , , 5, , , ,],
      [, , , , , , 8, ,],
      [, , , , 2, , , ,],
      [, , , , , , , ,],
      [, , , , , , , , 8],
      [, , , , , , , ,],
      [, , , 8, , , , ,],
      [, , , , , , , ,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    expect(sudoku.cells[4][4].value).toBe(8)
  })

  it('초급 8', () => {
    const input = [
      [, , , , 8, , , ,],
      [, , , , , , , ,],
      [, , , , 3, , , ,],
      [, , , 5, , , , ,],
      [1, , , , , 7, , , 9],
      [, , , , , 4, , ,],
      [, , , , , , , ,],
      [, , , , 6, , , ,],
      [, , , , , , , ,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    expect(sudoku.cells[4][4].value).toBe(2)
  })

  it('초급 문제 1', () => {
    const input = [
      [, 5, , 7, , 2, , 8, 6],
      [3, 6, , , , , 4, , 1],
      [, , 9, 6, 4, 1, 5, 7,],
      [, , 1, 8, 5, , , , 7],
      [, 9, , 2, , 4, , 6,],
      [8, , , , 6, 9, 3, ,],
      [, 2, 6, 5, 1, 8, 7, ,],
      [7, , 5, , , , , 1, 2],
      [9, 1, , 3, , 7, , 4,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    // expect(sudoku.cells[4][4].value).toBe(2)
  })

  it('중급 1', () => {
    const input = [
      [, , 1, 5, , , , ,],
      [, 3, , , , 7, 9, 6,],
      [, 7, , , 4, , , , 2],
      [7, , , 2, , , , , 4],
      [4, , , , 8, , , , 9],
      [3, , , , , 5, , , 1],
      [9, , , , 1, , , 5,],
      [, 6, 2, 8, , , , 4,],
      [, , , , , 2, 3, ,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    // expect(sudoku.cells[4][4].value).toBe(5)
  })

  it('중급 7', () => {
    const input = [
      [, 5, 2, , , , , ,],
      [4, , , 7, , , 9, 8,],
      [, , , , , 3, , , 4],
      [8, , , 6, , , , ,],
      [, 6, , , , , , 3,],
      [, , , , , 5, , , 2],
      [7, , , 8, , , , ,],
      [, 3, 5, , , 2, , , 7],
      [, , , , , , 4, 6,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    // expect(sudoku.cells[4][4].value).toBe(5)
  })
  it('중급 a', () => {
    const input = [
      [, 5, , 7, , 2, , 8, 6],
      [3, 6, , , , , 4, , 1],
      [, , 9, 6, 4, 1, 5, 7,],
      [, , 1, 8, 5, , , , 7],
      [, 9, , 2, , 4, , 6,],
      [8, , , , 6, 9, 3, ,],
      [, 2, 6, 5, 1, 8, 7, ,],
      [7, , 5, , , , , 1, 2],
      [9, 1, , 3, , 7, , 4,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    // expect(sudoku.cells[4][4].value).toBe(5)
  })
  it('중급 b', () => {
    const input = [
      [, 5, 2, , , , , ,],
      [4, , , 7, , , 9, 8,],
      [, , , , , 3, , , 4],
      [8, , , 6, , , , ,],
      [, 6, , , , , , 3,],
      [, , , , , 5, , , 2],
      [7, , , 8, , , , ,],
      [, 3, 5, , , 2, , , 7],
      [, , , , , , 4, 6,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    // expect(sudoku.cells[4][4].value).toBe(5)
  })

  it('중급 c', () => {

    const input = [
      [, 5, 2, , , , , ,],
      [4, , , 7, , , 9, 8,],
      [, , , , , 3, , , 4],
      [8, , , 6, , , , ,],
      [, 6, , , , , , 3,],
      [, , , , , 5, , , 2],
      [7, , , 8, , , , ,],
      [, 3, 5, , , 2, , , 7],
      [, , , , , , 4, 6,]
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    // expect(sudoku.cells[4][4].value).toBe(5)
  })
  it('hard', () => {
    const input = [
      [, , , 8, , 6, , 1,],
      [, 6, , , , , , ,],
      [8, , 9, , , , , ,],
      [, 1, , , , , , ,],
      [, , , , 5, , , 9,],
      [, 5, , , , , , , 1],
      [, , , , , , , , 7],
      [, , , , , , , ,],
      [, , , , , , , ,],
    ]
    const sudoku = new Sudoku(input)
    sudoku.solve()
    // expect(sudoku.cells[4][4].value).toBe(5)
  })
})
