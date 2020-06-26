import React, { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface SwitchProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
}

const Switch: React.FC<SwitchProps> = ({ id, ...rest }) => {
  return (
    <Container>
      <label htmlFor={id}>
        <input id={id} type="checkbox" {...rest} />
        <span />
      </label>
    </Container>
  );
};

export default Switch;
