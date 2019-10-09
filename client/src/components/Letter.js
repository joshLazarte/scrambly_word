import React from 'react';

const importAll = r => {
  let images = {};
  r.keys().forEach(item => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
};

const images = importAll(
  require.context('../letter_tiles', false, /\.(png|jpe?g|svg)$/)
);

const Letter = ({ letter, onClick, id }) => {
  const handleClick = () => {
    onClick({ letter, id });
  };

  return (
    <img
      alt={letter}
      src={images[`${letter}.png`]}
      onClick={onClick ? handleClick : null}
    />
  );
};

export default Letter;
