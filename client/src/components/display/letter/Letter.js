import React from 'react';
import './Letter.scss';

const importAll = r => {
  let images = {};
  r.keys().forEach(item => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const images = importAll(
  require.context('../../../letter_tiles', false, /\.(png|jpe?g|svg)$/)
);

const Letter = ({ letter, onClick, id, index }) => {
  const handleClick = e => {
    const rect = e.target.getBoundingClientRect();
    onClick({
      letter,
      id,
      prevLeft: rect.left,
      prevTop: rect.top,
      prevIndex: index
    });
  };

  return (
    <img
      className='Letter'
      style={{ cursor: onClick && 'pointer' }}
      alt={letter}
      src={images[`${letter}.png`]}
      onClick={onClick && handleClick}
    />
  );
};

export default Letter;
