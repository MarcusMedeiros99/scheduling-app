import {useState} from 'react';

import SignUp from '../SignUp/SignUp';
import FlashMessage from '../FlashMessage/FlashMessage';

import api from '../../api/api';
import validateEmail from '../../utils/validateEmail';
import validatePassword from '../../utils/validatePassword';

import './login.css';

function Login({login}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hideNewUserForm, setHideNewUserForm] = useState(true);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashMessageColor, setFlashMessageColor] = useState("");

  
  function showFlashMessage(message, color) {
    setFlashMessage(message);
    setFlashMessageColor(color);

    setTimeout(() => {
      setFlashMessage("");
    }, 5000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    try {
      validateEmail(email);
      validatePassword(password);

      api
      .post('/login', {
        email,
        password
      }, {
        withCredentials:true,
        validateStatus: (status) => {
          return status === 200 || status === 404
        }
      })
      .then(res => {
        if (res.status === 200) login();
        if (res.status === 404) showFlashMessage(res.data.message, 'red');
      })
      .catch(err => {
        console.log(err);
      })
    }
    catch (err) {
      showFlashMessage(err.message, 'red');
    }
  }

  function closeNewUserForm() {
    setHideNewUserForm(true);
  }

  function handleCreateUser(e) {
    e.preventDefault();

    setHideNewUserForm(false);
  } 
  

  return (
    <main className="login">
      {
        hideNewUserForm ?
        <form onSubmit={(e) => {handleSubmit(e)}}>
          <FlashMessage
            message={flashMessage}
            color={flashMessageColor}
          />
          <div>
            <label>
              Email
              <input type="email" name="email" onChange={(e) => {setEmail(e.target.value)}}/>
            </label>
          </div>
          
          <div>
            <label>
              Password
              <input type="password" name="password" onChange={(e) => {setPassword(e.target.value)}}/>
            </label>
          </div>
          
          <div className="buttons">
            <button onClick={e => handleCreateUser(e)} type="button">
              Create account
            </button>
            <button type="submit">
              Sign In
            </button>
          </div>
        </form>:
        <SignUp
          close={closeNewUserForm}
          hidden={hideNewUserForm}
        />
      }
      
      
    </main>
  );
}

export default Login;
