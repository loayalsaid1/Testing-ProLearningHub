import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { toggleName } from './redux/actions/helloActionCreators';
import Login from './components/Login/Login';
import { logout } from './redux/actions/uiActionCreators';
import Spinner from './components/utilityComponents/Spinner';
import { googleLogout } from '@react-oauth/google';

function App() {
  const name = useSelector((state) => state.hello.get('name'));
  const isLoading = useSelector((state) => state.ui.get('isLoading'));
  const isLoggedIn = useSelector((state) => state.ui.get('isLoggedIn'));
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    googleLogout();
  }
  
  return (
    <div className="APP">
      {isLoading && <Spinner />}
      <header className="App-header">
        {!isLoggedIn ? (
          <Login />
        ) : (
          <>
            <p>Hello: {name}</p>
            <button type="button" onClick={() => dispatch(toggleName())}>
              Toggle name
            </button>
            <div>
              <button type="button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        )}

        <Toaster reverseOrder={true} />
      </header>
    </div>
  );
}

export default App;
