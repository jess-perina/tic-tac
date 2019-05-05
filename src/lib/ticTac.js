const ticTac = {
  minMax(board, player) {
    const availableMoves = possibleMoves(board)
    const winner = this.calculateWinner(board)
    const score = setScore(winner, availableMoves)
    if (scoreExists(score)) {
      return score
    }

    let moves = []
    for (let i = 0; i < availableMoves.length; i++) {
      let move = []
      move.index = availableMoves[i]
      board[availableMoves[i]] = player

      if (player === 'O') {
        let g = this.minMax(board, 'X')
        move.score = g.score
      } else {
        let g = this.minMax(board, 'O')
        move.score = g.score
      }
      board[availableMoves[i]] = null
      moves.push(move)
    }

    let bestMove
    if (player === 'O') {
      bestMove = findBestMoveForO(moves)
    } else {
      bestMove = findBestMoveForX(moves)
    }
    return moves[bestMove]
  },

  calculateWinner(squares) {
    const winningSets = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let tie = 'Tie';
    for (let set of winningSets) {
      const [a, b, c] = set;
      if (squareIsOccupied(squares[a]) && setIsEqual(squares[a], squares[b], squares[c])) {
        return squares[a]
      } else if (setContainsNull(squares[a], squares[b], squares[c])){
        tie = '';
      }
    }
    return tie || null;
  }
}

function squareIsOccupied(square) {
  return square === 'X' || square === 'O' || false
}

function setIsEqual(a, b, c) {
  return a === b && a === c
}

function setContainsNull(a, b, c) {
  return a === null || b === null || c === null
}

function possibleMoves(board) {
  let options = []
  for (var i = 0; i < board.length; i++) {
    if (board[i] === null) {
      options.push(i)
    }
  }
  return options
  // return board.filter((s, index ) => {
  //   if (s === null) return index
  // })
}

function setScore(winner, moves) {
  if (winner === 'X') {
    return {score: -10}
  } else if (winner === 'O') {
    return {score: 10}
  } else if (moves.length === 0) {
    return {score: 0}
  } else {
    return {}
  }
}

function scoreExists(score) {
  return score.hasOwnProperty('score')
}

function findBestMoveForO(moves) {
  let bestMove
  let bestScore = -10000
  for (let i = 0; i < moves.length; i++) {
    if (moves[i].score > bestScore) {
      bestScore = moves[i].score
      bestMove = i
    }
  }
  return bestMove
}

function findBestMoveForX(moves) {
  let bestMove
  let bestScore = 10000
  for (let i = 0; i < moves.length; i++) {
    if (moves[i].score < bestScore) {
      bestScore = moves[i].score
      bestMove = i
    }
  }
  return bestMove
}

module.exports = ticTac
