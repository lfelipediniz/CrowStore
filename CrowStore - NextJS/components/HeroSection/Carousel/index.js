import React, { useEffect } from 'react';
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

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [index]);

  return (
    <div>
      <SwipeableViews index={index} onChangeIndex={handleChangeIndex}>
        <Slide1></Slide1>
        <Slide2></Slide2>
        <Slide3></Slide3>
      </SwipeableViews>
      <button onClick={handleNextSlide}>Próximo slide</button>
    </div>
  );
};

export default Caurosel;
