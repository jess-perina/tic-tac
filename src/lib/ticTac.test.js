const rewire = require('rewire')
const ticTac = require('./ticTac')

const ticTacInternal = rewire('./ticTac')

const minMax = ticTac.minMax
const calculateWinner = ticTac.calculateWinner
const squareIsOccupied = ticTacInternal.__get__('squareIsOccupied')
const setIsEqual = ticTacInternal.__get__('setIsEqual')
const setContainsNull = ticTacInternal.__get__('setContainsNull')
const possibleMoves = ticTacInternal.__get__('possibleMoves')
const setScore = ticTacInternal.__get__('setScore')
const scoreExists = ticTacInternal.__get__('scoreExists')
const findBestMoveForO = ticTacInternal.__get__('findBestMoveForO')
const findBestMoveForX = ticTacInternal.__get__('findBestMoveForX')

describe('minMax tic tac toe', () => {

})

describe('non exported functions', () => {
  it('can determine if square is ocupied',  () => {
    expect(squareIsOccupied('X')).toEqual(true)
    expect(squareIsOccupied('O')).toEqual(true)
    expect(squareIsOccupied(null)).toEqual(false)
    expect(squareIsOccupied('F')).toEqual(false)
  })

  it('can determine if set is equal', () => {
    expect(setIsEqual('X', 'X', 'X')).toEqual(true)
    expect(setIsEqual('X', 'O', 'X')).toEqual(false)
  })

  it('can determine if set contains null', () => {
    expect(setContainsNull('X', null, 'X')).toEqual(true)
    expect(setContainsNull('X', 'O', 'X')).toEqual(false)
  })

  it('can find possible moves', () => {
    expect(possibleMoves([1, 2, null, null, 5, null, 7])).toEqual([2, 3, 5])
    expect(possibleMoves([null, null, null, null])).toEqual([0, 1, 2, 3])
    expect(possibleMoves([])).toEqual([])
  })

  it('can set score', () => {
    expect(setScore('X', [])).toEqual({score: -10})
    expect(setScore('O', [])).toEqual({score: 10})
    expect(setScore(null, [])).toEqual({score: 0})
    expect(setScore(null, [3, 4, 5])).toEqual({})
  })

  it('can determine if score exists', () => {
    expect(scoreExists({ score: 10 })).toEqual(true)
    expect(scoreExists({})).toEqual(false)
  })

  it('can find best move for O', () => {

  })

  it('can find best move for X', () => {

  })
})
