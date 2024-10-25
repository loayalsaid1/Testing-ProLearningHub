import React from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {toggleName } from './redux/actions/helloActionCreators'
import Login from './components/Login/Login';

function App() {
  const name = useSelector((state) => state.hello.get('name'));
  const isLoading = useSelector( state => state.ui.get('isLoading'));
  const isLoggedIn = useSelector( state => state.ui.get('isLoggedIn'));
  const dispatch = useDispatch();


  return (
    <div className="App">
        {!isLoggedIn 
        ? <Login />
        :(
         <>
          <p>Hello: {name}</p>
          <button type='button' onClick={() => dispatch(toggleName())}>Toggle name</button>
         </>
        )
        }

    </div>
  );
}

export default App;
