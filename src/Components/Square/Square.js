import React from 'react';

const Square = ({ value, onClick }) => {
  return (
    <button type="button" className="square cyan-text text-darken-4" onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
