import React from 'react'

function ResetButton(props) {
  return (
    <button
      type="button"
      className="reset-btn btn waves-effect waves-light" onClick={() => props.resetGame()}>Reset Game
    </button>
  )
}

export default ResetButton
