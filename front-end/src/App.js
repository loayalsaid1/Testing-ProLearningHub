import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {toggleName } from './redux/actions/helloActionCreators'
import Login from './components/Login/Login';

function App() {
  const name = useSelector((state) => state.hello.get('name'));
  const dispatch = useDispatch();


  return (
    <div className="App">
        <p>Hello: {name}</p>
        <button type='button' onClick={() => dispatch(toggleName())}>Toggle name</button>

        <Login />
    </div>
  );
}

export default App;
