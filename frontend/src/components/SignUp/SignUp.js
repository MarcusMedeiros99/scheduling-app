import {useState} from 'react';
import {AiOutlineClose} from 'react-icons/ai';

import FlashMessage from '../FlashMessage/FlashMessage';

import api from '../../api/api';
import validateEmail from '../../utils/validateEmail';
import validateNewPassword from '../../utils/validateNewPassword';
import validateName from '../../utils/validateName';

import './signUp.css';

function SignUp({close}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
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
      validateName(name);
      validateEmail(email);
      validateNewPassword(password, confirmPassword);

      api
      .post('/users', {
        name,
        email,
        password,
        is_admin: false
      })
      .then(res => {
        if (res.status === 200) close();
      })
      .catch(err => {
        console.log(err);
      })
    }
    catch (err) {
      showFlashMessage(err.message, 'red');
    }
    
  }
  

  return (
    <div className="signUp">
      <header>
        <button className="closeBtn" onClick={() => close()}>
          <AiOutlineClose size={40}/>
        </button>
      </header>
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <FlashMessage
          message={flashMessage}
          color={flashMessageColor}
        />

        <div>
          <label>
            Name
            <input type="text" name="name" onChange={(e) => {setName(e.target.value)}}/>
          </label>
        </div>

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

        <div>
          <label>
            Confirm Password
            <input type="password" name="confirmPassword" onChange={(e) => {setConfirmPassword(e.target.value)}}/>
          </label>
        </div>
        
        <div className="buttons">
          <button type="submit" className="newBtn">
            Sign Up
          </button>
        </div>

      </form>
    </div>
  );
}

export default SignUp;
