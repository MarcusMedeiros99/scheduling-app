import Home from './components/Home/Home';
import Login from'./components/Login/Login';
import {useEffect, useState} from 'react';
import api from './api/api';

import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState(0);

  function login(user) {
    setLoggedIn(true);
    setUserId(user.id);
  }

  useEffect(() => {
    api
      .get('login', {
        withCredentials: true
      })
      .then((res) => {
        login({id: res.data.userId});
      })
      .catch(err => {
        setLoggedIn(false);
      })

  }, [])

  if (loggedIn) {
    return (
      <Home userId={userId} setLoggedIn={setLoggedIn}/>
    );
  }
  return (
    <Login login={login} />
  )
}

export default App;
