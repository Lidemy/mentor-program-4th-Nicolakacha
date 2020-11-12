import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ThemeProvider } from 'styled-components';

const theme = {
  colors: {
    primary_1: '#6A959D',
    primary_2: '#D1E2E5',
    primary_3: '#9EBEC4',
    primary_4: '#467B85',
    primary_5: '#255E69',
  },
};

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);

reportWebVitals();
