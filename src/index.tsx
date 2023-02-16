import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Provider } from 'react-redux';
import { FirebaseAppProvider } from 'reactfire';
import 'firebase/auth';
import { firebaseConfig } from './firebaseConfig';
import { store } from './redux/store';
import { Home, Dashboard, SignIn, SignUp  } from './components'; //NEW_ADDITION
import { theme } from './Theme/themes';
import './styles.css'
import reportWebVitals from './reportWebVitals'; //Not on Ryan's

const root = ReactDOM.createRoot(
  document.getElementById('root')as HTMLElement
)

root.render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <Provider store = {store}>    
          <ThemeProvider theme={theme}>
            <Router>
              <Routes>
                <Route path='/' element={<Home title = {'Car Inventory'}/>} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/signin' element={<SignIn />} />
                <Route path='/signup' element={<SignUp/>}/>
              </Routes>
            </Router>
          </ThemeProvider>
      </Provider>                   
    </FirebaseAppProvider>
  </React.StrictMode>,
);

reportWebVitals();