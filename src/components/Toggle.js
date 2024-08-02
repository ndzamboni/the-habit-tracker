import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: ${({ theme }) => theme.toggleBackground};
  color: ${({ theme }) => theme.toggleColor};
  border: none;
  padding: 10px;
  cursor: pointer;
  position: fixed;
  top: 10px;
  right: 10px;
`;

const Toggle = ({ theme, toggleTheme }) => {
  return <Button onClick={toggleTheme}>{theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</Button>;
};

export default Toggle;
