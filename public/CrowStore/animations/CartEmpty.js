import React from 'react';
import Lottie from 'react-lottie';
import animationData from './json/CartEmpty.json';

export default function CartEmpty() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div style={{ width: '500px' }}>
      <Lottie 
        options={defaultOptions}
      />
    </div>
  );
}
