import React from 'react';

function Square(props) {
  return (
    <button type="button" className="square cyan-text text-darken-4" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

export default Square;
