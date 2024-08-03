import { createGlobalStyle } from 'styled-components';

export const lightTheme = {
  body: '#fff',
  text: '#000',
  toggleBackground: '#4CAF50',
  toggleColor: '#fff',
};

export const darkTheme = {
  body: '#333',
  text: '#fff',
  toggleBackground: '#FFC107',
  toggleColor: '#000',
};

export const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: background-color 0.3s, color 0.3s;
  }
`;
