import React from 'react';
import {EuiButton} from '@elastic/eui';
import styles from './style';

const Button = ({ text, style, onClick }) => {
  return (
    <EuiButton onClick={onClick} style={{...styles, ...style}}>
      {text}
    </EuiButton>
  )
}

export default Button;