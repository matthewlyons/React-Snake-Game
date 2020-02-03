import React from 'react';

export default function Cell(props) {
  const classes = `grid-cell 
  ${props.foodCell ? 'grid-cell--food' : ''} 
  ${props.snakeCell ? 'grid-cell--snake' : ''}
  `;
  return <div className={classes} style={{ height: '15px', width: '15px' }} />;
}
