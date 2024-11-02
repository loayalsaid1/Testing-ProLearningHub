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
import Test from './components/TextEditor/TextEditor';
import LectureDiscussion from './components/Discussion/LectureDiscussion';

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
  const [value, setValue] = useState('');
  const [files, setFiles] = useState([]);
  
  /**
   * This is messy nwo because... I'm not making the routing now.. 
   * i'm making individual views for now first.. and this is my test field. now
   * It's time is coming
   * 
   * BTW.. I'm not sure this approach is the best or not
   */
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
                  <button type="button" onClick={() => setView('sections')}>
                    Show sections
                  </button>
                </div>
              </>
            ) : (
              <>
                <Test value={value} setValue={setValue} files={files} setFiles={setFiles}  />
                <button type="button" onClick={() => console.log(value, files)}>Check dataa</button>
                {/* <LectureDiscussion lectureId='testId' /> */}
                <button type="button" onClick={() => setView('dashboard')}>
                  Go to dashboard
                </button>
                {/* <Lectures /> */}
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
