import {useState} from 'react';

import api from '../../api/api';

function Login({login}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  function handleSubmit(e) {
    e.preventDefault();
    console.log(login);
    api
      .post('/login', {
        email,
        password
      }, {
        withCredentials:true
      })
      .then(res => {
        login();
      })
      .catch(err => {
        console.log(err);
      });
  }
  

  return (
    <main>
      <form onSubmit={(e) => {handleSubmit(e)}}>
        <div>
          <label>
            Email
            <input type="email" name="email" onChange={(e) => {setEmail(e.target.value)}}/>
          </label>
        </div>
        
        <div>
          <label>
            Password
            <input type="password" name="email" onChange={(e) => {setPassword(e.target.value)}}/>
          </label>
        </div>
        
        <button type="submit">
          Sign In
        </button>

      </form>
    </main>
  );
}

export default Login;
