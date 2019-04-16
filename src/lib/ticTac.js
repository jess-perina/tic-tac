const ticTac = {
  minMax(board, player) {
    const availableMoves = possibleMoves(board)
    const winner = this.calculateWinner(board)
    if (winner === 'X') {
      return {score: -10}
    } else if (winner === 'O') {
      return {score: 10}
    } else if (availableMoves.length === 0) {
      return {score: 0}
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
      let bestScore = -10000
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score
          bestMove = i
        }
      }
    } else {
      let bestScore = 10000
      for (let i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score
          bestMove = i
        }
      }
    }
    return moves[bestMove]
  },

  calculateWinner(squares) {
    const lines = [
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
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a]
      } else if (squares[a] === null || squares[b] === null || squares[c] === null){
        tie = '';
      }
    }
    return tie || null;
  }
}

function displayWinner(winner) {
  switch (winner) {
    case 'X':
      return 'You win';
    case 'O':
      return 'Computer wins'
    default:
      return 'Tie';
  }
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
  }
}

export default ticTac
