import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { Slide1, Slide2, Slide3 } from './CarouselElements';

const Caurosel = () => {
  const [index, setIndex] = React.useState(0);

  const handleChangeIndex = (index) => {
    setIndex(index);
  };

  const handleNextSlide = () => {
    if (index === 2) {
      setIndex(0); // Retorna ao início quando todos os slides forem percorridos
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        <Slide1>slide n°1</Slide1>
        <Slide2>slide n°2</Slide2>
        <Slide3>slide n°3</Slide3>
      </SwipeableViews>
      <button onClick={handleNextSlide}>Próximo slide</button>
    </div>
  );
};

export default Caurosel;
