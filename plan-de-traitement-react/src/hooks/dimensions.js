import React, { useState, useEffect } from 'react';


export const useDimension = () => {
  const [innerWidth, setInnerWidth] = useState(0);
  const [innerHeight, setInnerHeight] = useState(0);

  window.addEventListener('resize', e => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);
  })

  return {
    innerHeight,
    innerWidth
  }
}
export function getWindowSize() {
  const {innerWidth, innerHeight} = window;
  return {innerWidth, innerHeight};
}