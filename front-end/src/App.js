import React, { useState }from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import './App.css';
import { toggleName } from './redux/actions/helloActionCreators';
import { logout } from './redux/actions/uiActionCreators';
import Spinner from './components/utilityComponents/Spinner';
import { googleLogout } from '@react-oauth/google';
import Authintication from './components/Authintication/Authintication';
// import Lecture from './components/Lecture/Lecture';
import Test from './components/Test/Test';

function App() {
  const name = useSelector((state) => state.hello.get('name'));
  const isLoading = useSelector((state) => state.ui.get('isLoading'));
  // const isLoggedIn = useSelector((state) => state.ui.get('isLoggedIn'));
  const isLoggedIn = true;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    googleLogout();
  }
  const [view, setView]  = useState('dashboard'); 
  
  return (
    <div className="APP">
      {isLoading && <Spinner />}
      <header className="App-header">
        {!isLoggedIn ? (
          <Authintication />
        ) : (
          <>
            {view === 'dashboard' ? (
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
                <div>
                  <button type="button" onClick={() => setView('pages')}>
                    Show pages
                  </button>
                </div>
              </>
            ) : (
              <>
                <Test />
                <button type="button" onClick={() => setView('dashboard')}>
                  Go to dashboard
                </button>
              </>
            )}

          </>
        )}

        <Toaster reverseOrder={true} />
      </header>
    </div>
  );
}

export default App;
