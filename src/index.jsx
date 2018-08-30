import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { store } from './_helpers';
import  App  from './components/App/App';
import './dependencies'
import './style.scss'


// theme of the whole app. Colors should be changed here  
export const theme = createMuiTheme({
    palette: {
      primary: { main: '#560e54' }, // Purple and green play nicely together.
      secondary: { main: '#27b08a' }, // Secondary color.
    },
    typography: {
        // Use the system font instead of the default Roboto font.
        fontFamily: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
        ].join(','),
      }
  });

render(
    <Provider store={store}>
        <MuiThemeProvider theme={theme}>
        <App/>
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('app')
);
