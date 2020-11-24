import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { Provider } from 'react-redux';
import store from './redux/stores';

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
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>    
  </Provider>,
  document.getElementById('root')
);