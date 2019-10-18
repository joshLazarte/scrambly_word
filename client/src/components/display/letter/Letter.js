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

const Letter = ({ letter, onClick, id, disabled = true, transform }) => {
  const handleClick = () => {
    onClick({ letter, id });
  };

  return (

    <img
      className='Letter'
      style={{ cursor: disabled ? 'not-allowed' : 'pointer'}}
      alt={letter}
      src={images[`${letter}.png`]}
      onClick={disabled ? null : handleClick}
    />

  );
};

export default Letter;
