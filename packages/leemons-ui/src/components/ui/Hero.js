import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useWindowHeight } from '@react-hook/window-size';

function Hero({ children, className, maxHeight, minHeight }) {
  const [height, setHeight] = useState(minHeight);
  const windowHeight = useWindowHeight();

  useEffect(() => {
    setHeight(Math.min(Math.max(windowHeight, minHeight), maxHeight));
  }, [windowHeight]);

  return (
    <div style={{ minHeight: `${height}px` }} className={`hero ${className || ''}`}>
      {children}
    </div>
  );
}

Hero.defaultProps = {
  minHeight: 0,
  maxHeight: 1000000,
};

Hero.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  cover: PropTypes.bool,
  maxHeight: PropTypes.number,
  minHeight: PropTypes.number,
};

export default Hero;
