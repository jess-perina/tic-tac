let internal = {
  squareIsOccupied(square) {
    return square === 'X' || square === 'O' || false
  },

  setIsEqual(a, b, c) {
    return a === b && a === c
  },

  setContainsNull(a, b, c) {
    return a === null || b === null || c === null
  },

  possibleMoves(board) {
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
  },

  setScore(winner, moves, depth) {
    if (winner === 'X') {
      return {score: -10 + depth}
    } else if (winner === 'O') {
      return {score: 10 - depth}
    } else if (moves.length === 0) {
      return {score: 0}
    } else {
      return {}
    }
  },

  scoreExists(score) {
    return score.hasOwnProperty('score')
  },

  findBestMoveForO(moves) {
    let bestMove
    let bestScore = -Infinity
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score > bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
    return bestMove
  },

  findBestMoveForX(moves) {
    let bestMove
    let bestScore = Infinity
    for (let i = 0; i < moves.length; i++) {
      if (moves[i].score < bestScore) {
        bestScore = moves[i].score
        bestMove = i
      }
    }
    return bestMove
  }
}

const ticTac = {
  minMax(board, player, depth) {
    depth++
    const availableMoves = internal.possibleMoves(board)
    const winner = this.calculateWinner(board)
    const score = internal.setScore(winner, availableMoves, depth)
    if (internal.scoreExists(score)) {
      return score
    }

    let moves = []
    for (let i = 0; i < availableMoves.length; i++) {
      let move = []
      move.index = availableMoves[i]
      board[availableMoves[i]] = player

      if (player === 'O') {
        let g = this.minMax(board, 'X', depth)
        move.score = g.score
      } else {
        let g = this.minMax(board, 'O', depth)
        move.score = g.score
      }
      board[availableMoves[i]] = null
      moves.push(move)
    }

    let bestMove
    if (player === 'O') {
      bestMove = internal.findBestMoveForO(moves)
    } else {
      bestMove = internal.findBestMoveForX(moves)
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
      if (internal.squareIsOccupied(squares[a]) && internal.setIsEqual(squares[a], squares[b], squares[c])) {
        return squares[a]
      } else if (internal.setContainsNull(squares[a], squares[b], squares[c])){
        tie = '';
      }
    }
    return tie || null;
  }
}

export { ticTac, internal }
