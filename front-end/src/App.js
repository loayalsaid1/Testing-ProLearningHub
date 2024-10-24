import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import {toggleName } from './redux/actions/helloActionCreators'

function App() {
  const name = useSelector((state) => state.hello.get('name'));
  const dispatch = useDispatch();


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>Hello: {name}</p>
        <button type='button' onClick={() => dispatch(toggleName())}>Toggle name</button>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
