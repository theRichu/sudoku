const { includes, compact, without, isNull } = require('lodash')
const EventEmitter = require('events')
class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter()
myEmitter.setMaxListeners(81)
const SUDOKU_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8, 9]

class Cell {
  candidateValues = null
  constructor(x, y, value) {
    this.x = x
    this.y = y
    this.value = value
    const self = this
    myEmitter.on(`row${y}`, (value) => {
      self.removeCandidate(value)
    })
    myEmitter.on(`column${x}`, (value) => {
      self.removeCandidate(value)
    })
    myEmitter.on(`square${self.getSquareNumber()}`, (value) => {
      self.removeCandidate(value)
    })
  }
  getSquareNumber () {
    const columnIndex = parseInt(this.x / 3)
    const rowIndex = parseInt(this.y / 3) * 3
    return columnIndex + rowIndex
  }
  setCandidateValues (values) {
    if (values.length === 1) {
      this.setValue(values[0])
    } else {
      this.candidateValues = values
    }
  }
  removeCandidate (value) {
    if (!this.value) {
      this.setCandidateValues((this.candidateValues || []).filter(v => {
        return v !== value
      }))
    }
  }
  setValue (value) {
    if (value && Number.isInteger(value)) {
      // 값이 정해지면, candidateValues는 있을 필요가 없음,
      this.setCandidateValues = null

      this.value = value
      // 같은 행, 같은 열, 같은 square에 candidate를 제거한다.
      myEmitter.emit(`row${this.y}`, value)
      myEmitter.emit(`column${this.x}`, value)
      myEmitter.emit(`square${this.getSquareNumber()}`, value)
    }
  }
}

class Sudoku {
  constructor(input = []) {
    this.cells = []
    for (let y = 0; y < 9; y++) {
      const rowValues = input[y]
      let columns = []
      for (let x = 0; x < 9; x++) {
        const value = rowValues[x]
        // console.log({ x, y, value })
        columns.push(new Cell(x, y, value))
      }
      this.cells.push(columns)
    }
  }
  getRowValues (params = {}) {
    const { x, y } = params

    const rows = this.cells[y]
    let values = []
    for (let nowX = 0; nowX < 9; nowX++) {

      if (!(x && x === nowX)) {
        values.push(rows[nowX].value)
      }
    }
    return values
  }
  getColumnValues (params = {}) {
    const { x, y } = params

    let columns = []
    for (let nowY = 0; nowY < 9; nowY++) {
      // console.log('x', x, 'y', y, this.cells[y], this.cells[y][x])
      if (!(y && y === nowY)) {
        columns.push(this.cells[nowY][x].value)
      }
    }
    return columns
  }
  getSquareValue (columnOffset = 0, rowOffset = 0) {
    // console.log({ columnOffset, rowOffset })
    return [
      ...this.cells[rowOffset + 0].slice(columnOffset + 0, columnOffset + 3).map(cell => cell.value),
      ...this.cells[rowOffset + 1].slice(columnOffset + 0, columnOffset + 3).map(cell => cell.value),
      ...this.cells[rowOffset + 2].slice(columnOffset + 0, columnOffset + 3).map(cell => cell.value)
    ]
  }
  getSquareValues (params = {}) {
    const { x, y } = params
    const columnOffset = parseInt(x / 3) * 3
    const rowOffset = parseInt(y / 3) * 3
    return this.getSquareValue(columnOffset, rowOffset)
  }
  print () {
    const spacingChar = ' '
    const status = `
-----------------------
 ${this.cells[0][0].value || spacingChar} ${this.cells[0][1].value || spacingChar} ${this.cells[0][2].value || spacingChar} | ${this.cells[0][3].value || spacingChar} ${this.cells[0][4].value || spacingChar} ${this.cells[0][5].value || spacingChar} | ${this.cells[0][6].value || spacingChar} ${this.cells[0][7].value || spacingChar} ${this.cells[0][8].value || spacingChar}
 ${this.cells[1][0].value || spacingChar} ${this.cells[1][1].value || spacingChar} ${this.cells[1][2].value || spacingChar} | ${this.cells[1][3].value || spacingChar} ${this.cells[1][4].value || spacingChar} ${this.cells[1][5].value || spacingChar} | ${this.cells[1][6].value || spacingChar} ${this.cells[1][7].value || spacingChar} ${this.cells[1][8].value || spacingChar}
 ${this.cells[2][0].value || spacingChar} ${this.cells[2][1].value || spacingChar} ${this.cells[2][2].value || spacingChar} | ${this.cells[2][3].value || spacingChar} ${this.cells[2][4].value || spacingChar} ${this.cells[2][5].value || spacingChar} | ${this.cells[2][6].value || spacingChar} ${this.cells[2][7].value || spacingChar} ${this.cells[2][8].value || spacingChar}
-------+-------+-------
 ${this.cells[3][0].value || spacingChar} ${this.cells[3][1].value || spacingChar} ${this.cells[3][2].value || spacingChar} | ${this.cells[3][3].value || spacingChar} ${this.cells[3][4].value || spacingChar} ${this.cells[3][5].value || spacingChar} | ${this.cells[3][6].value || spacingChar} ${this.cells[3][7].value || spacingChar} ${this.cells[3][8].value || spacingChar}
 ${this.cells[4][0].value || spacingChar} ${this.cells[4][1].value || spacingChar} ${this.cells[4][2].value || spacingChar} | ${this.cells[4][3].value || spacingChar} ${this.cells[4][4].value || spacingChar} ${this.cells[4][5].value || spacingChar} | ${this.cells[4][6].value || spacingChar} ${this.cells[4][7].value || spacingChar} ${this.cells[4][8].value || spacingChar}
 ${this.cells[5][0].value || spacingChar} ${this.cells[5][1].value || spacingChar} ${this.cells[5][2].value || spacingChar} | ${this.cells[5][3].value || spacingChar} ${this.cells[5][4].value || spacingChar} ${this.cells[5][5].value || spacingChar} | ${this.cells[5][6].value || spacingChar} ${this.cells[5][7].value || spacingChar} ${this.cells[5][8].value || spacingChar}
-------+-------+-------
 ${this.cells[6][0].value || spacingChar} ${this.cells[6][1].value || spacingChar} ${this.cells[6][2].value || spacingChar} | ${this.cells[6][3].value || spacingChar} ${this.cells[6][4].value || spacingChar} ${this.cells[6][5].value || spacingChar} | ${this.cells[6][6].value || spacingChar} ${this.cells[6][7].value || spacingChar} ${this.cells[6][8].value || spacingChar}
 ${this.cells[7][0].value || spacingChar} ${this.cells[7][1].value || spacingChar} ${this.cells[7][2].value || spacingChar} | ${this.cells[7][3].value || spacingChar} ${this.cells[7][4].value || spacingChar} ${this.cells[7][5].value || spacingChar} | ${this.cells[7][6].value || spacingChar} ${this.cells[7][7].value || spacingChar} ${this.cells[7][8].value || spacingChar}
 ${this.cells[8][0].value || spacingChar} ${this.cells[8][1].value || spacingChar} ${this.cells[8][2].value || spacingChar} | ${this.cells[8][3].value || spacingChar} ${this.cells[8][4].value || spacingChar} ${this.cells[8][5].value || spacingChar} | ${this.cells[8][6].value || spacingChar} ${this.cells[8][7].value || spacingChar} ${this.cells[8][8].value || spacingChar}`
    console.log(status)
  }
  printDetail () {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        const cell = this.cells[y][x]
        console.log(`(${x}, ${y})`, cell.value ? cell.value : JSON.stringify(cell.candidateValues))
      }
    }
  }
  getSquareCoordinates (params = {}) {
    const { x, y } = params
    const columnOffset = parseInt(x / 3) * 3
    const rowOffset = parseInt(y / 3) * 3

    return [
      { x: columnOffset + 0, y: rowOffset + 0 },
      { x: columnOffset + 1, y: rowOffset + 0 },
      { x: columnOffset + 2, y: rowOffset + 0 },
      { x: columnOffset + 0, y: rowOffset + 1 },
      { x: columnOffset + 1, y: rowOffset + 1 },
      { x: columnOffset + 2, y: rowOffset + 1 },
      { x: columnOffset + 0, y: rowOffset + 2 },
      { x: columnOffset + 1, y: rowOffset + 2 },
      { x: columnOffset + 2, y: rowOffset + 2 },
    ]
  }
  getCandidateBySquareRelation (params = {}) {
    const { x: targetX, y: targetY, candidateValues } = params
    let eliminatedCandidateValues = [...candidateValues]
    const squareCoordinates = this.getSquareCoordinates({ x: targetX, y: targetY })
    for (let index = 0; index < squareCoordinates.length; index++) {
      const element = squareCoordinates[index]
      const { x, y } = element
      // console.warn({ x, y, targetX, targetY, value: this.cells[y][x].value })

      if (!this.cells[y][x].value) {
        // rows 에 있는것
        const rowValues = compact(this.getRowValues({ y: y }))
        // columns 에 있는것
        const columnValues = compact(this.getColumnValues({ x: x }))
        // square에 있는것
        const squareValues = compact(this.getSquareValues({ x: x, y: y }))
        let squareCandidateValues = [...SUDOKU_NUMBERS]
        squareCandidateValues = without(squareCandidateValues, ...rowValues)
        squareCandidateValues = without(squareCandidateValues, ...columnValues)
        squareCandidateValues = without(squareCandidateValues, ...squareValues)
        if (!(x === targetX && y === targetY)) {
          // 들어갈 수 있는 값?
          // rows에 없는것, columns에 없는것, square에 없는것.
          eliminatedCandidateValues = without(eliminatedCandidateValues, ...squareCandidateValues)
        }
        // console.log(JSON.stringify({
        //   x,
        //   y,
        //   squareCandidateValues: squareCandidateValues.toString(),
        //   cannotBe: difference(SUDOKU_NUMBERS, squareCandidateValues).toString()
        // }))
      }
    }

    return eliminatedCandidateValues
  }
  solveCell (params = {}) {
    const { x, y } = params
    if (this.cells[y][x].value) {
      return
    }
    // console.log(x, y, this.cells[y][x])
    const savedCandidateValues = this.cells[y][x].candidateValues
    let candidateValues

    // 속도를 높이기 위해 이전 추정을 기억한다.
    // 추정에 실패했다면, 다시 처음부터 추정해본다.
    if (isNull(savedCandidateValues) || !savedCandidateValues.length) {
      candidateValues = [...SUDOKU_NUMBERS]
    } else {
      candidateValues = [...(savedCandidateValues || [])]
    }

    // 기본 룰에 따라 하나씩 소거한다.
    // rows 에 있는것
    const rowValues = compact(this.getRowValues({ y: y }))
    // columns 에 있는것
    const columnValues = compact(this.getColumnValues({ x: x }))
    // square에 있는것
    const squareValues = compact(this.getSquareValues({ x: x, y: y }))

    candidateValues = candidateValues.filter(value => {
      // 같은 행중, candidateValues 에 value 가 있다면 제거
      // 같은 열중, candidateValues 에 value 가 있다면 제거
      // 같은 섹터중, candidateValues 에 value 가 있다면 제거
      return !includes(rowValues, value) && !includes(columnValues, value) && !includes(squareValues, value)
    })

    // 구하고자 하는 좌표에, 다른 섹션의 좌표들에 모두 들어갈 수 없는 값들이 있다면?
    // console.log('firstStep', { x, y, candidateValues })

    // candidate 중, 이 곳에 특정 값이 들어가야만 하는 이유가 있다면 그 값을 남겨야 한다. (초급 3)
    // 섹션으로서, 들어갈 수 없는 값들을 검토한다.

    let eliminatedCandidateValues = this.getCandidateBySquareRelation({ x, y, candidateValues })
    if (eliminatedCandidateValues.length) {
      candidateValues = eliminatedCandidateValues
    }
    // console.log('secondStep', { x, y, candidateValues })

    if (candidateValues.length === 1) {
      // 만약 candidateValues가 하나만 남는다면, 해결
      this.cells[y][x].setValue(candidateValues[0])
      return candidateValues[0]
    } else {
      // 후보군이 많다면,
      // 더 많은 단서가 필요하다, 일단 셀에 현재까지 알아낸 candidateValues 설정
      this.cells[y][x].setCandidateValues(candidateValues)
    }
  }
  solve () {
    this.print()

    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        this.solveCell({ x, y })
      }
    }

    this.print()
    // this.printDetail()
  }
}


module.exports = Sudoku
