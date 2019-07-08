import { ticTac, internal } from './ticTac'

/*
// rewire style (BUT DOESNT WORK WITH ES6 MODULES)
import rewire from 'rewire'
const ticTacInternal = rewire('./ticTac')
const squareIsOccupied = ticTacInternal.__get__('squareIsOccupied')
const setIsEqual = ticTacInternal.__get__('setIsEqual')
const setContainsNull = ticTacInternal.__get__('setContainsNull')
*/

const minMax = ticTac.minMax
const calculateWinner = ticTac.calculateWinner
const squareIsOccupied = internal.squareIsOccupied
const setIsEqual = internal.setIsEqual
const setContainsNull = internal.setContainsNull
const possibleMoves = internal.possibleMoves
const setScore = internal.setScore
const scoreExists = internal.scoreExists
const findBestMoveForO = internal.findBestMoveForO
const findBestMoveForX = internal.findBestMoveForX

describe('minMax tic tac toe', () => {
  let board1 = ['X', null, null, null, null, null, null, null, null]
  let board2 = ['X', null, 'X', null, 'O', null, null, null, null]
  let board3 = ['X', 'O', 'X', 'X', 'O', null, null, null, null]
  let board4 = [null, 'X', null, null, null, 'X', 'O', 'O', 'X']
  it('can provide the correct move to minimize/maximize value for player', () => {

  })
})

describe('calculate winner', () => {
  let board1 = ['X', 'X', 'X', null, null, null, null, null, null]
  let board2 = ['X', 'O', 'X', null, 'O', 'X', null, 'O', 'X']
  let board3 = ['X', 'O', 'X', 'O', 'X', 'X', 'O', 'X', 'O']
  let board4 = ['X', null, 'X', 'O', 'X', 'X', 'O', 'X', 'O']
  it('can determine game winner', () => {
    expect(calculateWinner(board1)).toEqual('X')
    expect(calculateWinner(board2)).toEqual('O')
    expect(calculateWinner(board3)).toEqual('Tie')
    expect(calculateWinner(board4)).toEqual(null)
  })
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
    expect(setScore('X', [], 0)).toEqual({score: -10})
    expect(setScore('X', [], 2)).toEqual({score: -8})
    expect(setScore('O', [], 0)).toEqual({score: 10})
    expect(setScore('O', [], 2)).toEqual({score: 8})
    expect(setScore(null, [], 0)).toEqual({score: 0})
    expect(setScore(null, [3, 4, 5], 0)).toEqual({})
  })

  it('can determine if score exists', () => {
    expect(scoreExists({ score: 10 })).toEqual(true)
    expect(scoreExists({})).toEqual(false)
  })

  it('can find best move for O', () => {
    let options = [{index: 0, score: -7}, {index: 2, score: -5}, {index: 3, score: -7}, {index: 4, score: -6}]
    expect(findBestMoveForO(options)).toEqual(1)
  })

  it('can find best move for X', () => {
    let options = [{index: 0, score: -7}, {index: 2, score: -5}, {index: 3, score: -7}, {index: 4, score: -6}]
    expect(findBestMoveForX(options)).toEqual(0)
  })
})
